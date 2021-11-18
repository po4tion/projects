import Link from 'next/link';

import Container from '@mui/material/Container';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import CategoryIcon from '@mui/icons-material/Category';
import LocalOfferIcon from '@mui/icons-material/LocalOffer';
import BookIcon from '@mui/icons-material/Book';

function Main() {
	return (
		<>
			<Container maxWidth="sm">
				<CssBaseline />
				<Box
					sx={{
						width: '100%',
						bgcolor: 'background.paper',
					}}
				>
					<nav aria-label="category tag blog management">
						<List>
							<Link href="/user/crud/blog" passHref>
								<ListItem divider disablePadding>
									<ListItemButton>
										<ListItemIcon>
											<BookIcon />
										</ListItemIcon>
										<ListItemText primary="블로그 생성" />
									</ListItemButton>
								</ListItem>
							</Link>

							<Link href={'/user/crud/management'} passHref>
								<ListItem divider disablePadding>
									<ListItemButton>
										<ListItemIcon>
											<BookIcon />
										</ListItemIcon>
										<ListItemText primary="블로그 관리" />
									</ListItemButton>
								</ListItem>
							</Link>

							<Link href="/user/crud/update" passHref>
								<ListItem disablePadding>
									<ListItemButton>
										<ListItemIcon>
											<BookIcon />
										</ListItemIcon>
										<ListItemText primary="프로필 관리" />
									</ListItemButton>
								</ListItem>
							</Link>
						</List>
					</nav>
				</Box>
			</Container>
		</>
	);
}

export default Main;
