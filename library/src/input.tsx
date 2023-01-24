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
    // merge the config with the default config
    const fullConfig = _.merge(
        {},
        defaultSmoothEditInputConfig,
        config
    ) as SmoothEditInputConfig;

    // higher order component that wraps the inner component
    return function SmoothEditInput(props: Props) {
        // generate a unique id for this input
        const id = useId();

        // get the context
        const {
            editMode,
            activateEditMode,
            deactivateEditMode,
            setInputContentRef,
            setInputConfig,
        } = useContext(SmoothEditContext);

        // apply the config to the context
        useEffect(() => {
            setInputConfig(id, fullConfig);
        }, [setInputConfig, id]);

        // wrap the activate function so that it provides the id of this input
        const activateEditModeWithId = useCallback(() => {
            activateEditMode(id);
        }, [activateEditMode, id]);

        // wrap the ref function so that it provides the id of this input
        const setInputContentRefWithId = useCallback(
            (ref: HTMLElement | null) => {
                setInputContentRef(id, ref);
            },
            [setInputContentRef, id]
        );

        // render the input
        return (
            <Component
                contentRef={setInputContentRefWithId}
                editMode={editMode}
                activateEditMode={activateEditModeWithId}
                deactivateEditMode={deactivateEditMode}
                {...props}
            />
        );
    };
}
