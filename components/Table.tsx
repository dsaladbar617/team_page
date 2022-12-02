import { MouseEventHandler, useCallback, useState } from 'react';

interface Player {
	number: number;
	name: string;
	position: string;
}

type SortKeys = 'number' | 'name' | 'position';

type SortOrder = 'asc' | 'desc';

const sortData = ({
	tableData,
	sortKey,
	reverse
}: {
	tableData: Player[];
	sortKey: SortKeys;
	reverse: boolean;
}) => {
	if (!sortKey) return tableData;

	const sortedData = tableData.sort((a, b) => {
		if (sortKey === 'number') {
			return +a[sortKey] > +b[sortKey] ? 1 : -1;
		} else {
			return a[sortKey] > b[sortKey] ? 1 : -1;
		}
	});

	if (reverse) {
		return sortedData.reverse();
	}

	return sortedData;
};

const Table = ({ rosterData }: { rosterData: Player[] }) => {
	const headers: { key: SortKeys; label: string }[] = [
		{ key: 'number', label: 'Number' },
		{ key: 'name', label: 'Name' },
		{ key: 'position', label: 'Position' }
	];
	const [sortKey, setSortedKey] = useState<SortKeys>('position');
	const [sortOrder, setSortOrder] = useState<SortOrder>('asc');

	const sortedData = useCallback(
		() =>
			sortData({
				tableData: rosterData,
				sortKey,
				reverse: sortOrder === 'desc'
			}),
		[rosterData, sortKey, sortOrder]
	);

	const SortButton = ({
		sortOrder,
		columnKey,
		sortKey,
		onClick
	}: {
		sortOrder: SortOrder;
		columnKey: SortKeys;
		sortKey: SortKeys;
		onClick: MouseEventHandler<HTMLButtonElement>;
	}) => {
		return (
			<button
				className={`${
					sortKey === columnKey && sortOrder === 'desc' ? 'rotate-180' : null
				}`}
				onClick={onClick}>
				⬆
			</button>
		);
	};

	const changeSort = (key: SortKeys) => {
		setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
		setSortedKey(key);
	};

	return (
		<table className=" text-sm text-center text-gray-500 dark:text-gray-400 w-2/3 mx-auto my-2 shadow-lg rounded">
			<thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400 rounded-md">
				<tr>
					{headers.map((row) => (
						<th className="p-4 font-bold" key={row.key}>
							{row.label}
							<SortButton
								columnKey={row.key}
								onClick={() => changeSort(row.key)}
								{...{ sortOrder, sortKey }}
							/>
						</th>
					))}
				</tr>
			</thead>
			<tbody className="divide-y divide-gray-300">
				{sortedData().map((player: Player, index: number) => (
					<tr className="" key={index}>
						<td className="p-4">{player.number}</td>
						<td className="p-4">{player.name}</td>
						<td className="p-4">{player.position}</td>
					</tr>
				))}
			</tbody>
		</table>
	);
};

export default Table;
