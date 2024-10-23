import { Component } from "react";
import * as React from "react";
import * as ReactDOM from "react-dom";

export type ModalProps = {
  children: React.ReactNode;
};

/** Auxiliary element for creating a modal window based on div-element */
export class Portal extends Component<ModalProps> {
  element = document.createElement("div");

  public constructor(props: ModalProps) {
    super(props);
  }

  /** Adding a modal window as a child element */
  componentDidMount(): void {
    document.body.appendChild(this.element);
  }

  /** Removing a modal window*/
  componentWillUnmount(): void {
    document.body.removeChild(this.element);
  }

  /**Creating a modal window*/
  render(): React.ReactElement<ModalProps> {
    return ReactDOM.createPortal(this.props.children, this.element);
  }
}
