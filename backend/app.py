from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel

import pandas as pd

from ai_service import ask_ai

# FASTAPI APP
app = FastAPI()

# CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# LOAD CSV FILES
employees = pd.read_csv(
    "data/employees.csv"
)

timelogs = pd.read_csv(
    "data/timelogs.csv"
)

timesheets = pd.read_csv(
    "data/timesheets.csv"
)

leaves = pd.read_csv(
    "data/leaves.csv"
)

# MERGE DATA
df = pd.merge(
    timelogs,
    employees,
    on="employee_id"
)

# CHAT MODEL
class ChatRequest(BaseModel):

    message: str

    user: dict
# ---------------------------------
# HOME API
# ---------------------------------

@app.get("/")
def home():

    return {

        "message":
        "SmartHR AI Backend Running"

    }

# ---------------------------------
# EMPLOYEES API
# ---------------------------------

@app.get("/employees")
def employees_data():

    return employees.to_dict(
        orient="records"
    )

# ---------------------------------
# WEEKLY HOURS API
# ---------------------------------

@app.get("/weekly-hours")
def weekly_hours():

    weekly = (

        df.groupby("name")[
            "total_hours"
        ]
        .sum()

    )

    return {

        k: float(v)

        for k, v in
        weekly.to_dict().items()

    }

# ---------------------------------
# BELOW 48 HOURS API
# ---------------------------------

@app.get("/below-48-hours")
def below_48():

    weekly = (

        df.groupby("name")[
            "total_hours"
        ]
        .sum()

    )

    below = weekly[
        weekly < 48
    ]

    return {

        k: float(v)

        for k, v in
        below.to_dict().items()

    }

# ---------------------------------
# PRODUCTIVITY API
# ---------------------------------

@app.get("/productivity")
def productivity():

    df["productivity_score"] = (

        df["total_hours"] / 9

    ) * 100

    productivity = (

        df.groupby("name")[
            "productivity_score"
        ]
        .mean()

    )

    return {

        k: float(v)

        for k, v in
        productivity.to_dict().items()

    }

# ---------------------------------
# ATTENDANCE API
# ---------------------------------

@app.get("/attendance")
def attendance():

    attendance_data = []

    for _, row in df.iterrows():

        late = (
            row["check_in"]
            > "10:00"
        )

        attendance_data.append({

            "employee_id":
            row["employee_id"],

            "name":
            row["name"],

            "department":
            row["department"],

            "check_in":
            row["check_in"],

            "check_out":
            row["check_out"],

            "hours":
            float(
                row["total_hours"]
            ),

            "late":
            late

        })

    return attendance_data

# ---------------------------------
# TIMESHEETS API
# ---------------------------------

@app.get("/timesheets")
def get_timesheets():

    return timesheets.to_dict(
        orient="records"
    )

# ---------------------------------
# LEAVES API
# ---------------------------------

@app.get("/leaves")
def get_leaves():

    return leaves.to_dict(
        orient="records"
    )

# ---------------------------------
# AI INSIGHTS API
# ---------------------------------

@app.get("/ai-insights")
def ai_insights():

    insights = []

    productivity = (

        df.groupby("name")[
            "total_hours"
        ]
        .mean()

    )

    for name, hours in productivity.items():

        if hours >= 9:

            insights.append({

                "employee":
                name,

                "status":
                "High Performer",

                "message":
                f"{name} is consistently productive."

            })

        elif hours < 8:

            insights.append({

                "employee":
                name,

                "status":
                "Needs Attention",

                "message":
                f"{name} is working below expected hours."

            })

    return insights

# ---------------------------------
# REPORTS API
# ---------------------------------

@app.get("/reports")
def reports():

    report = []

    weekly = (

        df.groupby("name")[
            "total_hours"
        ]
        .sum()

    )

    for name, hours in weekly.items():

        report.append({

            "employee":
            name,

            "weekly_hours":
            float(hours),

            "status":
            "Good"
            if hours >= 48
            else "Below Target"

        })

    return report

# ---------------------------------
# DEPARTMENT SUMMARY API
# ---------------------------------

@app.get("/department-summary")
def department_summary():

    summary = (

        employees.groupby(
            "department"
        )["employee_id"]
        .count()

    )

    return {

        k: int(v)

        for k, v in
        summary.to_dict().items()

    }

# ---------------------------------
# PENDING TIMESHEETS API
# ---------------------------------

@app.get("/pending-timesheets")
def pending_timesheets():

    pending = timesheets[
        timesheets["status"]
        == "Pending"
    ]

    return pending.to_dict(
        orient="records"
    )

# ---------------------------------
# LATE EMPLOYEES API
# ---------------------------------

@app.get("/late-employees")
def late_employees():

    late = df[
        df["check_in"] > "10:00"
    ]

    return late[
        [
            "employee_id",
            "name",
            "department",
            "check_in"
        ]
    ].to_dict(
        orient="records"
    )

# ---------------------------------
# BURNOUT RISK API
# ---------------------------------

@app.get("/burnout-risk")
def burnout_risk():

    burnout = df[
        df["total_hours"] >= 10
    ]

    return burnout[
        [
            "employee_id",
            "name",
            "department",
            "total_hours"
        ]
    ].to_dict(
        orient="records"
    )

# ---------------------------------
# AI CHATBOT API
# ---------------------------------

@app.post("/chat")
def chatbot(request: ChatRequest):

    response = ask_ai(

    request.message,

    request.user
    )

    return {

        "reply":
        response

    }