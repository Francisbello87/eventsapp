import React, { useState, useEffect } from "react";
import { useEventsFetched } from "../utils/fetchEvent";
import { QueryClient, QueryClientProvider } from "react-query";

const Home = () => {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    const fetchEvents = async () => {
      const response = await fetch(
        "https://my-json-server.typicode.com/Code-Pop/Touring-Vue-Router/events"
      );
      const data = await response.json();
      setEvents(data);
    };
    fetchEvents();
  }, []);

  return (
    <div className=" w-full h-screen py-12 px-[170px]">
        <div>
            <input type="text" placeholder="Search for events" />
        </div>
      <div className="flex flex-col justify-center">
        <h2 className="text-4xl font-bold text-red-400 mb-6">Upcoming Events</h2>
        <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-5 py-4">
          {events.map((event) => (
            <div key={event.id} className=" bg-gray-300 px-4 py-6 rounded-md drop-shadow">
              <span className="flex items-center mb-4 text-red-500 text-sm justify-between">
                <p>{event.date}</p>
                <p>{event.time}</p>
              </span>
              <div className="text-left">
              <h4 className="text-left" ><span className="font-bold">Title:</span> {event.title}</h4>
              <p><span className="font-bold">Title:</span> {event.location}</p>
              </div>
              
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Home;
