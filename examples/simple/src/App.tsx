import { loremIpsum } from "lorem-ipsum";
import React, { useCallback, useState } from "react";
import { SmoothEditContainer } from "smooth-edit";
import "./App.css";
import { Textarea } from "./form/Textarea";
import { NavBar } from "./NavBar";
import { ScrollArea } from "./ScrollArea";

function App() {
    const [form, setForm] = useState({
        test1: loremIpsum({ count: 5, units: "sentences" }),
        test2: loremIpsum({ count: 5, units: "sentences" }),
        test3: loremIpsum({ count: 5, units: "sentences" }),
        test4: loremIpsum({ count: 5, units: "sentences" }),
        test5: loremIpsum({ count: 5, units: "sentences" }),
        test6: loremIpsum({ count: 5, units: "sentences" }),
    });

    const onFormTest1Change = useCallback(
        (value: string) => {
            setForm({
                ...form,
                test1: value,
            });
        },
        [form, setForm]
    );

    const onFormTest2Change = useCallback(
        (value: string) => {
            setForm({
                ...form,
                test2: value,
            });
        },
        [form, setForm]
    );

    const onFormTest3Change = useCallback(
        (value: string) => {
            setForm({
                ...form,
                test3: value,
            });
        },
        [form, setForm]
    );

    const onFormTest4Change = useCallback(
        (value: string) => {
            setForm({
                ...form,
                test4: value,
            });
        },
        [form, setForm]
    );

    const onFormTest5Change = useCallback(
        (value: string) => {
            setForm({
                ...form,
                test5: value,
            });
        },
        [form, setForm]
    );

    const onFormTest6Change = useCallback(
        (value: string) => {
            setForm({
                ...form,
                test6: value,
            });
        },
        [form, setForm]
    );

    return (
        <div className="App">
            <SmoothEditContainer>
                <NavBar />
                <ScrollArea>
                    <Textarea value={form.test1} onChange={onFormTest1Change} />
                    <Textarea value={form.test2} onChange={onFormTest2Change} />
                    <Textarea value={form.test3} onChange={onFormTest3Change} />
                    <Textarea value={form.test4} onChange={onFormTest4Change} />
                    <Textarea value={form.test5} onChange={onFormTest5Change} />
                    <Textarea value={form.test6} onChange={onFormTest6Change} />
                </ScrollArea>
            </SmoothEditContainer>
        </div>
    );
}

export default App;
