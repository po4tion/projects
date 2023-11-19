/* 
	비밀번호 초기화 페이지
*/

import { withRouter } from 'next/router';
import { ResetPwd } from '/components/user';

function Reset({ params }) {
	return (
		<>
			<ResetPwd params={params} />
		</>
	);
}

export default withRouter(Reset);

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
