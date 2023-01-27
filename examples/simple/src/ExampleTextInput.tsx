import React, { useCallback } from "react";
import { wrapSmoothEditInput } from "smooth-edit";
import { UnstyledTextareaAutosize } from "unstyled-textarea-autosize";
import { useRefWithForwarding } from "use-ref-with-forwarding";
import "./ExampleTextInput.css";

export const ExampleTextInput = wrapSmoothEditInput<{
    value: string;
    onChange: (value: string) => void;
}>(function ({
    value,
    onChange,
    editMode,
    activateEditMode,
    rootRef,
    contentRef,
}) {
    // reference to the root element
    const ref = useRefWithForwarding<HTMLDivElement | null>(null, [
        rootRef,
        contentRef,
    ]);

    // activate edit mode when the textarea element is focused
    const onFocus = useCallback(() => {
        activateEditMode();
    }, [activateEditMode]);

    // render the unstyled textare element
    return (
        <UnstyledTextareaAutosize
            ref={ref}
            className={`form-text-input ${
                editMode ? "edit-mode" : "view-mode"
            }`}
            spellCheck={false}
            onFocus={onFocus}
            value={value}
            onValueChange={onChange}
        />
    );
},
{});
