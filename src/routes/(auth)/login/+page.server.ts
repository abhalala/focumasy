import { redirect, invalid } from '@sveltejs/kit';
import type { Action, Actions, PageServerLoad } from './$types';
import * as argon2 from 'argon2';
import consola from 'consola';

import { db } from '../../lib/database';

export const load: PageServerLoad = async ({ locals }) => {
  if (locals.user) {
    throw redirect(302, '/');
  }
};

const login: Action = async ({ request, cookies }) => {
  const data = await request.formData();
  const username = data.get('username');
  const password = data.get('password');

  if (
    typeof username !== 'string' ||
    typeof password !== 'string' ||
    !username ||
    !password
  ) {
    return invalid(400, { invalid: true });
  }

  const user = await db.user.findUnique({ where: { username } });

  if (!user) {
    return invalid(400, { credentials: true });
  }

  const passwordValid = await argon2.verify(user.passwordHash, password);

  if (!passwordValid) {
    return invalid(400, { credentials: true });
  }

  // At this point the user credentials are valid and genuine.

  const { token } = await db.userAuthToken.create({
    data: {
      userId: user.id
    },
    select: {
      token: true
    }
  });

  cookies.set('session', token, {
    path: '/',
    maxAge: 60 * 60 * 24 * 7, // 1 week
    httpOnly: true,
    sameSite: true,
    // secure: process.env.NODE_ENV === 'production'
    secure: true,
  });

  throw redirect(302, '/');
};

export const actions: Actions = {
  login
};
