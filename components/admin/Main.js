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
					<nav aria-label="category tag blog">
						<List>
							<Link href="/admin/crud/category" passHref>
								<ListItem divider disablePadding>
									<ListItemButton>
										<ListItemIcon>
											<CategoryIcon />
										</ListItemIcon>
										<ListItemText primary="카테고리 생성" />
									</ListItemButton>
								</ListItem>
							</Link>

							<Link href="/admin/crud/tag" passHref>
								<ListItem divider disablePadding>
									<ListItemButton>
										<ListItemIcon>
											<LocalOfferIcon />
										</ListItemIcon>
										<ListItemText primary="태그 생성" />
									</ListItemButton>
								</ListItem>
							</Link>

							<Link href="/admin/crud/blog" passHref>
								<ListItem disablePadding>
									<ListItemButton>
										<ListItemIcon>
											<BookIcon />
										</ListItemIcon>
										<ListItemText primary="블로그 생성" />
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
