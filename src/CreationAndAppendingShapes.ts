import { AddingShapesType, IModalCondition } from "./FlowchartApp";
import { dia, shapes, elementTools } from "@joint/core";
import { getArrowItemRussianLang } from "./dictArrows";
import d_svg from "./d_svg_for_shapes";
import { ArrowType } from "./ModalMenu";
import { cloneDeep } from "lodash";

export const createRectBeginning = () => {
  const rectBeginning = new shapes.standard.Rectangle({
    name: "rectBeginning",
    position: { x: 400, y: 100 },
    size: { width: 100, height: 50 },
    attrs: {
      body: {
        stroke: "#8b2268",
        rx: 15,
        ry: 15,
        "pointer-events": "none",
      },
      label: {
        text: "Начало",
        "pointer-events": "none",
        fontFamily: "Manrope",
      },
    },
  });
  return rectBeginning;
};

export const createCircleAppending = () => {
  let circleAppending = new shapes.standard.Circle({
    name: "circleAppending",
    position: { x: 437.5, y: 200 },
    size: { width: 25, height: 25 },
    attrs: {
      body: {
        stroke: "#10d017",
        rx: 15,
        ry: 15,
        "pointer-events": "none",
      },
    },
  });
  return circleAppending;
};

export const createCircleAppendingTemp = (
  circleAppending: shapes.standard.Circle,
  shape: AddingShapesType,
  isRemove: boolean = false
) => {
  const circleAppendingTemp: shapes.standard.Circle =
    new shapes.standard.Circle({
      position: {
        x: circleAppending.get("position")!.x,
        y: isRemove
          ? shape.get("position")!.y
          : shape.get("position")!.y + shape.get("size")!.width,
      },
      size: { width: 25, height: 25 },
      attrs: {
        body: {
          stroke: "#10d017",
          rx: 15,
          ry: 15,
          "pointer-events": "none",
        },
      },
    });
  return circleAppendingTemp;
};

export const createRectEnding = () => {
  const rectEnding = new shapes.standard.Rectangle({
    name: "rectEnding",
    position: { x: 400, y: 275 },
    size: { width: 100, height: 50 },
    attrs: {
      body: {
        stroke: "#8b2268",
        rx: 15,
        ry: 15,
        "pointer-events": "none",
      },
      label: {
        text: "Конец",
        "pointer-events": "none",
        fontFamily: "Manrope",
      },
    },
  });
  return rectEnding;
};

export const createRectAction = (count: number) => {
  const rectAction = new shapes.standard.Rectangle({
    name: `rectAction ${count}`,
    position: { x: 100, y: 200 },
    size: { width: 100, height: 50 },
    attrs: {
      body: {
        stroke: "#2675e3",
        cursor: "default",
      },
      label: {
        "pointer-events": "none",
        fontFamily: "Manrope",
      },
    },
  });
  return rectAction;
};

export const createPolygonCondition = () => {
  const polygonCondition = new shapes.standard.Polygon({
    size: { width: 200, height: 100 },
    position: { x: 50, y: 450 },
    attrs: {
      label: {
        "pointer-events": "none",
      },
      body: {
        stroke: "#630496",
        refPoints: d_svg.rhomb,
        "pointer-events": "none",
      },
    },
  });
  return polygonCondition;
};

export const createPolygonCycleWHILE = () => {
  const polygonCycleWHILE = new shapes.standard.Polygon({
    size: { width: 200, height: 100 },
    position: { x: 50, y: 150 },
    attrs: {
      label: {
        "pointer-events": "none",
      },
      body: {
        stroke: "#e80a2b",
        refPoints: d_svg.rhomb,
        "pointer-events": "none",
      },
    },
  });
  return polygonCycleWHILE;
};

export const createPolygonCycleFOR = () => {
  const polygonCycleFOR = new shapes.standard.Path({
    position: { x: 50, y: 25 },
    size: { width: 200, height: 70 },
    attrs: {
      body: {
        refD: d_svg.hexagon,
        "pointer-events": "none",
        stroke: "#ddb607",
      },
      label: {
        "pointer-events": "none",
      },
    },
  });
  return polygonCycleFOR;
};

