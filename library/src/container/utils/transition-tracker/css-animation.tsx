import { CreateTransitionTracker, transitionTrackerFactory } from "./factory";

export const createCssAnimationTracker: CreateTransitionTracker =
    transitionTrackerFactory(function ({
        addActiveTransition,
        removeActiveTransition,
    }) {
        function registerEventListener(element: HTMLElement): void {
            element.addEventListener("animationstart", onAnimationStart);
            element.addEventListener("animationiteration", onAnimationStart);
            element.addEventListener("animationend", onAnimationEnd);
            element.addEventListener("animationcancel", onAnimationEnd);
        }

        function unregisterEventListener(element: HTMLElement): void {
            element.removeEventListener("animationstart", onAnimationStart);
            element.removeEventListener("animationiteration", onAnimationStart);
            element.removeEventListener("animationend", onAnimationEnd);
            element.removeEventListener("animationcancel", onAnimationEnd);
        }

        function onAnimationStart({ target, animationName }: AnimationEvent) {
            if (target) {
                addActiveTransition(target, animationName);
            }
        }

        function onAnimationEnd({ target, animationName }: AnimationEvent) {
            if (target) {
                removeActiveTransition(target, animationName);
            }
        }

        return {
            registerEventListener,
            unregisterEventListener,
        };
    });
