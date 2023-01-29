import React, {
    useCallback,
    useLayoutEffect,
    useEffect,
    useRef,
    useState,
    forwardRef,
} from "react";
import { useRefWithForwarding } from "use-ref-with-forwarding";

const TYPE_PLACEHOLDER = "placeholder" as const;
const TYPE_IN = "in" as const;
const TYPE_OUT = "out" as const;

export const SmoothTransition = forwardRef<
    HTMLDivElement | null,
    {
        components: ((
            state: "enter" | "active" | "leave"
        ) => React.ReactNode)[];
        active: number;
        duration: number;
    }
>(function SmoothTransition({ components, active, duration }, outerRef) {
    // root reference
    const rootRef = useRefWithForwarding<HTMLDivElement | null>(
        null,
        outerRef ? [outerRef] : []
    );

    // render queue
    const [render, setRender] = useState<number[]>([active]);

    // add active component to render queue
    useEffect(() => {
        // update only if not already last element in render queue
        if (render[render.length - 1] !== active) {
            setRender([
                // remove active component from other positions in render queue
                ...render.filter((component) => component !== active),
                // add active component to end of render queue
                active,
            ]);
        }
    }, [active, render, setRender]);

    // transition and frame calculation logic
    const transition = useRef<null | {
        lastInChange: {
            timeStamp: DOMHighResTimeStamp;
            component: number;
            startHeight: number;
        };
        lastFrame: {
            timeStamp: DOMHighResTimeStamp;
        };
    }>(null);

    const nextFrameId = useRef<number | null>(null);

    const onNextFrame = useCallback(
        (timeStamp: DOMHighResTimeStamp) => {
            // mark requested frame as executed
            nextFrameId.current = null;

            // schedule next frame if ref is missing
            if (!rootRef.current) {
                nextFrameId.current = requestAnimationFrame(onNextFrame);
                return;
            }

            // get references
            const refs: {
                placeholder: HTMLDivElement | null;
                out: { node: HTMLDivElement; component: number }[];
                in: { node: HTMLDivElement; component: number } | null;
            } = {
                placeholder: null,
                out: [],
                in: null,
            };

            for (let i = 0; i < rootRef.current.children.length; i++) {
                const node = rootRef.current.children[i];
                if (node instanceof HTMLDivElement) {
                    const component = parseInt(node.dataset.component || "-1");
                    switch (node.dataset.type) {
                        case TYPE_PLACEHOLDER:
                            refs.placeholder = node;
                            break;
                        case TYPE_OUT:
                            refs.out.push({ node, component });
                            break;
                        case TYPE_IN:
                            refs.in = { node, component };
                            break;
                        default:
                            throw new Error(
                                "smooth transition: unexpected node type"
                            );
                    }
                }
            }

            if (!refs.placeholder || !refs.in) {
                nextFrameId.current = requestAnimationFrame(onNextFrame);
                return;
            }

            // initialize opacity style
            for (const ref of [...refs.out, refs.in]) {
                if (!ref.node.style.opacity) {
                    ref.node.style.opacity = refs.out.length > 0 ? "0" : "1";
                }
            }

            // initialize height style
            if (!refs.placeholder.style.height) {
                refs.placeholder.style.height =
                    refs.in.node.offsetHeight + "px";
            }

            // initialize transition
            if (!transition.current) {
                transition.current = {
                    lastInChange: {
                        timeStamp,
                        component: refs.in.component,
                        startHeight: parseFloat(refs.placeholder.style.height),
                    },
                    lastFrame: {
                        timeStamp,
                    },
                };
            }

            // calculate last frame progress
            const lastFrameProgress = Math.min(
                Math.max(
                    (timeStamp - transition.current.lastFrame.timeStamp) /
                        duration,
                    0
                ),
                1
            );

            // update transition
            if (transition.current) {
                if (
                    transition.current.lastInChange.component !==
                    refs.in.component
                ) {
                    transition.current.lastInChange = {
                        timeStamp,
                        component: refs.in.component,
                        startHeight: parseFloat(refs.placeholder.style.height),
                    };
                }
                transition.current.lastFrame.timeStamp = timeStamp;
            }

            // calculate last in change progress
            const lastInChangeProgress = Math.min(
                Math.max(
                    (timeStamp - transition.current.lastInChange.timeStamp) /
                        duration,
                    0
                ),
                1
            );

            // progress opacity
            for (const ref of refs.out) {
                ref.node.style.opacity = Math.max(
                    parseFloat(ref.node.style.opacity) - lastFrameProgress,
                    0
                ).toString();
            }

            refs.in.node.style.opacity = Math.min(
                parseFloat(refs.in.node.style.opacity) + lastFrameProgress,
                1
            ).toString();

            // progress height of placeholder
            const newPlaceholderHeight = (() => {
                // determine start and target height
                const startHeight = transition.current.lastInChange.startHeight;
                const targetHeight = refs.in.node.offsetHeight;

                // interpolate
                return (
                    (targetHeight - startHeight) * lastInChangeProgress +
                    startHeight
                );
            })();

            refs.placeholder.style.height = newPlaceholderHeight + "px";

            // ensure pointer events are only handled by the incoming component
            for (const ref of refs.out) {
                ref.node.style.pointerEvents = "none";
            }

            refs.in.node.style.pointerEvents =
                parseFloat(refs.in.node.style.opacity) < 0.5 ? "none" : "auto";

            // determine if we still have unfinished transitions in the render queue
            const newRender = render.filter((component, i) => {
                if (i < render.length - 1) {
                    const ref = refs.out.find(
                        (ref) => ref.component === component
                    );
                    if (!ref || parseFloat(ref.node.style.opacity) > 0) {
                        return true;
                    }
                    return false;
                } else {
                    return true;
                }
            });

            // update render queue, which will also schedule the next frame implicitly
            if (JSON.stringify(newRender) !== JSON.stringify(render)) {
                setRender(newRender);
            }
            // ... or schedule next frame if needed
            else {
                // check if we are done and reset transition state if so
                if (
                    newRender.length === 1 &&
                    refs.in.component === newRender[0] &&
                    parseFloat(refs.in.node.style.opacity) === 1 &&
                    refs.in.node.offsetHeight ===
                        parseFloat(refs.placeholder.style.height)
                ) {
                    transition.current = null;
                }
                // if not, schedule next frame
                else {
                    nextFrameId.current = requestAnimationFrame(onNextFrame);
                }
            }
        },
        [rootRef, render, duration]
    );

    // calculate next frame on each render immediately
    useLayoutEffect(() => {
        if (nextFrameId.current !== null) {
            cancelAnimationFrame(nextFrameId.current);
        }
        onNextFrame(performance.now());
    });

    // schedule next frame on resize
    useEffect(() => {
        function onResize() {
            if (nextFrameId.current === null) {
                nextFrameId.current = requestAnimationFrame(onNextFrame);
            }
        }
        window.addEventListener("resize", onResize);
        window.addEventListener("orientationchange", onResize);
        return () => {
            window.removeEventListener("resize", onResize);
            window.removeEventListener("orientationchange", onResize);
        };
    }, [onNextFrame]);

    // render base DOM structure
    return (
        <div ref={rootRef} style={{ position: "relative" }}>
            <div
                key={TYPE_PLACEHOLDER}
                data-type={TYPE_PLACEHOLDER}
                style={{
                    visibility: "hidden",
                    pointerEvents: "none",
                }}
            />
            {render.map((component, i) => (
                <div
                    key={component}
                    data-type={i < render.length - 1 ? TYPE_OUT : TYPE_IN}
                    data-component={component}
                    style={{
                        position: "absolute",
                        left: 0,
                        top: 0,
                        right: 0,
                    }}
                >
                    {components[component](
                        i < render.length - 1
                            ? "leave"
                            : i > 0
                            ? "enter"
                            : "active"
                    )}
                </div>
            ))}
        </div>
    );
});
