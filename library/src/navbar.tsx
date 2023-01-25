import _ from "lodash";
import React, { ComponentType, useContext, useEffect } from "react";
import { DeepPartial } from "tsdef";
import { Subtract } from "utility-types";
import {
    defaultSmoothEditNavBarConfig,
    SmoothEditNavBarConfig,
} from "./config";
import { SmoothEditContext } from "./context";

export interface InjectedSmoothEditNavBarProps {
    rootRef: React.RefCallback<HTMLElement>;
    editMode?: boolean;
    activateEditMode?: () => void;
    deactivateEditMode?: () => void;
}

export function wrapSmoothEditNavBar<
    Props extends InjectedSmoothEditNavBarProps
>(
    Component: ComponentType<Props>,
    config: DeepPartial<SmoothEditNavBarConfig>
) {
    // higher order component that wraps the inner component
    return function SmoothEditNavBar(
        props: Subtract<Props, InjectedSmoothEditNavBarProps>
    ) {
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
                {...(props as Props)}
                rootRef={setNavBarRootElement}
                editMode={editMode}
                activateEditMode={activateEditMode}
                deactivateEditMode={deactivateEditMode}
            />
        );
    };
}
