import classNames from "classnames";
import { IButtonProps } from "./Button.props";
import styles from "./Button.module.css";

export function Button({ className, children, mini = false, ...props }: IButtonProps) {
  return (
    <button
      className={classNames(className, styles.button, {
        [styles.mini]: mini,
      })}
      {...props}
    >
      {children}
    </button>
  );
}
