import { useEffect, useRef, useState } from "react";
import { Portal } from "./Portal";
import { IModalCondition } from "./FlowchartApp";
import close_svg from "./close-svgrepo-com.svg";
import arrowUpSVG from "./arrows svg/up.svg";
import arrowDownSVG from "./arrows svg/down.svg";
import arrowLeftSVG from "./arrows svg/left.svg";
import arrowRightSVG from "./arrows svg/right.svg";
import "./styles/ModalMenu.css";
import { getArrowItemRussianLang } from "./dictArrows";

export enum ArrowType {
  Up = 1,
  Down,
  Left,
  Right,
  None,
}

export interface IArrowItem {
  arrowItem: ArrowType;
}

interface PropsModalMenu {
  modalCondition: Partial<IModalCondition>;
  setModalCondition: React.Dispatch<
    React.SetStateAction<Partial<IModalCondition>>
  >;
  buttonAppendingActionHandler: () => void;
  buttonAppendingConditionHandler: () => void;
  buttonAppendingCycleWHILEHandler: () => void;
  buttonAppendingCycleFORHandler: () => void;
  arrowItem: React.MutableRefObject<ArrowType | null>;
  quantityItem: React.MutableRefObject<number | null>;
  inputItem: React.MutableRefObject<string | null>;
}

