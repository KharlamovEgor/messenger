import { ForwardedRef, forwardRef } from "react";
import { IInputProps } from "./Input.props";
import classNames from "classnames";
import styles from "./Input.module.css";

export const Input = forwardRef(function Input(
  { className, ...props }: IInputProps,
  ref: ForwardedRef<HTMLInputElement>
): JSX.Element {
  return <input className={classNames(className, styles.input)} ref={ref} {...props} />;
});
