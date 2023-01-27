import { $div, Styles } from "@digitalentities/react-hook-bem";
import React from "react";
import { SmoothEditContainer } from "smooth-edit";
import styles from "./App.module.scss";
import { Form } from "./form";
import { NavBar } from "./NavBar";
import { ScrollArea } from "./ScrollArea";

function App() {
    return (
        <Styles value={styles}>
            <$div $block="app">
                <SmoothEditContainer>
                    <NavBar />
                    <ScrollArea>
                        <Form />
                    </ScrollArea>
                </SmoothEditContainer>
            </$div>
        </Styles>
    );
}

export default App;
