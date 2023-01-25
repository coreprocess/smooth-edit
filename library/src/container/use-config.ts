import { useCallback, useRef } from "react";
import {
    SmoothEditInputConfig,
    SmoothEditNavBarConfig,
    SmoothEditScrollAreaConfig,
} from "../config";

type ConfigData = {
    navBar: SmoothEditNavBarConfig | null;
    scrollArea: SmoothEditScrollAreaConfig | null;
    input: Map<string, SmoothEditInputConfig>;
};

export type ConfigRef = React.MutableRefObject<ConfigData>;

export function useConfig() {
    const config = useRef<ConfigData>({
        navBar: null,
        scrollArea: null,
        input: new Map<string, SmoothEditInputConfig>(),
    });

    const setNavBarConfig = useCallback(
        (navBarConfig: SmoothEditNavBarConfig | null) => {
            config.current.navBar = navBarConfig;
        },
        []
    );

    const setScrollAreaConfig = useCallback(
        (scrollAreaConfig: SmoothEditScrollAreaConfig | null) => {
            config.current.scrollArea = scrollAreaConfig;
        },
        []
    );

    const setInputConfig = useCallback(
        (id: string, inputConfig: SmoothEditInputConfig | null) => {
            if (inputConfig) {
                config.current.input.set(id, inputConfig);
            } else {
                config.current.input.delete(id);
            }
        },
        []
    );

    return {
        config,
        setNavBarConfig,
        setScrollAreaConfig,
        setInputConfig,
    };
}
