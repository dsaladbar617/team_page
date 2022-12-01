import { useCallback, useState } from 'react';

interface Player {
	jerseyNumber: number;
	person: {
		fullName: string;
		id: number;
		link: string;
	};
	position: { abbreviation: string; code: string; name: string; type: string };
}

interface TableProps {
	rosterData: Player[];
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
	// if (!sortKey) return tableData;

	// const sortedData = rosterdata.sort((a,b) => {
	// 	return a[sortKey] > b[sortKey] ? 1 : -1
	// })

	return tableData;
};

const Table = ({ rosterData }: TableProps) => {
	const headers = [
		{ key: 'number', label: 'Number' },
		{ key: 'name', label: 'Name' },
		{ key: 'position', label: 'Position' }
	];
	const [sortKey, setSortedKey] = useState<SortKeys>('number');
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

	return (
		<table className=" text-sm text-left text-gray-500 dark:text-gray-400">
			<thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
				<tr>
					{headers.map((row) => (
						<td key={row.key}>{row.label}</td>
					))}
				</tr>
			</thead>
			<tbody className="bg-gray-500">
				{sortedData().map((player: Player, index: number) => (
					<tr key={index}>
						<td>{player.jerseyNumber}</td>
						<td>{player.person.fullName}</td>
						<td>{player.position.abbreviation}</td>
					</tr>
				))}
			</tbody>
		</table>
	);
};

export default Table;
