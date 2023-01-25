import {
    CUSTOM_TRANSITION_ACTIVITY,
    CUSTOM_TRANSITION_BEGIN,
    CUSTOM_TRANSITION_END,
} from "../../../custom";
import { CreateTransitionTracker, transitionTrackerFactory } from "./factory";

export const createCustomTracker: CreateTransitionTracker =
    transitionTrackerFactory(function ({
        addActiveTransition,
        removeActiveTransition,
        resetIdleTimeout,
    }) {
        function registerEventListener(element: HTMLElement): void {
            element.addEventListener(
                CUSTOM_TRANSITION_BEGIN,
                onTransitionBegin as EventListener
            );
            element.addEventListener(
                CUSTOM_TRANSITION_END,
                onTransitionEnd as EventListener
            );
            element.addEventListener(
                CUSTOM_TRANSITION_ACTIVITY,
                onTransitionActivity
            );
        }

        function unregisterEventListener(element: HTMLElement): void {
            element.removeEventListener(
                CUSTOM_TRANSITION_BEGIN,
                onTransitionBegin as EventListener
            );
            element.removeEventListener(
                CUSTOM_TRANSITION_END,
                onTransitionEnd as EventListener
            );
            element.removeEventListener(
                CUSTOM_TRANSITION_ACTIVITY,
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
