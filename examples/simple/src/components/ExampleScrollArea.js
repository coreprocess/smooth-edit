import React from "react";
import { wrapSmoothEditScrollArea } from "smooth-edit/dist/scrollarea";

export const ExampleScrollArea = wrapSmoothEditScrollArea(
    function ({ children, SmoothEditTopBuffer, SmoothEditBottomBuffer, rootRef }) {
        return (
            <div ref={rootRef} style={{ overflowY: "scroll", flexGrow: 1, flexShrink: 1 }}>
                <SmoothEditTopBuffer />
                <div>
                    {children}
                </div>
                <SmoothEditBottomBuffer />
            </div>
        );
    },
    {
    }
);
