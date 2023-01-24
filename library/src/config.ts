export type SmoothEditInputConfig = {
    fixContent: "top" | "middle" | "bottom";
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

export const defaultSmoothEditInputConfig: SmoothEditInputConfig = {
    fixContent: "top",
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
