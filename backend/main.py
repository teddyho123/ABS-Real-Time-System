# simulate_abs.py
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
import numpy as np

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/simulate")
def simulate_abs():
    dt = 0.01
    time = np.arange(0, 5, dt)
    car_speed = 30
    wheel_speed = 30
    brake_force = 8000
    mu = 0.8
    car_mass = 1000

    car_speeds = []
    wheel_speeds = []
    abs_active = []

    for t in time:
        slip = (car_speed - wheel_speed) / max(car_speed, 0.01)
        brake = 0 if slip > 0.2 else brake_force
        acc = -min(brake, mu * car_mass * 9.81) / car_mass
        car_speed = max(0, car_speed + acc * dt)

        if brake > 0:
            wheel_acc = -brake / (car_mass * 0.1)
            wheel_speed = max(0, wheel_speed + wheel_acc * dt)
        else:
            wheel_speed += 0.1 * (car_speed - wheel_speed)

        car_speeds.append(car_speed)
        wheel_speeds.append(wheel_speed)
        abs_active.append(slip > 0.2)

    return {
        "time": time.tolist(),
        "car_speeds": car_speeds,
        "wheel_speeds": wheel_speeds,
        "abs_active": abs_active,
    }
