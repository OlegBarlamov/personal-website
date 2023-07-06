import "./App.css";
import { PanelsContainerComponent } from "panels-container/components/PanelsContainerComponent";
import { PanelComponent } from "panels-container/components/PanelComponent";
import React, { RefObject } from "react";
import { IPanelsContainerConfig } from "panels-container/IPanelsContainerConfig";
import { PanelPlacement } from "panels-container/PanelPlacement";
import { handleScrollEvents } from "scroll/ScrollController";

const panels: PanelComponent[] = [
  new PanelComponent({
    Content: <div>Hello! I'm first</div>,
    FadeColor: { red: 255, green: 0, blue: 0 },
    Placement: PanelPlacement.Bottom,
  }),

  new PanelComponent({
    Content: <div>Hello! I'm second</div>,
    FadeColor: { red: 0, green: 255, blue: 0 },
    Placement: PanelPlacement.Bottom,
  }),

  new PanelComponent({
    Content: <div>Hello! I'm third</div>,
    FadeColor: { red: 0, green: 0, blue: 255 },
    Placement: PanelPlacement.Bottom,
  }),

  new PanelComponent({
    Content: <div>Hello! I'm third</div>,
    FadeColor: { red: 255, green: 0, blue: 0 },
    Placement: PanelPlacement.Right,
  }),

  new PanelComponent({
    Content: <div>Hello! I'm third</div>,
    FadeColor: { red: 0, green: 255, blue: 0 },
    Placement: PanelPlacement.Right,
  }),

  new PanelComponent({
    Content: <div>Hello! I'm third</div>,
    FadeColor: { red: 0, green: 0, blue: 255 },
    Placement: PanelPlacement.Bottom,
  }),
];

const config: IPanelsContainerConfig = {
  panelsGap: 120,
  panelsSize: {
    x: 900,
    y: 600,
  },
  panelsNumber: panels.length,
  padding: { x: 0, y: 0 },
};

const panelComponent: RefObject<PanelsContainerComponent> = React.createRef();
handleScrollEvents((x, y) => {
  return panelComponent.current?.onMouseScrollValueChanged(y) ?? { x: 0, y: 0 };
});

function App() {
  return (
    <div className="App">
      <PanelsContainerComponent
        ref={panelComponent}
        panels={panels}
        config={config}
      ></PanelsContainerComponent>
    </div>
  );
}

export default App;
