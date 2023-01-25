import _ from "lodash";
import React, { ComponentType, useContext, useEffect } from "react";
import {
    defaultSmoothEditNavBarConfig,
    SmoothEditNavBarConfig,
} from "./config";
import { SmoothEditContext } from "./context";
import { DeepPartial } from "./utils/types";

export interface InjectedSmoothEditNavBarProps {
    rootRef: React.RefCallback<HTMLElement>;
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
            setNavBarConfig(_.merge({}, defaultSmoothEditNavBarConfig, config));
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
