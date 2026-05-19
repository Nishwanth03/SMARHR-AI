function Sidebar({
  menuItems,
  activePage,
  setActivePage
}) {

  return (

    <div className="w-64 bg-gray-900 text-white p-6 fixed h-full">

      <h1 className="text-3xl font-bold mb-12">
        SmartHR AI
      </h1>

      <ul className="space-y-4">

        {
          menuItems.map(
            (item) => (

              <li
                key={item}
                onClick={() =>
                  setActivePage(item)
                }
                className={`cursor-pointer px-4 py-3 rounded-xl transition ${
                  activePage === item
                    ? "bg-orange-500"
                    : "hover:bg-gray-700"
                }`}
              >
                {item}
              </li>

            )
          )
        }

      </ul>

    </div>

  );

}

export default Sidebar;