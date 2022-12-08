import type { GetStaticProps, NextPage } from 'next';
import Header from '../components/Header';
import axios from '../axios';
import { InferGetStaticPropsType } from 'next';
import Table from '../components/Table';

const Home: NextPage = ({
	roster
}: InferGetStaticPropsType<typeof getStaticProps>) => {
	return (
		<div className="flex min-h-screen flex-col">
			<Table rosterData={roster} />
		</div>
	);
};

interface Player {
	jerseyNumber: number;
	person: {
		fullName: string;
		id: number;
		link: string;
	};
	position: { abbreviation: string; code: string; name: string; type: string };
}

export const getStaticProps: GetStaticProps = async () => {
	const result = await axios.get('/teams/28/roster');
	const roster = result.data.roster.map((elem: Player) => ({
		number: elem.jerseyNumber,
		name: elem.person.fullName,
		position: elem.position.abbreviation
	}));
	return {
		props: { roster }
	};
};

export default Home;
