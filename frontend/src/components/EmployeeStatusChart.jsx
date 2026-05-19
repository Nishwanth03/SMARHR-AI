import {
  ResponsiveContainer,
  PieChart,
  Pie,
  Tooltip,
  Legend,
  Cell
} from "recharts";

function EmployeeStatusChart({
  pieData,
  COLORS
}) {

  return (

    <div className="bg-white rounded-3xl shadow p-6">

      <h2 className="text-3xl font-bold mb-6">
        Employee Status
      </h2>

      <ResponsiveContainer
        width="100%"
        height={400}
      >

        <PieChart>

          <Pie
            data={pieData}
            dataKey="value"
            outerRadius={130}
            label
          >

            {
              pieData.map(
                (
                  entry,
                  index
                ) => (

                  <Cell
                    key={index}
                    fill={
                      COLORS[index]
                    }
                  />

                )
              )
            }

          </Pie>

          <Tooltip />

          <Legend />

        </PieChart>

      </ResponsiveContainer>

    </div>

  );

}

export default EmployeeStatusChart;