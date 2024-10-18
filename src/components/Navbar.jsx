import { supabase } from '../supabase'
import PropTypes from 'prop-types'

export default function Navbar({ user, onLogout }) {
	async function handleLogout() {
		const { error } = await supabase.auth.signOut()
		if (error) {
			console.error('Error logging out:', error)
		} else {
			onLogout()
		}
	}

	return (
		<nav className="bg-indigo-600 text-white shadow-md">
			<div className="container mx-auto px-4">
				<div className="flex items-center justify-between h-16">
					<div className="flex items-center text-2xl font-bold">
						<a href="/" className="flex-shrink-0">
							JR
						</a>
						
					</div>
					
					<div className="flex items-center">
						{user && (
							<>
								<span className="mr-4">Welcome, {user.email}</span>
								<button
									onClick={handleLogout}
									className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
								>
									Logout
								</button>
							</>
						)}
					</div>
				</div>
			</div>
		</nav>
	);
}

Navbar.propTypes = {
	user: PropTypes.object,
	onLogout: PropTypes.func
}

