import _ from "lodash";
import React, { ComponentType, useContext, useEffect } from "react";
import { DeepPartial } from "tsdef";
import {
    defaultSmoothEditScrollAreaConfig,
    SmoothEditScrollAreaConfig,
} from "./config";
import { SmoothEditContext } from "./context";

function TopBuffer() {
    const { setTopBufferRootRef } = useContext(SmoothEditContext);
    return <div ref={setTopBufferRootRef} style={{ display: "flex" }} />;
}

function BottomBuffer() {
    const { setBottomBufferRootRef } = useContext(SmoothEditContext);
    return <div ref={setBottomBufferRootRef} style={{ display: "flex" }} />;
}

export function wrapSmoothEditScrollArea<Props>(
    Component: ComponentType<Props>,
    config: DeepPartial<SmoothEditScrollAreaConfig>
) {
    // higher order component that wraps the inner component
    return function SmoothEditScrollArea(props: Props) {
        // get the context
        const {
            editMode,
            activateEditMode,
            deactivateEditMode,
            setScrollAreaRootRef,
            setScrollAreaConfig,
        } = useContext(SmoothEditContext);

        // apply the config to the context
        useEffect(() => {
            setScrollAreaConfig(
                _.merge({}, defaultSmoothEditScrollAreaConfig, config)
            );
        }, [setScrollAreaConfig]);

        // render the scroll area
        return (
            <Component
                rootRef={setScrollAreaRootRef}
                editMode={editMode}
                activateEditMode={activateEditMode}
                deactivateEditMode={deactivateEditMode}
                SmoothEditTopBuffer={TopBuffer}
                SmoothEditBottomBuffer={BottomBuffer}
                {...props}
            />
        );
    };
}
