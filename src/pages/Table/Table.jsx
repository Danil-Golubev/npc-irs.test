import { useState, useEffect, useMemo } from 'react';
import { useReactTable, getCoreRowModel, getFilteredRowModel, flexRender } from '@tanstack/react-table';
import styles from './style.module.css';
import citizensData from '../../citizens';
import { Link } from 'react-router-dom';

export const Table = () => {
	const [citizens, setCitizens] = useState([]);
	const [globalFilter, setGlobalFilter] = useState('');

	useEffect(() => {
		setCitizens(citizensData);
	}, []);

	const columns = useMemo(
		() =>
			citizens.length
				? [
						{ accessorKey: 'id', header: 'ID' },
						{ accessorKey: 'fullName', header: 'ФИО' },
						{ accessorKey: 'birthDate', header: 'Дата рождения' },
						{ accessorKey: 'gender', header: 'Пол' },
						{ accessorKey: 'address', header: 'Адрес' },
						{ accessorKey: 'phone', header: 'Телефон' },
						{ accessorKey: 'email', header: 'Email' },
						{ accessorKey: 'education', header: 'Образование' },
						{ accessorKey: 'childrenCount', header: 'Дети' },
						{ accessorKey: 'isSmoker', header: 'Курение', cell: (info) => (info.getValue() ? 'Да' : 'Нет') },
						{ accessorKey: 'height', header: 'Рост' },
						{ accessorKey: 'weight', header: 'Вес' },
						{ accessorKey: 'hobbies', header: 'Хобби', cell: (info) => info.getValue().join(', ') },
						{
							accessorKey: 'familyMembers',
							header: 'Члены семьи',
							cell: (info) =>
								info
									.getValue()
									.map((member) => `${member.relation}: ${member.name}`)
									.join(', '),
						},
				  ]
				: [],
		[citizens],
	);

	const table = useReactTable({
		data: citizens,
		columns,
		getCoreRowModel: getCoreRowModel(),
		getFilteredRowModel: getFilteredRowModel(),
		globalFilterFn: (row, columnId, filterValue) =>
			row.getValue(columnId)?.toString().toLowerCase().includes(filterValue.toLowerCase()),
		state: { globalFilter },
		onGlobalFilterChange: setGlobalFilter,
	});

	return (
		<div className={styles.tableWrapper}>
			<div className={styles.controls}>
				<p className={styles.totalCount}>
					Всего людей:
					<p className={styles.count}>{table.getRowModel().rows.length}</p>
				</p>

				<input
					type='text'
					placeholder='Фильтр по имени'
					value={globalFilter}
					onChange={(e) => setGlobalFilter(e.target.value)}
					className={styles.input}
				/>
			</div>
			<div className={styles.tableContainer}>
				<table className={styles.table}>
					<thead>
						{table.getHeaderGroups().map((headerGroup) => (
							<tr key={headerGroup.id} className={styles.tr}>
								{headerGroup.headers.map((header) => (
									<th key={header.id} className={styles.th}>
										{flexRender(header.column.columnDef.header, header.getContext())}
									</th>
								))}
							</tr>
						))}
					</thead>
					<tbody>
						{table.getRowModel().rows.map((row) => (
							<tr key={row.id} className={styles.tr}>
								{row.getVisibleCells().map((cell) => (
									<td key={cell.id} className={styles.td}>
										<Link to={`/citizen/${row.original.id}`} className={styles.rowLink}>
											{flexRender(cell.column.columnDef.cell, cell.getContext())}
										</Link>
									</td>
								))}
							</tr>
						))}
					</tbody>
				</table>
			</div>
		</div>
	);
};
