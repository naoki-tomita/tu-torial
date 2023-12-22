import React,{ useEffect, useLayoutEffect } from "preact/compat";

function createPath(selector: string) {
  const el = document.querySelector(selector) as HTMLElement;
  const { top, left, width, height } = el.getBoundingClientRect();
  const path1 = `M ${left} ${top}  h ${width} v ${height} h -${width} z`;
  const coverPath = `M 0 0 v ${window.innerHeight} h ${window.innerWidth} v -${window.innerHeight} z`;
  return `${path1} ${coverPath}`;
}

function disableScroll() {
  document.body.style.overflow = "hidden";
}

function enableScroll() {
  document.body.style.overflow = "auto";
}

export const Window = ({ selector }: { selector: string }) => {
  disableScroll();
  useLayoutEffect(() => {
    return enableScroll;
  }, [selector]);

  return (
    <>
    <style>
    {`
    .window {
      position: fixed;
      top: 0;
      right: 0;
      bottom: 0;
      left: 0;
      z-index: 9998;
      background-color: rgba(0, 0, 0, 0.3);
      clip-path: path('${createPath(selector)}');
    }
    `}
    </style>
    <div className="window"></div>
    </>
  );
}
