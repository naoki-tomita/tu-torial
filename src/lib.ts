export function scrollIntoViewAsync(element: HTMLElement, options?: ScrollIntoViewOptions) {
  return new Promise<void>((resolve) => {
    let { top: lastTop, left: lastLeft } = element.getBoundingClientRect();
    let secondScroll = false;
    element.scrollIntoView(options);
    setTimeout(check, 100);
    function check() {
      const { top, left } = element.getBoundingClientRect();
      if (top - lastTop === 0 && left - lastLeft === 0) {
        if (secondScroll) {
          resolve();
        } else {
          secondScroll = true;
          setTimeout(check, 100); // 縦スクロールのあと、横スクロールがあるかもしれない
        }
      } else {
        lastTop = top;
        lastLeft = left;
        requestAnimationFrame(check);
      }
    }
  });
}
