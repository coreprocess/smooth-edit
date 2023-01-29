import { CreateTransitionTracker, transitionTrackerFactory } from "./factory";

export const createResizeTracker: CreateTransitionTracker =
    transitionTrackerFactory(function ({ resetIdleTimeout }) {
        const observer = new ResizeObserver(() => {
            resetIdleTimeout();
        });

        function registerEventListener(element: HTMLElement): void {
            observer.observe(element, {
                box: "border-box",
            });
        }

        function unregisterEventListener(element: HTMLElement): void {
            observer.unobserve(element);
        }

        return {
            registerEventListener,
            unregisterEventListener,
        };
    });
