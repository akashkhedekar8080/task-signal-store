import {
  signalStore,
  withComputed,
  withHooks,
  withMethods,
  withState,
} from "@ngrx/signals";
import { intialState } from "./state/task.state";
import { taskMethods } from "./methods/task.methods";
import { taskComputed } from "./computed/task.computed";
import { taskEffects } from "./effects/task.effects";

export const TaskStore = signalStore(
  withState(intialState),
  withMethods(taskMethods),
  withComputed(taskComputed),
  withHooks(taskEffects)
);
