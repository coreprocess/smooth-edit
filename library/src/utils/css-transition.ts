// detects when a css transition ends
export function detectCssTransitionEnd(
    element: HTMLElement,
    timeout: number,
    callback: () => void
) {
    // promisify
    if (!callback) {
        return new Promise((resolve) => {
            detectCssTransitionEnd(element, timeout, () => resolve(undefined));
        });
    }

    // active transitions and timeouts
    const transitions = new Map();
    let timeoutId: number | null = null;

    // register start of transition
    function onStart(event: TransitionEvent) {
        if (timeoutId !== null) {
            clearTimeout(timeoutId);
            timeoutId = null;
        }
        if (!transitions.has(event.target)) {
            transitions.set(event.target, new Set());
        }
        transitions.get(event.target).add(event.propertyName);
    }

    // register stop of transition
    function onStop(event: TransitionEvent) {
        if (timeoutId !== null) {
            clearTimeout(timeoutId);
            timeoutId = null;
        }
        if (transitions.has(event.target)) {
            transitions.get(event.target).delete(event.propertyName);
            if (transitions.get(event.target).size === 0) {
                transitions.delete(event.target);
            }
        }
        if (transitions.size === 0) {
            timeoutId = setTimeout(onTimeout, timeout);
        }
    }

    // handle timeout after last transition
    function onTimeout() {
        timeoutId = null;
        if (transitions.size === 0) {
            // remove event listeners
            element.removeEventListener("transitionrun", onStart);
            element.removeEventListener("transitionstart", onStart);
            element.removeEventListener("transitionend", onStop);
            element.removeEventListener("transitioncancel", onStop);
            // call callback
            callback();
        }
    }

    // register event listeners
    element.addEventListener("transitionrun", onStart);
    element.addEventListener("transitionstart", onStart);
    element.addEventListener("transitionend", onStop);
    element.addEventListener("transitioncancel", onStop);

    // set timeout
    timeoutId = setTimeout(onTimeout, timeout);
}
