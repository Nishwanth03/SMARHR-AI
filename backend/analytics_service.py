import pandas as pd

# LOAD EMPLOYEES
employees = pd.read_csv(
    "data/employees.csv"
)

# LOAD TIMELOGS
timelogs = pd.read_csv(
    "data/timelogs.csv"
)

# LOAD TIMESHEETS
timesheets = pd.read_csv(
    "data/timesheets.csv"
)

# LOAD LEAVES
leaves = pd.read_csv(
    "data/leaves.csv"
)

# MERGE DATA
df = pd.merge(
    timelogs,
    employees,
    on="employee_id"
)

# WEEKLY HOURS
def get_weekly_hours():

    return (
        df.groupby("name")[
            "total_hours"
        ]
        .sum()
        .to_dict()
    )

# PRODUCTIVITY
def get_productivity():

    productivity = {}

    grouped = (
        df.groupby("name")[
            "total_hours"
        ]
        .mean()
    )

    for name, hours in grouped.items():

        productivity[name] = round(
            (hours / 9) * 100,
            1
        )

    return productivity

# LATE EMPLOYEES
def get_late_employees():

    late = df[
        df["check_in"] > "10:00"
    ]

    return late[
        [
            "name",
            "department",
            "check_in"
        ]
    ].to_dict(
        orient="records"
    )

# BELOW TARGET
def get_below_target():

    grouped = (
        df.groupby("name")[
            "total_hours"
        ]
        .sum()
    )

    result = grouped[
        grouped < 48
    ]

    return result.to_dict()

# PENDING TIMESHEETS
def get_pending_timesheets():

    pending = timesheets[
        timesheets["status"]
        == "Pending"
    ]

    return pending.to_dict(
        orient="records"
    )

# DEPARTMENT COUNTS
def get_department_counts():

    return (
        employees.groupby(
            "department"
        )["employee_id"]
        .count()
        .to_dict()
    )

# LEAVE SUMMARY
def get_leave_summary():

    return leaves.to_dict(
        orient="records"
    )

# TOP PERFORMER
def get_top_performer():

    weekly = (
        get_weekly_hours()
    )

    return max(
        weekly,
        key=weekly.get
    )

# BURNOUT RISK
def get_burnout_risk():

    burnout = df[
        df["total_hours"] >= 10
    ]

    return burnout[
        [
            "name",
            "department",
            "total_hours"
        ]
    ].to_dict(
        orient="records"
    )