/* 
  네비게이션 값 설정
*/

interface NavigationLinks {
	readonly name: string;
	readonly href: string;
}

export const navigationLinks: NavigationLinks[] = [
	{
		name: 'HOME',
		href: '#home',
	},
	{
		name: 'ABOUT ME',
		href: '#about-me',
	},
	{
		name: 'SKILLS',
		href: '#skills',
	},
	{
		name: 'PORTFOLIO',
		href: '#portfolio',
	},
	{
		name: 'CONTACT',
		href: '#contact',
	},
];
