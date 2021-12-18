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
			<TypedHeader />
			<ParticleAni />
			<AboutMe />
			<SkillSet />
			<span
				id="portfolio"
				className="border-2 block h-[128px] invisible"
			></span>
			<PortFolio />
			<Contact />
		</div>
	);
};

export default Home;
