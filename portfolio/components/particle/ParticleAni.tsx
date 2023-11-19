import Particles from 'react-tsparticles';

function ParticleAni() {
	return (
		<div>
			<Particles
				id="tsparticles"
				style={{ zIndex: -2 }}
				options={{
					particles: {
						number: {
							value: 110,
							density: {
								enable: true,
								value_area: 1200,
							},
						},
						color: {
							value: '#C2BFBF',
						},
						shape: {
							type: 'circle',
							stroke: {
								width: 0,
							},
							polygon: {
								nb_sides: 6,
							},
						},
						line_linked: {
							enable: false,
							distance: 150,
							opacity: 0.9,
							width: 1,
							shadow: {
								enable: true,
								color: '#e74c3c',
								blur: 5,
							},
						},
						move: {
							enable: true,
							random: true,
							speed: 0.6,
							attract: {
								rotateX: 600,
								rotateY: 1200,
							},
						},
						size: {
							value: 4,
							random: true,
							anim: {
								speed: 40,
								size_min: 0.1,
							},
						},
						opacity: {
							value: 0.8,
							anim: {
								speed: 1,
								opacity_min: 0.1,
							},
						},
					},
					interactivity: {
						events: {
							onClick: {
								enable: true,
								mode: 'bounce',
							},
							onHover: {
								enable: true,
								mode: 'bounce',
							},
							resize: true,
						},
					},
				}}
			/>
		</div>
	);
}

export default ParticleAni;
