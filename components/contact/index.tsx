import { AiOutlineMail, AiFillGithub } from 'react-icons/ai';

function Contact() {
	const handleClick = async (text: string): Promise<void> => {
		try {
			await navigator.clipboard.writeText(text);

			alert('클립보드 저장 완료');
		} catch (error) {
			alert('클립보드 저장 실패');
		}
	};

	return (
		<div
			id="contact"
			className="flex items-center justify-center flex-col bg-gray-800 h-[150px]"
		>
			<div className="mb-4 flex items-center justify-center">
				<AiOutlineMail color="white" className="text-2xl mr-2" />
				<p
					className="text-white hover:text-cyan-500 select-none"
					onClick={() => handleClick('po4tion0429@gmail.com')}
				>
					po4tion0429@gmail.com
				</p>
			</div>
			<div className="mb-4 flex items-center justify-center">
				<AiFillGithub color="white" className="text-2xl mr-2" />
				<a
					className="text-white hover:text-cyan-500"
					href="https://github.com/po4tion"
					target="_blank"
					rel="noreferrer"
				>
					https://github.com/po4tion
				</a>
			</div>

			<div className="text-center text-white">
				Copyright&copy; {new Date().getFullYear()} Dong Gyu. All rights reserved
			</div>
		</div>
	);
}

export default Contact;
