// configuration shared by all components
type SmoothEditBaseConfig = {
    trackTransition: {
        css: {
            enabled: boolean;
            timeout: number;
        };
        custom: {
            enabled: boolean;
            timeout: number;
        };
    };
};

const defaultSmoothEditBaseConfig: SmoothEditBaseConfig = {
    trackTransition: {
        css: {
            enabled: true,
            timeout: 250,
        },
        custom: {
            enabled: false,
            timeout: 1000,
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
