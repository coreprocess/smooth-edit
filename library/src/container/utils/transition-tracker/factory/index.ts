import { logDebug } from "../../../../logging";
import { createInvertedPromise } from "../../../../utils/inverted-promise";
import { activeTransitionManagementFactory } from "./active-transition";
import { EventListenerManagementFactory } from "./event-listener";
import { timeoutManagementFactory } from "./timeout";

export interface CreateTransitionTracker {
    (
        element: HTMLElement | null,
        idleTimeout: number,
        totalTimeout: number
    ): TransitionTracker;
}

export type TransitionTracker = {
    setElement: (element: HTMLElement | null) => void;
    stop: () => void;
    promise: Promise<void>;
};

export function transitionTrackerFactory(
    eventListenerManagementFactory: EventListenerManagementFactory
): CreateTransitionTracker {
    // transition tracker implementation
    return function createTransitionTracker(
        element: HTMLElement | null,
        idleTimeout: number,
        totalTimeout: number
    ): TransitionTracker {
        // create promise
        const [promise, resolve] = createInvertedPromise<void>();

        // timeout management
        const {
            activateIdleTimeout,
            clearIdleTimeout,
            resetIdleTimeout,
            activateTotalTimeout,
            clearTotalTimeout,
        } = timeoutManagementFactory({
            idlePeriod: idleTimeout,
            totalPeriod: totalTimeout,
            onTimeout,
        });

        // active transition management
        const {
            addActiveTransition,
            removeActiveTransition,
            clearActiveTransitions,
        } = activeTransitionManagementFactory({
            clearIdleTimeout,
            activateIdleTimeout,
        });

        // event listener management
        const { registerEventListener, unregisterEventListener } =
            eventListenerManagementFactory({
                addActiveTransition,
                removeActiveTransition,
                resetIdleTimeout,
            });

        // initialize tracker
        if (element !== null) {
            registerEventListener(element);
        }
        activateIdleTimeout();
        activateTotalTimeout();

        // timeout handler
        function onTimeout() {
            clearIdleTimeout();
            clearTotalTimeout();
            if (element !== null) {
                unregisterEventListener(element);
            }
            resolve();
        }

        // transition tracker interface
        function setElement(newElement: HTMLElement | null) {
            if (newElement !== element) {
                clearActiveTransitions();
                if (element !== null) {
                    unregisterEventListener(element);
                }
                element = newElement;
                if (element !== null) {
                    registerEventListener(element);
                    logDebug("new element for transition tracker");
                }
            }
        }

        function stop() {
            clearIdleTimeout();
            clearTotalTimeout();
            if (element !== null) {
                unregisterEventListener(element);
            }
            resolve();
        }

        return {
            setElement,
            stop,
            promise,
        };
    };
}
