import { invalid, redirect } from '@sveltejs/kit';
import type { Action, Actions, PageServerLoad } from './$types';
import * as argon2 from 'argon2';
import consola from "consola"
import { db } from '../../lib/database';
import type { Role } from '@prisma/client';

export const load: PageServerLoad = async ({ locals }) => {
  if (!locals.user) {
    throw redirect(302, '/login')
  }
  if (!['ADMIN', 'DEVELOPER'].includes(locals.user.role)) {
    throw redirect(302, '/');
  }

  const userList = await db.user.findMany({
    orderBy: {
      username: 'asc'
    },
  });


  const safeUserList = userList.map(user => {
    const { passwordHash, ...safeUser } = user;
    return safeUser
  })


  return { userList: safeUserList };
};

const deleteUser: Action = async event => {
  const id = (await event.request.formData()).get('id')

  const deletedUser = await db.user.delete({ where: { id: `${id}` } })

  if (!deletedUser) {
    return invalid(400, { deleted: false })
  }

  consola.warn("deleteing ", deletedUser.username)
  return { deleted: true, deletedUser }
}

const register: Action = async ({ request, locals }) => {
  const data = await request.formData();
  const username = data.get('username');
  const password = data.get('password');
  const role = data.get('role');
  let resolvedRole: Role;

  if (!locals.user) throw redirect(302, '/login')
  if (!['ADMIN', 'DEVELOPER'].includes(locals.user?.role)) {
    return invalid(400, { perms: true });
  }

  if (role == 'ADMIN') resolvedRole = 'ADMIN';
  else if (role == 'MANAGER') resolvedRole = 'MANAGER';
  else resolvedRole = 'WORKER';

  if (
    typeof username !== 'string' ||
    typeof password !== 'string' ||
    !username ||
    !password
  ) {
    return invalid(400, { invalid: true });
  }

  const user = await db.user.findUnique({ where: { username } });

  if (user) {
    return invalid(400, { user: true });
  }

  const passwordHash = await argon2.hash(password);
  const createdUser = await db.user.create({
    data: {
      username,
      passwordHash,
      role: resolvedRole
    }
  });

  if (createdUser) {
    return { success: true };
  }
};

export const actions: Actions = {
  register,
  deleteUser
};
