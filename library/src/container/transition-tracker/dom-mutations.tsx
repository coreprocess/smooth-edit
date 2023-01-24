import { CreateTransitionTracker, transitionTrackerFactory } from "./factory";

export const createDomMutationsTracker: CreateTransitionTracker =
    transitionTrackerFactory(function ({ resetIdleTimeout }) {
        const observer = new MutationObserver(() => {
            resetIdleTimeout();
        });

        function registerEventListener(element: HTMLElement): void {
            observer.observe(element, {
                subtree: true,
                childList: true,
                attributes: true,
                characterData: true,
            });
        }

        function unregisterEventListener(): void {
            observer.disconnect();
        }

        return {
            registerEventListener,
            unregisterEventListener,
        };
    });
