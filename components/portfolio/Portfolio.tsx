import Image from 'next/image';
import { portfolioData } from 'helpers/portfolioData';
import { BsArrowRightSquareFill } from 'react-icons/bs';

function Portfolio() {
	return (
		<div className="container w-screen mx-auto h-[1200px] min-h-[800px]">
			<div className="flex items-center justify-center">
				<h1 className="border-b-4 border-b-blue-400 font-noto text-4xl font-bold mb-10">
					PORTFOLIO
				</h1>
			</div>
			<div className="flex items-center justify-center flex-col">
				{portfolioData.map(item => (
					<div
						key={item.desc}
						className="flex items-start justify-center flex-col lg:flex-row mb-10"
					>
						<div className="relative w-[500px] h-[500px] rounded-md border-solid border-2 border-gray mr-2">
							<Image
								src={`/images/portfolioImg/${item.image}`}
								alt="프로필 사진"
								layout="fill"
								objectFit="cover"
								className="rounded-md"
								quality={100}
								priority
							/>
						</div>
						<div className="mt-4 lg:mt-0 w-[500px] h-[500px] flex flex-col items-center rounded-md border-solid border-2 border-gray">
							<h1 className="border-b-4 border-b-blue-200 font-noto text-4xl font-bold mb-2">
								{item.desc}
							</h1>
							<div className="grid gap-2 grid-cols-3 grid-rows-2 mb-2">
								{item.tech.map((skill, idx) => (
									<span
										key={skill}
										className="w-[100px] flex items-center justify-evenly py-[8px] px-[5px] rounded-[10px] bg-slate-500 font-bold text-[13px] text-white shadow-md mx-[10px] font-noto"
									>
										{item.icons[idx]}
										{skill}
									</span>
								))}
							</div>
							<p className="font-noto max-w-md lg:max-w-lg lg:p-2 mb-4">
								{item.body}
							</p>
							<div className="w-full max-w-md lg:max-w-lg lg:p-2 flex flex-col flex-start font-noto">
								<div className="mb-4">
									<p className="font-bold text-lg">주요 기능</p>
									<p className="flex items-center">
										<BsArrowRightSquareFill className="mr-2" />
										{item.stack[0]}
									</p>
								</div>

								<div className="mb-4">
									<p className="font-bold text-lg">코드 링크</p>
									<p className="flex items-center">
										<BsArrowRightSquareFill className="mr-2" />
										<a
											href={item.stack[1]}
											alt={item.desc}
											target="_blank"
											rel="noreferrer"
											className="hover:text-cyan-500"
										>
											{item.stack[1]}
										</a>
									</p>
								</div>

								<div>
									<p className="font-bold text-lg">도메인(배포완료)</p>
									<p className="flex items-center">
										<BsArrowRightSquareFill className="mr-2" />
										<a
											href={item.stack[2]}
											alt={item.desc}
											target="_blank"
											rel="noreferrer"
											className="hover:text-cyan-500"
										>
											{item.stack[2]}
										</a>
									</p>
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
