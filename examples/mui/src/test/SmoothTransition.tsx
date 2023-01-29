import React, {
    forwardRef,
    ReactNode,
    useCallback,
    useEffect,
    useRef,
    useState,
} from "react";
import { useRefWithForwarding } from "use-ref-with-forwarding";

const TYPE_PLACEHOLDER = "placeholder" as const;
const TYPE_IN = "in" as const;
const TYPE_OUT = "out" as const;

export const SmoothTransition = forwardRef<
    HTMLDivElement | null,
    {
        render: ((state: "enter" | "active" | "leave") => ReactNode)[];
        active: number;
        duration: number;
    }
>(function SmoothTransition({ render, active, duration }, outerRef) {
    // references
    const rootRef = useRefWithForwarding<HTMLDivElement | null>(
        null,
        outerRef ? [outerRef] : []
    );

    // transition state
    const [transition, setTransition] = useState<{
        out: number[];
        in: number;
        state: "init" | "enter" | "active";
    }>({
        out: [],
        in: active,
        state: "active",
    });

    // initiate transition for new active component
    useEffect(() => {
        if (transition.in !== active) {
            setTransition({
                out: [
                    ...transition.out.filter(
                        (component) => component !== active
                    ),
                    transition.in,
                ],
                in: active,
                state: "init",
            });
        }
    }, [transition, active]);

    // switch from init to enter state
    useEffect(() => {
        if (transition.state === "init") {
            requestAnimationFrame(() => {
                setTransition({
                    ...transition,
                    state: "enter",
                });
            });
        }
    }, [transition]);

    // target height of placeholder
    const [targetHeight, setTargetHeight] = useState(0);

    // observe inbound component size and update placeholder height
    const resizeObserver = useRef<ResizeObserver | null>(null);

    const updateResizeObserver = useCallback(
        (node: HTMLDivElement | null) => {
            // clean up observer
            if (node === null) {
                if (resizeObserver.current !== null) {
                    resizeObserver.current.disconnect();
                    resizeObserver.current = null;
                }
            }

            // initialize height and set up observer
            else {
                // reduce re-renders by only updating height if it changed
                let lastTargetHeight: number | null = null;

                const setTargetHeightIfChanged = () => {
                    const newTargetHeight = node.offsetHeight;
                    if (lastTargetHeight !== newTargetHeight) {
                        setTargetHeight(newTargetHeight);
                        lastTargetHeight = newTargetHeight;
                    }
                };

                // set initial height
                setTargetHeightIfChanged();

                // set up resize observer
                resizeObserver.current = new ResizeObserver((entries) => {
                    for (const entry of entries) {
                        if (entry.target === node) {
                            setTargetHeightIfChanged();
                        }
                    }
                });

                resizeObserver.current.observe(node);
            }
        },
        [setTargetHeight]
    );

    // observe end of transitions
    useEffect(() => {
        // install timer
        const interval = setInterval(() => {
            // skip if not in enter state
            if (transition.state !== "enter") {
                return;
            }

            // lookup refs
            const outRefs = transition.out.map(
                (component) =>
                    rootRef.current?.querySelector<HTMLDivElement>(
                        `:scope>div[data-type="${TYPE_OUT}"][data-component="${component}"]`
                    ) ?? null
            );

            const inRef =
                rootRef.current?.querySelector<HTMLDivElement>(
                    `:scope>div[data-type="${TYPE_IN}"][data-component="${transition.in}"]`
                ) ?? null;

            const placeholderRef =
                rootRef.current?.querySelector<HTMLDivElement>(
                    `:scope>[data-type="${TYPE_PLACEHOLDER}"]`
                ) ?? null;

            if (
                outRefs.includes(null) ||
                inRef === null ||
                placeholderRef === null
            ) {
                console.error("smooth transition: missing internal refs");
                return;
            }

            // check for pending transitions
            const outComponentsPending = transition.out.filter(
                (_, index) =>
                    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
                    parseFloat(getComputedStyle(outRefs[index]!).opacity) >
                    0.0001
            );

            const isInPending =
                parseFloat(getComputedStyle(inRef).opacity) < 0.9999;

            const isPlaceholderPending =
                Math.abs(placeholderRef.offsetHeight - targetHeight) > 0.0001;

            // update transition state
            const newTransition = {
                out: outComponentsPending,
                in: transition.in,
                state:
                    outComponentsPending.length > 0 ||
                    isInPending ||
                    isPlaceholderPending
                        ? ("enter" as const)
                        : ("active" as const),
            };

            if (JSON.stringify(newTransition) !== JSON.stringify(transition)) {
                setTransition(newTransition);
            }
        }, 250);

        // clean up timer
        return () => {
            clearInterval(interval);
        };
    }, [rootRef, transition, targetHeight]);

    // debug
    // console.log(
    //     `smooth transition: render pass, transition=${JSON.stringify(
    //         transition
    //     )}, targetHeight=${targetHeight}`
    // );

    // render base DOM structure
    return (
        <div ref={rootRef} style={{ position: "relative" }}>
            {[
                <div
                    key={TYPE_PLACEHOLDER}
                    data-type={TYPE_PLACEHOLDER}
                    style={{
                        visibility: "hidden",
                        pointerEvents: "none",
                        height: targetHeight + "px",
                        ...{
                            init: {
                                transition: `height ${duration}ms`,
                            },
                            enter: {
                                transition: `height ${duration}ms`,
                            },
                            active: {},
                        }[transition.state],
                    }}
                />,
                ...transition.out.map((component) => (
                    <div
                        key={component.toString()}
                        data-type={TYPE_OUT}
                        data-component={component}
                        style={{
                            position: "absolute",
                            left: 0,
                            top: 0,
                            right: 0,
                            opacity: 0,
                            transition: `opacity ${duration}ms`,
                        }}
                    >
                        {render[component]("leave")}
                    </div>
                )),
                <div
                    ref={updateResizeObserver}
                    key={transition.in.toString()}
                    data-type={TYPE_IN}
                    data-component={transition.in}
                    style={{
                        position: "absolute",
                        left: 0,
                        top: 0,
                        right: 0,
                        ...{
                            init: {
                                opacity: 0,
                            },
                            enter: {
                                opacity: 1,
                                transition: `opacity ${duration}ms`,
                            },
                            active: {
                                opacity: 1,
                            },
                        }[transition.state],
                    }}
                >
                    {render[transition.in](
                        transition.state === "active" ? "active" : "enter"
                    )}
                </div>,
            ]}
        </div>
    );
});
