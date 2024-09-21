import { useState, useEffect, createContext } from "react";
import { useNavigate } from "react-router-dom"; // make sure to import from the correct package
import CircularProgress from '@mui/material/CircularProgress'

const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
    const navigate = useNavigate();
    const [isAuth, setIsAuth] = useState(null); // null to indicate loading state

    useEffect(() => {
        const checkAuth = async () => {
            const authenticated = await window.auth.isAuthenticated;
            setIsAuth(authenticated);
            if (!authenticated) {
                navigate('/');
            }
        };

        checkAuth();
    }, [navigate]);

    if (isAuth === null) {
        return  <div style={{textAlign: "center"}}>
        <CircularProgress size={50} color="primary" />
    </div>; // or a loading spinner
    }

    return (
        <AuthContext.Provider value={{ isAuth }}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthContext;
