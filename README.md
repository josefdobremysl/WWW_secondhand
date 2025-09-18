# WWW Secondhand

## Description

This project is a web application for comparison of secondhand e-shops.

The backend is built with **FastAPI** and the frontend with **React** (using TailwindCSS for styling).

Users can search for items on Vinted, save searches as dynamic buttons, and view results in a responsive grid.

---

## Project Structure

my_project/
│
├── backend/ # Python backend (FastAPI)
│ ├── main.py # Main backend file
│ ├── venv/ # Python virtual environment (ignored in git)
│ └── ...
│
├── frontend/ # React frontend
│ ├── src/
│ ├── public/
│ ├── package.json
│ └── ...
│
└── .gitignore # Files ignored by git


---

## Installation and Running

### Backend

1. Navigate to the backend folder:

```bash
cd backend

    Create and activate a virtual environment:

python -m venv venv

# Windows PowerShell
.\venv\Scripts\Activate.ps1

    Install dependencies:

pip install fastapi uvicorn pydantic pyVinted python-dotenv

    Run the backend:

uvicorn main:app --reload --port 8000

Frontend

    Navigate to the frontend folder:

cd frontend

    Install dependencies:

npm install

    Run the frontend:

npm start

The frontend will run at http://localhost:3000
and communicate with the backend at http://localhost:8000

.


Notes

    Backend uses CORS to communicate with the frontend

    Virtual environment (venv) and node_modules are ignored in the repository

    Vinted searches use the pyVinted

    library

Uploading to GitHub

    Initialize Git in your project folder:

git init

    Add all files (except those in .gitignore):

git add .

    Commit your changes:

git commit -m "Initial commit"

    Create a repository on GitHub (e.g., WWW_secondhand) and copy its URL.

    Link your local repo to GitHub:

git remote add origin https://github.com/josefdobremysl/WWW_secondhand.git
git branch -M main
git push -u origin main
