import pandas as pd

# Load datasets
employees = pd.read_csv("../data/employees.csv")
timelogs = pd.read_csv("../data/timelogs.csv")

# Merge data
df = pd.merge(timelogs, employees, on="employee_id")

# Weekly total hours
weekly_hours = df.groupby("name")["total_hours"].sum()

print("\nWeekly Work Hours:\n")
print(weekly_hours)

# Employees below 48 hours
print("\nEmployees Below 48 Hours:\n")

below_48 = weekly_hours[weekly_hours < 48]

print(below_48)

# Average work hours
avg_hours = df.groupby("name")["total_hours"].mean()

print("\nAverage Daily Hours:\n")
print(avg_hours)

# Productivity score
df["productivity_score"] = (df["total_hours"] / 9) * 100

productivity = df.groupby("name")["productivity_score"].mean()

print("\nProductivity Scores:\n")
print(productivity)