import { navigationLinks } from 'helpers/navigationLinks';
import { Fragment } from 'react';
import { Disclosure } from '@headlessui/react';
import { MenuIcon, XIcon } from '@heroicons/react/outline';

function NavigationBar() {
	return (
		<Disclosure as="nav" className=" bg-gray-800 fixed top-0 z-20 w-full">
			{({ open }: { open: boolean }) => (
				<>
					<div className="max-w-7xl mx-auto px-2 sm:px-6 lg:px-8 ">
						<div className="relative flex items-center justify-between h-16">
							<div className="absolute inset-y-0 right-0 flex items-center sm:hidden">
								{/* Mobile menu button*/}
								<Disclosure.Button className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white">
									<span className="sr-only">Open main menu</span>
									{open ? (
										<XIcon className="block h-6 w-6" aria-hidden="true" />
									) : (
										<MenuIcon className="block h-6 w-6" aria-hidden="true" />
									)}
								</Disclosure.Button>
							</div>
							<div className="flex-1 flex items-center justify-center sm:items-stretch sm:justify-between">
								<div className="flex-shrink-0 flex items-center">
									<span className="font-bold text-2xl text-white font-noto select-none">
										Dong Gyu
									</span>
								</div>
								<div className="hidden sm:block sm:ml-6">
									<div className="flex space-x-2">
										{navigationLinks.map(item => (
											<a
												key={item.name}
												href={item.href}
												className="text-gray-300 hover:bg-gray-700 hover:text-white
													px-3 py-2 rounded-md text-base font-medium flex items-center font-noto select-none"
												aria-current="page"
											>
												{item.name}
											</a>
										))}
									</div>
								</div>
							</div>
						</div>
					</div>

					<Disclosure.Panel className="sm:hidden">
						<div className="px-2 pt-2 pb-3 space-y-1">
							{navigationLinks.map(item => (
								<Disclosure.Button
									key={item.name}
									as="a"
									href={item.href}
									className="text-gray-300 hover:bg-gray-700 hover:text-white
										block px-3 py-2 rounded-md text-base font-medium font-noto select-none"
									aria-current="page"
								>
									{item.name}
								</Disclosure.Button>
							))}
						</div>
					</Disclosure.Panel>
				</>
			)}
		</Disclosure>
	);
}

export default NavigationBar;
