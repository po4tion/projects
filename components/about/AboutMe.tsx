import Image from 'next/image';

function AboutMe() {
	return (
		<div
			id="about-me"
			className="container mx-auto  min-h-[700px] h-screen flex flex-col lg:flex-row justify-evenly items-center select-none"
		>
			<div className="relative w-72 h-72 rounded-full border-solid border-2 border-gray mr-2">
				<Image
					src="/images/aboutImg/donggyu.webp"
					alt="프로필 사진"
					layout="fill"
					objectFit="cover"
					className="rounded-full"
					quality={100}
					priority
				/>
			</div>
			<div className="mt-4 lg:mt-0 flex flex-col items-center lg:items-start">
				<h1 className="border-b-4 border-b-blue-400 font-noto text-4xl font-bold mb-2">
					ABOUT ME
				</h1>
				<p className="font-noto max-w-md lg:max-w-lg">
					Lorem ipsum dolor sit amet, consectetur adipisicing elit. Eveniet in
					est voluptatem excepturi facere possimus inventore, vero porro a,
					dolorum et praesentium sit nesciunt ipsa, distinctio incidunt eum
					commodi magni deleniti quos! Nemo odio adipisci repellat dolorum sint
					iure culpa, placeat numquam ipsum ipsam! Vitae at incidunt eveniet
					atque odio, corrupti non quia quas debitis corporis ex enim aspernatur
					officia, voluptates illum cum quisquam, possimus ad dolorem? Ad
					dolores quasi recusandae laudantium excepturi, repellat similique
					nobis nihil mollitia eaque eos adipisci deleniti quidem ratione
					nostrum consequuntur molestiae officia aut voluptatibus ea. Quam aut
					non explicabo molestiae, doloribus omnis esse voluptas.
				</p>
			</div>
		</div>
	);
}

export default AboutMe;
