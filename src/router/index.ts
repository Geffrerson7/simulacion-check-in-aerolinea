import type { Application, Router } from "express";
import * as ROUTES from "../components";

const routes: [string, Router][] = [
  ["flights", ROUTES.FlightRouter],
  ["/", ROUTES.RedirectRouter]
];

const router = (app: Application): void => {
  routes.forEach(([path, controler]) => {
    app.use(`/${path}`, controler);
  });
};

export default router;