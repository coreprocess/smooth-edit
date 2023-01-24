export interface EventListenerManagementFactory {
    (args: {
        addActiveTransition: (v0: unknown, v1: unknown) => void;
        removeActiveTransition: (v0: unknown, v1: unknown) => void;
        resetIdleTimeout: () => void;
    }): {
        registerEventListener: (element: HTMLElement) => void;
        unregisterEventListener: (element: HTMLElement) => void;
    };
}
