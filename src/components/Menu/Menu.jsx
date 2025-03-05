import styles from './style.module.css';
import { Link } from 'react-router-dom';
export const Menu = () => {
	return (
		<div className={styles.mainBlock}>
			<div className={styles.helloBlock}>
				<p>Добро пожаловать</p>
			</div>
			<Link to='/'>
				<div className={styles.buttonBlock}>
					<div className={styles.buttonContent}>
						<img className={styles.icon} alt='home' src='/images/Home.svg' />
						<p>Главная страница</p>
					</div>
				</div>
			</Link>
			<Link to='/table'>
				<div className={styles.buttonBlock}>
					<div className={styles.buttonContent}>
						<img className={styles.icon} alt='home' src='/images/Table.svg' />
						<p>Таблица граждан</p>
					</div>
				</div>
			</Link>
		</div>
	);
};
