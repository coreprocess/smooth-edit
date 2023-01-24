import { MutableRefObject, useCallback, useRef } from "react";

type ElementsData = {
    navBarRoot: HTMLElement | null;
    scrollAreaRoot: HTMLElement | null;
    topBufferRoot: HTMLElement | null;
    bottomBufferRoot: HTMLElement | null;
    inputRoot: Map<string, HTMLElement>;
    inputContent: Map<string, HTMLElement>;
};

export type ElementsRef = MutableRefObject<ElementsData>;

export function useElements() {
    const elements = useRef<ElementsData>({
        navBarRoot: null,
        scrollAreaRoot: null,
        topBufferRoot: null,
        bottomBufferRoot: null,
        inputRoot: new Map(),
        inputContent: new Map(),
    });

    const setNavBarRootElement = useCallback((node: HTMLElement | null) => {
        elements.current.navBarRoot = node;
    }, []);

    const setScrollAreaRootElement = useCallback((node: HTMLElement | null) => {
        elements.current.scrollAreaRoot = node;
    }, []);

    const setTopBufferRootElement = useCallback((node: HTMLElement | null) => {
        elements.current.topBufferRoot = node;
    }, []);

    const setBottomBufferRootElement = useCallback(
        (node: HTMLElement | null) => {
            elements.current.bottomBufferRoot = node;
        },
        []
    );

    const setInputRootElement = useCallback(
        (id: string, node: HTMLElement | null) => {
            if (node) {
                elements.current.inputRoot.set(id, node);
            } else {
                elements.current.inputRoot.delete(id);
            }
        },
        []
    );

    const setInputContentElement = useCallback(
        (id: string, node: HTMLElement | null) => {
            if (node) {
                elements.current.inputContent.set(id, node);
            } else {
                elements.current.inputContent.delete(id);
            }
        },
        []
    );

    return {
        elements,
        setNavBarRootElement,
        setScrollAreaRootElement,
        setTopBufferRootElement,
        setBottomBufferRootElement,
        setInputRootElement,
        setInputContentElement,
    };
}
