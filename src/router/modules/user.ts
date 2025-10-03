import type { RouteObject } from "react-router-dom";

export default <Readonly<RouteObject[]>>[
  {
    path: "/users",
    lazy: async () => {
      const { User } = await import("@/views/user");
      return { Component: User };
    },
  },
];
