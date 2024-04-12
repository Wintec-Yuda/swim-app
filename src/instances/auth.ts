import instance from "@/lib/axios/instance";

const authInstance = {
  register: (data: any) => instance.post("/api/auth/register", data),
};

export default authInstance;
