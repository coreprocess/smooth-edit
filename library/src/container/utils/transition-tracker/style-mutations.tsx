import { CreateTransitionTracker, transitionTrackerFactory } from "./factory";

export const createStyleMutationsTracker: CreateTransitionTracker =
    transitionTrackerFactory(function ({ resetIdleTimeout }) {
        const observer = new MutationObserver((mutations) => {
            for (const mutation of mutations) {
                if (
                    mutation.oldValue !==
                    (mutation.target as Element).getAttribute("style")
                ) {
                    resetIdleTimeout();
                    break;
                }
            }
        });

        function registerEventListener(element: HTMLElement): void {
            observer.observe(element, {
                subtree: true,
                attributes: true,
                attributeFilter: ["style"],
                attributeOldValue: true,
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
