import { $div, Styles } from "@digitalentities/react-hook-bem";
import { loremIpsum } from "lorem-ipsum";
import React, { useCallback, useState } from "react";
import styles from "./index.module.scss";
import { FormLabel } from "./Label";
import { FormSelect } from "./Select";
import { FormTextarea } from "./Textarea";

const formTestZeroOptions = {
    test1: "Test 1",
    test2: "Test 2",
    test3: "Test 3",
};

export function Form() {
    const [form, setForm] = useState({
        test0: null as string | null,
        test1: loremIpsum({ count: 5, units: "sentences" }),
        test2: loremIpsum({ count: 5, units: "sentences" }),
        test3: loremIpsum({ count: 5, units: "sentences" }),
        test4: loremIpsum({ count: 5, units: "sentences" }),
        test5: loremIpsum({ count: 5, units: "sentences" }),
        test6: loremIpsum({ count: 5, units: "sentences" }),
    });

    const onFormTest0Change = useCallback(
        (value: string | null) => {
            setForm({
                ...form,
                test0: value,
            });
        },
        [form, setForm]
    );

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
        <Styles value={styles}>
            <$div $block="container">
                <$div $element="title">Example</$div>
                <$div $element="form">
                    <$div>
                        <FormLabel>Test Zero</FormLabel>
                    </$div>
                    <$div>
                        <FormSelect
                            value={form.test0}
                            onChange={onFormTest0Change}
                            options={formTestZeroOptions}
                        />
                    </$div>
                    <$div>
                        <FormLabel>Test One</FormLabel>
                    </$div>
                    <$div>
                        <FormTextarea
                            value={form.test1}
                            onChange={onFormTest1Change}
                        />
                    </$div>
                    <$div>
                        <FormLabel>Test Two</FormLabel>
                    </$div>
                    <$div>
                        <FormTextarea
                            value={form.test2}
                            onChange={onFormTest2Change}
                        />
                    </$div>
                    <$div>
                        <FormLabel>Test Three</FormLabel>
                    </$div>
                    <$div>
                        <FormTextarea
                            value={form.test3}
                            onChange={onFormTest3Change}
                        />
                    </$div>
                    <$div>
                        <FormLabel>Test Four</FormLabel>
                    </$div>
                    <$div>
                        <FormTextarea
                            value={form.test4}
                            onChange={onFormTest4Change}
                        />
                    </$div>
                    <$div>
                        <FormLabel>Test Five</FormLabel>
                    </$div>
                    <$div>
                        <FormTextarea
                            value={form.test5}
                            onChange={onFormTest5Change}
                        />
                    </$div>
                    <$div>
                        <FormLabel>Test Six</FormLabel>
                    </$div>
                    <$div>
                        <FormTextarea
                            value={form.test6}
                            onChange={onFormTest6Change}
                        />
                    </$div>
                </$div>
            </$div>
        </Styles>
    );
}
