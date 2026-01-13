# BookEase Frontend

Professional flight booking platform frontend built with modern web technologies. Optimized for performance and user experience.

## Technologi Stack

-   **Core Framework**: React (v18)
-   **Build Tool**: Vite (v6) - For lightning-fast development and build
-   **Styling**: Tailwind CSS (v4) - Utility-first CSS framework
-   **Routing**: React Router DOM (v7)
-   **HTTP Client**: Axios
-   **Notifications**: React Hot Toast - Professional toast notifications
-   **Language**: TypeScript - For type safety and better developer experience

## Key Features

-   **Performance First**:
    -   Optimized background animations (SVG + CSS)
    -   Zero-runtime overhead for glassmorphism effects (Static CSS vs Backdrop Filter)
    -   Compositor-layer promotion for smooth 60fps scrolling
-   **Modern UI/UX**:
    -   "Dark Glass" premium aesthetic
    -   Responsive design for all devices
    -   Interactive hover states and micro-interactions
-   **Functionality**:
    -   Flight Search & Booking flow
    -   User Authentication (Login/Register)
    -   Admin Dashboard (CRUD Services, Bookings, Users)
    -   Protected Routes & Role-based Access Control

## Getting Started

1.  **Install Dependencies**
    ```bash
    npm install
    ```

2.  **Run Development Server**
    ```bash
    npm run dev
    ```
    The app will start at `http://localhost:5173`

3.  **Build for Production**
    ```bash
    npm run build
    ```

## Project Structure

-   `/src/components` - Reusable UI components (Navbar, Footer, Background, etc.)
-   `/src/pages` - Main route pages (Home, Booking, Admin, etc.)
-   `/src/api` - Axios instance and API configuration
-   `/src/style.css` - Global styles and Tailwind directives
