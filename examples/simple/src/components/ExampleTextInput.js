import React, { useCallback, useEffect } from "react";
import { wrapSmoothEditInput } from "smooth-edit/dist/input";
import { useRefWithForwarding } from "use-ref-with-forwarding";
import "./ExampleTextInput.css";

export const ExampleTextInput = wrapSmoothEditInput(
    function ({ value, onChange, editMode, activateEditMode, rootRef, contentRef }) {
        // reference to the root element
        const ref = useRefWithForwarding(null, [rootRef, contentRef]);

        // update the div element when the value changes
        useEffect(
            () => {
                if (ref.current.innerText !== value) {
                    ref.current.innerText = value;
                }
            },
            [ref, value]
        );

        // propagate value changes
        const onInput = useCallback(
            () => {
                onChange(ref.current.innerText);
            },
            [ref, onChange]
        );

        // prevent formatting shortcuts
        const onKeyDown = useCallback(
            (event) =>
                (event.ctrlKey || event.metaKey)
                && !["c", "v", "x", "z", "r", "ArrowLeft", "ArrowRight"].includes(event.key)
                && event.preventDefault(),
            []
        );

        // activate edit mode when the div element is focused
        const onFocus = useCallback(
            () => { activateEditMode(); },
            [activateEditMode]
        );

        // render the div element
        return (
            <div
                ref={ref}
                className={`form-text-input ${editMode ? "edit-mode" : "view-mode"}`}
                contentEditable={true}
                spellCheck={false}
                onInput={onInput}
                onKeyDown={onKeyDown}
                onFocus={onFocus}
            />
        );
    },
    {
    }
);
