import Image from "next/image";
import styles from "./Buttons.module.scss";
import classNames from "classnames";
import { useTheme } from "hooks/useTheme";

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
  isIcon,
  isActive,
  type,
  text,
}) => {
  const { theme } = useTheme();
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
          className={classNames(styles['button__icon'], { [styles["button__icon--light"]]: theme.themeTitle === 'light' })}
          width={30}
          height={30}
        />
      )}
      {text}
    </button>
  );
};
