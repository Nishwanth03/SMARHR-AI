function ReportsTable({
  reports
}) {

  return (

    <div className="bg-white rounded-3xl shadow p-8">

      <h2 className="text-3xl font-bold mb-6">
        Weekly Reports
      </h2>

      {
        reports.map(
          (
            report,
            index
          ) => (

            <div
              key={index}
              className="flex justify-between border-b py-5 text-lg"
            >

              <span>
                {
                  report.employee
                }
              </span>

              <span>
                {
                  report.weekly_hours
                } hrs
              </span>

              <span
                className={`font-bold ${
                  report.status ===
                  "Good"
                    ? "text-green-500"
                    : "text-red-500"
                }`}
              >
                {
                  report.status
                }
              </span>

            </div>

          )
        )
      }

    </div>

  );

}

export default ReportsTable;