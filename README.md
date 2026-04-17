# 🔐 JWT Frontend Integration (Experiment 8)

## 📌 Project Overview

This project implements a **React frontend** that integrates with a JWT-based backend authentication system.

The application allows users to:

* Log in using credentials
* Store JWT token in session
* Access protected routes
* Logout securely

---

## 🎯 Objectives

* Integrate frontend with JWT APIs
* Store JWT token using `sessionStorage`
* Restrict access to protected pages
* Implement login and logout functionality

---

## 🧩 Features

### 🔑 Login Page

* User enters username & password
* Calls backend API: `POST /login`
* On success:

  * JWT token is stored in `sessionStorage`
  * Redirects to dashboard

---

### 🔒 Protected Dashboard

* Accessible only if JWT token exists
* Calls `GET /protected` API
* Sends token in header:

```id="e4s3yz"
Authorization: Bearer <token>
```

---

### 🚪 Logout

* Clears session:

```id="g0q4ul"
sessionStorage.removeItem("token");
```

* Redirects to login page

---

## 🛠️ Tech Stack

* React.js
* Axios
* Bootstrap / CSS

---

## 📁 Project Structure

```id="7mrw9d"
frontend/
├── src/
│   ├── components/
│   │   ├── Login.js
│   │   └── Dashboard.js
│   ├── App.js
│   └── index.js
```

---

## ⚙️ How to Run

1. Open terminal inside frontend folder:

```id="q9p9k6"
cd frontend
```

2. Install dependencies:

```id="1i6m2j"
npm install
```

3. Start React app:

```id="0x7xv5"
npm start
```

4. Open in browser:

```id="9l7pl6"
http://localhost:3000
```

---

## 🔗 Backend Connection

Frontend connects to backend APIs:

* Login → `http://localhost:8080/login`
* Protected → `http://localhost:8080/protected`

---

## 🔐 Authentication Flow

1. User logs in
2. Backend returns JWT token
3. Token stored in `sessionStorage`
4. Token used in API requests
5. Dashboard accessible only with valid token

---

## 📸 Screenshots

* Login Page
* Token stored in sessionStorage
* Dashboard page
* Protected API response
* Logout

---

## ⚠️ Notes

* Backend must be running on **port 8080**
* Token is stored only for session (not permanent)
* Unauthorized users are redirected to login

---

## 🚀 Conclusion

This project demonstrates:

✔ JWT-based authentication flow
✔ Secure frontend-backend communication
✔ Session-based access control

---

## 👩‍💻 Author

Name: *Sania Joshi*
Experiment: **Experiment 8 - Frontend Integration**

---
