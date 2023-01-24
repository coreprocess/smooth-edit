import { CreateTransitionTracker, transitionTrackerFactory } from "./factory";

export const createCssTransitionTracker: CreateTransitionTracker =
    transitionTrackerFactory(function (
        addActiveTransition: (v0: unknown, v1: unknown) => void,
        removeActiveTransition: (v0: unknown, v1: unknown) => void,
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        resetIdleTimeout: () => void
    ) {
        function registerEventListener(element: HTMLElement): void {
            element.addEventListener("transitionrun", onTransitionStart);
            element.addEventListener("transitionstart", onTransitionStart);
            element.addEventListener("transitionend", onTransitionStop);
            element.addEventListener("transitioncancel", onTransitionStop);
        }

        function unregisterEventListener(element: HTMLElement): void {
            element.removeEventListener("transitionrun", onTransitionStart);
            element.removeEventListener("transitionstart", onTransitionStart);
            element.removeEventListener("transitionend", onTransitionStop);
            element.removeEventListener("transitioncancel", onTransitionStop);
        }

        function onTransitionStart({ target, propertyName }: TransitionEvent) {
            if (target) {
                addActiveTransition(target, propertyName);
            }
        }

        function onTransitionStop({ target, propertyName }: TransitionEvent) {
            if (target) {
                removeActiveTransition(target, propertyName);
            }
        }

        return {
            registerEventListener,
            unregisterEventListener,
        };
    });
