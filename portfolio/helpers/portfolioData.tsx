/* 
  포트폴리오 값 설정
*/

import { FaReact, FaGitAlt, FaChartLine } from 'react-icons/fa';
import {
	SiNextdotjs,
	SiMaterialui,
	SiMongodb,
	SiVercel,
	SiTypescript,
	SiTailwindcss,
	SiRedux,
	SiChakraui,
	SiDjango,
} from 'react-icons/si';
import { GiWireCoil } from 'react-icons/gi';

interface PortFolioInfo {
	readonly src: string;
	readonly ext: string;
	readonly images: string[];
	readonly desc: string;
	readonly tech: string[];
	readonly icons: JSX.Element[];
	readonly body: string;
	readonly stack: string[];
	readonly isDeploy: boolean;
}

export const portfolioData: PortFolioInfo[] = [
	{
		src: 'covig',
		ext: '.webp',
		images: ['card', 'chart', 'region', 'dark'],
		desc: 'COVIG',
		tech: ['React', 'Redux', 'Chakra', 'Chart.js', 'Vercel', 'Django'],
		icons: [
			<FaReact key="react" />,
			<SiRedux key="redux" />,
			<SiChakraui key="chakra" />,
			<FaChartLine key="chartjs" />,
			<SiVercel key="vercel" />,
			<SiDjango key="django" />,
		],
		body: '현재 국내 covid-19 상황을 한눈에 볼 수 있도록 만든 React 기반의 Website 입니다. React, Redux, Chakra UI에 집중하여 개발하였습니다. Django 백엔드 개발자와 협업을 하였고 코드 리뷰의 중요성을 알 수 있었던 프로젝트 입니다.',
		stack: [
			'다국어, 다크모드, 확진 정보, 차트 기능',
			'https://github.com/po4tion/covig-front',
			'https://www.youtube.com/watch?v=htIcRam5eqA',
		],
		isDeploy: false,
	},
	{
		src: 'spotify',
		ext: '.webp',
		images: ['spotify'],
		desc: 'Spotify Web Player',
		tech: ['TypeScript', 'React', 'Next.js', 'Tailwind', 'Recoil', 'Vercel'],
		icons: [
			<SiTypescript key="typescript" />,
			<FaReact key="react" />,
			<SiNextdotjs key="nextjs" />,
			<SiTailwindcss key="tailwind" />,
			<GiWireCoil key="recoil" />,
			<SiVercel key="vercel" />,
		],
		body: 'UI는 Spotify web player를 클론하였으며 Spotify API를 통해 나의 플레이리스트들을 조작할 수 있는 웹 서비스 입니다. NextAuth와 Recoil에 집중하여 개발하였으며 외부 API를 다양하게 다룰 수 있었던 프로젝트 입니다.',
		stack: [
			'로그인, 로그아웃, 음악 조작(재생, 일시정지, 볼륨조절 등)',
			'https://github.com/po4tion/spotify',
			'https://spotify-po4tion.vercel.app/',
		],
		isDeploy: true,
	},
	{
		src: 'portfolio',
		ext: '.webp',
		images: ['home', 'about-me', 'skills', 'portfolio'],
		desc: 'PORTFOLIO',
		tech: ['TypeScript ', 'React', 'Next.js', 'TailWind', 'Git', 'Vercel'],
		icons: [
			<SiTypescript key="typescript" />,
			<FaReact key="react" />,
			<SiNextdotjs key="nextjs" />,
			<SiTailwindcss key="tailwind" />,
			<FaGitAlt key="git" />,
			<SiVercel key="vercel" />,
		],
		body: '개인 포트폴리오 용도로 제작한 Next.js 기반의 웹사이트입니다. SEO 적용을 위해 Next.js를 선택했고 Vercel로 배포를 완료하였습니다. 또한 TypeScript와 TailWind CSS 적응에 집중하며 UX/UI의 중요성을 알 수 있었던 프로젝트입니다.',
		stack: [
			'홈, 자기소개, 보유 기술, 포트폴리오, 연락방법',
			'https://github.com/po4tion/portfolio',
			'https://portfolio-po4tion.vercel.app/',
		],
		isDeploy: true,
	},
	{
		src: 'devblog',
		ext: '.webp',
		images: [
			'home',
			'signup',
			'login',
			'search',
			'write',
			'post',
			'related',
			'profile',
		],
		desc: 'DEVBLOG',
		tech: ['React', 'Next.js', 'Material-UI', 'MongoDB', 'Git', 'Vercel'],
		icons: [
			<FaReact key="react" />,
			<SiNextdotjs key="nextjs" />,
			<SiMaterialui key="material-ui" />,
			<SiMongodb key="mongodb" />,
			<FaGitAlt key="git" />,
			<SiVercel key="vercel" />,
		],
		body: 'SEO 블로그 서비스 용도로 제작한 Next.js 기반의 웹사이트입니다. Next.js를 선택하여 Vercel로 배포를 완료하였고 SEO, SSR 등을 적용하며 Pre-rendering, Fash Refresh, Optimization에 대한 개념을 배울 수 있었습니다. 또한 Material-UI을 적용하였고 mongodb로 구현한 CRUD를 통해 REST API의 개념을 확실하게 익힐 수 있었던 프로젝트입니다.',
		stack: [
			'계정관련 CRUD, 게시글 CRUD, 북마크 CRUD, 검색기능 등',
			'https://github.com/po4tion/devblog',
			'https://devblog-mu.vercel.app/',
		],
		isDeploy: true,
	},
];
