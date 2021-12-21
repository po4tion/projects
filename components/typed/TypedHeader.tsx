import Typed from 'react-typed';

function TypedHeader() {
	return (
		<div className="h-screen flex items-center justify-center flex-col text-black text-4xl font-noto select-none">
			<h1>저는 누구일까요?</h1>
			<br />
			<Typed
				className="text-6xl text-sky-500 text-center"
				strings={[
					' ',
					'개발이 재밌는',
					'학습과 지식을 원하는',
					'기술 흡수력이 남다른',
					'신기술에 배타적이지 않은',
					'Front-end developer',
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
