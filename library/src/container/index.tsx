import React, { ReactNode, useMemo } from "react";
import { SmoothEditContext } from "../context";
import { useConfig } from "./use-config";
import { useEditMode } from "./use-edit-mode";
import { useElements } from "./use-elements";
import { useMonitorTransition } from "./use-monitor-transition";

export function SmoothEditContainer({
    children,
}: {
    children: ReactNode;
}): JSX.Element {
    // element handling
    const {
        elements,
        setNavBarRootElement,
        setScrollAreaRootElement,
        setTopBufferRootElement,
        setBottomBufferRootElement,
        setInputRootElement,
        setInputContentElement,
    } = useElements();

    // config handling
    const { config, setNavBarConfig, setScrollAreaConfig, setInputConfig } =
        useConfig();

    // edit mode transition management
    const { monitorTransition } = useMonitorTransition(elements, config);

    // edit mode management
    const { editMode, activateEditMode, deactivateEditMode } =
        useEditMode(monitorTransition);

    // create context value
    const context = useMemo(
        () => ({
            editMode,
            activateEditMode,
            deactivateEditMode,
            setNavBarRootElement,
            setScrollAreaRootElement,
            setTopBufferRootElement,
            setBottomBufferRootElement,
            setInputRootElement,
            setInputContentElement,
            setNavBarConfig,
            setScrollAreaConfig,
            setInputConfig,
        }),
        [
            editMode,
            activateEditMode,
            deactivateEditMode,
            setNavBarRootElement,
            setScrollAreaRootElement,
            setTopBufferRootElement,
            setBottomBufferRootElement,
            setInputRootElement,
            setInputContentElement,
            setNavBarConfig,
            setScrollAreaConfig,
            setInputConfig,
        ]
    );

    // render context
    return (
        <SmoothEditContext.Provider value={context}>
            {children}
        </SmoothEditContext.Provider>
    );
}
