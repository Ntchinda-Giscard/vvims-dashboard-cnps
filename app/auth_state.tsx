"use client"

import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useSelector } from "react-redux";

function AuthState() {
    const user = useSelector((state: any) => state.auth.userInfo);
    const router = useRouter();

    useEffect(() =>{
        if(user === null){
            // router.push("/auth/login")
        }
    })
    return ( <></> );
}

export default AuthState;