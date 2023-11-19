/* 
	회원탈퇴 페이지
*/

import { ProtectRoute, AuthDelete } from '/components/auth';

function DeleteAccount() {
	return (
		<ProtectRoute>
			<AuthDelete />
		</ProtectRoute>
	);
}

export default DeleteAccount;
