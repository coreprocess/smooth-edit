export function timeoutManagementFactory({
    idlePeriod,
    totalPeriod,
    onTimeout,
}: {
    idlePeriod: number;
    totalPeriod: number;
    onTimeout: () => void;
}) {
    let idleTimeout: ReturnType<typeof setTimeout> | null = null;
    let totalTimeout: ReturnType<typeof setTimeout> | null = null;

    function activateIdleTimeout() {
        if (idleTimeout === null) {
            idleTimeout = setTimeout(onTimeout, idlePeriod);
        }
    }

    function clearIdleTimeout() {
        if (idleTimeout !== null) {
            clearTimeout(idleTimeout);
            idleTimeout = null;
        }
    }

    function resetIdleTimeout() {
        clearIdleTimeout();
        activateIdleTimeout();
    }

    function activateTotalTimeout() {
        if (totalTimeout === null) {
            totalTimeout = setTimeout(onTimeout, totalPeriod);
        }
    }

    function clearTotalTimeout() {
        if (totalTimeout !== null) {
            clearTimeout(totalTimeout);
            totalTimeout = null;
        }
    }

    return {
        activateIdleTimeout,
        clearIdleTimeout,
        resetIdleTimeout,
        activateTotalTimeout,
        clearTotalTimeout,
    };
}
