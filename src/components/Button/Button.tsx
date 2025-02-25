import Image from "next/image";
import './Buttons.scss';

interface Props {
    icon?: string;
    handleClick?: () => void;
    className?: string;
    type?: "submit" | "reset" | "button";
    text?: string;
}

export const Button: React.FC<Props> = ({ icon, handleClick, className, type, text }) => {
    return (
        <button
            onClick={handleClick}
            className={`button ${className}`}
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