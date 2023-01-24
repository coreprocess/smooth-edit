// configuration shared by all components
type SmoothEditBaseConfig = {
    trackTransition: {
        cssTransition: {
            enabled: boolean;
            timeouts: {
                idle: number;
                total: number;
            };
        };
        cssAnimation: {
            enabled: boolean;
            timeouts: {
                idle: number;
                total: number;
            };
        };
        styleMutations: {
            enabled: boolean;
            timeouts: {
                idle: number;
                total: number;
            };
        };
        domMutations: {
            enabled: boolean;
            timeouts: {
                idle: number;
                total: number;
            };
        };
        custom: {
            enabled: boolean;
            timeouts: {
                idle: number;
                total: number;
            };
        };
    };
};

const defaultSmoothEditBaseConfig: SmoothEditBaseConfig = {
    trackTransition: {
        cssTransition: {
            enabled: true,
            timeouts: {
                idle: 250,
                total: 1000,
            },
        },
        cssAnimation: {
            enabled: false,
            timeouts: {
                idle: 250,
                total: 1000,
            },
        },
        styleMutations: {
            enabled: false,
            timeouts: {
                idle: 250,
                total: 1000,
            },
        },
        domMutations: {
            enabled: false,
            timeouts: {
                idle: 250,
                total: 1000,
            },
        },
        custom: {
            enabled: false,
            timeouts: {
                idle: 250,
                total: 1000,
            },
        },
    },
};

// configuration for navbar component
export type SmoothEditNavBarConfig = SmoothEditBaseConfig;

export const defaultSmoothEditNavBarConfig: SmoothEditNavBarConfig = {
    ...defaultSmoothEditBaseConfig,
};

// configuration for scroll area component
export type SmoothEditScrollAreaConfig = SmoothEditBaseConfig;

export const defaultSmoothEditScrollAreaConfig: SmoothEditScrollAreaConfig = {
    ...defaultSmoothEditBaseConfig,
};

// configuration for input components
export type SmoothEditInputConfig = SmoothEditBaseConfig & {
    fixContent: "top" | "middle" | "bottom";
};

export const defaultSmoothEditInputConfig: SmoothEditInputConfig = {
    ...defaultSmoothEditBaseConfig,
    fixContent: "top",
};
