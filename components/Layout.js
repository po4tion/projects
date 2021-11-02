import Header from './Header';
import Footer from './Footer';

function Layout({ children }) {
	return (
		<>
			<Header title={process.env.NEXT_PUBLIC_APP_NAME} />
			{children}
			<Footer
				title={process.env.NEXT_PUBLIC_APP_NAME}
				description="개발자들을 위한 블로그"
			/>
		</>
	);
}

export default Layout;
