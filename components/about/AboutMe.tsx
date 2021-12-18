import Image from 'next/image';

function AboutMe() {
	return (
		<div
			id="about-me"
			className="container mx-auto my-12 h-screen flex flex-col lg:flex-row justify-evenly items-center select-none"
		>
			<div className="relative w-72 h-72 rounded-full border-solid border-2 border-gray mr-2">
				<Image
					src="/images/donggyu.webp"
					alt="프로필 사진"
					layout="fill"
					objectFit="cover"
					className="rounded-full"
				/>
			</div>
			<div className="mt-4 lg:mt-0 flex flex-col items-center lg:items-start">
				<h1 className="border-b-4 border-b-blue-400 font-noto text-4xl font-bold mb-2">
					ABOUT ME
				</h1>
				<p className="font-noto max-w-md lg:max-w-lg">
					Lorem ipsum dolor sit amet, consectetur adipisicing elit. Cumque et
					asperiores dolores perspiciatis quo ab facilis iusto non iste atque.
				</p>
			</div>
		</div>
	);
}

export default AboutMe;
