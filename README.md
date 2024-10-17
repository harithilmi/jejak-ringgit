# Jejak Ringgit

Jejak Ringgit is a personal finance tracking application built with React and Vite. It allows users to manage their income and expenses efficiently.

## Live Demo

Check out the live application: [Jejak Ringgit on Netlify](https://jejakringgit.netlify.app)

## Features

- Add, edit, and delete transactions
- Categorize transactions as income or expense
- Filter transactions by description
- Split transactions among multiple parties
- Responsive design for various screen sizes
- Local storage persistence
- User authentication with Supabase

## Technologies Used

- React 18.3
- Vite 5.4
- Tailwind CSS 3.4
- ESLint 9.9
- Supabase for authentication and data storage

## Getting Started

### Prerequisites

- Node.js (version 14 or later recommended)
- npm or yarn

### Installation

1. Clone the repository:
   ```
   git clone https://github.com/your-username/jejak-ringgit.git
   cd jejak-ringgit
   ```

2. Install dependencies:
   ```
   npm install
   ```

3. Set up environment variables:
   Create a `.env` file in the root directory and add your Supabase credentials:
   ```
   VITE_SUPABASE_URL=your_supabase_url
   VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
   ```

4. Start the development server:
   ```
   npm run dev
   ```

5. Open your browser and visit `http://localhost:5173` to see the application.

## Project Structure

- `src/`: Contains the source code for the application
  - `components/`: React components
  - `context/`: React context for state management
  - `App.jsx`: Main application component
  - `main.jsx`: Entry point of the application
- `public/`: Static assets
- `index.html`: HTML template

## Available Scripts

In the project directory, you can run:

- `npm run dev`: Runs the app in development mode
- `npm run build`: Builds the app for production
- `npm run lint`: Lints the project files
- `npm run preview`: Previews the built app

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is open source and available under the [MIT License](LICENSE).
