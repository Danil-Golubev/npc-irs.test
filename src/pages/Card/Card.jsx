import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import citizens from '../../citizens.json';
import styles from './style.module.css';

export const Card = () => {
	const { id } = useParams();
	const [citizen, setCitizen] = useState(null);

	useEffect(() => {
		const foundCitizen = citizens.find((citizen) => citizen.id === parseInt(id));
		setCitizen(foundCitizen);
	}, [id]);

	if (!citizen) {
		return <div className={styles.noCitizen}>User not found</div>;
	}

	return (
		<div className={styles.cardWrapper}>
			<div className={styles.card}>
				<div className={styles.mainInfoBlock}>
					<div className={styles.avatarBlock}>
						{citizen.gender === 'Мужской' ? (
							<img className={styles.avatar} src='/images/UserMen.svg' alt={citizen.fullName} />
						) : (
							<img className={styles.avatar} src='/images/UserWomen.svg' alt={citizen.fullName} />
						)}
					</div>
					<div className={styles.citizenInfo}>
						<p className={styles.fullName}>{citizen.fullName}</p>
						<p className={styles.details}>
							<strong>Дата рождения:</strong> {citizen.birthDate}
						</p>
						<p className={styles.details}>
							<strong>Пол:</strong> {citizen.gender}
						</p>
					</div>
				</div>
				<div className={styles.infoBlock}>
					<div className={styles.leftColumn}>
						<div className={styles.infoRow}>
							<p>
								<strong>Адрес:</strong> {citizen.address}
							</p>
						</div>
						<div className={styles.infoRow}>
							<p>
								<strong>Телефон:</strong> {citizen.phone}
							</p>
						</div>
						<div className={styles.infoRow}>
							<p>
								<strong>Email:</strong> {citizen.email}
							</p>
						</div>
						<div className={styles.infoRow}>
							<p>
								<strong>Образование:</strong> {citizen.education}
							</p>
						</div>
						<div className={styles.infoRow}>
							<p>
								<strong>Дети:</strong> {citizen.childrenCount}
							</p>
						</div>
						<div className={styles.infoRow}>
							<p>
								<strong>Курит:</strong> {citizen.isSmoker ? 'Да' : 'Нет'}
							</p>
						</div>
						<div className={styles.infoRow}>
							<p>
								<strong>Рост:</strong> {citizen.height} см
							</p>
						</div>
						<div className={styles.infoRow}>
							<p>
								<strong>Вес:</strong> {citizen.weight} кг
							</p>
						</div>
						<div className={styles.infoRow}>
							<p>
								<strong>Хобби:</strong> {citizen.hobbies.join(', ')}
							</p>
						</div>
					</div>
					<div className={styles.rightColumn}>
						<strong>Члены семьи:</strong>
						{citizen.familyMembers.length ? (
							<div className={styles.familyMembersBlock}>
								{citizen.familyMembers.map((member, index) => (
									<div className={styles.familyMember} key={index}>
										<div className={styles.familyAvatarBlock}>
											<img className={styles.familyAvatar} src='/images/User.svg' alt={member.name} />
										</div>
										<div className={styles.familyInfo}>
											<p className={styles.familyName}>{member.name}</p>
											<p>
												<strong>Отношение:</strong> {member.relation}
											</p>
											<p>
												<strong>Дата рождения:</strong> {member.birthDate}
											</p>
										</div>
									</div>
								))}
							</div>
						) : (
							<p>Нет членов семьи</p>
						)}
					</div>
				</div>
			</div>
		</div>
	);
};
