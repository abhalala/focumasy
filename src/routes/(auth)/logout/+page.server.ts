import { redirect } from '@sveltejs/kit';
import type { Actions, PageServerLoad } from './$types';
import { db } from '../../lib/database';
import consola from 'consola'

export const load: PageServerLoad = async () => {
  throw redirect(302, '/');
};

export const actions: Actions = {
  async default({ cookies }) {
    const session = cookies.get('session');
    consola.warn('deactivating ' + session);

    await db.userAuthToken.update({
      where: {
        token: session
      },
      data: { activationState: false }
    });

    cookies.set('session', '');

    throw redirect(302, '/');
  }
};
