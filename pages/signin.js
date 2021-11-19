import { withRouter } from 'next/router';
import { AuthSignIn } from '/components/auth';

function SignIn() {
	return (
		<>
			<AuthSignIn />
		</>
	);
}

export default SignIn;
