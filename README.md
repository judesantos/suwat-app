---

# Suwat-App Backend Server

**Suwat-App Backend Server** powers the **Suwat Chrome Extension** and includes an **Admin Dashboard** built with **React.js**. The backend is developed with **Node.js**, **Express.js**, and **PostgreSQL**, offering a scalable and efficient solution for managing speech transcriptions.

## Features

- **User Authentication**: Secure login and registration using JWT.
- **Transcription Management**: Store, retrieve, and manage speech-to-text data.
- **Admin Dashboard**: A **React.js** interface for administrators to oversee users and transcriptions.
- **Real-Time Communication**: Utilizes **WebSockets** for live transcription updates.
- **PostgreSQL Database**: Robust and scalable relational database support.

## Technologies Used

### Backend
- **Node.js** – JavaScript runtime for server-side operations.
- **Express.js** – Lightweight web framework for building REST APIs.
- **PostgreSQL** – Relational database for structured data storage.
- **Sequelize** – ORM for handling database interactions in PostgreSQL.
- **Socket.IO** – Enables real-time, two-way communication.
- **JWT (JSON Web Tokens)** – Secure authentication method for users.

### Frontend (Admin Dashboard)
- **React.js** – Library for building dynamic and interactive UI.
- **React Router** – Manages routing in the admin panel.
- **Axios** – Handles API requests between the frontend and backend.
- **Styled Components** – Modern styling approach for the UI.

## Prerequisites

- **Node.js** (>= 16.x)
- **PostgreSQL** (>= 13.x)
- **NPM or Yarn**

## Installation

### **1. Clone the Repository**
```sh
git clone https://github.com/judesantos/suwat-app.git
cd suwat-app
```

### **2. Set Up the Backend**
```sh
cd backend
npm install
```

### **3. Configure Environment Variables**
Create a `.env` file inside the `backend/` directory with the following content:

```
PORT=5000
DATABASE_URL=postgres://username:password@localhost:5432/suwatdb
JWT_SECRET=your_jwt_secret
```

Replace `username`, `password`, and `suwatdb` with your PostgreSQL credentials.

### **4. Run Database Migrations**
```sh
npx sequelize-cli db:migrate
```

### **5. Start the Backend Server**
```sh
npm start
```
The API will now be running at `http://localhost:5000/`.

### **6. Set Up the Admin Dashboard**
```sh
cd ../admin
npm install
```

### **7. Start the Admin Dashboard**
```sh
npm start
```
The admin UI will be available at `http://localhost:3000/`.

## Usage

- **Admin Dashboard**: Visit `http://localhost:3000/` to manage users and transcriptions.
- **Chrome Extension Integration**: Connects to the backend to store and retrieve speech transcriptions.
- **API Endpoints**: Backend exposes RESTful APIs for authentication, transcription, and WebSocket events.

## Roadmap

- [ ] Implement **role-based access control** (RBAC) for admin and users.
- [ ] Add **pagination and search** in the admin panel.
- [ ] Enhance **real-time WebSocket events** for better live updates.

## Contributing

1. **Fork the repository**.
2. **Create a new branch**:
   ```sh
   git checkout -b feature-branch
   ```
3. **Make changes & commit**:
   ```sh
   git commit -m "Add new feature"
   ```
4. **Push changes**:
   ```sh
   git push origin feature-branch
   ```
5. **Create a pull request**.

## License

This project is licensed under the **MIT License**. See [LICENSE](LICENSE) for details.

