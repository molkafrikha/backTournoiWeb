import { Outlet, Navigate, useLocation } from "react-router-dom";
import { useAppSelector } from "../app/hooks";

const RequireAuth = () => {
    const location = useLocation();
    const accessToken = useAppSelector(state => state.auth.accessToken);
    return (
        accessToken ? <Outlet /> : <Navigate to="/login" state={{ from: location }} replace />
    )
}

export default RequireAuth