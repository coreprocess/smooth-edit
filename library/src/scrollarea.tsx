import React, { ComponentType, useContext } from "react";
import { SmoothEditContext } from "./context";

function TopBuffer() {
    const { setTopBufferRef } = useContext(SmoothEditContext);
    return <div ref={setTopBufferRef} style={{ display: "flex" }} />;
}

function BottomBuffer() {
    const { setBottomBufferRef } = useContext(SmoothEditContext);
    return <div ref={setBottomBufferRef} style={{ display: "flex" }} />;
}

export function wrapSmoothEditScrollArea<Props>(
    Component: ComponentType<Props>
) {
    // higher order component that wraps the inner component
    return function SmoothEditScrollArea(props: Props) {
        // get the context
        const {
            editMode,
            activateEditMode,
            deactivateEditMode,
            setScrollAreaRef,
        } = useContext(SmoothEditContext);

        // render the scroll area
        return (
            <Component
                ref={setScrollAreaRef}
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
