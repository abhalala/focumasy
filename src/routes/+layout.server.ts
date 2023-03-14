import consola from "consola";
import { faFileInvoiceDollar, faHome, faTags, faUser } from "@fortawesome/free-solid-svg-icons";

import type { LayoutServerLoad } from "./$types";

export const load: LayoutServerLoad = async ({ locals }) => {
  const menuItems = [{
    url: "/", title: "Home", icon: "🏡"
  }]

  // {
  //   url: '/label', title: "Labels", icon: "📜"
  // },
  // {
  //   url: '/billing', title: 'Billing', icon: "💲"
  // }]

  if (locals.user) {
    const { role } = locals.user;
    if (['MANAGER', 'ADMIN', 'DEVELOPER'].includes(role)) {
      if (['ADMIN', 'DEVELOPER'].includes(role)) {
        menuItems.push(
          {
            title: 'Users',
            icon: "👨‍💼",
            url: '/users'
          },

          {
            title: 'Order',
            icon: "📦",
            url: '/order'
          },
          {
            title: 'Stats',
            icon: "📊",
            url: '/stats'
          }
        );
      }

      menuItems.push(
        {
          title: 'Scheduler',
          icon: "📅",
          url: '/scheduler'
        },
        {
          title: 'Production',
          icon: "🏭",
          url: '/production'
        }
      );
    }

    // Footing Menu Items
    menuItems.push(
      {
        title: 'Ageing',
        icon: "🔥",
        url: '/ageing'
      },
      {
        title: 'Packaging',
        icon: "🗳️",
        url: '/packaging'
      },
      {
        title: 'Dispatch',
        icon: "🚚",
        url: '/dispatch'
      }
    );

    return {
      user: locals.user,
      tiles: menuItems
    }
  }
}
