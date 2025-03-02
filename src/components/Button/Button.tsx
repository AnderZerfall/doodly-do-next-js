import Image from "next/image";
import styles from "./Buttons.module.scss";
import classNames from "classnames";

interface Props {
  icon?: string;
  handleClick?: () => void;
  isIcon?: boolean;
  isActive?: boolean;
  type?: "submit" | "reset" | "button";
  text?: string;
}

export const Button: React.FC<Props> = ({
  icon,
  handleClick,
  isIcon = true,
  isActive,
  type,
  text,
}) => {
  return (
    <button
      onClick={handleClick}
      className={classNames(styles.button, {
        [styles["button--icon"]]: isIcon,
        [styles["button--active"]]: isActive,
      })}
      type={type}
    >
      {icon && (
        <Image
          src={icon}
          alt="button_icon"
          className="button__icon"
          width={30}
          height={30}
        />
      )}
      {text}
    </button>
  );
};
