export function activeTransitionManagementFactory(
    clearIdleTimeout: () => void,
    activateIdleTimeout: () => void
) {
    const activeTransitions: Map<unknown, Set<unknown>> = new Map();

    function addActiveTransition(v0: unknown, v1: unknown) {
        const l0 = activeTransitions;
        let l1 = l0.get(v0);
        if (!l1) {
            l0.set(v0, (l1 = new Set()));
        }
        l1.add(v1);

        clearIdleTimeout();
    }

    function removeActiveTransition(v0: unknown, v1: unknown) {
        const l0 = activeTransitions;
        const l1 = l0.get(v0);
        if (l1) {
            l1.delete(v1);
            if (l1.size === 0) {
                l0.delete(v0);
            }
        }

        if (l0.size === 0) {
            activateIdleTimeout();
        }
    }

    function clearActiveTransitions() {
        activeTransitions.clear();
        activateIdleTimeout();
    }

    return {
        addActiveTransition,
        removeActiveTransition,
        clearActiveTransitions,
    };
}
