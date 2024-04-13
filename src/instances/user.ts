import instance from "@/lib/axios/instance";

const userInstance = {
  addAthlete: (data: any, token: string) =>
    instance.post("/api/user/athlete", data, {
      headers: { Authorization: `Bearer ${token}` },
    }),
};

export default userInstance;