export const createLink = (
  source: dia.Cell,
  target: dia.Cell,
  hasArrow = true
): shapes.standard.Link => {
  const link = new shapes.standard.Link();
  link.source(source);
  link.target(target);
  link.router("orthogonal");
  link.connector("straight", { cornerType: "line" });
  if (!hasArrow) {
    link.attr({ line: { targetMarker: { type: "none" } } });
  }
  return link;
};

export const createButtonAppendingTemp = (
  modalMenuCondition: Partial<IModalCondition>,
  setModalMenuCondition: React.Dispatch<
    React.SetStateAction<Partial<IModalCondition>>
  >
) => {
  const buttonAppendingTemp = new elementTools.Button({
    markup: [
      {
        tagName: "path",
        selector: "icon",

        attributes: {
          d: d_svg.plus,
          fill: "#10d017",
          cursor: "pointer",
        },
      },
    ],
    x: 0,
    y: 0,
    offset: {
      x: 4,
      y: 4,
    },
    distance: 0,
    action: function () {
      setModalMenuCondition({ ...modalMenuCondition, isOpen: true });
    },
  });
  return buttonAppendingTemp;
};

export const createButtonClosing = (
  graph: dia.Graph,
  addingShapes: AddingShapesType[],
  shape: AddingShapesType,
  addElementToolPlus: (props: IElementToolPlusProps) => void
) => {
  const closingHandler = (
    graph: dia.Graph,
    shape: AddingShapesType,
    addElementToolPlus: (props: IElementToolPlusProps) => void
  ) => {
    let indexRemoving = 0;

    addingShapes.forEach((elem) => {
      if (elem === shape) {
        shape.remove();
        indexRemoving = addingShapes.findIndex(
            (element) => element === shape
        );
      }
    });
    addingShapes.splice(indexRemoving, 1);

    let movingShapes = addingShapes.slice(indexRemoving, addingShapes.length );
    let shapeTemp, shapePrev;

    for (let i: number = 0; i < movingShapes.length; i += 1) {
        shapeTemp = movingShapes[i] as shapes.standard.Rectangle;
        shapeTemp = movingShapes[i] as shapes.standard.Polygon;
        shapeTemp = movingShapes[i] as shapes.standard.Path;
        shapeTemp = movingShapes[i] as shapes.standard.Circle;
  
        
        shapeTemp.set("position", {
          x: shapeTemp.get("position")!.x,
          y: shapeTemp.get("position")!.y - 50//shapeTemp.get("size")!.width/1.25 ,
        });
        
        console.log(shapeTemp);
        
        /*if (shapeTemp instanceof shapes.standard.Circle) {
          shapeTemp.set("position", {
            x: shapeTemp.get("position")!.x,
            y:
              (shapeTemp.get("position")!.y - shapeTemp.get("size")!.width) *
              1.25,
          });
        }
  
        if (i > 0) {
          let link = createLink(shapeTemp, shapePrev!);
          link.addTo(graph);
        }
  
        shapePrev = cloneDeep(shapeTemp);*/
      }

      createLink(
        addingShapes[indexRemoving],
        addingShapes[indexRemoving - 1],
        false
      ).addTo(graph);

    /*let shapesWithoutEnd: AddingShapesType[] = addingShapes.slice(
        1,
        addingShapes.length
      );
      shapesWithoutEnd = shapesWithoutEnd.reverse();
      let lenAddingShapes: number = addingShapes.length;
  
      for (let i: number = 0; i < lenAddingShapes; i += 1) {
        addingShapes.pop();
      }
      addingShapes.push(rectEnding);
  
      let circleAppTemp = createCircleAppendingTemp(circleAppending, shape, true);
      circleAppTemp.addTo(graph);
      graph.removeCells([circleAppending]);
      addElementToolPlus(circleAppTemp);
      addingShapes.push(circleAppTemp);
  
      shapesWithoutEnd.forEach((elem: AddingShapesType) =>
        addingShapes.push(elem)
      );
  
      let indexRemoving = 0;
      addingShapes.forEach((elem) => {
        if (elem === shape) {
          shape.remove();
          indexRemoving = addingShapes.findIndex((element) => element === shape);
          addingShapes.slice(indexRemoving, 1);
        }
      });
  
      let shapeTemp, shapePrev;
      let movingShapes = addingShapes.slice(0, indexRemoving);
  
      for (let i: number = 0; i < movingShapes.length; i += 1) {
        shapeTemp = movingShapes[i] as shapes.standard.Rectangle;
        shapeTemp = movingShapes[i] as shapes.standard.Polygon;
        shapeTemp = movingShapes[i] as shapes.standard.Path;
        shapeTemp = movingShapes[i] as shapes.standard.Circle;
  
        shapeTemp.set("position", {
          x: shapeTemp.get("position")!.x,
          y: shapeTemp.get("position")!.y - shapeTemp.get("size")!.width / 1.25,
        });
  
        if (shapeTemp instanceof shapes.standard.Circle) {
          shapeTemp.set("position", {
            x: shapeTemp.get("position")!.x,
            y:
              (shapeTemp.get("position")!.y - shapeTemp.get("size")!.width) *
              1.25,
          });
        }
  
        if (i > 0) {
          let link = createLink(shapeTemp, shapePrev!);
          link.addTo(graph);
        }
  
        shapePrev = cloneDeep(shapeTemp);
      }
  
      createLink(
        addingShapes[indexRemoving - 1],
        prevShapeFromGraph,
        false
      ).addTo(graph);
  
      shapesWithoutEnd = addingShapes.slice(2, addingShapes.length);
      shapesWithoutEnd = shapesWithoutEnd.reverse();
      addingShapes = [];
      addingShapes.push(rectEnding);
      shapesWithoutEnd.forEach((elem: AddingShapesType) =>
        addingShapes.push(elem)
      );*/
  };

  const buttonClosing = new elementTools.Button({
    markup: [
      {
        tagName: "path",
        selector: "icon",

        attributes: {
          d: d_svg.closing,
          fill: "#ff0000",
          cursor: "pointer",
        },
      },
    ],
    x: 0,
    y: 0,
    offset: {
      x: shape.get("size")!.width - 3,
      y: 0,
    },
    distance: 0,
    action: function () {
      closingHandler(graph, shape, addElementToolPlus);
    },
  });
  return buttonClosing;
};

