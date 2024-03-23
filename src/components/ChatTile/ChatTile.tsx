import classNames from "classnames";
import styles from "./ChatTile.module.css";
import { IChatTileProps } from "./ChatTile.props";

export function ChatTile({
  recipientName,
  lastMessage,
  className,
  ...props
}: IChatTileProps): JSX.Element {
  return (
    <div className={classNames(styles.tile, className)} {...props}>
      <h3>{recipientName}</h3>
      <p>{lastMessage}</p>
    </div>
  );
}
