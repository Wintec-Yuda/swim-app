import instance from "@/lib/axios/instance";

const userInstance = {
  addAthlete: (data: any, token: string) =>
    instance.post("/api/user/athlete", data, {
      headers: { Authorization: `Bearer ${token}` },
    }),

  addAthleteEvent: (index: any, eventId: any, data: any, token: string) =>
    instance.post(`/api/user/athlete/event/${index}/${eventId}`, data, {
      headers: { Authorization: `Bearer ${token}` },
    }),

  deleteAthlete: (index: string, token: string) =>
    instance.delete(`/api/user/athlete/${index}`, {
      headers: { Authorization: `Bearer ${token}` },
    }),
};

export default userInstance;
