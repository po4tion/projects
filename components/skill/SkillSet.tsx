import Image from 'next/image';
import { skills } from 'helpers/skills';

function SkillSet() {
	return (
		<div className="container flex flex-col items-center justify-center min-h-[700px] max-w-sm md:max-w-lg lg:max-w-4xl mx-auto h-screen">
			<h1 className="border-b-4 border-b-blue-400 font-noto text-4xl font-bold mb-10">
				SKILLS
			</h1>
			<div className="grid gap-y-10 gap-x-14 grid-cols-3 grid-rows-4 lg:grid-cols-4 lg:grid-rows-3">
				{skills.map(item => (
					<Image
						key={item.name}
						src={`/images/skillsImg/${item.svgName}.svg`}
						alt={item.name}
						width={200}
						height={200}
						quality={100}
					/>
				))}
			</div>
		</div>
	);
}

export default SkillSet;
