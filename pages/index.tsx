import type { GetStaticProps, NextPage } from 'next';
import Image from 'next/image';
import sharksLogo from '../public/sharks.png';
import axios from '../axios';
import { InferGetStaticPropsType } from 'next';
import Table from '../components/Table';

const Home: NextPage = ({
	roster
}: InferGetStaticPropsType<typeof getStaticProps>) => {
	return (
		<div className="flex min-h-screen flex-col py-2 ">
			<div className="flex flex-row justify-center">
				<h1 className="p-6 text-5xl text-center my-0">San Jose Sharks</h1>
				<Image
					className="h-20 w-auto"
					src={sharksLogo}
					alt="San Jose Sharks Logo"
				/>
			</div>
			<Table rosterData={roster} />
		</div>
	);
};

export const getStaticProps: GetStaticProps = async () => {
	const result = await axios.get('/teams/28/roster');
	const roster = result.data.roster;
	return {
		props: { roster }
	};
};

export default Home;