interface IElementToolPlusProps {
  paper: dia.Paper;
  circleAppendingTemp: shapes.standard.Circle;
  modalMenuCondition: Partial<IModalCondition>;
  setModalMenuCondition: React.Dispatch<
    React.SetStateAction<Partial<IModalCondition>>
  >;
  elementViewTempChanging: dia.CellView | null;
}

export const addElementToolPlus = (props: IElementToolPlusProps) => {
  const buttonAppendingTemp = createButtonAppendingTemp(
    props.modalMenuCondition,
    props.setModalMenuCondition
  );
  const toolsViewTemp = new dia.ToolsView({
    tools: [buttonAppendingTemp],
  });
  const elementViewTemp = props.circleAppendingTemp.findView(props.paper);
  elementViewTemp.addTools(toolsViewTemp);
  props.elementViewTempChanging = elementViewTemp;
};

interface IElementToolClosingProps {
  graph: dia.Graph;
  paper: dia.Paper;
  addingShapes: AddingShapesType[];
  shape: AddingShapesType;
}

export const addElementToolClosing = (props: IElementToolClosingProps) => {
  const buttonClosing = createButtonClosing(
    props.graph,
    props.addingShapes,
    props.shape,
    addElementToolPlus
  );

  const toolsViewTemp = new dia.ToolsView({
    tools: [buttonClosing],
  });
  const elementViewTemp = props.shape.findView(props.paper);
  elementViewTemp.addTools(toolsViewTemp);
};

