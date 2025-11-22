# FlaDev-LMS — Frontend

![Vite](https://img.shields.io/badge/Vite-DevServer-brightgreen?logo=vite)
![React](https://img.shields.io/badge/React-19-blue?logo=react)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-4.x-skyblue?logo=tailwindcss)
![Redux Toolkit](https://img.shields.io/badge/Redux_Toolkit-RTK-purple?logo=redux)
![License](https://img.shields.io/badge/License-MIT-lightgrey)

## Overview

React + Vite frontend for the FlaDev Learning Management System (LMS). It provides a full user experience: course discovery, course learning, cart & checkout, blog, notifications, user profiles, and an admin dashboard to manage courses, blogs, contacts, orders, and more.

## Main features

- Admin dashboard: manage courses, blogs, contacts, orders, reviews, vouchers, and notifications.
- Course browsing & filtering: lists, search, categories, and paginated results.
- Course learning experience: lesson navigation, video playback, and progress tracking.
- Cart & checkout: add to cart, view cart details, and create orders (payment handled by backend services).
- Authentication & profiles: register, login, and manage user profiles.
- Real-time notifications: socket-based updates for notifications and live events.
- Blog & rich content: create/edit blog posts using a rich text editor (Quill/react-quill).
- File & media uploads: file/video input components for uploading course materials.
- Reviews & ratings: students can rate and review courses; admin can manage reviews.
- Wishlist & sharing: wishlist functionality and social sharing utilities.

## Demo

Replace the placeholder GIF at `public/demo.gif` with your recorded demo. The image below is a placeholder and will render once you add your GIF.

![Demo Placeholder](./public/demo.gif)

## Tech stack

- ![Vite](https://img.shields.io/badge/Vite-~6.0-brightgreen) `Vite` — Fast build tool and dev server used to run and bundle the app.
- ![React](https://img.shields.io/badge/React-19-blue) `React` — UI library for building the SPA and components.
- ![Tailwind CSS](https://img.shields.io/badge/TailwindCSS-4.x-skyblue) `Tailwind CSS` — Utility-first CSS framework for styling components.
- ![Redux Toolkit](https://img.shields.io/badge/Redux_Toolkit-2.x-purple) `Redux Toolkit` — Predictable app state management (slices in `src/redux/`).
- ![Socket.IO](https://img.shields.io/badge/Socket.IO-4.x-orange) `socket.io-client` — Realtime client for notifications and live events.
- ![Axios](https://img.shields.io/badge/Axios-1.x-0052CC) `axios` — HTTP client for API requests (API layer in `src/apis/`).
- ![Ant Design](https://img.shields.io/badge/AntDesign-5.x-cyan) `antd` — UI component library used in parts of the admin UI.

## Install & development

1. Install dependencies

```powershell
npm install
```

2. Create a `.env` file at the project root and add required client variables (use `VITE_` prefix so Vite exposes them to the client). Example keys:

```
VITE_API_BASE_URL=https://api.example.com
VITE_SOCKET_URL=https://sockets.example.com
VITE_PAYMENT_PUBLIC_KEY=pk_test_xxx
```

3. Run development server

```powershell
npm run dev
```

4. Build for production

```powershell
npm run build
```

5. Preview production build

```powershell
npm run preview
```

## Notes

- Backend services for payments and order processing are separate (see related backend folders in the workspace). Configure `VITE_API_BASE_URL` to point to your running backend.
- The demo GIF should be placed at `public/demo.gif` so it renders on GitHub and Vercel.

If you want, I can also add a `frontend/.env.example` file listing the `VITE_` variables, or replace the current placeholder GIF with a minimal valid GIF so the README shows an image immediately.
