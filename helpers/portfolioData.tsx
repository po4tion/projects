/* 
  포트폴리오 값 설정
*/

import { FaReact, FaGitAlt } from 'react-icons/fa';
import {
	SiNextdotjs,
	SiMaterialui,
	SiMongodb,
	SiVercel,
	SiTypescript,
	SiTailwindcss,
} from 'react-icons/si';

interface PortFolioInfo {
	readonly src: string;
	readonly ext: string;
	readonly images: string[];
	readonly link: string;
	readonly desc: string;
	readonly summary: string;
	readonly tech: string[];
	readonly icons: JSX.Element[];
	readonly body: string;
	readonly stack: string[];
}

export const portfolioData: PortFolioInfo[] = [
	{
		src: 'portfolio',
		ext: '.webp',
		images: ['home', 'about-me', 'skills', 'portfolio'],
		link: 'https://devblog-mu.vercel.app/',
		desc: 'PORTFOLIO',
		summary: 'Tailwind CSS를 사용한 포트폴리오 프로젝트',
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
		link: 'https://devblog-mu.vercel.app/',
		desc: 'DEVBLOG',
		summary: 'Next.js를 적용한 SEO 블로그 프론트엔드 프로젝트',
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
	},
];
