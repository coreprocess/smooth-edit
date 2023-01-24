import { useCallback, useRef } from "react";
import { fixElementContentPosition } from "../utils/fix-element";
import { createCssTransitionTracker } from "./transition-tracker/css-transition";
import { ConfigRef } from "./use-config";
import { ElementsRef } from "./use-elements";

export function useMonitorTransition(elements: ElementsRef, config: ConfigRef) {
    const transition = useRef(false);

    const monitorTransition = useCallback(
        (id: string) => {
            // skip if already in transition
            if (transition.current) {
                return;
            }

            // get refs to elements
            const inputContent = elements.current.inputContent.get(id);
            const { scrollAreaRoot, topBufferRoot, bottomBufferRoot } =
                elements.current;

            if (
                !inputContent ||
                !scrollAreaRoot ||
                !topBufferRoot ||
                !bottomBufferRoot
            ) {
                console.error(
                    "edit mode transition: could not find element refs"
                );
                return;
            }

            // mark transition as active
            transition.current = true;

            // fix element content position
            const stopFixation = fixElementContentPosition(
                inputContent,
                scrollAreaRoot,
                topBufferRoot,
                bottomBufferRoot
            );

            // detect end of transition
            createCssTransitionTracker(scrollAreaRoot, 250, 1000, () => {
                // stop fixation
                stopFixation();

                // mark transition as inactive
                transition.current = false;

                // print debug info
                console.log("edit mode transition: finished");
            });
        },
        [elements]
    );

    return {
        monitorTransition,
    };
}
