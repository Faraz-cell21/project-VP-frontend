import { createContext, useEffect, useState } from "react";


export const AuthContext = createContext()

export function AuthProvider({childred}){
    const [user, setUser] = useState(null)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const storedUser = localStorage.getItem("vpUser")
        if(storedUser){
            setUser(JSON.parse(storedUser))
        }
        setLoading(false)
    }, [])
}