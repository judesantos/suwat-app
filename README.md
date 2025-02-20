---

# Suwat-App Backend Server

The **Suwat-App Backend Server** is a comprehensive application that supports the Suwat Chrome Extension and includes an **Admin Dashboard** for managing users and transcriptions. The backend is built with **Node.js** and **Express.js**, while the admin interface utilizes **React.js**.

## Features

- **User Authentication**: Secure registration and login functionalities.
- **Transcription Management**: Store, retrieve, and manage transcribed data.
- **Admin Dashboard**: A React-based interface for administrators to oversee users and transcriptions.
- **Real-Time Communication**: Utilizes WebSockets for live transcription updates.
- **Scalability**: Designed to efficiently handle multiple concurrent users.

## Technologies Used

### Backend

- **Node.js**: JavaScript runtime for server-side development.
- **Express.js**: Web framework for building RESTful APIs.
- **MongoDB**: NoSQL database for data storage.
- **Socket.IO**: Enables real-time, bidirectional communication.
- **JSON Web Tokens (JWT)**: For secure user authentication.

### Frontend (Admin Dashboard)

- **React.js**: Library for building user interfaces.
- **Webpack**: Module bundler for compiling JavaScript modules.
- **Babel**: JavaScript compiler to ensure compatibility across different environments.

## Prerequisites

- **Node.js**: Ensure you have Node.js installed.
- **MongoDB**: Access to a MongoDB instance.

## Installation

1. **Clone the Repository**:
   ```bash
   git clone https://github.com/judesantos/suwat-app.git
   cd suwat-app
   ```

2. **Install Backend Dependencies**:
   ```bash
   cd backend
   npm install
   ```

3. **Set Up Environment Variables**:
   - Create a `.env` file in the `backend` directory with the following variables:
     ```
     PORT=5000
     MONGODB_URI=your_mongodb_connection_string
     JWT_SECRET=your_jwt_secret_key
     ```

4. **Start the Backend Server**:
   ```bash
   npm start
   ```
   The server will run on `http://localhost:5000/` by default.

5. **Install Admin Dashboard Dependencies**:
   ```bash
   cd ../admin
   npm install
   ```

6. **Start the Admin Dashboard**:
   ```bash
   npm start
   ```
   The admin interface will be accessible at `http://localhost:3000/` by default.

## Usage

- **Admin Dashboard**: Navigate to `http://localhost:3000/` to access the admin interface. Here, administrators can manage users and view transcriptions.
- **API Endpoints**: The backend server exposes various API endpoints for authentication, transcription management, and real-time communication.

## Contributing

Contributions are welcome! Please fork the repository, create a new branch, and submit a pull request with your changes.

## License

This project is licensed under the MIT License. See the [LICENSE](./LICENSE) file for details.

