import type { NextPage } from 'next';
import NavigationBar from 'components/navigation/NavigationBar';
import TypedHeader from 'components/typed/TypedHeader';
import ParticleAni from 'components/particle/ParticleAni';
import AboutMe from 'components/about/AboutMe';
import SkillSet from 'components/skill/SkillSet';

const Home: NextPage = () => {
	return (
		<div>
			<NavigationBar />
			<TypedHeader />
			<ParticleAni />
			<AboutMe />
			<SkillSet />
		</div>
	);
};

export default Home;
