import { registerService } from "./auth.service";
import { rolesService } from "./auth.service";
import { request } from "./api";

/* ---------------- GET USERS (FROM ROLES API RESPONSE) ---------------- */
export const getAllUsers = async () => {
  const res = await request("/user/all-users", {
    method: "GET",
  });
  // Assuming backend response: { status: true, data: [...] }
  return res.data?.data || [];
};

/* ---------------- CREATE USER ---------------- */
export const createUserService = async (data) => {
  return await registerService(data);
};

/* ---------------- DELETE CURRENT USER ---------------- */
export const deleteUserService = async () => {
  const res = await request("/auth/delete", {
    method: "DELETE",
  });
  return res.data;
};

/* ---------------- UPDATE USER ---------------- */
// Not supported by backend
export const updateUserService = async () => {
  throw new Error("Update user endpoint not available in backend");
};
