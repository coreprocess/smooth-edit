export const CUSTOM_TRANSITION_BEGIN = "smooth-edit-transition-begin";
export const CUSTOM_TRANSITION_END = "smooth-edit-transition-end";
export const CUSTOM_TRANSITION_ACTIVITY = "smooth-edit-transition-activity";

export function dispathSmoothEditTransitionBegin(
    target: EventTarget,
    transitionId: unknown
) {
    target.dispatchEvent(
        new CustomEvent(CUSTOM_TRANSITION_BEGIN, { detail: transitionId })
    );
}

export function dispathSmoothEditTransitionEnd(
    target: EventTarget,
    transitionId: unknown
) {
    target.dispatchEvent(
        new CustomEvent(CUSTOM_TRANSITION_END, { detail: transitionId })
    );
}

export function dispathSmoothEditTransitionActivity(target: EventTarget) {
    target.dispatchEvent(new CustomEvent(CUSTOM_TRANSITION_ACTIVITY));
}
