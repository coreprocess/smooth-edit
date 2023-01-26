import { TextField, Typography } from "@mui/material";
import React, { ChangeEvent, useCallback, useState } from "react";
import { wrapSmoothEditInput } from "smooth-edit";
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

    // render edit and view mode
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
