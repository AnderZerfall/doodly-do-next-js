import styles from './Cursor.module.scss';

interface Props {
    username: string;
    cords: { x: number, y: number }
}

export const Cursor: React.FC<Props> = ({ username, cords }) => {
    return <div
        className={styles["cursor"]}
        style={{
            top: cords.x - 100,
            left: cords.y - 100,
        }}
    >
        {username}
    </div>
};