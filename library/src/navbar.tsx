import React, {
    ComponentType,
    RefCallback,
    useContext,
    useEffect,
} from "react";
import {
    defaultSmoothEditNavBarConfig,
    SmoothEditNavBarConfig,
} from "./config";
import { SmoothEditContext } from "./context";
import { merge } from "./utils/deep-merge";
import { DeepPartial } from "./utils/types";

export interface InjectedSmoothEditNavBarProps {
    rootRef: RefCallback<HTMLElement>;
    editMode: boolean;
    activateEditMode: () => void;
    deactivateEditMode: () => void;
}

export function wrapSmoothEditNavBar<OuterProps = object>(
    Component: ComponentType<OuterProps & InjectedSmoothEditNavBarProps>,
    config: DeepPartial<SmoothEditNavBarConfig>
) {
    // higher order component that wraps the inner component
    return function SmoothEditNavBar(props: OuterProps) {
        // get the context
        const {
            editMode,
            activateEditMode,
            deactivateEditMode,
            setNavBarRootElement,
            setNavBarConfig,
        } = useContext(SmoothEditContext);

        // apply the config to the context
        useEffect(() => {
            setNavBarConfig(
                merge(
                    defaultSmoothEditNavBarConfig,
                    config
                ) as SmoothEditNavBarConfig
            );
            return () => {
                setNavBarConfig(null);
            };
        }, [setNavBarConfig]);

        // render the navbar
        return (
            <Component
                {...props}
                rootRef={setNavBarRootElement}
                editMode={editMode}
                activateEditMode={activateEditMode}
                deactivateEditMode={deactivateEditMode}
            />
        );
    };
}
