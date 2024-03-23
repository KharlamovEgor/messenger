import styles from "./Search.module.css";
import { ISearchProps } from "./Search.props";
import classNames from "classnames";

export function Search({
  className,
  placeholder = "Search",
  ...props
}: ISearchProps): JSX.Element {
  return (
    <input
      className={classNames(className, styles.input)}
      placeholder={placeholder}
      {...props}
    />
  );
}
