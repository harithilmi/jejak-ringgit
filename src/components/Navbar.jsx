import { useState } from 'react';

export default function Navbar() {
	const [isMenuOpen, setIsMenuOpen] = useState(false);

	return (
	  <nav className="bg-indigo-600 text-white shadow-md">
		<div className="container mx-auto px-4">
		  <div className="flex items-center justify-between h-16">
				<div className="flex items-center">
				  <a href="/" className="flex-shrink-0">
					<img className="h-8 w-8" src="./favicon-512x512.png" alt="Jejak Ringgit" />
				  </a>
				  <div className="hidden md:block ml-10">
					<div className="flex items-baseline space-x-4">
					  <a href="/" className="px-3 py-2 rounded-md text-sm font-medium hover:bg-indigo-500">Home</a>
					  <a href="/expenses" className="px-3 py-2 rounded-md text-sm font-medium hover:bg-indigo-500">Expenses</a>
					  <a href="/reports" className="px-3 py-2 rounded-md text-sm font-medium hover:bg-indigo-500">Reports</a>
					</div>
				  </div>
				</div>
				<div className="hidden md:flex items-center">
				  <button className="bg-indigo-500 hover:bg-indigo-400 text-white font-bold py-2 px-4 rounded">
					Add Expense
				  </button>
				</div>
				<div className="md:hidden flex items-center">
				  <button
					onClick={() => setIsMenuOpen(!isMenuOpen)}
					className="inline-flex items-center justify-center p-2 rounded-md text-white hover:bg-indigo-500 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
				  >
					<span className="sr-only">Open main menu</span>
					<svg className="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
					  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
					</svg>
				  </button>
				</div>
		  </div>
		</div>
		{isMenuOpen && (
		  <div className="md:hidden">
			<div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
			  <a href="/" className="block px-3 py-2 rounded-md text-base font-medium hover:bg-indigo-500">Home</a>
			  <a href="/expenses" className="block px-3 py-2 rounded-md text-base font-medium hover:bg-indigo-500">Expenses</a>
			  <a href="/reports" className="block px-3 py-2 rounded-md text-base font-medium hover:bg-indigo-500">Reports</a>
			  <button className="w-full text-left mt-4 bg-indigo-500 hover:bg-indigo-400 text-white font-bold py-2 px-4 rounded">
				Add Expense
			  </button>
			</div>
		  </div>
		)}
	  </nav>
	);
}