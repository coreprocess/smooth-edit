import { $label, Styles } from "@digitalentities/react-hook-bem";
import React, { ReactNode, useContext } from "react";
import { SmoothEditContext } from "smooth-edit";
import styles from "./Label.module.scss";

export function FormLabel({ children }: { children: ReactNode }) {
    const { editMode } = useContext(SmoothEditContext);

    return (
        <Styles value={styles}>
            <$label
                $block="label"
                $modifier={{
                    "edit-mode": editMode,
                }}
            >
                {children}
            </$label>
        </Styles>
    );
}
