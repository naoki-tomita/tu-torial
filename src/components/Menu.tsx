import React from "preact/compat";

export const Menu = ({ onToggle, title }: { onToggle: () => void, title: string }) => {
  return (
    <>
    <style>
    {`
    .menu {
      position: fixed;
      left: 20px;
      bottom: 20px;
      background-color: #fff;
      border: 1px solid #000;
      z-index: 9999;
    }
    `}
    </style>
    <div className="menu">{title}<button onClick={onToggle}>toggle</button></div>
    </>
  );
}
