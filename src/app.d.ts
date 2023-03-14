// See https://kit.svelte.dev/docs/types#app
// for information about these interfaces
// and what to do when importing types
declare namespace App {
  interface Locals {
    user?: {
      name: string;
      role: import('@prisma/client').Role;
    }
  }
  interface PageData {
    user?: {
      name: string;
      role: import('@prisma/client').Role;

      userList?: import('@prisma/client').User[];
    },
    tiles?: {
      url: string;
      title: string;
      icon?: string;
    }[]
  }
  // interface Error {}
  // interface Platform {}
}

declare module '@fortawesome/pro-solid-svg-icons/index.es' {
  export * from '@fortawesome/pro-solid-svg-icons';
}

