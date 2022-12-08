import type { GetStaticProps, NextPage } from 'next';
import axios from '../axios';
import { InferGetStaticPropsType } from 'next';

const Schedule: NextPage = ({
	schedule
}: InferGetStaticPropsType<typeof getStaticProps>) => {
	const scheduleData = schedule.map((item: Schedule) => ({
		date: item.date,
		games: item.games
	}));
	console.log(scheduleData[0].games[0]);
	return (
		<ul>
			{scheduleData.map((item: Schedule) => (
				<li>{`${item.date} Away: ${item.games[0].teams.away.team.name} Home: ${item.games[0].teams.home.team.name}`}</li>
			))}
		</ul>
	);
};

type Schedule = {
	date: string;
	games: {
		content: {
			link: string;
		};
		gameDate: string;
		gamePk: number;
		gameType: string;
		link: string;
		season: string;
		status: {
			abstractGameState: string;
			codedGameState: string;
			detailedState: string;
			startTimeTBD: boolean;
			statusCode: string;
		};
		teams: {
			away: {
				leagueRecord: {
					loses: number;
					ot: number;
					type: string;
					wins: number;
				};
				score: number;
				team: {
					id: number;
					link: string;
					name: string;
				};
			};
			home: {
				leagueRecord: {
					loses: number;
					ot: number;
					type: string;
					wins: number;
				};
				score: number;
				team: {
					id: number;
					link: string;
					name: string;
				};
			};
		};
		venue: {
			link: string;
			name: string;
		};
	}[];
	totalEvents: number;
	totalGames: number;
	totalItems: number;
	totalMatches: number;
	events: any[];
	matches: any[];
};

export const getStaticProps: GetStaticProps = async () => {
	const result = await axios.get(
		'/schedule?teamId=28&startDate=2022-10-07&endDate=2023-06-01'
	);

	const schedule = await result.data.dates;

	// const schedule = JSON.stringify(result);

	// const schedule = await scheduleData.dates.map((item: Schedule) => {
	// 	item.date, item.games;
	// });
	return {
		props: { schedule }
	};
};

export default Schedule;
