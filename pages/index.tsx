import type { GetStaticProps, NextPage } from 'next';
import axios from '../axios';
import { InferGetStaticPropsType } from 'next';

const Home: NextPage = ({}: InferGetStaticPropsType<typeof getStaticProps>) => {
	return (
		<div className="flex min-h-screen flex-col">
			<h1>Welcome</h1>
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
