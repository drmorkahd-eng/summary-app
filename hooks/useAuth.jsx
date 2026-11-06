import {useContext, createContext, useState, useEffect} from "react";
import { useNavigate } from "react-router-dom";

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

const AuthProvider = ({children}) => {
    const [token, setToken] = useState(localStorage.getItem("userToken") || null )
    const navigate = useNavigate()

 useEffect(() => {
    const cachedToken = localStorage.getItem("userToken")
    if (cachedToken) {
        setToken(cachedToken)
    }
 },[])
 
 const login = (userToken) => {
    localStorage.setItem("userToken", userToken)
    setToken(userToken)
 }
 const logout = () => {
    localStorage.removeItem("userToken")
    setToken(null)
    navigate("/signin")
 }

return (
    <AuthContext.Provider value={[token, login, logout]}>
        {children}
    </AuthContext.Provider>  
  )
}
export default AuthProvider;