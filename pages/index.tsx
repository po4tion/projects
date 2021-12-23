import type { NextPage } from 'next';
import { NextSeo } from 'next-seo';
import NavigationBar from 'components/navigation/NavigationBar';
import TypedHeader from 'components/typed/TypedHeader';
import ParticleAni from 'components/particle/ParticleAni';
import AboutMe from 'components/about/AboutMe';
import SkillSet from 'components/skill/SkillSet';
import PortFolio from 'components/portfolio/Portfolio';
import Contact from 'components/contact';

const Home: NextPage = () => {
	return (
		<>
			<NextSeo
				title={process.env.NEXT_PUBLIC_APP_NAME}
				description="김동규의 포트폴리오"
				canonical={`${process.env.NEXT_PUBLIC_DOMAIN}`}
				openGraph={{
					url: `${process.env.NEXT_PUBLIC_DOMAIN}`,
					title: `${process.env.NEXT_PUBLIC_APP_NAME} | 김동규`,
					description: '김동규의 포트폴리오',
					images: [
						{
							url: `${process.env.NEXT_PUBLIC_DOMAIN}/images/portfolioImg/portfolio/home.webp`,
							width: 500,
							height: 500,
							alt: '포트폴리오',
							type: 'image/webp',
						},
					],
					site_name: process.env.NEXT_PUBLIC_APP_NAME,
				}}
			/>
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
				<span
					id="portfolio"
					className="border-2 block h-[64px] invisible"
				></span>
				<PortFolio />
				<Contact />
			</div>
		</>
	);
};

export default Home;
