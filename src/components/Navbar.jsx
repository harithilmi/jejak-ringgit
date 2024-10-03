export default function Navbar() {
	return (
	  <nav className="bg-indigo-600 text-white shadow-md">
		<div className="container mx-auto px-4">
		  <div className="flex items-center justify-between h-16">
			<div className="flex items-center">
			  <a href="/" className="flex-shrink-0">
				<img className="h-8 w-8" src="./public/favicon-32x32.png" alt="Jejak Ringgit" />
			  </a>
			  <div className="ml-10 flex items-baseline space-x-4">
				<a href="/" className="px-3 py-2 rounded-md text-sm font-medium hover:bg-indigo-500">Home</a>
				<a href="/expenses" className="px-3 py-2 rounded-md text-sm font-medium hover:bg-indigo-500">Expenses</a>
				<a href="/reports" className="px-3 py-2 rounded-md text-sm font-medium hover:bg-indigo-500">Reports</a>
			  </div>
			</div>
			<div className="flex items-center">
			  <button className="bg-indigo-500 hover:bg-indigo-400 text-white font-bold py-2 px-4 rounded">
				Add Expense
			  </button>
			</div>
		  </div>
		</div>
	  </nav>
	);
  }