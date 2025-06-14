import { createContext, useEffect, useState } from "react";
import axios from "axios"

export const AuthContext = createContext()

export function AuthProvider({children}){
    const [user, setUser] = useState(null)
    //console.log(`before login user: ${user}`)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const storedUser = localStorage.getItem("user")
        if(storedUser){
            setUser(JSON.parse(storedUser))
        }
        setLoading(false)
    }, [])

    const login = async (email, password) => {
        try {
            const res = await axios.post("http://localhost:5000/api/admin/login",
                {email, password},
                {withCredentials: true}
            )

            if(res.status === 200){
                setUser(res.data.user)
                //console.log(`user in Auth: ${user}`)
                localStorage.setItem("user", JSON.stringify(res.data.user))
                return {success: true, role: res.data.user.role}
            }
        } catch (error) {
            return { success: false, message: error.response?.data?.message || "Login Failed"}
        }
    }

    const logout = async (navigate) => {
        try {
            await axios.get("http://localhost:5000/api/admin/logout", 
                {withCredentials: true}
            )
            setUser(null)
            localStorage.removeItem("user")
            navigate("/hidden-login")
        } catch (error) {
            console.error("Logout Failed: ", error)
        }
    }

    return (
        <AuthContext.Provider value={{ user, login, logout, loading }}>
            {children}
        </AuthContext.Provider>
    )
}