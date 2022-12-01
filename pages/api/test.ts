import type { NextApiRequest, NextApiResponse } from 'next';
import axios from '../../axios';

type Data = {
	name: string;
};

const handler = async (req: NextApiRequest, res: NextApiResponse<Data>) => {
	const result = await axios.get('/teams/28/roster');

	const data = result.data;

	res.status(200).json(data);
};

export default handler;
