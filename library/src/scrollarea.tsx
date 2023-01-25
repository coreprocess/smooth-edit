import _ from "lodash";
import React, { ComponentType, useContext, useEffect } from "react";
import { Subtract } from "utility-types";
import {
    defaultSmoothEditScrollAreaConfig,
    SmoothEditScrollAreaConfig,
} from "./config";
import { SmoothEditContext } from "./context";
import { DeepPartial } from "./utils/types";

function TopBuffer() {
    const { setTopBufferRootElement } = useContext(SmoothEditContext);
    return <div ref={setTopBufferRootElement} style={{ display: "flex" }} />;
}

function BottomBuffer() {
    const { setBottomBufferRootElement } = useContext(SmoothEditContext);
    return <div ref={setBottomBufferRootElement} style={{ display: "flex" }} />;
}

export interface InjectedSmoothEditScrollAreaProps {
    rootRef: React.RefCallback<HTMLElement>;
    editMode?: boolean;
    activateEditMode?: () => void;
    deactivateEditMode?: () => void;
    SmoothEditTopBuffer: ComponentType;
    SmoothEditBottomBuffer: ComponentType;
}

export function wrapSmoothEditScrollArea<
    Props extends InjectedSmoothEditScrollAreaProps
>(
    Component: ComponentType<Props>,
    config: DeepPartial<SmoothEditScrollAreaConfig>
) {
    // higher order component that wraps the inner component
    return function SmoothEditScrollArea(
        props: Subtract<Props, InjectedSmoothEditScrollAreaProps>
    ) {
        // get the context
        const {
            editMode,
            activateEditMode,
            deactivateEditMode,
            setScrollAreaRootElement,
            setScrollAreaConfig,
        } = useContext(SmoothEditContext);

        // apply the config to the context
        useEffect(() => {
            setScrollAreaConfig(
                _.merge({}, defaultSmoothEditScrollAreaConfig, config)
            );
            return () => {
                setScrollAreaConfig(null);
            };
        }, [setScrollAreaConfig]);

        // render the scroll area
        return (
            <Component
                {...(props as Props)}
                rootRef={setScrollAreaRootElement}
                editMode={editMode}
                activateEditMode={activateEditMode}
                deactivateEditMode={deactivateEditMode}
                SmoothEditTopBuffer={TopBuffer}
                SmoothEditBottomBuffer={BottomBuffer}
            />
        );
    };
}
