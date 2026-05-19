import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid
} from "recharts";

function WeeklyHoursChart({
  chartData
}) {

  return (

    <div className="bg-white rounded-3xl shadow p-6">

      <h2 className="text-3xl font-bold mb-6">
        Weekly Work Hours
      </h2>

      <ResponsiveContainer
        width="100%"
        height={400}
      >

        <BarChart data={chartData}>

          <CartesianGrid
            strokeDasharray="3 3"
          />

          <XAxis dataKey="name" />

          <YAxis />

          <Tooltip />

          <Bar
            dataKey="hours"
            fill="#3b82f6"
            radius={[8, 8, 0, 0]}
          />

        </BarChart>

      </ResponsiveContainer>

    </div>

  );

}

export default WeeklyHoursChart;