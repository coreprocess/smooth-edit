import _ from "lodash";
import React, {
    ComponentType,
    useCallback,
    useContext,
    useEffect,
    useId,
} from "react";
import { defaultSmoothEditInputConfig, SmoothEditInputConfig } from "./config";
import { SmoothEditContext } from "./context";
import { DeepPartial } from "./utils/types";

export interface InjectedSmoothEditInputProps {
    rootRef: React.RefCallback<HTMLElement>;
    contentRef: React.RefCallback<HTMLElement>;
    editMode: boolean;
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
                _.merge({}, defaultSmoothEditInputConfig, config)
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
                activateEditMode={activateEditModeWithId}
                deactivateEditMode={deactivateEditMode}
            />
        );
    };
}
