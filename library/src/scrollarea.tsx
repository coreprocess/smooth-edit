import React, { ComponentType, useContext } from "react";
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
    Component: ComponentType<Props>
) {
    // higher order component that wraps the inner component
    return function SmoothEditScrollArea(props: Props) {
        // get the context
        const {
            editMode,
            activateEditMode,
            deactivateEditMode,
            setScrollAreaRootRef,
        } = useContext(SmoothEditContext);

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
