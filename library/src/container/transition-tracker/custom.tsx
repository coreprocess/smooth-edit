import { CreateTransitionTracker, transitionTrackerFactory } from "./factory";

export const createCustomTracker: CreateTransitionTracker =
    transitionTrackerFactory(function ({
        addActiveTransition,
        removeActiveTransition,
        resetIdleTimeout,
    }) {
        function registerEventListener(element: HTMLElement): void {
            element.addEventListener(
                "smooth-edit-transition-begin",
                onTransitionBegin as EventListener
            );
            element.addEventListener(
                "smooth-edit-transition-end",
                onTransitionEnd as EventListener
            );
            element.addEventListener(
                "smooth-edit-transition-activity",
                onTransitionActivity
            );
        }

        function unregisterEventListener(element: HTMLElement): void {
            element.removeEventListener(
                "smooth-edit-transition-begin",
                onTransitionBegin as EventListener
            );
            element.removeEventListener(
                "smooth-edit-transition-end",
                onTransitionEnd as EventListener
            );
            element.removeEventListener(
                "smooth-edit-transition-activity",
                onTransitionActivity
            );
        }

        function onTransitionBegin({ target, detail }: CustomEvent) {
            if (target) {
                addActiveTransition(target, detail);
            }
        }

        function onTransitionEnd({ target, detail }: CustomEvent) {
            if (target) {
                removeActiveTransition(target, detail);
            }
        }

        function onTransitionActivity() {
            resetIdleTimeout();
        }

        return {
            registerEventListener,
            unregisterEventListener,
        };
    });
