import classNames from "classnames";
import { IMessageProps } from "./Message.props";
import styles from "./Message.module.css";

export function Message({
  children,
  className,
  ...props
}: IMessageProps): JSX.Element {
  return (
    <div className={classNames(className, styles.message)} {...props}>
      {children}
    </div>
  );
}
