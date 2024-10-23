import "./styles/ModalWindow.css";
import React from "react";
import { Portal } from "./Portal";
import close_svg from "./close-svgrepo-com.svg";
import { IModalCondition } from "./FlowchartApp";

interface PropsModalWindow {
  modalCondition: Partial<IModalCondition>;
  setModalCondition: React.Dispatch<
    React.SetStateAction<Partial<IModalCondition>>
  >;
}

/** Modal window */
export const ModalWindow = ({
  modalCondition,
  setModalCondition,
}: PropsModalWindow) => {
  return (
    <>
      {/*Rendering modal window if modal window's condition is open*/}
      {modalCondition.isOpen && (
        <Portal>
          <div className="modal-window">
            {/*Modal window's header */}
            <div className="modal-header">
              {/*Closing a modal window*/}
                <img
                  className="button-close-svg"
                  src={close_svg}
                  onClick={() =>
                    setModalCondition({ ...modalCondition, isOpen: false })
                  }
                  title="Закрыть правила"
                ></img>
            </div>

            {/*Modal window's body */}
            <div className="modal-body">
              {/*Modal window's text blocks */}
              <div className="modal-text-block">
                <span className="text-block">
                  Первая фишка - с пустым полем слева:
                </span>
                <div className="some-domino-for-modal-window">
                  
                </div>
              </div>
              <br></br>
              <div className="modal-text-block">
                <span className="text-block">
                  Последняя фишка - с пустым полем справа:
                </span>
                <div className="some-domino-for-modal-window">
                  
                </div>
              </div>
              <br></br>
              <div className="modal-text-block">
                <span className="text-block">
                  По клику на фишку она становится на первое свободное место в
                  цепочке фишек в верхнем поле.
                </span>
                <div className="place-domino-for-modal-window"></div>
              </div>
              <br></br>
              <div className="modal-text-block">
                <span className="text-block">
                  Если фишка в цепочку встала верно, то появляется
                  соединительный элемент.
                </span>
                
              </div>
              <br></br>
              <div className="modal-text-block">
                <span className="text-block">
                  Если фишка в цепочку встала неверно, нельзя выбрать следующую
                  фишку.
                </span>
                <span className="text-is-not-right-for-modal-window">
                  Неверно
                </span>
              </div>
              <br></br>
              <div className="modal-text-block">
                <span className="text-block">
                  По клику на неверно поставленную фишку она возвращается на
                  прежнее место.
                </span>
              </div>
              <br></br>
              <div className="modal-text-block">
                <span className="text-block">
                  Существует только один единственно верный вариант сбора
                  цепочки.
                </span>
              </div>
              <br></br>
            </div>
          </div>
        </Portal>
      )}
    </>
  );
};
