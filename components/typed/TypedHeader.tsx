import Typed from 'react-typed';

function TypedHeader() {
	return (
		<div className="flex absolute inset-0 z-10 items-center justify-center flex-col text-white text-4xl font-noto select-none">
			<h1>저는 누구일까요?</h1>
			<br />
			<Typed
				strings={[
					' ',
					'개발이 재밌는',
					'학습과 지식을 원하는',
					'기술 흡수력이 남다른',
					'신기술에 배타적이지 않은',
					'Front-end developer 지원자',
					'<김동규 /> 입니다',
					' ',
					' ',
				]}
				typeSpeed={40}
				backSpeed={40}
				loop
			/>
		</div>
	);
}

export default TypedHeader;
