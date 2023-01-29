import { createCssAnimationTracker } from "./css-animation";
import { createCssTransitionTracker } from "./css-transition";
import { createCustomTracker } from "./custom";
import { createDomMutationsTracker } from "./dom-mutations";
import { TransitionTracker } from "./factory";
import { createResizeTracker } from "./resize";
import { createStyleMutationsTracker } from "./style-mutations";

export { TransitionTracker };

export function createTransitionTracker(
    element: HTMLElement | null,
    config: {
        cssTransition: {
            enabled: boolean;
            idleTimeout: number;
            totalTimeout: number;
        };
        cssAnimation: {
            enabled: boolean;
            idleTimeout: number;
            totalTimeout: number;
        };
        styleMutations: {
            enabled: boolean;
            idleTimeout: number;
            totalTimeout: number;
        };
        domMutations: {
            enabled: boolean;
            idleTimeout: number;
            totalTimeout: number;
        };
        resize: {
            enabled: boolean;
            idleTimeout: number;
            totalTimeout: number;
        };
        custom: {
            enabled: boolean;
            idleTimeout: number;
            totalTimeout: number;
        };
    }
): TransitionTracker {
    // tracker creator functions
    const creators = {
        cssTransition: createCssTransitionTracker,
        cssAnimation: createCssAnimationTracker,
        styleMutations: createStyleMutationsTracker,
        domMutations: createDomMutationsTracker,
        resize: createResizeTracker,
        custom: createCustomTracker,
    };

    // initialize trackers
    const trackers = Object.entries(config)
        .filter(([, { enabled }]) => enabled)
        .map(([type, { idleTimeout, totalTimeout }]) =>
            creators[type as keyof typeof config](
                element,
                idleTimeout,
                totalTimeout
            )
        );

    // tracker interface
    function setElement(element: HTMLElement | null): void {
        trackers.forEach((tracker) => {
            tracker.setElement(element);
        });
    }

    function stop(): void {
        trackers.forEach((tracker) => {
            tracker.stop();
        });
    }

    const promise = Promise.all(trackers.map(({ promise }) => promise)).then(
        () => {
            void 0;
        }
    );

    return {
        setElement,
        stop,
        promise,
    };
}
