import {
  useEffect,
  useState
} from "react";

import API from "./services/api";

import Sidebar from "./components/Sidebar";
import DashboardCards from "./components/DashboardCards";
import EmployeesTable from "./components/EmployeesTable";
import WeeklyHoursChart from "./components/WeeklyHoursChart";
import EmployeeStatusChart from "./components/EmployeeStatusChart";
import AttendanceTable from "./components/AttendanceTable";
import ReportsTable from "./components/ReportsTable";
import AIInsights from "./components/AIInsights";
import ChatBot from "./components/ChatBot";

import {
  menuItems
} from "./data/menu";

function App() {

  const [weeklyHours, setWeeklyHours] =
    useState({});

  const [below48, setBelow48] =
    useState({});
  
    const [employees, setEmployees] =
  useState([]);

  const [productivity, setProductivity] =
    useState({});

  const [attendance, setAttendance] =
    useState([]);

  const [insights, setInsights] =
    useState([]);

  const [reports, setReports] =
    useState([]);

  const [activePage, setActivePage] =
    useState("Dashboard");
    
  const [loggedUser, setLoggedUser] =
    useState({

    employee_id: "MGR001",

    name: "Akhil Varma",

    role: "manager",

    department: "IT"

  });

  // API CALLS
  useEffect(() => {

    API.get("/weekly-hours")
    .then((res) =>
      setWeeklyHours(res.data)
    );

    API.get("/below-48-hours")
    .then((res) =>
      setBelow48(res.data)
    );

    API.get("/employees")
  .then((res) =>
   setEmployees(res.data)
);

    API.get("/productivity")
    .then((res) =>
      setProductivity(res.data)
    );

    API.get("/attendance")
    .then((res) =>
      setAttendance(res.data)
    );

    API.get("/reports")
    .then((res) =>
      setReports(res.data)
    );

    API.get("/ai-insights")
    .then((res) =>
      setInsights(res.data)
    );

  }, []);

  // CALCULATIONS
  const avgProductivity =
    Object.values(productivity)
      .length > 0
      ? (
          Object.values(
            productivity
          ).reduce(
            (a, b) => a + b,
            0
          ) /
          Object.values(
            productivity
          ).length
        ).toFixed(1)
      : 0;

  const chartData =
    Object.entries(
      weeklyHours
    ).map(
      ([name, hours]) => ({
        name,
        hours
      })
    );

  const pieData = [
    {
      name: "Good",
      value:
        Object.keys(
          weeklyHours
        ).length -
        Object.keys(
          below48
        ).length
    },

    {
      name: "Below 48",
      value:
        Object.keys(
          below48
        ).length
    }
  ];

  const COLORS = [
    "#22c55e",
    "#ef4444"
  ];

  return (

    <div className="flex min-h-screen bg-gray-100">

      {/* SIDEBAR */}

      <Sidebar
        menuItems={menuItems}
        activePage={activePage}
        setActivePage={setActivePage}
      />

      {/* MAIN CONTENT */}

      <div className="flex-1 p-8 ml-64">

        {/* DASHBOARD */}

        {
          activePage ===
            "Dashboard" && (

            <div>

              <h1 className="text-5xl font-bold mb-2">
                HRMS Analytics Dashboard
              </h1>

              <p className="text-gray-500 mb-10 text-lg">
                AI Powered Employee Insights
              </p>

              <DashboardCards
                weeklyHours={
                  weeklyHours
                }
                below48={
                  below48
                }
                avgProductivity={
                  avgProductivity
                }
              />

              <div className="grid grid-cols-2 gap-6">

                <WeeklyHoursChart
                  chartData={
                    chartData
                  }
                />

                <EmployeeStatusChart
                  pieData={pieData}
                  COLORS={COLORS}
                />

              </div>

            </div>

          )
        }
        
        {
  activePage ===
    "Employees" && (

    <EmployeesTable
      employees={employees}
    />

  )
}
        {/* ATTENDANCE */}

        {
          activePage ===
            "Attendance" && (

            <AttendanceTable
              attendance={
                attendance
              }
            />

          )
        }

        {/* REPORTS */}

        {
          activePage ===
            "Reports" && (

            <ReportsTable
              reports={reports}
            />

          )
        }

        {/* AI INSIGHTS */}

        {
          activePage ===
            "AI Insights" && (

            <AIInsights
              insights={insights}
            />

          )
        }

      </div>

      {/* CHATBOT */}

      <ChatBot
       loggedUser={loggedUser}
      />

    </div>

  );
  

}

export default App;