import React from "react";
import { wrapSmoothEditScrollArea } from "smooth-edit";

export const ScrollArea = wrapSmoothEditScrollArea<{
    children: React.ReactNode;
}>(function ScrollArea({
    children,
    SmoothEditTopBuffer,
    SmoothEditBottomBuffer,
    rootRef,
}) {
    return (
        <div
            ref={rootRef}
            style={{ overflowY: "scroll", flexGrow: 1, flexShrink: 1 }}
        >
            <SmoothEditTopBuffer />
            <div>{children}</div>
            <SmoothEditBottomBuffer />
        </div>
    );
},
{});
