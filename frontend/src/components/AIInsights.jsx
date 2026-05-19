function AIInsights({ insights }) {

  return (
    <div className="grid grid-cols-2 gap-6">

      {insights.map((item, index) => (

        <div
          key={index}
          className="bg-white rounded-3xl shadow p-6"
        >

          <h2 className="text-2xl font-bold mb-3">
            {item.employee}
          </h2>

          <p
            className={`font-bold mb-3 ${
              item.status === "High Performer"
                ? "text-green-500"
                : "text-red-500"
            }`}
          >
            {item.status}
          </p>

          <p className="text-gray-600">
            {item.message}
          </p>

        </div>

      ))}

    </div>
  );

}

export default AIInsights;