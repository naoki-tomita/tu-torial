import React, { useEffect, useLayoutEffect, useRef, useState } from "react";
import { scrollIntoViewAsync } from "../lib";
import { Window } from "./Window";

export const ScrollInto = ({
  selector,
  shouldScroll,
  children,
}: {
  selector: string,
  shouldScroll: boolean,
  children: React.ReactNode | React.ReactNode[],
}) => {
  const [isScrolling, setIsScrolling] = useState(true);
  useLayoutEffect(() => {
    if (!shouldScroll) return;
    setIsScrolling(true);
    // this is a hack to make sure the enabling scroll before scrolling
    setTimeout(async () => {
      const el = document.querySelector(selector) as HTMLDivElement;
      await scrollIntoViewAsync(el, { behavior: "smooth", block: "center", inline: "center" })
      setIsScrolling(false);
    });
  }, [selector]);

  return (
    <>
    {!isScrolling && children}
    </>
  );
}

export const ScrollIntoPopup = ({
  isOpen,
  selector,
  text,
  onNext,
}: {
  isOpen: boolean,
  selector: string,
  text: string,
  onNext: () => void,
}) => {
  const [isScrolling, setIsScrolling] = useState(true);
  useEffect(() => {(async () => {
    if (!isOpen) return;
    setIsScrolling(true);
    const el = document.querySelector(selector) as HTMLDivElement;
    await scrollIntoViewAsync(el, { behavior: "smooth", block: "center", inline: "center" })
    setIsScrolling(false);
  })()}, [selector, text, isOpen]);

  if (isScrolling || !isOpen) return null;

  return (
    <>
    <Window selector={selector} />
    <Popup
      selector={selector}
      isOpen={isOpen}
      text={text}
      onNext={() => (onNext(), setIsScrolling(true))}
    />
    </>
  );
}

export const Popup = ({
  isOpen,
  selector,
  text,
  onNext
}: {
  isOpen: boolean,
  selector: string,
  text: string,
  onNext: () => void
}) => {
  const ref = useRef<HTMLDivElement>(null);
  useLayoutEffect(() => {
    if (!isOpen || !ref.current) return;
    const el = document.querySelector(selector) as HTMLDivElement;
    const { top, left, height } = el!.getBoundingClientRect();
    const popupTop = top + height + window.scrollY + 4;
    const { height: popupHeight } = ref.current!.getBoundingClientRect();
    const shouldRenderUpside = (popupTop + popupHeight) > document.body.getBoundingClientRect().height;
    const popupBottom = window.scrollY + top - 4 - popupHeight;
    ref.current!.style.top = shouldRenderUpside ? `${popupBottom}px` : `${popupTop}px`;
    ref.current!.style.left = `${left}px`;
  }, [isOpen]);

  if (!isOpen) return null;
  return (
    <>
    <style>
    {`
    .popup {
      padding: 12px 16px;
      width: 200px;
      position: absolute;
      background-color: #fff;
      border-radius: 4px;
      box-shadow: 0 0 4px rgba(0, 0, 0, 0.3);
      z-index: 9999;
      display: flex;
      flex-direction: column;
      gap: 8px;
      align-items: flex-start;
    }
    .popup p {
      margin: 0;
      padding: 0;
    }
    `}
    </style>
    <div className="popup" ref={ref}>
      <p>{text}</p>
      <button onClick={onNext}>next</button>
    </div>
    </>
  );
}
