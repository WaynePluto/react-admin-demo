import { hc } from "hono/client";
import type { TemplateApp } from "../hono-app-type/modules/template";
import { customFetch } from "./auth";

export const templateClient = hc<TemplateApp>("/api/template", {
  fetch: customFetch,
});
