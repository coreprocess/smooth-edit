import { useCallback, useRef } from "react";
import { createInvertedPromise } from "../../utils/inverted-promise";
import { mapMap } from "../../utils/map-map";
import { createElementContentPositionFixation } from "../utils/position-fixation";
import { TransitionTracker } from "../utils/transition-tracker/factory";
import { createParallelTracker } from "../utils/transition-tracker/parallel";
import { ConfigRef } from "./config";
import { ElementsRef } from "./elements";

export function useMonitor(elements: ElementsRef, config: ConfigRef) {
    // all active trackers if in transition
    const transition = useRef<
        | {
              navBar: {
                  interface: TransitionTracker;
                  promise: Promise<void>;
              };
              scrollArea: {
                  interface: TransitionTracker;
                  promise: Promise<void>;
              };
              input: Map<
                  string,
                  {
                      interface: TransitionTracker;
                      promise: Promise<void>;
                  }
              >;
          }
        | false
    >(false);

    // monitoring function
    const monitorTransition = useCallback(
        (id: string) => {
            // skip if already in transition
            if (transition.current) {
                return;
            }

            // get config
            const {
                navBar: navBarConfig,
                scrollArea: scrollAreaConfig,
                input: inputConfig,
            } = config.current;

            if (!navBarConfig || !scrollAreaConfig || !inputConfig.has(id)) {
                console.error(
                    "smooth edit: could not find config for all relevant components!"
                );
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
                console.warn(
                    "smooth edit: could not find element refs for all relevant components!"
                );
            }

            // create all trackers
            transition.current = {
                navBar: (() => {
                    const [promise, resolve] = createInvertedPromise<void>();
                    return {
                        promise,
                        interface: createParallelTracker(
                            navBarRoot,
                            navBarConfig.trackTransition,
                            resolve
                        ),
                    };
                })(),
                scrollArea: (() => {
                    const [promise, resolve] = createInvertedPromise<void>();
                    return {
                        promise,
                        interface: createParallelTracker(
                            scrollAreaRoot,
                            scrollAreaConfig.trackTransition,
                            resolve
                        ),
                    };
                })(),
                input: mapMap(inputConfig, (id, config) => {
                    const [promise, resolve] = createInvertedPromise<void>();
                    return [
                        id,
                        {
                            promise,
                            interface: createParallelTracker(
                                inputRoot.get(id) ?? null,
                                config.trackTransition,
                                resolve
                            ),
                        },
                    ];
                }),
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
                if (!transition.current) {
                    return;
                }
                transition.current.navBar.interface.setElement(node);
            }

            function onNewScrollAreaRoot(node: HTMLElement | null) {
                if (!transition.current) {
                    return;
                }
                transition.current.scrollArea.interface.setElement(node);
                fixation.setScrollArea(node);
            }

            function onNewTopBufferRoot(node: HTMLElement | null) {
                if (!transition.current) {
                    return;
                }
                fixation.setTopBuffer(node);
            }

            function onNewBottomBufferRoot(node: HTMLElement | null) {
                if (!transition.current) {
                    return;
                }
                fixation.setBottomBuffer(node);
            }

            function onNewInputRoot(forId: string, node: HTMLElement | null) {
                if (!transition.current) {
                    return;
                }
                const input = transition.current.input.get(forId);
                if (!input) {
                    console.warn(
                        "smooth edit: could not forward new input root to tracker"
                    );
                    return;
                }
                input.interface.setElement(node);
            }

            function onNewInputContent(
                forId: string,
                node: HTMLElement | null
            ) {
                if (!transition.current) {
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
                transition.current.navBar.promise,
                transition.current.scrollArea.promise,
                ...Array.from(transition.current.input.values()).map(
                    (input) => input.promise
                ),
            ]).then(() => {
                // cancel element content position fixation
                fixation.cancel();

                // remove all tracker
                transition.current = false;

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
                console.log("smooth edit: transition ended");
            });
        },
        [elements, config]
    );

    return {
        monitorTransition,
    };
}
