import { useCallback, useRef } from "react";
import { logDebug, logError, logWarn } from "../../logging";
import { mapMap } from "../../utils/map-map";
import { createElementContentPositionFixation } from "../utils/position-fixation";
import { TransitionTracker } from "../utils/transition-tracker/factory";
import { createParallelTracker } from "../utils/transition-tracker/parallel";
import { ConfigRef } from "./config";
import { ElementsRef } from "./elements";

export function useTransition(elements: ElementsRef, config: ConfigRef) {
    // all transition trackers for input content fixation
    const tracker = useRef<
        | {
              navBar: TransitionTracker;
              scrollArea: TransitionTracker;
              input: Map<string, TransitionTracker>;
          }
        | false
    >(false);

    // cancellation of input content fixation
    const cancelInputContentFixation = useCallback(() => {
        if (!tracker.current) {
            return;
        }
        tracker.current.navBar.stop();
        tracker.current.scrollArea.stop();
        tracker.current.input.forEach((input) => input.stop());
        tracker.current = false;
    }, []);

    // input content fixation routing
    const fixateInputContent = useCallback(
        (id: string) => {
            // cancel any pending input content fixation
            cancelInputContentFixation();

            // get config
            const {
                navBar: navBarConfig,
                scrollArea: scrollAreaConfig,
                input: inputConfig,
            } = config.current;

            if (!navBarConfig || !scrollAreaConfig || !inputConfig.has(id)) {
                logError("could not find config for all relevant components");
                return;
            }

            // get refs to elements
            const {
                navBarRoot,
                scrollAreaRoot,
                topBufferRoot,
                bottomBufferRoot,
                inputRoot,
                inputContent,
            } = elements.current;

            if (
                !navBarRoot ||
                !scrollAreaRoot ||
                !topBufferRoot ||
                !bottomBufferRoot ||
                !inputRoot.has(id) ||
                !inputContent.has(id)
            ) {
                logWarn(
                    "could not find element refs for all relevant components"
                );
            }

            // create all trackers
            tracker.current = {
                navBar: createParallelTracker(
                    navBarRoot,
                    navBarConfig.trackTransition
                ),
                scrollArea: createParallelTracker(
                    scrollAreaRoot,
                    scrollAreaConfig.trackTransition
                ),
                input: mapMap(inputConfig, (id, config) => [
                    id,
                    createParallelTracker(
                        inputRoot.get(id) ?? null,
                        config.trackTransition
                    ),
                ]),
            };

            // fix element content position
            const fixation = createElementContentPositionFixation(
                inputContent.get(id) ?? null,
                // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
                inputConfig.get(id)!.fixContent,
                scrollAreaRoot,
                topBufferRoot,
                bottomBufferRoot
            );

            // forward element ref updates
            function onNewNavBarRoot(node: HTMLElement | null) {
                if (!tracker.current) {
                    return;
                }
                tracker.current.navBar.setElement(node);
            }

            function onNewScrollAreaRoot(node: HTMLElement | null) {
                if (!tracker.current) {
                    return;
                }
                tracker.current.scrollArea.setElement(node);
                fixation.setScrollArea(node);
            }

            function onNewTopBufferRoot(node: HTMLElement | null) {
                if (!tracker.current) {
                    return;
                }
                fixation.setTopBuffer(node);
            }

            function onNewBottomBufferRoot(node: HTMLElement | null) {
                if (!tracker.current) {
                    return;
                }
                fixation.setBottomBuffer(node);
            }

            function onNewInputRoot(forId: string, node: HTMLElement | null) {
                if (!tracker.current) {
                    return;
                }
                const input = tracker.current.input.get(forId);
                if (!input) {
                    logWarn("could not forward new input root to tracker");
                    return;
                }
                input.setElement(node);
            }

            function onNewInputContent(
                forId: string,
                node: HTMLElement | null
            ) {
                if (!tracker.current) {
                    return;
                }
                if (forId === id) {
                    fixation.setInput(node);
                }
            }

            elements.current.events.on("navBarRoot", onNewNavBarRoot);
            elements.current.events.on("scrollAreaRoot", onNewScrollAreaRoot);
            elements.current.events.on("topBufferRoot", onNewTopBufferRoot);
            elements.current.events.on(
                "bottomBufferRoot",
                onNewBottomBufferRoot
            );
            elements.current.events.on("inputRoot", onNewInputRoot);
            elements.current.events.on("inputContent", onNewInputContent);

            // detect end of transition
            Promise.all([
                tracker.current.navBar.promise,
                tracker.current.scrollArea.promise,
                ...Array.from(tracker.current.input.values()).map(
                    (input) => input.promise
                ),
            ]).then(() => {
                // stop element content position fixation
                fixation.stop();

                // remove all tracker
                tracker.current = false;

                // remove element ref updates
                elements.current.events.off("navBarRoot", onNewNavBarRoot);
                elements.current.events.off(
                    "scrollAreaRoot",
                    onNewScrollAreaRoot
                );
                elements.current.events.off(
                    "topBufferRoot",
                    onNewTopBufferRoot
                );
                elements.current.events.off(
                    "bottomBufferRoot",
                    onNewBottomBufferRoot
                );
                elements.current.events.off("inputRoot", onNewInputRoot);
                elements.current.events.off("inputContent", onNewInputContent);

                // some debug output
                logDebug("transition ended");
            });
        },
        [cancelInputContentFixation, elements, config]
    );

    // reset scroll area buffers
    const resetScrollAreaBuffers = useCallback(() => {
        // cancel any active input content fixation
        cancelInputContentFixation();

        // get config
        const { scrollArea: scrollAreaConfig } = config.current;

        if (!scrollAreaConfig) {
            logError("could not find config for all relevant components");
            return;
        }

        // get refs to elements
        const { topBufferRoot, bottomBufferRoot } = elements.current;
        if (!topBufferRoot || !bottomBufferRoot) {
            logWarn("could not find element refs for all relevant components");
            return;
        }

        // reset scroll area buffers
        topBufferRoot.style.transition = `height ${scrollAreaConfig.bufferResetDuration}ms`;
        topBufferRoot.style.height = "0px";
        bottomBufferRoot.style.transition = `height ${scrollAreaConfig.bufferResetDuration}ms`;
        bottomBufferRoot.style.height = "0px";
    }, [cancelInputContentFixation, elements, config]);

    return {
        fixateInputContent,
        resetScrollAreaBuffers,
    };
}
