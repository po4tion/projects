/* 
  네비게이션 값 설정
*/

interface NavigationLinks {
	readonly name: string;
	readonly href: string;
	readonly cy: string;
}

export const navigationLinks: NavigationLinks[] = [
	{
		name: 'HOME',
		href: '#home',
		cy: 'home',
	},
	{
		name: 'ABOUT ME',
		href: '#about-me',
		cy: 'about-me',
	},
	{
		name: 'SKILLS',
		href: '#skills',
		cy: 'skills',
	},
	{
		name: 'PORTFOLIO',
		href: '#portfolio',
		cy: 'portfolio',
	},
	{
		name: 'CONTACT',
		href: '#contact',
		cy: 'contact',
	},
];
