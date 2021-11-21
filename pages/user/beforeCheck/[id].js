import { withRouter } from 'next/router';
import { BeforeSignIn } from '/components/auth';

function BeforeCheck({ params }) {
	return (
		<>
			<BeforeSignIn params={params} />
		</>
	);
}

export default withRouter(BeforeCheck);

export async function getStaticPaths() {
	return {
		paths: [],
		fallback: 'blocking',
	};
}

export async function getStaticProps(ctx) {
	const params = ctx.params.id;

	return {
		props: { params },
	};
}
