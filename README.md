# ABS Real Time System
A visualized simulation of the ABS in a car, under different conditions, and how it implements real time system.

Tech Stacks:
Backend - Python, FastAPI
Frontend - React, Chart.js


Before developing:

Install venv

python -m venv venv
Activate virtual environment

venv/Scripts/activate
Install all the dependecies in both backend and frontend

pip install -r requirements.txt (backend)
npm install (frontend)
To start developing:

in the frontend dir

npm run build
npm start
in the backend dir

python -m uvicorn main:app --reload