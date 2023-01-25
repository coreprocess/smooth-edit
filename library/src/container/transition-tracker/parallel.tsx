import { createCssAnimationTracker } from "./css-animation";
import { createCssTransitionTracker } from "./css-transition";
import { createCustomTracker } from "./custom";
import { createDomMutationsTracker } from "./dom-mutations";
import { TransitionTracker } from "./factory";
import { createStyleMutationsTracker } from "./style-mutations";

export function createParallelTracker(
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
        custom: {
            enabled: boolean;
            idleTimeout: number;
            totalTimeout: number;
        };
    },
    onEnd: () => void
): TransitionTracker {
    // tracker creator functions
    const creators = {
        cssTransition: createCssTransitionTracker,
        cssAnimation: createCssAnimationTracker,
        styleMutations: createStyleMutationsTracker,
        domMutations: createDomMutationsTracker,
        custom: createCustomTracker,
    };

    // initialize trackers
    const trackers = Object.entries(config)
        .filter(([, { enabled }]) => enabled)
        .map(([type, { idleTimeout, totalTimeout }]) => {
            let onItemEnd: (() => void) | null = null;
            const promise = new Promise<undefined>((resolve) => {
                onItemEnd = resolve as () => void;
            });
            return {
                promise,
                interface: creators[type as keyof typeof creators](
                    element,
                    idleTimeout,
                    totalTimeout,
                    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
                    onItemEnd!
                ),
            };
        });

    // wait for end of all trackers
    Promise.all(trackers.map(({ promise }) => promise)).then(onEnd);

    // tracker interface
    function setElement(element: HTMLElement | null): void {
        trackers.forEach(({ interface: tracker }) => {
            tracker.setElement(element);
        });
    }

    function cancel(): void {
        trackers.forEach(({ interface: tracker }) => {
            tracker.cancel();
        });
    }

    return {
        setElement,
        cancel,
    };
}
