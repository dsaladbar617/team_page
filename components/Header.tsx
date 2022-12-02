import Image from 'next/image';
import sharksLogo from '../public/sharks.png';

const Header = () => {
	return (
		<div className="flex flex-row justify-center bg-teal-700">
			<h1 className="p-6 text-5xl text-center my-0">San Jose Sharks</h1>
			<Image
				className="h-20 w-auto"
				src={sharksLogo}
				alt="San Jose Sharks Logo"
			/>
		</div>
	);
};

export default Header;
