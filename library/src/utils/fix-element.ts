// determindes the viewport Y position of the content of an element
function getElementContentViewportPositionY(element: HTMLElement) {
  const rect = element.getBoundingClientRect();
  const styles = window.getComputedStyle(element);
  return rect.top + parseFloat(styles.paddingTop);
}

// fixes the position of the content of an element in the viewport until stoped
export function fixElementContentPosition(
  element: HTMLElement,
  scrollArea: HTMLElement,
  topBuffer: HTMLElement,
  bottomBuffer: HTMLElement
) {
  // flag to cancel the fixation
  let cancel = false;

  // get start content position of element
  const startPosition = getElementContentViewportPositionY(element);

  // start animation
  requestAnimationFrame(function nextFrame() {
    // check if we need to cancel
    if (cancel) {
      return;
    }

    // get current content position of element
    const currentPosition = getElementContentViewportPositionY(element);

    // check if we need to push the element down
    if (currentPosition < startPosition) {
      // amount of pixels we need to push the element down
      let pushDown = startPosition - currentPosition;
      // check if we can scroll the scroll area down
      if (scrollArea.scrollTop > 0) {
        const scrollDown = Math.min(pushDown, scrollArea.scrollTop);
        scrollArea.scrollTop -= scrollDown;
        console.log(scrollArea.scrollTop);
        pushDown -= scrollDown;
      }
      // increase the top buffer height if needed
      if (pushDown > 0) {
        const topBufferHeight = topBuffer.getBoundingClientRect().height;
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
        const decreaseTopBufferHeight = Math.min(pushUp, topBufferHeight);
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
          currentMaxScrollUp = scrollArea.scrollHeight - scrollArea.clientHeight
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

  // return function to stop the fixation
  return function stop() {
    cancel = true;
  };
}
