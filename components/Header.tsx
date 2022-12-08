import Image from 'next/image';
import sharksLogo from '../public/sharks.png';
import Link from 'next/link';

const Header = () => {
	return (
		<div className="flex flex-row justify-around bg-teal-700">
			<Link href="/">
				<div className="flex flex-row">
					<h1 className="p-6 text-3xl text-center my-0">San Jose Sharks</h1>
					<Image
						className="h-12 w-auto my-auto"
						src={sharksLogo}
						alt="San Jose Sharks Logo"
					/>
				</div>
			</Link>
			<ul className="flex flex-row justify-center mx-8">
				<li className="my-auto cursor-pointer hover:scale-110 hover:underline">
					<Link href="/roster">Roster</Link>
				</li>
				<li className="my-auto mx-2 cursor-pointer hover:scale-110 hover:underline">
					<Link href="/schedule">Schedule</Link>
				</li>
			</ul>
		</div>
	);
};

export default Header;
