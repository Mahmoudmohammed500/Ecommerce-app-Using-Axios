import { useCallback, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
    actLogin,
    actRegister,
    resetUIState,
    logout as logoutUser,
    actGetUser,
} from "../store/auth/authSlice";
import { useNavigate } from "react-router-dom";


const useAuth = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const {
        loading,
        error,
        actType,
    } = useSelector((state) => state.auth);
    const userData = useSelector(state => state.auth.data)
    const login = (values) => {
        dispatch(actLogin(values))
        // .unwrap()
        // .then(() => navigate("/"));
    };

    const logout = () => {
        dispatch(logoutUser());
        navigate("/login");
    };

    const register = (values) => {
        dispatch(actRegister(values))
        // .unwrap()
        // .then(() => navigate("/"));
    };

    const resetUI = useCallback(() => {
        dispatch(resetUIState());
    }, [dispatch]);

    const GetUsersData = useCallback(async () => {
        const data = await dispatch(actGetUser());
        return data; // Return the fetched userData
      }, [dispatch]);

      useEffect(() => {
        const fetchDataAndStore = async () => {
          const Data = await GetUsersData();
          const UsersData = Data.payload;
          if (UsersData && UsersData.length > 0) {
            const emails = UsersData.map(item => item.email);
            const Passwords = UsersData.map(item => item.password);
            localStorage.setItem("registeredEmails", JSON.stringify(emails));
            localStorage.setItem("registeredPasswords", JSON.stringify(Passwords));
          }
        };
      
        fetchDataAndStore();
      }, [GetUsersData]);

    return {
        loading,
        error,
        actType,
        login,
        register,
        logout,
        resetUI,
        GetUsersData,
    };
};

export default useAuth;