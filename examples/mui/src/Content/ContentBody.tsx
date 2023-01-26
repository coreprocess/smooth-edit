import { TextField, Typography } from "@mui/material";
import React, { ChangeEvent, useCallback, useState } from "react";
import { wrapSmoothEditInput } from "smooth-edit";
import { useRefWithForwarding } from "use-ref-with-forwarding";

const ContentBody = wrapSmoothEditInput(function ({
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
    const [content, setContent] = useState(
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec sodales dolor a pulvinar tempus. Curabitur eget auctor risus. Cras sed felis a lacus tincidunt porttitor. Maecenas laoreet eros eu gravida dignissim. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Etiam pretium consectetur orci, non efficitur elit mollis ut. Nam sit amet dictum sem. Suspendisse dignissim interdum elit, nec tincidunt enim feugiat vel. Maecenas facilisis nisi ipsum, vel pulvinar lectus placerat vitae. Sed vitae dolor in mauris suscipit condimentum."
    );

    const onChange = useCallback((event: ChangeEvent<HTMLInputElement>) => {
        setContent(event.target.value);
    }, []);

    // render edit and view mode
    return editMode ? (
        <TextField
            ref={rootRef}
            inputRef={contentRef}
            label="Body"
            autoFocus={editTrigger}
            fullWidth
            multiline
            value={content}
            onChange={onChange}
        />
    ) : (
        <Typography
            ref={ref}
            onClick={onTextFieldClick}
            variant="body2"
            color="text.secondary"
        >
            {content}
        </Typography>
    );
},
{});

export default ContentBody;
