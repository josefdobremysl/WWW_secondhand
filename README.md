\# WWW Secondhand



\## Description

This project is a web application for comparison of secondhand e-shops.  

The backend is built with \*\*FastAPI\*\* and the frontend with \*\*React\*\*.



\## Project Structure

```

my\_project/

│

├── backend/          # Python backend (FastAPI)

│   ├── main.py       # Main backend file

│   ├── venv/         # Python virtual environment (ignored in git)

│   └── ...           

│

├── frontend/         # React frontend

│   ├── src/

│   ├── public/

│   ├── package.json

│   └── ...           

│

└── .gitignore        # Files ignored by git

```



\## Installation and Running



\### Backend

1\. Navigate to the `backend` folder:

```bash

cd backend

```

2\. Create and activate a virtual environment:

```bash

python -m venv venv

\# Windows PowerShell

.\\venv\\Scripts\\Activate.ps1

```

3\. Install dependencies:

```bash

pip install fastapi uvicorn pydantic

```

4\. Run the backend:

```bash

uvicorn main:app --reload --port 8000

```



\### Frontend

1\. Navigate to the `frontend` folder:

```bash

cd frontend

```

2\. Install dependencies:

```bash

npm install

```

3\. Run the frontend:

```bash

npm start

```

The frontend will run at `http://localhost:3000` and communicate with the backend at `http://localhost:8000`.



\## Features

\- Add agents through the \*\*Create\*\* page

\- Dynamic buttons on the main page

\- Responsive design using TailwindCSS

\- Basic navigation between pages



\## Notes

\- Backend uses CORS to communicate with the frontend

\- Virtual environment and `node\_modules` are ignored in the repository



