import os
import cohere

from dotenv import load_dotenv

from analytics_service import (
    get_weekly_hours,
    get_productivity,
    get_late_employees,
    get_below_target,
    get_pending_timesheets,
    get_department_counts,
    get_leave_summary,
    get_top_performer,
    get_burnout_risk
)

# LOAD ENV
load_dotenv()

# COHERE CLIENT
co = cohere.Client(
    os.getenv(
        "COHERE_API_KEY"
    )
)

# SMART AI FUNCTION
def ask_ai(question, user):

    # USER INFO
    role = user.get(
        "role"
    )

    name = user.get(
        "name"
    )

    department = user.get(
        "department"
    )

    employee_id = user.get(
        "employee_id"
    )

    # ANALYTICS
    weekly_hours = (
        get_weekly_hours()
    )

    productivity = (
        get_productivity()
    )

    late_employees = (
        get_late_employees()
    )

    below_target = (
        get_below_target()
    )

    pending_timesheets = (
        get_pending_timesheets()
    )

    department_counts = (
        get_department_counts()
    )

    leave_summary = (
        get_leave_summary()
    )

    top_performer = (
        get_top_performer()
    )

    burnout_risk = (
        get_burnout_risk()
    )

    # CURRENT USER LEAVES
    user_leaves = [

        leave

        for leave in leave_summary

        if leave["employee_id"]
        == employee_id

    ]

    # ---------------------------------
    # ROLE-BASED FILTERING
    # ---------------------------------

    # EMPLOYEE ACCESS
    if role == "employee":

        # ONLY OWN DATA
        weekly_hours = {

            k: v

            for k, v
            in weekly_hours.items()

            if k == name

        }

        productivity = {

            k: v

            for k, v
            in productivity.items()

            if k == name

        }

        late_employees = [

            emp

            for emp in late_employees

            if emp["name"] == name

        ]

        below_target = {

            k: v

            for k, v
            in below_target.items()

            if k == name

        }

        burnout_risk = [

            emp

            for emp in burnout_risk

            if emp["name"] == name

        ]

    # MANAGER ACCESS
    elif role == "manager":

        # ONLY SAME DEPARTMENT
        late_employees = [

            emp

            for emp in late_employees

            if emp["department"]
            == department

        ]

        burnout_risk = [

            emp

            for emp in burnout_risk

            if emp["department"]
            == department

        ]

    # HR ACCESS
    # HR CAN SEE EVERYTHING

    # ---------------------------------
    # AI PROMPT
    # ---------------------------------

    prompt = f"""
You are SmartHR AI Assistant.

Current Logged User:

Name:
{name}

Role:
{role}

Department:
{department}

IMPORTANT ACCESS RULES:

- Employees can only access their own information
- Managers can access only their department/team data
- HR can access organization-wide analytics

Organization Analytics:

Top Performer:
{top_performer}

Weekly Hours:
{weekly_hours}

Productivity:
{productivity}

Late Employees:
{late_employees}

Employees Below Target:
{below_target}

Pending Timesheets:
{pending_timesheets}

Department Counts:
{department_counts}

Burnout Risk Employees:
{burnout_risk}

Current User Leave Details:
{user_leaves}

Organization Leave Summary:
{leave_summary}

Question:
{question}

Instructions:
- Answer professionally
- Use analytics data
- Respect role-based access
- Be concise and helpful
"""

    # ---------------------------------
    # AI RESPONSE
    # ---------------------------------

    response = co.chat(

        model="command-a-03-2025",

        message=prompt

    )

    # CLEAN MARKDOWN
    cleaned_text = (

        response.text
        .replace("**", "")
        .replace("*", "")

    )

    return cleaned_text