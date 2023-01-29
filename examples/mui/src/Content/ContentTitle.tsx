import { TextField, Typography } from "@mui/material";
import React, { ChangeEvent, useCallback, useState } from "react";
import { wrapSmoothEditInput } from "smooth-edit";
import { SmoothTransition } from "../test/SmoothTransition";

const ContentTitle = wrapSmoothEditInput(function ({
    editMode,
    editTrigger,
    activateEditMode,
    rootRef,
    contentRef,
}) {
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
    return (
        <SmoothTransition
            ref={rootRef}
            components={[
                (state) => (
                    <Typography
                        key="view"
                        ref={state != "leave" ? contentRef : undefined}
                        onClick={onTextFieldClick}
                        variant="h5"
                        component="div"
                    >
                        {content}
                    </Typography>
                ),
                (state) => (
                    <TextField
                        key="edit"
                        inputRef={state != "leave" ? contentRef : undefined}
                        label="Title"
                        autoFocus={editTrigger}
                        fullWidth
                        value={content}
                        onChange={onChange}
                    />
                ),
            ]}
            active={!editMode ? 0 : 1}
            duration={500}
        />
    );
},
{});

export default ContentTitle;
