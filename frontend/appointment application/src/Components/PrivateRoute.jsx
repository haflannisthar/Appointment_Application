import { Navigate, Outlet } from "react-router-dom";
import { AuthContext } from "../Context/AuthContext";
import { useContext } from "react";

const PrivateRoute = () => {
    const { user, loading } = useContext(AuthContext);

    if (loading) return <p>Loading...</p>;

    return user ? <Outlet /> : <Navigate to="/login" replace />;
};

export default PrivateRoute;
