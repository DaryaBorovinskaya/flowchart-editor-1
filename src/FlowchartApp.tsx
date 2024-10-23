import { useRef, useEffect, useState } from "react";
import { dia, shapes } from "@joint/core";
import {
  createRectBeginning,
  createCircleAppending,
  createCircleAppendingTemp,
  createRectEnding,
  createLink,
  createButtonAppendingTemp,
  addElementToolPlus,
  addRectAction,
  addPolygonCondition,
  addPolygonCycleWHILE,
  addPolygonCycleFOR,
} from "./CreationAndAppendingShapes";
import "./styles/FlowchartApp.css";
import { ModalWindow } from "./ModalWindow";
import { ModalMenu } from "./ModalMenu";
import { ArrowType } from "./ModalMenu";


export type AddingShapesType =
  | shapes.standard.Rectangle
  | shapes.standard.Polygon
  | shapes.standard.Path
  | shapes.standard.Circle;

export interface IModalCondition {
  isOpen: boolean;
}

export const FlowchartApp = () => {
  const [modalWindowCondition, setModalWindowCondition] = useState<
    Partial<IModalCondition>
  >({ isOpen: false });

  const [modalMenuCondition, setModalMenuCondition] = useState<
    Partial<IModalCondition>
  >({ isOpen: false });

  const refButtonActionHandler = useRef<Function | null>(null);
  const refButtonConditionHandler = useRef<Function | null>(null);
  const refButtonCycleWHILEHandler = useRef<Function | null>(null);
  const refButtonCycleFORHandler = useRef<Function | null>(null);

  const refArrow = useRef<ArrowType>(ArrowType.None);
  const refQuantity = useRef<number>(1);
  const refInput = useRef<string>("");

  const mainCanvas = useRef<HTMLDivElement>(null);

  let addingShapes: AddingShapesType[] = [];

  useEffect(() => {
    if (!mainCanvas.current) return;

    const mainGraph = new dia.Graph({}, { cellNamespace: shapes });

    const mainPaper = new dia.Paper({
      el: document.getElementById("main-canvas"),
      model: mainGraph,
      background: {
        color: "rgb(220, 227, 225)",
      },
      width: "80vw",
      height: 3000,
      //height: '100%',
      async: true,
      drawGrid: { name: "dot", args: { color: "black" } },
      gridSize: 10,
      cellViewNamespace: shapes,
    });

    const rectBeginning = createRectBeginning();
    let circleAppending = createCircleAppending();
    const rectEnding = createRectEnding();

    addingShapes.splice(0,addingShapes.length);

    addingShapes.push(rectBeginning);
    addingShapes.push(circleAppending);
    addingShapes.push(rectEnding);
    console.log(addingShapes);

    let countRectActions:number = 1;

    rectBeginning.addTo(mainGraph);
    circleAppending.addTo(mainGraph);
    rectEnding.addTo(mainGraph);

    let prevShape: AddingShapesType = rectBeginning;
    let distance: { value: number } = {
      value: rectBeginning.get("size")!.width,
    };

    const buttonAppending = createButtonAppendingTemp(
      modalMenuCondition,
      setModalMenuCondition
    );
    const toolsView = new dia.ToolsView({
      tools: [buttonAppending],
    });
    const elementViewTemp = circleAppending.findView(mainPaper);
    elementViewTemp.addTools(toolsView);
    let elementViewTempChanging = elementViewTemp;

    const linkBeginningAppending = createLink(
      rectBeginning,
      circleAppending,
      false
    );

    const linkAppendingEnding = createLink(circleAppending, rectEnding);

    linkBeginningAppending.addTo(mainGraph);
    linkAppendingEnding.addTo(mainGraph);

    const buttonAppendingActionHandler = () => {
      const rectActionTemp: shapes.standard.Rectangle = addRectAction(
        {
          graph: mainGraph,
          paper: mainPaper,
          addingShapes: addingShapes,
          rectBeginning: rectBeginning,
          circleAppending: circleAppending,
          elementView: elementViewTempChanging,
          prevShape: prevShape,
          distance: distance,
        },
        refArrow,
        refQuantity,
        countRectActions
      );
      countRectActions += 1;
      const link1 = createLink(prevShape, rectActionTemp);
      link1.addTo(mainGraph);
      prevShape = rectActionTemp;
      
      addingShapes.splice(-2,0,rectActionTemp);
      console.log(addingShapes);

      /*const circleAppendingTemp = createCircleAppendingTemp(
        circleAppending,
        rectActionTemp
      );
      circleAppendingTemp.addTo(mainGraph);
      const link2 = createLink(rectActionTemp, circleAppendingTemp, false);
      link2.addTo(mainGraph);
      
      addElementToolPlus({
        paper: mainPaper,
        modalMenuCondition: modalMenuCondition,
        circleAppendingTemp: circleAppendingTemp,
        setModalMenuCondition: setModalMenuCondition,
        elementViewTempChanging: elementViewTempChanging,
      });
      */

      circleAppending.set("position", {
        x: circleAppending.get("position")!.x,
        y:
          circleAppending.get("position")!.y +
          rectActionTemp.get("size")!.width 
      });

      rectEnding.set("position", {
        x: rectEnding.get("position")!.x,
        y:
          rectEnding.get("size")!.width / 1.45 +
          circleAppending.get("position")!.y//circleAppendingTemp.get("position")!.y,
      });

      const link3 = createLink(circleAppending,rectEnding)//circleAppendingTemp, rectEnding);
      link3.addTo(mainGraph);

      //circleAppending = circleAppendingTemp;
    };

    const buttonAppendingConditionHadler = () => {
      const polygonConditionTemp: shapes.standard.Polygon = addPolygonCondition(
        {
          graph: mainGraph,
          paper: mainPaper,
          addingShapes: addingShapes,
          rectBeginning: rectBeginning,
          circleAppending: circleAppending,
          elementView: elementViewTempChanging,
          prevShape: prevShape,
          distance: distance,
        },
        refInput
      );

      const link1 = createLink(prevShape, polygonConditionTemp);
      link1.addTo(mainGraph);
      prevShape = polygonConditionTemp;
      
      addingShapes.splice(-2,0,polygonConditionTemp);
      console.log(addingShapes);

      /*const circleAppendingTemp = createCircleAppendingTemp(
        circleAppending,
        polygonConditionTemp
      );
      circleAppendingTemp.addTo(mainGraph);

      const link2 = createLink(
        polygonConditionTemp,
        circleAppendingTemp,
        false
      );
      link2.addTo(mainGraph);
      
      addElementToolPlus({
        paper: mainPaper,
        modalMenuCondition: modalMenuCondition,
        circleAppendingTemp: circleAppendingTemp,
        setModalMenuCondition: setModalMenuCondition,
        elementViewTempChanging: elementViewTempChanging,
      });
      */

      circleAppending.set("position", {
        x: circleAppending.get("position")!.x,
        y:
          circleAppending.get("position")!.y +
          polygonConditionTemp.get("size")!.width 
      });

      rectEnding.set("position", {
        x: rectEnding.get("position")!.x,
        y:
          rectEnding.get("size")!.width / 1.45 +
          circleAppending.get("position")!.y//circleAppendingTemp.get("position")!.y,
      });

      const link3 = createLink(circleAppending,rectEnding);//circleAppendingTemp, rectEnding);
      link3.addTo(mainGraph);
      //circleAppending = circleAppendingTemp;
    };

    const buttonAppendingCycleWHILEHadler = () => {
      const polygonCycleWHILETemp: shapes.standard.Polygon =
        addPolygonCycleWHILE(
          {
            graph: mainGraph,
            paper: mainPaper,
            addingShapes: addingShapes,
            rectBeginning: rectBeginning,
            circleAppending: circleAppending,
            elementView: elementViewTempChanging,
            prevShape: prevShape,
            distance: distance,
          },
          refInput
        );

      const link1 = createLink(prevShape, polygonCycleWHILETemp);
      link1.addTo(mainGraph);
      prevShape = polygonCycleWHILETemp;
      
      addingShapes.splice(-2,0,polygonCycleWHILETemp);
      console.log(addingShapes);

      /*const circleAppendingTemp = createCircleAppendingTemp(
        circleAppending,
        polygonCycleWHILETemp
      );
      circleAppendingTemp.addTo(mainGraph);

      const link2 = createLink(
        polygonCycleWHILETemp,
        circleAppendingTemp,
        false
      );
      link2.addTo(mainGraph);

      addElementToolPlus({
        paper: mainPaper,
        modalMenuCondition: modalMenuCondition,
        circleAppendingTemp: circleAppendingTemp,
        setModalMenuCondition: setModalMenuCondition,
        elementViewTempChanging: elementViewTempChanging,
      });*/

      circleAppending.set("position", {
        x: circleAppending.get("position")!.x,
        y:
          circleAppending.get("position")!.y +
          polygonCycleWHILETemp.get("size")!.width 
      });

      rectEnding.set("position", {
        x: rectEnding.get("position")!.x,
        y:
          rectEnding.get("size")!.width / 1.45 +
          circleAppending.get("position")!.y//circleAppendingTemp.get("position")!.y,
      });

      const link3 = createLink(circleAppending,rectEnding);//circleAppendingTemp, rectEnding);
      link3.addTo(mainGraph);
      //circleAppending = circleAppendingTemp;
    };

    const buttonAppendingCycleFORHadler = () => {
      const polygonCycleFORTemp: shapes.standard.Polygon = addPolygonCycleFOR(
        {
          graph: mainGraph,
          paper: mainPaper,
          addingShapes: addingShapes,
          rectBeginning: rectBeginning,
          circleAppending: circleAppending,
          elementView: elementViewTempChanging,
          prevShape: prevShape,
          distance: distance,
        },
        refInput
      );

      const link1 = createLink(prevShape, polygonCycleFORTemp);
      link1.addTo(mainGraph);
      prevShape = polygonCycleFORTemp;
      
      addingShapes.splice(-2,0,polygonCycleFORTemp);
      console.log(addingShapes);
      console.log(link1);

      /*const circleAppendingTemp = createCircleAppendingTemp(
        circleAppending,
        polygonCycleFORTemp
      );
      circleAppendingTemp.addTo(mainGraph);

      const link2 = createLink(polygonCycleFORTemp, circleAppendingTemp, false);
      link2.addTo(mainGraph);

      addElementToolPlus({
        paper: mainPaper,
        modalMenuCondition: modalMenuCondition,
        circleAppendingTemp: circleAppendingTemp,
        setModalMenuCondition: setModalMenuCondition,
        elementViewTempChanging: elementViewTempChanging,
      });*/

      circleAppending.set("position", {
        x: circleAppending.get("position")!.x,
        y:
          circleAppending.get("position")!.y +
          polygonCycleFORTemp.get("size")!.width 
      });

      rectEnding.set("position", {
        x: rectEnding.get("position")!.x,
        y:
          rectEnding.get("size")!.width / 1.45 +
          circleAppending.get("position")!.y//circleAppendingTemp.get("position")!.y,
      });

      const link3 = createLink(circleAppending,rectEnding);//circleAppendingTemp, rectEnding);
      link3.addTo(mainGraph);
      //circleAppending = circleAppendingTemp;
    };

    refButtonActionHandler.current = buttonAppendingActionHandler;
    refButtonConditionHandler.current = buttonAppendingConditionHadler;
    refButtonCycleWHILEHandler.current = buttonAppendingCycleWHILEHadler;
    refButtonCycleFORHandler.current = buttonAppendingCycleFORHadler;

    mainCanvas.current.appendChild(mainPaper.el);
    return () => {
      mainPaper.remove();
    };
  }, []);

  const appendAction = () => {
    if (!refButtonActionHandler.current) return;
    refButtonActionHandler.current();
  };

  const appendCondition = () => {
    if (!refButtonConditionHandler.current) return;
    refButtonConditionHandler.current();
  };

  const appendCycleWHILE = () => {
    if (!refButtonCycleWHILEHandler.current) return;
    refButtonCycleWHILEHandler.current();
  };

  const appendCycleFOR = () => {
    if (!refButtonCycleFORHandler.current) return;
    refButtonCycleFORHandler.current();
  };

  return (
    <div className="background-body">
      <div className="top-panel">
        <div className="text-title">Редактор блок-схем</div>
      </div>
      <ModalWindow
        modalCondition={modalWindowCondition}
        setModalCondition={setModalWindowCondition}
      />
      <div className="main-panel">
        <div className="information-space">
          <button className="button-task">Задача</button>
          <button className="button-task">Условие</button>
          <button
            className="button-help"
            onClick={() =>
              setModalWindowCondition({ ...modalWindowCondition, isOpen: true })
            }
          >
            Помощь
          </button>
        </div>
        <div className="play-space">
          <ModalMenu
            modalCondition={modalMenuCondition}
            setModalCondition={setModalMenuCondition}
            buttonAppendingActionHandler={appendAction}
            buttonAppendingConditionHandler={appendCondition}
            buttonAppendingCycleWHILEHandler={appendCycleWHILE}
            buttonAppendingCycleFORHandler={appendCycleFOR}
            arrowItem={refArrow}
            quantityItem={refQuantity}
            inputItem={refInput}
          />
          <div className="wrapper-main-canvas">
            <div className="main-canvas" ref={mainCanvas}></div>
          </div>
        </div>
      </div>
      <div className="lower-panel">
        <button
          className="button-ready"
          onClick={() => {
            alert("Вы справились!");
          }}
        >
          Готово
        </button>
        <button
          className="button-send"
          onClick={() => {
            alert("Вы отправили блок-схему!");
          }}
        >
          Отправить
        </button>
      </div>
    </div>
  );
};
