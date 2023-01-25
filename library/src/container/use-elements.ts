import { MutableRefObject, useCallback, useRef } from "react";
import { EventEmitter } from "eventemitter3";

type ElementsData = {
    navBarRoot: HTMLElement | null;
    scrollAreaRoot: HTMLElement | null;
    topBufferRoot: HTMLElement | null;
    bottomBufferRoot: HTMLElement | null;
    inputRoot: Map<string, HTMLElement>;
    inputContent: Map<string, HTMLElement>;
    events: EventEmitter<
        | "navBarRoot"
        | "scrollAreaRoot"
        | "topBufferRoot"
        | "bottomBufferRoot"
        | "inputRoot"
        | "inputContent"
    >;
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
        events: new EventEmitter(),
    });

    const setNavBarRootElement = useCallback((node: HTMLElement | null) => {
        elements.current.navBarRoot = node;
        elements.current.events.emit("navBarRoot", node);
    }, []);

    const setScrollAreaRootElement = useCallback((node: HTMLElement | null) => {
        elements.current.scrollAreaRoot = node;
        elements.current.events.emit("scrollAreaRoot", node);
    }, []);

    const setTopBufferRootElement = useCallback((node: HTMLElement | null) => {
        elements.current.topBufferRoot = node;
        elements.current.events.emit("topBufferRoot", node);
    }, []);

    const setBottomBufferRootElement = useCallback(
        (node: HTMLElement | null) => {
            elements.current.bottomBufferRoot = node;
            elements.current.events.emit("bottomBufferRoot", node);
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
            elements.current.events.emit("inputRoot", id, node);
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
            elements.current.events.emit("inputContent", id, node);
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
