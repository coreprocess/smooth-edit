import { logDebug } from "../../logging";

// determindes the viewport Y position of the content of an element
function getElementContentViewportPositionY(
    element: HTMLElement,
    where: "top" | "middle" | "bottom"
): number {
    const rect = element.getBoundingClientRect();
    const styles = window.getComputedStyle(element);
    switch (where) {
        case "top":
            return rect.top + parseFloat(styles.paddingTop);
        case "middle":
            return rect.top + rect.height / 2;
        case "bottom":
            return rect.bottom - parseFloat(styles.paddingBottom);
    }
}

// fixes the position of the content of an element in the viewport until stoped
export function createElementContentPositionFixation(
    input: HTMLElement | null,
    where: "top" | "middle" | "bottom",
    scrollArea: HTMLElement | null,
    topBuffer: HTMLElement | null,
    bottomBuffer: HTMLElement | null
) {
    // flag to stop the fixation
    let stopFlag = false;

    // get start content position of input element
    let startPosition = input
        ? getElementContentViewportPositionY(input, where)
        : null;

    // start animation
    requestAnimationFrame(function nextFrame() {
        // check if we need to stop
        if (stopFlag) {
            return;
        }

        // skip frame if input element is missing
        if (!input) {
            return requestAnimationFrame(nextFrame);
        }

        // check if we need to get start position
        if (startPosition === null) {
            startPosition = getElementContentViewportPositionY(input, where);
        }

        // skip frame if scroll area or buffer areas are missing
        if (!scrollArea || !topBuffer || !bottomBuffer) {
            return requestAnimationFrame(nextFrame);
        }

        // get current content position of input element
        const currentPosition = getElementContentViewportPositionY(
            input,
            where
        );

        // check if we need to push the element down
        if (currentPosition < startPosition) {
            // amount of pixels we need to push the element down
            let pushDown = startPosition - currentPosition;
            // check if we can scroll the scroll area down
            if (scrollArea.scrollTop > 0) {
                const scrollDown = Math.min(pushDown, scrollArea.scrollTop);
                scrollArea.scrollTop -= scrollDown;
                pushDown -= scrollDown;
            }
            // increase the top buffer height if needed
            if (pushDown > 0) {
                const topBufferHeight =
                    topBuffer.getBoundingClientRect().height;
                topBuffer.style.height = `${topBufferHeight + pushDown}px`;
            }
        }
        // check if we need to push the element up
        else if (currentPosition > startPosition) {
            // amount of pixels we need to push the element up
            let pushUp = currentPosition - startPosition;
            // check if we can decrease the bottom buffer height
            const topBufferHeight = topBuffer.getBoundingClientRect().height;
            if (topBufferHeight > 0) {
                const decreaseTopBufferHeight = Math.min(
                    pushUp,
                    topBufferHeight
                );
                topBuffer.style.height = `${
                    topBufferHeight - decreaseTopBufferHeight
                }px`;
                pushUp -= decreaseTopBufferHeight;
            }
            // scroll the scroll area up if needed
            if (pushUp > 0) {
                // check if we need to increase the bottom buffer height
                for (
                    let currentMaxScrollUp =
                        scrollArea.scrollHeight - scrollArea.clientHeight;
                    currentMaxScrollUp < pushUp + 10;
                    currentMaxScrollUp =
                        scrollArea.scrollHeight - scrollArea.clientHeight
                ) {
                    const bottomBufferHeight =
                        bottomBuffer.getBoundingClientRect().height;
                    const increaseBottomBufferHeight = Math.max(
                        Math.round(pushUp - currentMaxScrollUp),
                        10
                    );
                    bottomBuffer.style.height = `${
                        bottomBufferHeight + increaseBottomBufferHeight
                    }px`;
                }
                // scroll the scroll area up
                scrollArea.scrollTop += pushUp;
            }
        }

        // request next frame
        requestAnimationFrame(nextFrame);
    });

    // interface
    function setInput(newInput: HTMLElement | null) {
        if (input !== newInput) {
            input = newInput;
            if (input) {
                logDebug("new input element for position fixation");
            }
        }
    }

    function setScrollArea(newScrollArea: HTMLElement | null) {
        if (scrollArea !== newScrollArea) {
            scrollArea = newScrollArea;
            if (scrollArea) {
                logDebug("new scroll area for position fixation");
            }
        }
    }

    function setTopBuffer(newTopBuffer: HTMLElement | null) {
        if (topBuffer !== newTopBuffer) {
            topBuffer = newTopBuffer;
            if (topBuffer) {
                logDebug("new top buffer for position fixation");
            }
        }
    }

    function setBottomBuffer(newBottomBuffer: HTMLElement | null) {
        if (bottomBuffer !== newBottomBuffer) {
            bottomBuffer = newBottomBuffer;
            if (bottomBuffer) {
                logDebug("new bottom buffer for position fixation");
            }
        }
    }

    function stop() {
        stopFlag = true;
    }

    return {
        setInput,
        setScrollArea,
        setTopBuffer,
        setBottomBuffer,
        stop,
    };
}
