import { Styles, withBEM } from "@digitalentities/react-hook-bem";
import React, { useCallback } from "react";
import { wrapSmoothEditInput } from "smooth-edit";
import { UnstyledTextareaAutosize } from "unstyled-textarea-autosize";
import { useRefWithForwarding } from "use-ref-with-forwarding";
import styles from "./ExampleTextInput.module.scss";

const $UnstyledTextareaAutosize = withBEM(UnstyledTextareaAutosize);

export const ExampleTextInput = wrapSmoothEditInput<{
    value: string;
    onChange: (value: string) => void;
}>(function ExampleTextInput({
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
        <Styles value={styles}>
            <$UnstyledTextareaAutosize
                ref={ref}
                $block="example-text-input"
                $modifier={{
                    "edit-mode": editMode,
                    "view-mode": !editMode,
                }}
                spellCheck={false}
                onFocus={onFocus}
                value={value}
                onValueChange={onChange}
            />
        </Styles>
    );
},
{});
