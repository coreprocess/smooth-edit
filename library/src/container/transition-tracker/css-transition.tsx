import { CreateTransitionTracker, transitionTrackerFactory } from "./factory";

export const createCssTransitionTracker: CreateTransitionTracker =
    transitionTrackerFactory(function ({
        addActiveTransition,
        removeActiveTransition,
    }) {
        function registerEventListener(element: HTMLElement): void {
            element.addEventListener("transitionrun", onTransitionRun);
            element.addEventListener("transitionstart", onTransitionRun);
            element.addEventListener("transitionend", onTransitionEnd);
            element.addEventListener("transitioncancel", onTransitionEnd);
        }

        function unregisterEventListener(element: HTMLElement): void {
            element.removeEventListener("transitionrun", onTransitionRun);
            element.removeEventListener("transitionstart", onTransitionRun);
            element.removeEventListener("transitionend", onTransitionEnd);
            element.removeEventListener("transitioncancel", onTransitionEnd);
        }

        function onTransitionRun({ target, propertyName }: TransitionEvent) {
            if (target) {
                addActiveTransition(target, propertyName);
            }
        }

        function onTransitionEnd({ target, propertyName }: TransitionEvent) {
            if (target) {
                removeActiveTransition(target, propertyName);
            }
        }

        return {
            registerEventListener,
            unregisterEventListener,
        };
    });
