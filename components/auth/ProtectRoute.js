/* 
	사용자가 로그인을 했는지 확인
*/

import { useEffect } from 'react';
import Router from 'next/router';
import { isAuth } from '/actions/handleAuth';

function ProtectRoute({ children }) {
	useEffect(() => {
		if (!isAuth()) {
			Router.push('/signin');
		}
	}, []);

	return <>{children}</>;
}

export default ProtectRoute;
