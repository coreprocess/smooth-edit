import React, {
    ComponentType,
    useCallback,
    useContext,
    useEffect,
    useId,
} from "react";
import { defaultSmoothEditInputConfig, SmoothEditInputConfig } from "./config";
import { SmoothEditContext } from "./context";
import { merge } from "./utils/deep-merge";
import { DeepPartial } from "./utils/types";

export interface InjectedSmoothEditInputProps {
    rootRef: React.RefCallback<HTMLElement>;
    contentRef: React.RefCallback<HTMLElement>;
    editMode: boolean;
    editTrigger: boolean;
    activateEditMode: () => void;
    deactivateEditMode: () => void;
}

export function wrapSmoothEditInput<OuterProps = object>(
    Component: ComponentType<OuterProps & InjectedSmoothEditInputProps>,
    config: DeepPartial<SmoothEditInputConfig>
) {
    // higher order component that wraps the inner component
    return function SmoothEditInput(props: OuterProps) {
        // generate a unique id for this input
        const id = useId();

        // get the context
        const {
            editMode,
            editTrigger,
            activateEditMode,
            deactivateEditMode,
            setInputRootElement,
            setInputContentElement,
            setInputConfig,
        } = useContext(SmoothEditContext);

        // apply the config to the context
        useEffect(() => {
            setInputConfig(
                id,
                merge(
                    defaultSmoothEditInputConfig,
                    config
                ) as SmoothEditInputConfig
            );
            return () => {
                setInputConfig(id, null);
            };
        }, [setInputConfig, id]);

        // wrap the activate function so that it provides the id of this input
        const activateEditModeWithId = useCallback(() => {
            activateEditMode(id);
        }, [activateEditMode, id]);

        // wrap the ref function so that it provides the id of this input
        const setInputRootRef = useCallback(
            (ref: HTMLElement | null) => {
                setInputRootElement(id, ref);
            },
            [setInputRootElement, id]
        );

        const setInputContentRef = useCallback(
            (ref: HTMLElement | null) => {
                setInputContentElement(id, ref);
            },
            [setInputContentElement, id]
        );

        // render the input
        return (
            <Component
                {...props}
                rootRef={setInputRootRef}
                contentRef={setInputContentRef}
                editMode={editMode}
                editTrigger={editTrigger === id}
                activateEditMode={activateEditModeWithId}
                deactivateEditMode={deactivateEditMode}
            />
        );
    };
}
