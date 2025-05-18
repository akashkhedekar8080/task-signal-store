import { effect } from "@angular/core";

export const taskEffects = (store: any) => ({
  onInit() {
    effect(() => {
      const tasks = store.tasks();
      console.log("[Effect] Task list changed. Count:", tasks.length);
    });

    effect(() => {
      const selected = store.selectedTaskId();
      if (selected) {
        console.log("[Effect] Task selected:", selected);
      }
    });
  },
  onDestroy() {
    console.log("[Effect] Task list at destroy.");
  },
});
