import TextField from '@mui/material/TextField';

function HomePage() {
	const onChange = () => {
		console.log('하이');
	};
	return (
		<>
			<TextField onChange={onChange}>테스트</TextField>
		</>
	);
}

export default HomePage;
