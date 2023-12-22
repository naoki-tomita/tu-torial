import React from "react";
import { createRoot, Root } from "react-dom/client";
import { Menu } from "./components/Menu";
import { Window } from "./components/Window";
import { Popup, ScrollInto } from "./components/Popup";

const App = ({ scenarios, title }: { scenarios: Scenario[], title: string }) => {
  const [index, setIndex] = React.useState(0);
  const [isOpen, setIsOpen] = React.useState(false);
  const currentScenario = scenarios[index];
  return (
    <>
    <style>
    {`
      * {
        color: #332313;
      }
    `}
    </style>
    {isOpen &&
      <ScrollInto
        selector={currentScenario.selector}
        shouldScroll={isOpen}
      >
        <Window selector={currentScenario.selector} />
        <Popup
          isOpen={isOpen}
          selector={currentScenario.selector}
          text={currentScenario.text}
          onNext={() => setIndex((index + 1) % scenarios.length)}
        />
      </ScrollInto>}
    <Menu title={title} onToggle={() => setIsOpen(!isOpen)} />
    </>
  );
}

class Tutorial extends HTMLElement {
  root: Root;
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
    this.root = createRoot(this.shadowRoot!);
  }

  get scenarios() {
    return JSON.parse(this.getAttribute("scenarios") || "[]");
  }

  get title() {
    return this.getAttribute("title") || "Tutorial";
  }

  connectedCallback() {
    this.root.render(<App scenarios={this.scenarios} title={this.title} />);
  }

  disconnectedCallback() {
    this.root.unmount();
  }
}

customElements.define("tu-torial", Tutorial);

type Scenario = {
  selector: string,
  text: string,
}

const app = {
  title: "",
  scenarios: [],
  setTitle(text: string) {
    this.title = text;
  },

  addScenario(scenario: Scenario) {
    this.scenarios.push(scenario);
  },

  mount() {
    const el = document.createElement("tu-torial");
    el.setAttribute("scenarios", JSON.stringify(this.scenarios));
    el.setAttribute("title", this.title);
    document.body.appendChild(el);
  }
};

(window as any).tuTorial = app;
