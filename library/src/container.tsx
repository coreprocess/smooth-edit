import React, {
    ReactNode,
    useCallback,
    useMemo,
    useRef,
    useState,
} from "react";
import {
    SmoothEditInputConfig,
    SmoothEditNavBarConfig,
    SmoothEditScrollAreaConfig,
} from "./config";
import { SmoothEditContext } from "./context";
import { detectCssTransitionEnd } from "./utils/css-transition";
import { fixElementContentPosition } from "./utils/fix-element";

export function SmoothEditContainer({
    children,
}: {
    children: ReactNode;
}): JSX.Element {
    // edit mode transition management
    const transition = useRef(false);

    const handleTransition = useCallback((id: string) => {
        // skip if already in transition
        if (transition.current) {
            return;
        }

        // get refs to elements
        const inputContent = refs.current.inputContent.get(id);
        const { scrollAreaRoot, topBufferRoot, bottomBufferRoot } =
            refs.current;

        if (
            !inputContent ||
            !scrollAreaRoot ||
            !topBufferRoot ||
            !bottomBufferRoot
        ) {
            console.error("edit mode transition: could not find element refs");
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
        detectCssTransitionEnd(scrollAreaRoot, 250, () => {
            // stop fixation
            stopFixation();

            // mark transition as inactive
            transition.current = false;

            // print debug info
            console.log("edit mode transition: finished");
        });
    }, []);

    // edit mode management
    const [editMode, setEditMode] = useState(false);

    const activateEditMode = useCallback(
        (id?: string) => {
            if (!editMode) {
                if (id) {
                    handleTransition(id);
                }
                setEditMode(true);
            }
        },
        [editMode, handleTransition]
    );

    const deactivateEditMode = useCallback(() => {
        setEditMode(false);
    }, []);

    // reference handling
    const refs = useRef<{
        navBarRoot: HTMLElement | null;
        scrollAreaRoot: HTMLElement | null;
        topBufferRoot: HTMLElement | null;
        bottomBufferRoot: HTMLElement | null;
        inputRoot: Map<string, HTMLElement>;
        inputContent: Map<string, HTMLElement>;
    }>({
        navBarRoot: null,
        scrollAreaRoot: null,
        topBufferRoot: null,
        bottomBufferRoot: null,
        inputRoot: new Map(),
        inputContent: new Map(),
    });

    const setNavBarRootRef = useCallback((node: HTMLElement | null) => {
        refs.current.navBarRoot = node;
    }, []);

    const setScrollAreaRootRef = useCallback((node: HTMLElement | null) => {
        refs.current.scrollAreaRoot = node;
    }, []);

    const setTopBufferRootRef = useCallback((node: HTMLElement | null) => {
        refs.current.topBufferRoot = node;
    }, []);

    const setBottomBufferRootRef = useCallback((node: HTMLElement | null) => {
        refs.current.bottomBufferRoot = node;
    }, []);

    const setInputRootRef = useCallback(
        (id: string, node: HTMLElement | null) => {
            if (node) {
                refs.current.inputRoot.set(id, node);
            } else {
                refs.current.inputRoot.delete(id);
            }
        },
        []
    );

    const setInputContentRef = useCallback(
        (id: string, node: HTMLElement | null) => {
            if (node) {
                refs.current.inputContent.set(id, node);
            } else {
                refs.current.inputContent.delete(id);
            }
        },
        []
    );

    // config handling
    const config = useRef<{
        navBar: SmoothEditNavBarConfig | null;
        scrollArea: SmoothEditScrollAreaConfig | null;
        input: Map<string, SmoothEditInputConfig>;
    }>({
        navBar: null,
        scrollArea: null,
        input: new Map<string, SmoothEditInputConfig>(),
    });

    const setNavBarConfig = useCallback(
        (navBarConfig: SmoothEditNavBarConfig) => {
            config.current.navBar = navBarConfig;
        },
        []
    );

    const setScrollAreaConfig = useCallback(
        (scrollAreaConfig: SmoothEditScrollAreaConfig) => {
            config.current.scrollArea = scrollAreaConfig;
        },
        []
    );

    const setInputConfig = useCallback(
        (id: string, inputConfig: SmoothEditInputConfig) => {
            config.current.input.set(id, inputConfig);
        },
        []
    );

    // create context value
    const context = useMemo(
        () => ({
            editMode,
            activateEditMode,
            deactivateEditMode,
            setNavBarRootRef,
            setScrollAreaRootRef,
            setTopBufferRootRef,
            setBottomBufferRootRef,
            setInputRootRef,
            setInputContentRef,
            setNavBarConfig,
            setScrollAreaConfig,
            setInputConfig,
        }),
        [
            editMode,
            activateEditMode,
            deactivateEditMode,
            setNavBarRootRef,
            setScrollAreaRootRef,
            setTopBufferRootRef,
            setBottomBufferRootRef,
            setInputRootRef,
            setInputContentRef,
            setNavBarConfig,
            setScrollAreaConfig,
            setInputConfig,
        ]
    );

    // render context
    return (
        <SmoothEditContext.Provider value={context}>
            {children}
        </SmoothEditContext.Provider>
    );
}