interface IAddShapeProps {
  graph: dia.Graph;
  paper: dia.Paper;
  addingShapes: AddingShapesType[];
  rectBeginning: shapes.standard.Rectangle;
  circleAppending: shapes.standard.Circle;
  elementView: dia.CellView;
  prevShape: AddingShapesType;
  distance: { value: number };
}

export const addRectAction = (
  props: IAddShapeProps,
  refArrow: React.MutableRefObject<ArrowType>,
  refQuantity: React.MutableRefObject<number>,
  countRectActions: number
) => {
  const rectActionTemp = createRectAction(countRectActions);

  rectActionTemp.set("position", {
    x:
      props.circleAppending.get("position")!.x -
      props.circleAppending.get("size")!.width * 1.5,
    y: props.rectBeginning.get("position")!.y + props.distance.value,
  });
  props.distance.value += rectActionTemp.get("size")!.width;

  rectActionTemp.attr(
    "label/text",
    `${getArrowItemRussianLang(refArrow.current)} ${refQuantity.current}`
  );

  rectActionTemp.addTo(props.graph);
  addElementToolClosing({
    graph: props.graph,
    paper: props.paper,
    addingShapes: props.addingShapes,
    shape: rectActionTemp,
  });
  //props.elementView.hideTools();
  //props.graph.removeCells([props.circleAppending]);
  return rectActionTemp;
};

export const addPolygonCondition = (
  props: IAddShapeProps,
  refInput: React.MutableRefObject<string>
) => {
  const polConditionTemp = createPolygonCondition();

  polConditionTemp.set("position", {
    x:
      props.circleAppending.get("position")!.x -
      props.circleAppending.get("size")!.width * 3.5,
    y: props.rectBeginning.get("position")!.y + props.distance.value,
  });
  props.distance.value += polConditionTemp.get("size")!.width;

  polConditionTemp.attr("label/text", `${refInput.current}`);

  //props.circleAppending.remove();
  polConditionTemp.addTo(props.graph);
  addElementToolClosing({
    graph: props.graph,
    paper: props.paper,
    addingShapes: props.addingShapes,
    shape: polConditionTemp,
  });
  //props.elementView.hideTools();
  return polConditionTemp;
};

export const addPolygonCycleWHILE = (
  props: IAddShapeProps,
  refInput: React.MutableRefObject<string>
) => {
  const polCycleWHILETemp = createPolygonCycleWHILE();

  polCycleWHILETemp.set("position", {
    x:
      props.circleAppending.get("position")!.x -
      props.circleAppending.get("size")!.width * 3.5,
    y: props.rectBeginning.get("position")!.y + props.distance.value,
  });
  props.distance.value += polCycleWHILETemp.get("size")!.width;

  polCycleWHILETemp.attr("label/text", `${refInput.current}`);

  //props.circleAppending.remove();
  polCycleWHILETemp.addTo(props.graph);
  addElementToolClosing({
    graph: props.graph,
    paper: props.paper,
    addingShapes: props.addingShapes,
    shape: polCycleWHILETemp,
  });
  //props.elementView.hideTools();
  return polCycleWHILETemp;
};

export const addPolygonCycleFOR = (
  props: IAddShapeProps,
  refInput: React.MutableRefObject<string>
) => {
  const polCycleFORTemp = createPolygonCycleFOR();

  polCycleFORTemp.set("position", {
    x:
      props.circleAppending.get("position")!.x -
      props.circleAppending.get("size")!.width * 3.5,
    y: props.rectBeginning.get("position")!.y + props.distance.value,
  });
  props.distance.value += polCycleFORTemp.get("size")!.width;

  polCycleFORTemp.attr("label/text", `${refInput.current}`);

  //props.circleAppending.remove();
  polCycleFORTemp.addTo(props.graph);
  addElementToolClosing({
    graph: props.graph,
    paper: props.paper,
    addingShapes: props.addingShapes,
    shape: polCycleFORTemp,
  });
  //props.elementView.hideTools();
  return polCycleFORTemp;
};
