import { useQuery } from 'react-query';

export const fetchedEvents = async () => {
  const response = await fetch('https://my-json-server.typicode.com/Code-Pop/Touring-VueRouter/events');
  const data = await response.json();
  return data;
};

export const useEventsFetched = () => {
  return useQuery('events', fetchedEvents);
};

export const fetchEventById = async (eventId) => {
  const response = await fetch(`https://my-json-server.typicode.com/Code-Pop/Touring-VueRouter/events/${eventId}`);
  const data = await response.json();
  return data;
};