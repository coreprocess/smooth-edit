import { $div, Styles } from "@digitalentities/react-hook-bem";
import React, { useCallback, useMemo } from "react";
import Select from "react-select";
import type SelectType from "react-select/dist/declarations/src/Select";
import { wrapSmoothEditInput } from "smooth-edit";
import styles from "./Select.module.scss";

export const FormSelect = wrapSmoothEditInput<{
    value: string | null;
    onChange: (value: string | null) => void;
    options: Record<string, string>;
}>(function FormSelect({
    value,
    onChange,
    options,
    editMode,
    activateEditMode,
    rootRef,
    contentRef,
}) {
    // reference to the select element
    const setRef = useCallback(
        (select: SelectType<{ value: string; label: string }> | null) => {
            const node = select?.controlRef ?? null;
            rootRef(node);
            contentRef(node);
        },
        [rootRef, contentRef]
    );

    // convert options to react-select format
    const innerOptions = useMemo(() => {
        return Object.entries(options).map(([value, label]) => ({
            value,
            label,
        }));
    }, [options]);

    // find selected item
    const innerValue = useMemo(() => {
        return innerOptions.find((option) => option.value === value) || null;
    }, [value, innerOptions]);

    // forward changes
    const onInnerChange = useCallback(
        (option: { value: string; label: string } | null) => {
            onChange(option?.value ?? null);
        },
        [onChange]
    );

    // activate edit mode when the select element is focused
    const onFocus = useCallback(() => {
        activateEditMode();
    }, [activateEditMode]);

    return (
        <Styles value={styles}>
            <$div
                $block="select-wrapper"
                $modifier={{
                    "edit-mode": editMode,
                }}
            >
                <Select
                    ref={setRef}
                    options={innerOptions}
                    value={innerValue}
                    onChange={onInnerChange}
                    onFocus={onFocus}
                    placeholder={editMode ? "Select..." : "None"}
                    className="select__container"
                    classNamePrefix="select"
                />
            </$div>
        </Styles>
    );
},
{});
