/* 
  네비게이션 값 설정
*/

interface NavigationLinks {
	name: string;
	href: string;
	current: boolean;
}

export const navigationLinks: NavigationLinks[] = [
	{
		name: 'HOME',
		href: '#home',
		current: true,
	},
	{
		name: 'ABOUT ME',
		href: '#about-me',
		current: false,
	},
	{
		name: 'SKILLS',
		href: '#skills',
		current: false,
	},
	{
		name: 'PORTFOLIO',
		href: '#portfolio',
		current: false,
	},
	{
		name: 'CONTACT',
		href: '#contact',
		current: false,
	},
];
