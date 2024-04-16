import instance from "@/lib/axios/instance";
import { get } from "http";

const eventInstance = {
  addEvent: (data: any, token: string) =>
    instance.post("/api/events", data, {
      headers: { Authorization: `Bearer ${token}` },
    }),

  deleteEvent: (id: string, token: string) =>
    instance.delete(`/api/events/${id}`, {
      headers: { Authorization: `Bearer ${token}` },
    }),
};

export default eventInstance;
