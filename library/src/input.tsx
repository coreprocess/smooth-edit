import _ from "lodash";
import React, {
    ComponentType,
    useCallback,
    useContext,
    useEffect,
    useId,
} from "react";
import { DeepPartial } from "tsdef";
import { defaultSmoothEditInputConfig, SmoothEditInputConfig } from "./config";
import { SmoothEditContext } from "./context";

export function wrapSmoothEditInput<Props>(
    Component: ComponentType<Props>,
    config: DeepPartial<SmoothEditInputConfig>
) {
    // higher order component that wraps the inner component
    return function SmoothEditInput(props: Props) {
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
        const setInputContentRef = useCallback(
            (ref: HTMLElement | null) => {
                setInputContentElement(id, ref);
            },
            [setInputContentElement, id]
        );

        // render the input
        return (
            <Component
                rootRef={setInputRootElement}
                contentRef={setInputContentRef}
                editMode={editMode}
                activateEditMode={activateEditModeWithId}
                deactivateEditMode={deactivateEditMode}
                {...props}
            />
        );
    };
}
