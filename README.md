# 🛠️ Interactive DIY Project Hub

## Overview

**Interactive DIY Project Hub** is a dynamic online platform for DIY enthusiasts to share their projects, step-by-step guides, and required materials. The goal is to build a vibrant community where creators can learn, collaborate, and inspire each other.

This project consists of:

- A **React.js** frontend for a responsive and interactive user interface.
- A **Django** backend that powers the logic and data management through a RESTful API.

---

## 🚀 Features

- 📁 Share DIY Projects with guides and materials
- 🗂️ Browse projects by categories
- ⭐ Rate and comment on projects
- 💬 Community discussions
- 🔐 Admin dashboard for content moderation

---

## 🛠️ Tech Stack

**Frontend**
- React.js
- Node.js

**Backend**
- Django
- Django REST Framework
- PostgreSQL

---

## 📂 Project Structure



Project_Diy/
│
├── backend/ # Django backend
│ ├── manage.py
│ ├── venv/ # Python virtual environment
│ └── ...
│
└── frontend/ # React frontend
├── src/
├── package.json
└── ...



---



## 🔧 Setup Instructions

### 1. Clone the repository

```bash
git clone https://github.com/HadiaAmjad4/Project_Diy.git
cd Project_Diy





### 2. Backend Setup

```bash
cd backend
source venv/bin/activate             # Activate virtual environment
python manage.py migrate             # Apply database migrations
python manage.py createsuperuser     # Create a superuser
python manage.py runserver           # Start Django development server
Access the admin panel at: http://127.0.0.1:8000/admin/



### 3. Frontend Setup

```bash
cd ../frontend
npm install
npm start   # Start React development server
Frontend typically runs at: http://localhost:3000/


# ✅ Requirements
```bash
Python 3.8+
Node.js and npm
PostgreSQL
pip (Python package manager)
Virtualenv (recommended)
