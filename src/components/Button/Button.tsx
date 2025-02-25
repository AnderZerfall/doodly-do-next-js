import Image from "next/image";
import styles from './Buttons.module.scss';

interface Props {
    icon?: string;
    handleClick?: () => void;
    className?: string;
    type?: "submit" | "reset" | "button";
    text?: string;
}

export const Button: React.FC<Props> = ({ icon, handleClick, className, type, text }) => {
    const buttonClass = className ? `${styles.button} ${styles['button--icon']}` : styles.button
    
    return (
        <button
            // styles={styles.button}
            onClick={handleClick}
            className={buttonClass}
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
}