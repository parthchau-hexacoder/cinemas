# Cinemas - Modern Cinema Booking Application

![Cinemas Logo](./public/logo.png)

A sleek, modern, and premium web application for browsing movies, finding theaters, and booking cinema tickets with ease. Built with React 19, Vite, TypeScript, and Tailwind CSS v4.

## 🚀 Key Features

- **🎬 Movie Discovery**: Browse a collection of latest movies with detailed descriptions, durations, and categories.
- **🏢 Theater Exploration**: Find theaters near you and view available showtimes for your favorite movies.
- **💺 Interactive Seat Booking**: Visual seat selection with real-time feedback and different seat categories (Platinum, Gold, Silver).
- **🎫 Ticket Management**: View upcoming tickets and booking history.
- **💳 Secure Payments**: Integrated payment flow with transaction tracking.
- **🔐 User Authentication**: Secure login and signup with personalized experiences.
- **📱 Responsive Design**: Fully optimized for mobile, tablet, and desktop screens.
- **✨ Premium UI/UX**: Glassmorphism effects, smooth animations, and a curated color palette.

## 🛠️ Tech Stack

- **Frontend Framework**: [React 19](https://react.dev/)
- **Build Tool**: [Vite 7](https://vitejs.dev/)
- **Programming Language**: [TypeScript](https://www.typescriptlang.org/)
- **Styling**: [Tailwind CSS v4](https://tailwindcss.com/)
- **Icons**: [Lucide React](https://lucide.dev/)
- **State Management**: React Context API
- **HTTP Client**: Axios
- **PDF Generation**: jsPDF (for tickets)
- **Feedback**: React Hot Toast

## 📁 Project Structure

```text
src/
├── components/     # Reusable UI components (Navbar, MovieCards, TheaterList, etc.)
├── context/        # Global state management (AuthContext)
├── hooks/          # Custom React hooks for data fetching and logic
├── pages/          # Full-page components (Home, MovieItem, SeatBook, etc.)
├── utils/          # Helper functions and utilities
├── App.tsx         # Main application component and routing
├── main.tsx        # Application entry point
├── types.ts        # TypeScript interfaces and global type definitions
└── index.css       # Global styles and Tailwind imports
```

## 🏁 Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) (v18 or higher)
- npm or yarn

### Installation

1. Clone the repository:
   ```bash
   git clone "https://github.com/parthchau-hexacoder/cinemas"
   ```
2. Navigate to the project directory:
   ```bash
   cd cinemas
   ```
3. Install dependencies:
   ```bash
   npm install
   ```

### Running Locally

To start the development server:
```bash
npm run dev
```
Open [http://localhost:5173](http://localhost:5173) in your browser to view the application.

### Building for Production

To build the project for production:
```bash
npm run build
```
The output will be in the `dist/` directory.