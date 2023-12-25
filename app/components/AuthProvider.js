"use client"
// This is done for the client side authentication 
import { SessionProvider } from "next-auth/react"

const AuthProvider = ({ children }) => {
    return <SessionProvider>{children}</SessionProvider>
}

export default AuthProvider;