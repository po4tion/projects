import Image from 'next/image';
import { portfolioData } from 'helpers/portfolioData';
import { BsArrowRightSquareFill } from 'react-icons/bs';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

interface SliderSettings {
	dots: boolean;
	infinite: boolean;
	speed: number;
	slidesToShow: number;
	slidesToScroll: number;
	autoplay: boolean;
	autoplaySpeed: number;
}

function Portfolio() {
	const settings: SliderSettings = {
		dots: true,
		infinite: true,
		speed: 500,
		slidesToShow: 1,
		slidesToScroll: 1,
		autoplay: true,
		autoplaySpeed: 2000,
	};

	return (
		<div className="container w-screen mx-auto h-auto">
			<div className="flex items-center justify-center">
				<h1
					className="border-b-4 border-b-blue-400 font-noto text-4xl font-bold mb-10"
					data-cy="Portfolio"
				>
					PORTFOLIO
				</h1>
			</div>
			<div className="flex items-center justify-center flex-col">
				{portfolioData.map(item => (
					<div
						key={item.desc}
						className="flex items-center justify-center flex-col lg:flex-row mb-10"
					>
						<Slider
							{...settings}
							className="w-[350px] h-[350px] sm:w-[500px] sm:h-[500px]"
						>
							{item.images.map(image => (
								<div
									key={image}
									className="relative w-[350px] h-[350px] sm:w-[500px] sm:h-[500px] rounded-md border-solid border-2 border-gray mr-2"
								>
									<Image
										src={`/images/portfolioImg/${item.src}/${image}${item.ext}`}
										alt="프로필 사진"
										layout="fill"
										className="rounded-md"
										quality={100}
										priority
									/>
								</div>
							))}
						</Slider>

						<div className="mt-8 lg:mt-0 w-[350px] h-auto sm:w-[500px] sm:h-[500px] flex flex-col items-center rounded-md border-solid border-2 border-gray">
							<h1
								className="border-b-4 border-b-blue-200 font-noto text-4xl font-bold mb-2"
								data-cy={item.desc}
							>
								{item.desc}
							</h1>
							<div className="grid gap-2 grid-cols-3 grid-rows-2 mb-2">
								{item.tech.map((skill, idx) => (
									<span
										key={skill}
										className="w-[80px] sm:w-[100px] flex items-center justify-evenly py-[8px] px-[5px] rounded-[10px] bg-slate-500 font-bold text-[10px] sm:text-[13px] text-white shadow-md mx-[10px] font-noto"
									>
										{item.icons[idx]}
										{skill}
									</span>
								))}
							</div>
							<p className="font-noto max-w-sm sm:max-w-md lg:max-w-lg lg:p-2 mb-4">
								{item.body}
							</p>
							<div className="w-full max-w-sm sm:max-w-md lg:max-w-lg lg:p-2 flex flex-col flex-start font-noto">
								<p className="font-bold text-lg">주요 기능</p>
								<div className="mb-2 flex items-center justify-start">
									<p className="flex items-center">
										<BsArrowRightSquareFill className="mr-2" />
									</p>
									<span>{item.stack[0]}</span>
								</div>

								<p className="font-bold text-lg">코드 링크</p>
								<div className="mb-2 flex items-center justify-start">
									<p className="flex items-center">
										<BsArrowRightSquareFill className="mr-2" />
									</p>
									<a
										href={item.stack[1]}
										target="_blank"
										rel="noreferrer"
										className="hover:text-cyan-500"
									>
										{item.stack[1]}
									</a>
								</div>

								<p className="font-bold text-lg">
									{item.isDeploy
										? '도메인(배포완료)'
										: '도메인(배포중지-동영상 대체)'}
								</p>
								<div className="flex items-center justify-start">
									<p className="flex items-center">
										<BsArrowRightSquareFill className="mr-2" />
									</p>
									<a
										href={item.stack[2]}
										target="_blank"
										rel="noreferrer"
										className="hover:text-cyan-500"
									>
										{item.stack[2]}
									</a>
								</div>
							</div>
						</div>
					</div>
				))}
			</div>
		</div>
	);
}

export default Portfolio;
