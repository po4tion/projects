import { useEffect } from 'react';
import Router from 'next/router';
import { isAuth } from '/actions/auth';

function ProtectAdminRoute({ children }) {
	useEffect(() => {
		if (!isAuth()) {
			Router.push('/signin');
		} else if (isAuth().role !== 1) {
			Router.push('/');
		}
	}, []);

	return <>{children}</>;
}

export default ProtectAdminRoute;
