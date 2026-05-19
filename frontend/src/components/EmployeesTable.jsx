function EmployeesTable({
  employees
}) {

  return (

    <div className="bg-white rounded-3xl shadow p-8 overflow-auto">

      <h1 className="text-4xl font-bold mb-8">
        Employees
      </h1>

      <table className="w-full">

        <thead>

          <tr className="border-b text-left">

            <th className="py-4">
              Employee ID
            </th>

            <th>
              Name
            </th>

            <th>
              Department
            </th>

            <th>
              Email
            </th>

            <th>
              Role
            </th>

          </tr>

        </thead>

        <tbody>

          {
            employees.map(
              (
                emp,
                index
              ) => (

                <tr
                  key={index}
                  className="border-b hover:bg-gray-50 transition"
                >

                  <td className="py-4">
                    {
                      emp.employee_id
                    }
                  </td>

                  <td>
                    {
                      emp.name
                    }
                  </td>

                  <td>
                    {
                      emp.department
                    }
                  </td>

                  <td>
                    {
                      emp.email
                    }
                  </td>

                  <td>

                    <span className="bg-blue-100 text-blue-600 px-3 py-1 rounded-full text-sm">

                      {
                        emp.role
                      }

                    </span>

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

export default EmployeesTable;  