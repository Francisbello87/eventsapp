import React, { useState, useEffect } from "react";

const Home = () => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [filteredResults, setFilteredResults] = useState([]);

  const handleSearch = (e) => {
    e.prevent.Default();
    setSearch("");
  };
  const searchItems = (searchValue) => {
    setSearch(searchValue);
    if (search !== "") {
      const filteredEvent = events.filter((item) => {
        return Object.values(item)
          .join("")
          .toLowerCase()
          .includes(search.toLowerCase());
      });
      setFilteredResults(filteredEvent);
    } else {
      setFilteredResults(events);
    }
  };
  useEffect(() => {
    const fetchEvents = async () => {
      const response = await fetch(
        "https://my-json-server.typicode.com/Code-Pop/Touring-Vue-Router/events"
      );
      const data = await response.json();
      setEvents(data);
      setLoading(false);
    };
    fetchEvents();
  }, []);
  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen w-full">
        Geting your events...
      </div>
    );
  }
  return (
    <div className=" w-full h-screen py-12 md:px-[170px] px-12">
      <form className="flex items-center justify-center mb-8 ">
        <input
          value={search}
          onChange={(e) => searchItems(e.target.value)}
          className="border px-4 py-2 outline-none w-[70%] "
          type="text"
          placeholder="Search for events"
        />
      </form>
      <div className="flex flex-col justify-center">
        <h2 className="md:text-4xl text-2xl font-bold text-black mb-6">
          Upcoming Events
        </h2>
        {search.length > 1 ? (
          filteredResults.map((item) => {
            return (
              <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-5 py-4">
                <div
                  key={item.id}
                  className=" bg-gray-300 px-4 py-6 rounded-md drop-shadow"
                >
                  <span className="flex items-center mb-4 text-red-500 text-sm justify-between">
                    <p>{item.date}</p>
                    <p>{item.time}</p>
                  </span>

                  <div className="text-left">
                    <h4 className="text-left">
                      <span className="font-bold">Title:</span> {item.title}
                    </h4>
                    <p>
                      <span className="font-bold">Location:</span>{" "}
                      {item.location}
                    </p>
                    <p>
                      <span className="font-bold">Organizer:</span>{" "}
                      {item.organizer}
                    </p>
                    <p className=" text-xs italic  my-4">
                      <span className="font-bold ">Category: </span>
                      {item.category}
                    </p>
                  </div>
                </div>
              </div>
            );
          })
        ) : (
          <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-5 py-4">
            {events.map((event) => (
              <div
                key={event.id}
                className=" bg-gray-300 px-4 py-6 rounded-md drop-shadow"
              >
                <span className="flex items-center mb-4 text-red-500 text-sm justify-between">
                  <p>{event.date}</p>
                  <p>{event.time}</p>
                </span>

                <div className="text-left">
                  <h4 className="text-left">
                    <span className="font-bold">Title:</span> {event.title}
                  </h4>
                  <p>
                    <span className="font-bold">Location:</span>{" "}
                    {event.location}
                  </p>
                  <p>
                    <span className="font-bold">Organizer:</span>{" "}
                    {event.organizer}
                  </p>
                  <p className=" text-xs italic  my-4">
                    <span className="font-bold ">Category: </span>
                    {event.category}
                  </p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Home;
