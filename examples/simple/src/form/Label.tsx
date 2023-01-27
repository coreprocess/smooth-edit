import { $label, Styles } from "@digitalentities/react-hook-bem";
import React, { ReactNode } from "react";
import styles from "./Label.module.scss";

export function FormLabel({
    size,
    children,
}: {
    size?: "h1" | "h2" | "h3";
    children: ReactNode;
}) {
    return (
        <Styles value={styles}>
            <$label $block="label" $modifier={size}>
                {children}
            </$label>
        </Styles>
    );
}
