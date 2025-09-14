# User Management Frontend

This is the **frontend** for the User Management Dashboard application built using **React.js**. It connects with the backend API to perform CRUD operations for user management. The UI is responsive, clean, and easy to use.

---

## ✅ Deployed URLs

- **Frontend URL:** [https://forty4-frontend.vercel.app/](https://forty4-frontend.vercel.app/)  
- **Frontend GitHub:** [https://github.com/vinnu382910/forty4-frontend](https://github.com/vinnu382910/forty4-frontend)  
- **Backend GitHub:** [https://github.com/vinnu382910/forty4-backend](https://github.com/vinnu382910/forty4-backend)  
- **Backend API URL:** [https://forty4-backend.onrender.com/api/users](https://forty4-backend.onrender.com/api/users)

---

## 📂 File Structure

```

forty4-frontend/
├── public/
│   └── index.html             # HTML template
├── src/
│   ├── api/
│   │   └── userApi.js         # Axios API calls
│   ├── components/
│   │   ├── Loading/
│   │   │   ├── Loading.js
│   │   │   └── Loading.css
│   │   ├── UserCard/
│   │   │   ├── UserCard.js
│   │   │   └── UserCard.css
│   │   ├── UserForm/
│   │   │   ├── UserForm.js
│   │   │   └── UserForm.css
│   ├── context/
│   │   └── UserContext.js    # React context for managing user data
│   ├── pages/
│   │   ├── Dashboard/
│   │   │   ├── Dashboard.js
│   │   │   └── Dashboard.css
│   │   └── UserDetails/
│   │       ├── UserDetails.js
│   │       └── UserDetails.css
│   ├── App.js                 # Application routes and layout
│   ├── index.js               # Entry point
│   ├── .env                   # Environment variables configuration
│   └── package.json           # Project dependencies and scripts
├── .gitignore                # Ignore files like node\_modules and .env
└── README.md                 # This file

````

---

## ✅ Setup Instructions

1. Clone the repository:

   ```bash
   git clone https://github.com/vinnu382910/forty4-frontend.git
   cd forty4-frontend
````

2. Install dependencies:

   ```bash
   npm install
   ```

3. Create a `.env` file at the root and add the backend URL:

   ```env
   REACT_APP_API_URL=https://forty4-backend.onrender.com/api
   ```

4. Run the app locally:

   ```bash
   npm start
   ```

The application will start on `http://localhost:3000`.

---

## 📦 Environment Variables

```env
REACT_APP_API_URL=https://forty4-backend.onrender.com/api
```

* The URL must point to the deployed backend's base API endpoint.
* Restart the development server after modifying `.env`.

---

## 📜 Application Features

✔ View all users on the dashboard
✔ Add new users through a form
✔ Edit user details
✔ Delete users
✔ View detailed user information
✔ Responsive UI
✔ Client-side form validation
✔ Loading indicators during API calls
✔ Error handling with console logs

---

## 🔥 API Usage Example

The frontend uses **Axios** for making requests to the backend API at `REACT_APP_API_URL`.

### Example in `userApi.js`:

```javascript
import axios from 'axios';

const API_URL = `${process.env.REACT_APP_API_URL}/users`;

export const getUsers = () => axios.get(API_URL);

export const createUser = (userData) => axios.post(API_URL, userData);

export const updateUser = (id, userData) => axios.put(`${API_URL}/${id}`, userData);

export const deleteUser = (id) => axios.delete(`${API_URL}/${id}`);

export const getUser = (id) => axios.get(`${API_URL}/${id}`);
```

---

## ✅ Components Overview

### `UserCard`

* Displays basic user information.
* Has buttons to edit or delete a user.

### `UserForm`

* Form to add or edit a user.
* Includes input fields with validation.

### `Loading`

* Shows a spinner while data is being fetched.

---

## ✅ Pages Overview

### `Dashboard`

* Fetches and displays all users.
* Includes the form to add a new user.
* Handles delete and update functionality.

### `UserDetails`

* Shows full user information including address and geo-location.

---

## ✅ React Context Usage

* All user-related state is managed in `UserContext.js`.
* API calls are abstracted and state is shared across components.
* `useCallback` and `useEffect` ensure efficient data fetching.

---

## ✅ Deployment Notes

* The frontend is deployed on **Vercel**.
* Environment variables are configured in Vercel’s dashboard under Project Settings.
* Make sure `REACT_APP_API_URL` is set correctly with HTTPS in the production environment.

---

## 📦 Important Files

* `.env` – Holds environment variables like API endpoint.
* `src/api/userApi.js` – Centralized API logic.
* `src/context/UserContext.js` – Handles state management.
* `src/components/` – Contains UI elements like forms and cards.
* `src/pages/` – Contains route-specific pages like Dashboard and UserDetails.
* `.gitignore` – Ensures node\_modules and .env are not tracked by Git.

---

## 📜 License

This project is open for educational and personal use.

---
Happy coding 🚀👨‍💻📂
