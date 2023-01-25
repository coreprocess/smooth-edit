import React, { ComponentType, useContext, useEffect } from "react";
import {
    defaultSmoothEditScrollAreaConfig,
    SmoothEditScrollAreaConfig,
} from "./config";
import { SmoothEditContext } from "./context";
import { merge } from "./utils/deep-merge";
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
    editMode: boolean;
    activateEditMode: () => void;
    deactivateEditMode: () => void;
    SmoothEditTopBuffer: ComponentType;
    SmoothEditBottomBuffer: ComponentType;
}

export function wrapSmoothEditScrollArea<OuterProps = object>(
    Component: ComponentType<OuterProps & InjectedSmoothEditScrollAreaProps>,
    config: DeepPartial<SmoothEditScrollAreaConfig>
) {
    // higher order component that wraps the inner component
    return function SmoothEditScrollArea(props: OuterProps) {
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
                merge(
                    defaultSmoothEditScrollAreaConfig,
                    config
                ) as SmoothEditScrollAreaConfig
            );
            return () => {
                setScrollAreaConfig(null);
            };
        }, [setScrollAreaConfig]);

        // render the scroll area
        return (
            <Component
                {...props}
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
