import classNames from "classnames";
import { IAddButtonProps } from "./AddButton.props";
import styles from "./AddButton.module.css";
import iconSrc from "./icon.svg";
import Image from "next/image";

export function AddButton({
  className,
  ...props
}: IAddButtonProps): JSX.Element {
  return (
    <button className={classNames(className, styles.addButton)} {...props}>
      <Image src={iconSrc} alt="" width={50} />
    </button>
  );
}
