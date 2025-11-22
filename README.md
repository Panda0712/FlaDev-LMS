# FlaDev-LMS — Frontend

<div align="center">
  <h1 align="center">LMS & E-learning Platform</h1>

<img src="public/lms-icon.png" alt="Papermark" style="width:80px;height:80px"></a>

</div>

![Vite](https://img.shields.io/badge/Vite-DevServer-brightgreen?logo=vite)
![React](https://img.shields.io/badge/React-19-blue?logo=react)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-4.x-skyblue?logo=tailwindcss)
![Redux Toolkit](https://img.shields.io/badge/Redux_Toolkit-RTK-purple?logo=redux)
![License](https://img.shields.io/badge/License-MIT-lightgrey)

## Overview

React + Vite frontend for the FlaDev Learning Management System (LMS). It provides a full user experience: course discovery, course learning, cart & checkout, blog, notifications, user profiles, and an admin dashboard to manage courses, blogs, contacts, orders, and more.

## Main features

- **Admin dashboard:** manage courses, blogs, contacts, orders, reviews, vouchers, and notifications.
- **Course browsing & filtering:** lists, search, categories, and paginated results.
- **Course learning experience:** lesson navigation, video playback, and progress tracking.
- **Cart & checkout:** add to cart, view cart details, and create orders (payment handled by backend services).
- **Authentication & profiles:** register, login, and manage user profiles.
- **Real-time notifications:** socket-based updates for notifications and live events.
- **Blog & rich content:** create/edit blog posts using a rich text editor (Quill/react-quill).
- **File & media uploads:** file/video input components for uploading course materials.
- **Reviews & ratings:** students can rate and review courses; admin can manage reviews.
- **Wishlist & sharing:** wishlist functionality and social sharing utilities.

## Demo

<img src="public/LMS-demo-1.gif" width="840" alt="Demo GIF 1">
<br>
<img src="public/LMS-demo-4.gif" width="840" alt="Demo GIF 4">
<br>
<img src="public/LMS-demo-2.gif" width="840" alt="Demo GIF 2">
<br>
<img src="public/LMS-demo-3.gif" width="840" alt="Demo GIF 3">
<br>
<img src="public/LMS-demo-5.gif" width="840" alt="Demo GIF 5">

## Tech stack

- ![Vite](https://img.shields.io/badge/Vite-~6.0-brightgreen) `Vite` — Fast build tool and dev server used to run and bundle the app.
- ![React](https://img.shields.io/badge/React-19-blue) `React` — UI library for building the SPA and components.
- ![Tailwind CSS](https://img.shields.io/badge/TailwindCSS-4.x-skyblue) `Tailwind CSS` — Utility-first CSS framework for styling components.
- ![Redux Toolkit](https://img.shields.io/badge/Redux_Toolkit-2.x-purple) `Redux Toolkit` — Predictable app state management (slices in `src/redux/`).
- ![Socket.IO](https://img.shields.io/badge/Socket.IO-4.x-orange) `socket.io-client` — Realtime client for notifications and live events.
- ![Axios](https://img.shields.io/badge/Axios-1.x-0052CC) `axios` — HTTP client for API requests (API layer in `src/apis/`).
- ![Ant Design](https://img.shields.io/badge/AntDesign-5.x-cyan) `antd` — UI component library used in parts of the admin UI.

## Install & development

1. Clone the repository

```shell
git clone https://github.com/Panda0712/FlaDev-LMS.git
```

2. Install dependencies

```powershell
npm install
```

3. Create a `.env` file at the project root and add required client variables (use `VITE_` prefix so Vite exposes them to the client). Example keys:

```
REACT_APP_API_BASE_URL=https://api.example.com
```

4. Run development server

```powershell
npm run dev
```

5. Build for production

```powershell
npm run build
```

6. Preview production build

```powershell
npm run preview
```

## Notes

- Backend services for payments and order processing are separate (see related backend folders in the workspace). Configure `REACT_APP_API_BASE_URL` to point to your running backend.
- Replace "https://api.example.com" with backend domain of this project: "lms-backend-production-b51f.up.railway.app"
