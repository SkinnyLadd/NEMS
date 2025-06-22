# NEMS (NUST Event Management System)

## Overview
NEMS is a web-based application designed to streamline event management for societies at NUST. It provides features for managing users, events, and registrations, ensuring a seamless experience for both organizers and attendees.

---

## Features

### User Management
- **Authentication**: Login and signup functionality with secure password handling.
- **Role-based Access**: Different roles for users (e.g., Admin, Organizer, Attendee).
- **Batch and Course Association**: Users are linked to their respective batches and courses.

### Event Management
- **Event Creation**: Create events with details like title, date, venue, and society association.
- **Search and Filter**: Search events by title, date range, or society.
- **Registration Tracking**: Track registrations and ticket sales for events.

### UI/UX
- **Responsive Design**: Optimized for both desktop and mobile devices.
- **Interactive Dashboard**: Provides insights into events, registrations, and revenue.

---

## Tech Stack

### Frontend
- **React**: Component-based UI development.
- **TypeScript**: Strongly typed JavaScript for better maintainability.
- **Tailwind CSS**: Utility-first CSS framework for styling.

### Backend
- **Java**: Core backend logic.
- **Spring Boot**: Framework for building RESTful APIs.
- **Maven**: Dependency management and build automation.

### Database
- **PostgreSQL**: Relational database for storing user, event, and registration data.

### Other Tools
- **npm**: Package manager for frontend dependencies.
- **Lucide React**: Icon library for UI components.

---

## Project Structure

```plaintext
NEMS/
├── backend/
│   ├── src/
│   │   ├── main/
│   │   │   ├── java/com/car/backend/
│   │   │   │   ├── controllers/       # REST API controllers
│   │   │   │   ├── services/          # Business logic
│   │   │   │   ├── entities/          # Database entities
│   │   │   │   ├── repositories/      # Data access layer
│   │   │   │   ├── config/            # Application configuration
│   │   ├── resources/
│   │   │   ├── application.properties # Backend configuration
│   ├── pom.xml                        # Maven configuration
├── ui/
│   ├── src/
│   │   ├── pages/                     # React pages
│   │   ├── components/                # Reusable UI components
│   │   ├── context/                   # Context API for state management
│   │   ├── assets/                    # Static assets (e.g., images)
│   ├── package.json                   # Frontend dependencies
│   ├── tailwind.config.js             # Tailwind CSS configuration
├── README.md                          # Project documentation
```

## Installation and Usage

### Prerequisites
- **Node.js**: For running the frontend.
- **Java 17+**: For running the backend.
- **PostgreSQL**: Database setup.

---

### Backend Setup

1. Navigate to the `backend` directory:

    ```bash
    cd backend
    ```

2. Configure the database in `application.properties`.

3. Build and run the backend:

    ```bash
    mvn spring-boot:run
    ```

---

### Frontend Setup

1. Navigate to the `ui` directory:

    ```bash
    cd ui
    ```

2. Install dependencies:

    ```bash
    npm install
    ```

3. Start the development server:

    ```bash
    npm run dev
    ```

---

### Access the Application

- Frontend: [http://localhost:5173](http://localhost:5173)  
- Backend API: [http://localhost:8080/api](http://localhost:8080/api)

---

## Contributing

1. Fork the repository.
2. Create a new branch for your feature or bug fix.
3. Submit a pull request with a detailed description.


