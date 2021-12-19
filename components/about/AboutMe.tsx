import Image from 'next/image';
import Typed from 'react-typed';

function AboutMe() {
	return (
		<div className="container mx-auto  min-h-[700px] h-screen flex flex-col lg:flex-row justify-evenly items-center select-none">
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
			<div className="flex flex-col items-center lg:items-start">
				<h1 className="border-b-4 border-b-blue-400 font-noto text-4xl font-bold mb-2">
					ABOUT ME
				</h1>
				<div className="w-[700px] max-w-md sm:max-w-xl font-noto">
					<p className="text-center w-full lg:text-left text-xl">
						안녕하세요, 만나뵙게 되어 반갑습니다. <br />
						배움과 학습을 통해 성장하는 주니어 개발자,{' '}
						<span className="text-sky-500 text-2xl">
							<Typed
								strings={[' ', '김동규', ' ']}
								typeSpeed={40}
								backSpeed={40}
								loop
							/>
						</span>
						입니다.
					</p>
					<br />
					<p className="text-xl text-center lg:text-left">
						새롭고 다양한 분야의 기술들을 배우는 것을 즐거워하며 학습한 기술을
						바로 사용해 볼 정도로 개발에 대한 큰 흥미와 열정을 가지고 있습니다.
						<br />
						<br />
						<figure className="bg-slate-200 rounded-md">
							<blockquote cite="https://hub.zum.com/yoonhongsik/3790">
								<p>
									&#34;남이 자기를 알아주지 못함을 걱정하지 말고 자기가 남을
									알지 못함을 걱정하여라.&#34;
								</p>
							</blockquote>
							<figcaption className="text-center">
								—공자, <cite>논어 &#39;학이&#39;</cite>
							</figcaption>
						</figure>
					</p>
					<br />
					<p className="text-xl text-center lg:text-left"></p>
					<br />
					<p className="text-xl text-center lg:text-left">
						항상 머릿속을 유영하는 문구입니다.
						<br />
						<br />
						피드백과 타인의 코드를 긍정적으로 수용하는 자세를 통해 보다 나은
						클린 코드 개발을 목표로 합니다. 남을 인정하는 자세부터 시작하여 제
						자신을 계속해서 성장해 나갈 수 있는 발판을 마련해주고자 합니다.
					</p>
				</div>
			</div>
		</div>
	);
}

export default AboutMe;
