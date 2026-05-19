function AttendanceTable({
  attendance
}) {

  return (

    <div className="bg-white rounded-3xl shadow p-8 overflow-auto">

      <table className="w-full">

        <thead>

          <tr className="border-b text-left">

            <th className="py-4">
              Employee
            </th>

            <th>
              Check In
            </th>

            <th>
              Check Out
            </th>

            <th>
              Hours
            </th>

            <th>
              Status
            </th>

          </tr>

        </thead>

        <tbody>

          {
            attendance.map(
              (
                emp,
                index
              ) => (

                <tr
                  key={index}
                  className="border-b"
                >

                  <td className="py-4">
                    {
                      emp.name
                    }
                  </td>

                  <td>
                    {
                      emp.check_in
                    }
                  </td>

                  <td>
                    {
                      emp.check_out
                    }
                  </td>

                  <td>
                    {
                      emp.hours
                    }
                  </td>

                  <td>

                    {
                      emp.late
                        ? (
                          <span className="text-red-500 font-bold">
                            Late
                          </span>
                        )
                        : (
                          <span className="text-green-500 font-bold">
                            On Time
                          </span>
                        )
                    }

                  </td>

                </tr>

              )
            )
          }

        </tbody>

      </table>

    </div>

  );

}

export default AttendanceTable;