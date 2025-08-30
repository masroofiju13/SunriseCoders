# Overview

This is a full-stack AI automation business website built with React, Express, and PostgreSQL. The application serves as a marketing and lead generation platform for "Sunrise AI," offering various AI-powered services including voice agents, lead generation automation, workflow automation, and custom AI solutions. The site features interactive components like cost calculators, booking systems, contact forms, and showcases of AI implementations.

# User Preferences

Preferred communication style: Simple, everyday language.

# System Architecture

## Frontend Architecture
- **Framework**: React 18 with TypeScript running on Vite for fast development and optimized builds
- **Routing**: Wouter for lightweight client-side routing
- **UI Library**: Radix UI components with shadcn/ui design system for consistent, accessible interface components
- **Styling**: Tailwind CSS with custom CSS variables for theming, supporting dark mode design
- **State Management**: TanStack Query (React Query) for server state management and caching
- **Forms**: React Hook Form with Zod validation for type-safe form handling

## Backend Architecture
- **Runtime**: Node.js with Express.js framework
- **Language**: TypeScript with ES modules
- **API Design**: RESTful API with JSON responses
- **Error Handling**: Centralized error middleware with proper HTTP status codes
- **Logging**: Custom request/response logging middleware for API endpoints
- **Development**: Hot module replacement via Vite in development mode

## Data Storage Solutions
- **Database**: PostgreSQL with Neon serverless driver for cloud deployment
- **ORM**: Drizzle ORM for type-safe database interactions and migrations
- **Schema Management**: Centralized schema definitions with Zod validation
- **Tables**: Users, contact submissions, bookings, and calculator submissions
- **Fallback**: In-memory storage implementation for development/testing

## Authentication and Authorization
- **Current State**: Basic user schema defined but authentication not implemented
- **Session Management**: PostgreSQL session store configured (connect-pg-simple)
- **Future Implementation**: Ready for session-based authentication with existing user table

## Component Architecture
- **Design System**: Comprehensive UI component library with consistent styling patterns
- **Layout**: Modular section-based components for different page areas (hero, services, booking, etc.)
- **Interactive Elements**: Cost calculator with real-time calculations, booking calendar, contact forms
- **Modal System**: Custom showcase modal for displaying detailed service information
- **Responsive Design**: Mobile-first approach with adaptive layouts

## External Dependencies

### Core Framework Dependencies
- **React Ecosystem**: React 18, React DOM, React Hook Form with resolvers
- **Build Tools**: Vite for development and building, ESBuild for server bundling
- **TypeScript**: Full TypeScript support with strict configuration

### Database and Backend
- **Database**: Neon serverless PostgreSQL driver, Drizzle ORM with PostgreSQL dialect
- **Server**: Express.js with middleware for JSON parsing, URL encoding, and CORS handling
- **Session Storage**: connect-pg-simple for PostgreSQL-backed sessions

### UI and Styling
- **Component Library**: Extensive Radix UI primitives for accessible components
- **Styling**: Tailwind CSS with PostCSS and Autoprefixer
- **Icons**: Lucide React for consistent iconography, React Icons for social media icons
- **Animations**: Class Variance Authority for component variants, CLSX for conditional classes

### Development and Utilities
- **State Management**: TanStack React Query for server state and caching
- **Validation**: Zod for runtime type validation, Drizzle-Zod for schema integration
- **Date Handling**: date-fns for date manipulation and formatting
- **Development**: Replit-specific plugins for development environment integration

### Optional Integrations
- **Carousel**: Embla Carousel for image/content sliders
- **Command Menu**: CMDK for search and command interfaces
- **Charts**: Recharts integration ready for data visualization