import { TextField, Typography } from "@mui/material";
import React, { ChangeEvent, useCallback, useState } from "react";
import { wrapSmoothEditInput } from "smooth-edit";
import { useSwitchTransition } from "transition-hook";
import { useRefWithForwarding } from "use-ref-with-forwarding";

const ContentTitle = wrapSmoothEditInput(function ({
    editMode,
    editTrigger,
    activateEditMode,
    rootRef,
    contentRef,
}) {
    // reference to the root element
    const ref = useRefWithForwarding<HTMLDivElement | null>(null, [
        rootRef,
        contentRef,
    ]);

    // enable edit mode when clicking on the title
    const onTextFieldClick = useCallback(() => {
        activateEditMode();
    }, [activateEditMode]);

    // content
    const [content, setContent] = useState("Fusce ligula lorem");

    const onChange = useCallback((event: ChangeEvent<HTMLInputElement>) => {
        setContent(event.target.value);
    }, []);

    // transition
    const transition = useSwitchTransition(editMode, 200, "out-in");

    // render edit and view mode
    return (
        <>
            {transition((state, stage: "from" | "enter" | "leave") => (
                <div
                    style={{
                        transition: "200ms",
                        opacity: stage === "enter" ? 1 : 0,
                        padding: !state && stage !== "enter" ? "14px" : "0",
                    }}
                >
                    {state ? (
                        <TextField
                            ref={rootRef}
                            inputRef={contentRef}
                            label="Title"
                            autoFocus={editTrigger}
                            fullWidth
                            value={content}
                            onChange={onChange}
                        />
                    ) : (
                        <Typography
                            ref={ref}
                            onClick={onTextFieldClick}
                            variant="h5"
                            component="div"
                        >
                            {content}
                        </Typography>
                    )}
                </div>
            ))}
        </>
    );

    return editMode ? (
        <TextField
            ref={rootRef}
            inputRef={contentRef}
            label="Title"
            autoFocus={editTrigger}
            fullWidth
            value={content}
            onChange={onChange}
        />
    ) : (
        <Typography
            ref={ref}
            onClick={onTextFieldClick}
            variant="h5"
            component="div"
        >
            {content}
        </Typography>
    );
},
{});

export default ContentTitle;
