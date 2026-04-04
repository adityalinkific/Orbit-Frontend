// useAuth.js
import { useSelector, useDispatch } from "react-redux";
import { loginAction, logoutAction } from "../store/slices/authSlice";

export default function useAuth() {
  const dispatch = useDispatch();
  const { user, loading } = useSelector((state) => state.auth);

  const login = (data, rememberMe) => dispatch(loginAction(data, rememberMe));
  const logout = () => dispatch(logoutAction());

  return {
    user,
    loading,
    login,
    logout,
  };
}
