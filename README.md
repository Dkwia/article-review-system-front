# Article-review-system-front
The **Article Review System Frontend** is a React-based single-page application (SPA) that interacts with the Article Review System API. It provides a user-friendly interface for authors, reviewers, and admins to manage articles, reviews, and user accounts.

## Table of Contents
1. [Features](#features)
2. [Prerequisites](#prerequisites)
3. [Installation](#installation)
4. [Configuration](#configuration)
5. [Usage](#usage)

---

### **Features**
- User authentication (login, logout, register).
- Role-specific dashboards:
  - **Authors**: Submit articles, view submitted articles.
  - **Reviewers**: Accept/decline review requests, submit reviews.
  - **Admins**: Manage users, articles, and reviews.
- File upload/download functionality for article PDFs.
- Responsive design for desktop and mobile devices.

---

### **Prerequisites**
Before running the frontend, ensure you have the following installed:
- [Node.js](https://nodejs.org/) (v16 or later)
- [npm](https://www.npmjs.com/) or [Yarn](https://yarnpkg.com/)

---

### **Installation**
1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/article-review-system-frontend.git
   cd article-review-system-frontend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm start
   ```

The frontend will be available at `http://localhost:3000`.

---

### **Configuration**
1. **Environment Variables**:
   - Create a `.env` file in the root directory and add the following:
     ```env
     REACT_APP_API_URL=http://localhost:5186/api
     ```
   - Replace `http://localhost:5186/api` with the actual URL of your API if it's hosted elsewhere.

2. **CORS Configuration**:
   - Ensure the API allows requests from the frontend's origin. Add the frontend's URL (`http://localhost:3000`) to the CORS policy in the API.

---

### **Usage**
1. **Login/Register**:
   - Use the `/login` and `/register` pages to authenticate or create a new account.

2. **Dashboard**:
   - After logging in, you'll be redirected to the appropriate dashboard based on your role (Author, Reviewer, or Admin).

3. **Submit Articles**:
   - Authors can upload PDF files and submit articles via the **Submit Article** tab.

4. **Manage Reviews**:
   - Reviewers can accept/decline review requests and submit reviews.

5. **Admin Controls**:
   - Admins can manage users, delete articles, and delete reviews.

