import Header from './Header';
import Footer from './Footer';

function Layout({ children }) {
	return (
		<>
			<Header />
			{children}
			<Footer
				title={process.env.APP_NAME}
				description="개발자들을 위한 블로그"
			/>
		</>
	);
}

export default Layout;
