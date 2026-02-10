// useAuth.js
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

export default function useAuth() {
  const ctx = useContext(AuthContext);

  return {
    ...ctx,
    user: ctx?.user || null,
  };
}
