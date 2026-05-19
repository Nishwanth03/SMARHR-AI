function DashboardCards({
  weeklyHours,
  below48,
  avgProductivity
}) {

  return (

    <div className="grid grid-cols-3 gap-6 mb-8">

      <div className="bg-white rounded-3xl shadow p-8">

        <p className="text-gray-500 text-lg">
          Total Employees
        </p>

        <h2 className="text-5xl font-bold mt-5">
          {
            Object.keys(
              weeklyHours
            ).length
          }
        </h2>

      </div>

      <div className="bg-white rounded-3xl shadow p-8">

        <p className="text-gray-500 text-lg">
          Avg Productivity
        </p>

        <h2 className="text-5xl font-bold text-green-500 mt-5">
          {avgProductivity}%
        </h2>

      </div>

      <div className="bg-white rounded-3xl shadow p-8">

        <p className="text-gray-500 text-lg">
          Below 48 Hours
        </p>

        <h2 className="text-5xl font-bold text-red-500 mt-5">
          {
            Object.keys(
              below48
            ).length
          }
        </h2>

      </div>

    </div>

  );

}

export default DashboardCards;