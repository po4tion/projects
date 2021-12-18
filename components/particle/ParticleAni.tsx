import ParticleAnimation from 'react-particle-animation';

function ParticleAni() {
	return (
		<div id="home">
			<ParticleAnimation
				style={{ height: '100vh' }}
				background={{ r: 21, g: 22, b: 23, a: 1 }}
				particleSpeed={0.1}
				particleRadius={1.5}
				color={{ r: 158, g: 217, b: 249, a: 255 }}
			/>
		</div>
	);
}

export default ParticleAni;
