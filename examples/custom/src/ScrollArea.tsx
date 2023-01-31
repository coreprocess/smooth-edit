import { Styles, $div } from "@digitalentities/react-hook-bem";
import React, { ReactNode } from "react";
import { wrapSmoothEditScrollArea } from "smooth-edit";
import styles from "./ScrollArea.module.scss";

export const ScrollArea = wrapSmoothEditScrollArea<{
    children: ReactNode;
}>(function ScrollArea({
    children,
    SmoothEditTopBuffer,
    SmoothEditBottomBuffer,
    rootRef,
}) {
    return (
        <Styles value={styles}>
            <$div ref={rootRef} $block="scroll-area">
                <SmoothEditTopBuffer />
                {children}
                <SmoothEditBottomBuffer />
            </$div>
        </Styles>
    );
},
{});
