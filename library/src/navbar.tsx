import _ from "lodash";
import React, { ComponentType, useContext, useEffect } from "react";
import { DeepPartial } from "tsdef";
import {
    defaultSmoothEditNavBarConfig,
    SmoothEditNavBarConfig,
} from "./config";
import { SmoothEditContext } from "./context";

export function wrapSmoothEditNavBar<Props>(
    Component: ComponentType<Props>,
    config: DeepPartial<SmoothEditNavBarConfig>
) {
    // higher order component that wraps the inner component
    return function SmoothEditNavBar(props: Props) {
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
        }, [setNavBarConfig]);

        // render the navbar
        return (
            <Component
                rootRef={setNavBarRootElement}
                editMode={editMode}
                activateEditMode={activateEditMode}
                deactivateEditMode={deactivateEditMode}
                {...props}
            />
        );
    };
}
