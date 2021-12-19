import type { NextPage } from 'next';
import NavigationBar from 'components/navigation/NavigationBar';
import TypedHeader from 'components/typed/TypedHeader';
import ParticleAni from 'components/particle/ParticleAni';
import AboutMe from 'components/about/AboutMe';
import SkillSet from 'components/skill/SkillSet';
import PortFolio from 'components/portfolio/Portfolio';
import Contact from 'components/contact';

const Home: NextPage = () => {
	return (
		<div>
			<NavigationBar />
			<span id="home" className="border-2 block invisible"></span>
			<TypedHeader />
			<ParticleAni />
			<span
				id="about-me"
				className="border-2 block h-[64px] lg:h-[0px] invisible"
			></span>
			<AboutMe />
			<span id="skills" className="border-2 block h-[64px] invisible"></span>
			<SkillSet />
			<span id="portfolio" className="border-2 block h-[64px] invisible"></span>
			<PortFolio />
			<Contact />
		</div>
	);
};

export default Home;
