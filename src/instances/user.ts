import instance from "@/lib/axios/instance";

const userInstance = {
  addAthlete: (data: any) => instance.post("/api/user/athlete", data),
};

export default userInstance;
