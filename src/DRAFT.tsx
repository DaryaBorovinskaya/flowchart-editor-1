/*var buttonRectToolsView = new dia.ToolsView({
      tools: [boundaryTool, removeButton, infoButton],
    });

    var buttonConnectToolsView = new dia.ToolsView({
      tools: [connectButton],
    });*/

    /*var buttonRectView = circleAppending.findView(chartSpacePaper);
  buttonRectView.addTools(buttonConnectToolsView);
  buttonRectView.hideTools();

  var puzzleRectView = standardImage.findView(chartSpacePaper)
  puzzleRectView.addTools(buttonRectToolsView)
  puzzleRectView.hideTools()

  chartSpacePaper.on('element:mouseenter', function(elementView) {
    elementView.showTools();
  });

  chartSpacePaper.on('element:mouseleave', function(elementView) {
    elementView.hideTools();
  });*/

    /*chartSpacePaper.on('cell:pointerclick', 
      function(evt, x, y) { 
        link.addTo(mainGraph);
        link2.addTo(mainGraph);
      }
  );*/



/*polygonCondition.attr(
    "body/width", "calc(w)"
    )*/

/*var infoButton = new InfoButton();
var connectButton = new ConnectButton();

var boundaryTool = new elementTools.Boundary();
var removeButton = new elementTools.Remove();*/

/*var ConnectButton = elementTools.Button.extend({
    name: "connect-button",
    options: {
      markup: [
        {
          tagName: "circle",
          selector: "button",
          attributes: {
            r: 7,
            fill: "#bb337e",
            cursor: "pointer",
          },
        },
        {
          tagName: "path",
          selector: "icon",
          attributes: {
            d: "5 5 5 5",
            fill: "none",
            stroke: "#FFFFFF",
            "stroke-width": 2,
            "pointer-events": "none",
          },
        },
      ],
      x: "100%",
      y: "100%",
      offset: {
        x: 0,
        y: 0,
      },
      rotate: true,
      action: function () {},
    },
});*/


/*mainPaper.on("element:mouseenter", (elementView) => {
      elementView.showTools();
    });

    mainPaper.on("element:mouseleave", (elementView) => {
      elementView.hideTools();
    });*/


/*var InfoButton = elementTools.Button.extend({
name: "info-button",
options: {
    markup: [
    {
        tagName: "circle",
        selector: "button",
        attributes: {
        r: 7,
        fill: "#001DFF",
        cursor: "pointer",
        },
    },
    {
        tagName: "path",
        selector: "icon",
        attributes: {
        d: "5 5 5 5",
        fill: "none",
        stroke: "#FFFFFF",
        "stroke-width": 2,
        "pointer-events": "none",
        },
    },
    ],
    x: "100%",
    y: "100%",
    offset: {
    x: 0,
    y: 0,
    },
    rotate: true,
    action: function () {
    polygonCondition.addTo(mainGraph);
    },
},
});*/


/*mainPaper.on("blank:mousewheel", function (evt, x, y, delta) {
    polygonCycleWHILE.addTo(mainGraph);
  });*/

/*const buttonAppending = new elementTools.Button({
    markup: [
      /*{
        tagName: 'circle',
        selector: 'button',
        attributes: {
            'r': 120,
            'fill': 'none',
            'cursor': 'pointer'
        }
      },*/
      /*{
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
    //x: 100,
    //y: 100,
    offset: {
      x: 4,
      y: 4,
    },
    distance: 0,
    action: function () {
      setModalMenuCondition({ ...modalMenuCondition, isOpen: true });
    },
  });*/


/*const standardImage = new shapes.standard.Image({
position: { x: 100, y: 50 },
size: { width: 100, height: 100 },
attrs: {
    image: {
    href: puzzle,
    },
},
});*/



/*const removeButton = new elementTools.Remove();
const toolsViewTempRemove = new dia.ToolsView({
  tools: [removeButton]
});

const elementViewTempRemove = rectActionTemp.findView(mainPaper);
elementViewTempRemove.addTools(toolsViewTempRemove);
elementViewTempRemove.hideTools();

mainPaper.on('element:mouseenter', function(elementViewTempRemove) {
  elementViewTempRemove.showTools();
});

mainPaper.on('element:mouseleave', function(elementViewTempRemove) {
  elementViewTempRemove.hideTools();
});*/