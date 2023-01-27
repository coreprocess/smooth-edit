import {
    $div,
    $header,
    Styles,
    withBEM,
} from "@digitalentities/react-hook-bem";
import { faTimes } from "@fortawesome/pro-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useCallback, useContext } from "react";
import { SmoothEditContext } from "smooth-edit";
import styles from "./ModalBar.module.scss";

const $FontAwesomeIcon = withBEM(FontAwesomeIcon);

export function ModalBar() {
    const { deactivateEditMode } = useContext(SmoothEditContext);

    const onCloseClick = useCallback(() => {
        deactivateEditMode();
    }, [deactivateEditMode]);

    return (
        <Styles value={styles}>
            <$header $block="modal-bar">
                <$div $element="close" onClick={onCloseClick}>
                    <$FontAwesomeIcon $element="icon" icon={faTimes} />
                </$div>
                <$div $element="divider" />
                <$div $element="title">Edit</$div>
            </$header>
        </Styles>
    );
}
