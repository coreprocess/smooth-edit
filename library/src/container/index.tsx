import React, { ReactNode, useMemo } from "react";
import { SmoothEditContext } from "../context";
import { useConfig } from "./hooks/config";
import { useEditMode } from "./hooks/edit-mode";
import { useElements } from "./hooks/elements";
import { useTransition } from "./hooks/transition";

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
    const { fixateInputContent, resetScrollAreaBuffers } = useTransition(
        elements,
        config
    );

    // edit mode management
    const { editMode, editTrigger, activateEditMode, deactivateEditMode } =
        useEditMode(fixateInputContent, resetScrollAreaBuffers);

    // create context value
    const context = useMemo(
        () => ({
            editMode,
            editTrigger,
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
            editTrigger,
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
