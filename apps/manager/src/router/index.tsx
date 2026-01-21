import type { RouteObject } from "react-router";
import { createBrowserRouter, Navigate } from "react-router";

import Home from "@/pages/Home";
import Modpacks from "@/pages/Modpacks";
import Mods from "@/pages/Mods";
import Root from "@/pages/Root";
import Settings from "@/pages/Settings";

const routes: RouteObject[] = [
  {
    path: "",
    element: <Root />,
    children: [
      {
        index: true,
        element: <Navigate to="/home" />,
      },
      {
        path: "home",
        element: <Home />,
      },
      {
        path: "mods",
        element: <Mods />,
      },
      {
        path: "modpacks",
        element: <Modpacks />,
      },
      {
        path: "settings",
        element: <Settings />,
      },
    ],
  },
];

const router = createBrowserRouter(routes);

export default router;
