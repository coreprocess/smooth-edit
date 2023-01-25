import { logDebug } from "../../../../logging";
import { activeTransitionManagementFactory } from "./active-transition";
import { EventListenerManagementFactory } from "./event-listener";
import { timeoutManagementFactory } from "./timeout";

export interface CreateTransitionTracker {
    (
        element: HTMLElement | null,
        idleTimeout: number,
        totalTimeout: number,
        onEnd: () => void
    ): TransitionTracker;
}

export type TransitionTracker = {
    setElement: (element: HTMLElement | null) => void;
    cancel: () => void;
};

export function transitionTrackerFactory(
    eventListenerManagementFactory: EventListenerManagementFactory
): CreateTransitionTracker {
    // transition tracker implementation
    return function createTransitionTracker(
        element: HTMLElement | null,
        idleTimeout: number,
        totalTimeout: number,
        onEnd: () => void
    ): TransitionTracker {
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
            onEnd();
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

        function cancel() {
            clearIdleTimeout();
            clearTotalTimeout();
            if (element !== null) {
                unregisterEventListener(element);
            }
        }

        return {
            setElement,
            cancel,
        };
    };
}
