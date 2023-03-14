import type { Handle } from '@sveltejs/kit';
import { db } from './routes/lib/database';

export const handle: Handle = async ({ event, resolve }) => {
  const session = event.cookies.get('session');

  if (!session) {
    return resolve(event);
  }

  const userToken = await db.userAuthToken.findUnique({
    where: {
      token: session
    },
    select: {
      userId: true,
      activationState: true,
      User: {
        select: {
          username: true,
          role: true
        }
      }
    }
  });

  if (userToken && userToken.User && userToken.activationState) {
    event.locals.user = {
      name: userToken.User.username,
      role: userToken.User.role
    };
  }

  return await resolve(event);
};

