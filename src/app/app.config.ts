import { ApplicationConfig, provideZoneChangeDetection } from "@angular/core";
import { provideRouter } from "@angular/router";

import { routes } from "./app.routes";
import { TaskStore } from "./core/store/task.store";
import { provideCharts, withDefaultRegisterables } from "ng2-charts";

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    TaskStore,
    provideCharts(withDefaultRegisterables()),
    provideRouter(routes),
  ],
};
