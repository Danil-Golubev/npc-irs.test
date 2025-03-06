import { useState, useEffect, useMemo } from 'react';
import { Bar, Pie, Line } from 'react-chartjs-2';
import styles from './style.module.css';
import {
	Chart as ChartJS,
	ArcElement,
	Tooltip,
	Legend,
	CategoryScale,
	LinearScale,
	BarElement,
	LineElement,
	PointElement,
} from 'chart.js';

import citizensData from '../../citizens.json';

ChartJS.register(ArcElement, Tooltip, Legend, CategoryScale, LinearScale, BarElement, LineElement, PointElement);

export const Dashboard = () => {
	const [citizens, setCitizens] = useState([]);

	useEffect(() => {
		setCitizens(citizensData);
	}, []);

	// основная статистика
	const totalCitizens = citizens.length;
	const avgHeight = (citizens.reduce((sum, citizen) => sum + Number(citizen.height), 0) / totalCitizens).toFixed(1);
	const avgWeight = (citizens.reduce((sum, citizen) => sum + Number(citizen.weight), 0) / totalCitizens).toFixed(1);
	const avgChildren = (citizens.reduce((sum, citizen) => sum + citizen.childrenCount, 0) / totalCitizens).toFixed(1);
	const smokersPercentage = ((citizens.filter((citizen) => citizen.isSmoker).length / totalCitizens) * 100).toFixed(1);

	// график зависимости курения от возраста
	const smokingByAge = useMemo(() => {
		const groups = {
			'18-25': { smokers: 0, total: 0 },
			'26-35': { smokers: 0, total: 0 },
			'36-45': { smokers: 0, total: 0 },
			'46+': { smokers: 0, total: 0 },
		};

		citizens.forEach((citizen) => {
			const age = new Date().getFullYear() - new Date(citizen.birthDate).getFullYear();
			let key =
				age >= 18 && age <= 25 ? '18-25' : age >= 26 && age <= 35 ? '26-35' : age >= 36 && age <= 45 ? '36-45' : '46+';
			groups[key].total++;
			if (citizen.isSmoker) groups[key].smokers++;
		});

		return {
			labels: Object.keys(groups),
			datasets: [
				{
					label: 'Процент курящих',
					data: Object.values(groups).map((group) =>
						group.total > 0 ? ((group.smokers / group.total) * 100).toFixed(1) : 0,
					),
					borderColor: '#0053f3',
					backgroundColor: '#FF6384',
					fill: false,
				},
			],
		};
	}, [citizens]);

	//  пол, курение, возраст
	const genderStats = {
		labels: ['Мужчины', 'Женщины'],
		datasets: [
			{
				data: [
					citizens.filter((citizen) => citizen.gender === 'Мужской').length,
					citizens.filter((citizen) => citizen.gender === 'Женский').length,
				],
				backgroundColor: ['#0053f3', '#f300b6'],
				borderRadius: 8,
			},
		],
	};
	const smokingStats = {
		labels: ['Курящие', 'Некурящие'],
		datasets: [
			{
				data: [citizens.filter((citizen) => citizen.isSmoker).length, citizens.filter((c) => !c.isSmoker).length],
				backgroundColor: ['#f300b6', '#0053f3'],
				borderRadius: 8,
			},
		],
	};
	const ageGroups = {
		labels: ['18-25', '26-35', '36-45', '46+'],
		datasets: [
			{
				label: 'Возрастные группы',
				data: Object.values(smokingByAge.datasets[0].data),
				backgroundColor: ['#0053f3', '#f300b6', '#00f331', '#f30c00'],
				borderRadius: 8,
			},
		],
	};

	return (
		<div className={styles.dashboard}>
			<div className={styles.stats}>
				<div className={styles.statBlock}>
					<p>Всего граждан: {totalCitizens}</p>
				</div>
				<div className={styles.statBlock}>
					<p>Средний рост: {avgHeight} см</p>
				</div>
				<div className={styles.statBlock}>
					<p>Средний вес: {avgWeight} кг</p>
				</div>
				<div className={styles.statBlock}>
					<p>Среднее количество детей: {avgChildren}</p>
				</div>
				<div className={styles.statBlock}>
					<p>Курящих:{smokersPercentage}%</p>
				</div>
			</div>

			<div className={styles.fullWidthChart}>
				<h3>Зависимость курения от возраста</h3>
				<Line data={smokingByAge} />
			</div>

			<div className={styles.chartsRow}>
				<div className={styles.chart}>
					<h3>Распределение по полу</h3>
					<Pie data={genderStats} />
				</div>
				<div className={styles.chart}>
					<h3>Курящие vs Некурящие</h3>
					<Pie data={smokingStats} />
				</div>
				<div className={styles.chart}>
					<h3>Возрастные группы</h3>
					<Bar data={ageGroups} />
				</div>
			</div>
		</div>
	);
};
