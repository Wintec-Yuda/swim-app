import instance from "@/lib/axios/instance";

const userInstance = {
  addAthlete: (data: any, token: string) =>
    instance.post("/api/user/athlete", data, {
      headers: { Authorization: `Bearer ${token}` },
    }),

  addAthleteEvent: (athlete: any, eventId: string, token: string) =>
    instance.post(`/api/user/athlete/event/${eventId}`, athlete, {
      headers: { Authorization: `Bearer ${token}` },
    }),

  deleteAthlete: (data: any, token: string) =>
    instance.delete("/api/user/athlete", {
      data: data,
      headers: { Authorization: `Bearer ${token}` },
    }),
};

export default userInstance;
