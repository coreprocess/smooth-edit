import React, { ComponentType, useCallback, useContext, useId } from "react";
import { SmoothEditContext } from "./context";

export function makeSmoothEditInput<Props>(Component: ComponentType<Props>) {
    // higher order component that wraps the inner component
    return function SmoothEditInput(props: Props) {
        // generate a unique id for this input
        const id = useId();

        // get the context
        const { editMode, activateEditMode, deactivateEditMode, setInputRef } =
            useContext(SmoothEditContext);

        // wrap the activate function so that it provides the id of this input
        const activateEditModeTriggeredByThis = useCallback(() => {
            activateEditMode(id);
        }, [activateEditMode, id]);

        // wrap the ref function so that it provides the id of this input
        const setThisInputRef = useCallback(
            (ref: HTMLElement | null) => {
                setInputRef(id, ref);
            },
            [setInputRef, id]
        );

        // render the input
        return (
            <Component
                ref={setThisInputRef}
                editMode={editMode}
                activateEditMode={activateEditModeTriggeredByThis}
                deactivateEditMode={deactivateEditMode}
                {...props}
            />
        );
    };
}