/**Modal menu with flowchart's elements */
export const ModalMenu = ({
  modalCondition,
  setModalCondition,
  buttonAppendingActionHandler,
  buttonAppendingConditionHandler,
  buttonAppendingCycleWHILEHandler,
  buttonAppendingCycleFORHandler,
  arrowItem,
  quantityItem,
  inputItem,
}: PropsModalMenu) => {
  const [actionEditorWindow, setActionEditorWindow] = useState(false);

  const [conditionEditorWindow, setConditionEditorWindow] = useState(false);

  const [cycleWHILEeditorWindow, setCycleWHILEeditorWindow] = useState(false);

  const [cycleFOReditorWindow, setCycleFOReditorWindow] = useState(false);

  const [enabledButtonAdd, setEnabledButtonAdd] = useState(false);

  const [arrowState, setArrowState] = useState(
    getArrowItemRussianLang(ArrowType.None)
  );
  //useState<React.MutableRefObject<ArrowType | null>>(arrowItem);

  const [quantityState, setQuantityState] = useState(1);

  let inputIdForButtonAdd: string = "";

  const resetModalCondition = ():boolean =>{
    setActionEditorWindow(false);
    setConditionEditorWindow(false);
    setCycleWHILEeditorWindow(false);
    setCycleFOReditorWindow(false);
    setEnabledButtonAdd(false);
    setArrowState(getArrowItemRussianLang(ArrowType.None));
    setQuantityState(1);
    inputIdForButtonAdd = "";
    return true;
  }

  /*useEffect (() => {
    resetModalCondition();
  },[])*/

  const handleSelect = () => {
    const selectElem = document.getElementById(
      "select"
    ) as HTMLSelectElement | null;
    if (selectElem) {
      selectElem!.addEventListener("change", () => {
        const index = selectElem!.selectedIndex + 1;
        setQuantityState(index);
        quantityItem.current = index;
      });
    }
  };

  const handleInput = (inputId: string) => {
    const inputElem = document.getElementById(
      inputId
    ) as HTMLInputElement | null;
    if (inputElem) {
      inputItem.current = inputElem!.value;
    }
  };

  const handleButtonAddAction = () => {
    buttonAppendingActionHandler();
    setModalCondition({
      ...modalCondition,
      isOpen: false,
    });
    resetModalCondition();
  };

  const handleButtonAddCondition = () => {
    inputIdForButtonAdd = "inputCondition";
    handleInput(inputIdForButtonAdd);
    buttonAppendingConditionHandler();
    setModalCondition({
      ...modalCondition,
      isOpen: false,
    });
    resetModalCondition();
  };

  const handleButtonAddCycleWHILE = () => {
    inputIdForButtonAdd = "inputCycleWHILE";
    handleInput(inputIdForButtonAdd);
    buttonAppendingCycleWHILEHandler();
    setModalCondition({
      ...modalCondition,
      isOpen: false,
    });
    resetModalCondition();
  };

  const handleButtonAddCycleFOR = () => {
    inputIdForButtonAdd = "inputCycleFOR";
    handleInput(inputIdForButtonAdd);
    buttonAppendingCycleFORHandler();
    setModalCondition({
      ...modalCondition,
      isOpen: false,
    });
    resetModalCondition();
  };

  const handleKeyDownCondition = (
    event: React.KeyboardEvent<HTMLInputElement>
  ) => {
    if (event.key === 'Enter'){
      inputIdForButtonAdd = "inputCondition";
      handleButtonAddCondition();
      }
  }
  
  const handleKeyDownCycleWHILE = (
    event: React.KeyboardEvent<HTMLInputElement>
  ) => {
    if (event.key === "Enter") {
      inputIdForButtonAdd = "inputCycleWHILE";
      handleButtonAddCycleWHILE();
    }
  };

  const handleKeyDownCycleFOR = (
    event: React.KeyboardEvent<HTMLInputElement>
  ) => {
    if (event.key === "Enter") {
      inputIdForButtonAdd = "inputCycleWHILE";
      handleButtonAddCycleFOR();
    }
  };

  return (
    <>
      {/*Rendering modal menu if modal menu's condition is open*/}
      {modalCondition.isOpen && (
        <Portal>
          <div className="modal-menu-wrap" id="s">
            <div className="modal-menu">
              {/*Modal menu's header */}
              <div className="modal-menu-header">
                <div className="modal-title">Элементы блок-схемы</div>
                <img
                  className="button-close-svg"
                  src={close_svg}
                  onClick={() =>{
                    setModalCondition({ ...modalCondition, isOpen: false });
                    resetModalCondition();
                    }
                  }
                  title="Закрыть меню"
                ></img>
              </div>
              {/*Modal menu's body */}
              <div className="modal-menu-body">
                <button
                  className="text"
                  onClick={() => {
                    setActionEditorWindow(!actionEditorWindow);
                  }}
                >
                  Действие
                </button>
                {actionEditorWindow && (
                  <div className="editor action-editor">
                    <div className="input-data">
                      <div className="arrows">
                        <img
                          className="arrow-svg"
                          id="arrowUp"
                          src={arrowUpSVG}
                          alt="Arrow up"
                          onClick={() => {
                            arrowItem.current = ArrowType.Up;
                            setArrowState(
                              getArrowItemRussianLang(ArrowType.Up)
                            );
                            setEnabledButtonAdd(true);
                            let arrow = document.getElementById("arrowUp")!;
                          }}
                        />
                        <img
                          className="arrow-svg"
                          src={arrowDownSVG}
                          alt="Arrow down"
                          onClick={() => {
                            arrowItem.current = ArrowType.Down;
                            setEnabledButtonAdd(true);
                            setArrowState(
                              getArrowItemRussianLang(ArrowType.Down)
                            );
                          }}
                        />
                        <img
                          className="arrow-svg"
                          src={arrowLeftSVG}
                          alt="Arrow left"
                          onClick={() => {
                            arrowItem.current = ArrowType.Left;
                            setEnabledButtonAdd(true);
                            setArrowState(
                              getArrowItemRussianLang(ArrowType.Left)
                            );
                          }}
                        />
                        <img
                          className="arrow-svg"
                          src={arrowRightSVG}
                          alt="Arrow right"
                          onClick={() => {
                            arrowItem.current = ArrowType.Right;
                            setEnabledButtonAdd(true);
                            setArrowState(
                              getArrowItemRussianLang(ArrowType.Right)
                            );
                          }}
                        />
                      </div>
                      <div className="text-quantity">Количество</div>

                      <div className="input-quantity">
                        <div className="block1">
                          <div className="block2">
                            <select
                              id="select"
                              className="select-quantity"
                              onClick={handleSelect}
                            >
                              <option
                                value={1}
                                className="select-option"
                                id="value1"
                              >
                                1
                              </option>
                              <option
                                value={2}
                                className="select-option"
                                id="value2"
                              >
                                2
                              </option>
                              <option
                                value={3}
                                className="select-option"
                                id="value3"
                              >
                                3
                              </option>
                              <option
                                value={4}
                                className="select-option"
                                id="value4"
                              >
                                4
                              </option>
                              <option
                                value={5}
                                className="select-option"
                                id="value5"
                              >
                                5
                              </option>
                              <option
                                value={6}
                                className="select-option"
                                id="value6"
                              >
                                6
                              </option>
                              <option
                                value={7}
                                className="select-option"
                                id="value7"
                              >
                                7
                              </option>
                              <option
                                value={8}
                                className="select-option"
                                id="value8"
                              >
                                8
                              </option>
                              <option
                                value={9}
                                className="select-option"
                                id="value9"
                              >
                                9
                              </option>
                              <option
                                value={10}
                                className="select-option"
                                id="value10"
                              >
                                10
                              </option>
                              <option
                                value={11}
                                className="select-option"
                                id="value11"
                              >
                                11
                              </option>
                            </select>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="editor-input-data">
                      <div>{arrowState}</div>
                      <div>{quantityState}</div>
                    </div>
                    <div className="wrapper-button-add">
                      <button
                        className="editor-button-add"
                        onClick={handleButtonAddAction}
                        disabled={!enabledButtonAdd}
                      >
                        Добавить
                      </button>
                    </div>
                  </div>
                )}
                <button
                  className="text"
                  onClick={() => {
                    setConditionEditorWindow(!conditionEditorWindow);
                  }}
                >
                  Условие
                </button>
                {conditionEditorWindow && (
                  <div className="editor condition-editor">
                    <div className="wrapper-button-add">
                      <input
                        className="input"
                        type="text"
                        id="inputCondition"
                        placeholder="Введите условие"
                        onKeyDown={handleKeyDownCondition}
                      ></input>
                      <button
                        className="editor-button-add"
                        onClick={handleButtonAddCondition}
                      >
                        Добавить
                      </button>
                    </div>
                  </div>
                )}
                <button
                  className="text"
                  onClick={() => {
                    setCycleWHILEeditorWindow(!cycleWHILEeditorWindow);
                  }}
                >
                  Цикл
                </button>
                {cycleWHILEeditorWindow && (
                  <div className="editor cycle-WHILE-editor">
                    <div className="wrapper-button-add">
                      <input
                        className="input"
                        type="text"
                        id="inputCycleWHILE"
                        placeholder="Введите условие"
                        onKeyDown={handleKeyDownCycleWHILE}
                      ></input>
                      <button
                        className="editor-button-add"
                        onClick={handleButtonAddCycleWHILE}
                      >
                        Добавить
                      </button>
                    </div>
                  </div>
                )}
                <button
                  className="text"
                  onClick={() => {
                    setCycleFOReditorWindow(!cycleFOReditorWindow);
                  }}
                >
                  Цикл с известным числом итераций
                </button>
                {cycleFOReditorWindow && (
                  <div className="editor cycle-FOR-editor">
                    <div className="wrapper-button-add">
                      <input
                        className="input"
                        type="text"
                        id="inputCycleFOR"
                        placeholder="Введите условие"
                        onKeyDown={handleKeyDownCycleFOR}
                      ></input>
                      <button
                        className="editor-button-add"
                        onClick={handleButtonAddCycleFOR}
                      >
                        Добавить
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </Portal>
      )}
    </>
  );
};
