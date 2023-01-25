// configuration shared by all components
type SmoothEditBaseConfig = {
    trackTransition: {
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
    };
};

const defaultSmoothEditBaseConfig: SmoothEditBaseConfig = {
    trackTransition: {
        cssTransition: {
            enabled: true,
            idleTimeout: 250,
            totalTimeout: 1000,
        },
        cssAnimation: {
            enabled: false,
            idleTimeout: 250,
            totalTimeout: 1000,
        },
        styleMutations: {
            enabled: false,
            idleTimeout: 250,
            totalTimeout: 1000,
        },
        domMutations: {
            enabled: false,
            idleTimeout: 250,
            totalTimeout: 1000,
        },
        custom: {
            enabled: false,
            idleTimeout: 250,
            totalTimeout: 1000,
        },
    },
};

// configuration for navbar component
export type SmoothEditNavBarConfig = SmoothEditBaseConfig;

export const defaultSmoothEditNavBarConfig: SmoothEditNavBarConfig = {
    ...defaultSmoothEditBaseConfig,
};

// configuration for scroll area component
export type SmoothEditScrollAreaConfig = SmoothEditBaseConfig & {
    bufferResetDuration: number;
};

export const defaultSmoothEditScrollAreaConfig: SmoothEditScrollAreaConfig = {
    ...defaultSmoothEditBaseConfig,
    bufferResetDuration: 1000,
};

// configuration for input components
export type SmoothEditInputConfig = SmoothEditBaseConfig & {
    fixContent: "top" | "middle" | "bottom";
};

export const defaultSmoothEditInputConfig: SmoothEditInputConfig = {
    ...defaultSmoothEditBaseConfig,
    fixContent: "top",
};
