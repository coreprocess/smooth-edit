import {
    $div,
    $header,
    $p,
    Styles,
    withBEM,
} from "@digitalentities/react-hook-bem";
import { faStore } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import styles from "./MainBar.module.scss";

const $FontAwesomeIcon = withBEM(FontAwesomeIcon);

export function MainBar() {
    return (
        <Styles value={styles}>
            <$header $block="toolbar">
                <$div $element="container">
                    <$div $element="logo">
                        <$div $element="circle">
                            <$FontAwesomeIcon $element="icon" icon={faStore} />
                        </$div>
                        <$p $element="text">Example</$p>
                    </$div>
                </$div>
            </$header>
            <$div $block="navigation">
                <$div $element="container">
                    <$div $element="item" $modifier="active">
                        Home
                    </$div>
                    <$div $element="item">About</$div>
                    <$div $element="item">Contact</$div>
                </$div>
            </$div>
        </Styles>
    );
}
