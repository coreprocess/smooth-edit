import { Box } from "@mui/system";
import React from "react";
import { wrapSmoothEditScrollArea } from "smooth-edit";

const ScrollArea = wrapSmoothEditScrollArea<{
    children: React.ReactNode;
}>(function ({
    children,
    SmoothEditTopBuffer,
    SmoothEditBottomBuffer,
    rootRef,
}) {
    return (
        <Box
            ref={rootRef}
            sx={{ overflowY: "scroll", flexGrow: 1, flexShrink: 1 }}
        >
            <SmoothEditTopBuffer />
            {children}
            <SmoothEditBottomBuffer />
        </Box>
    );
},
{});

export default ScrollArea;
