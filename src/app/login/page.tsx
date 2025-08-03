"use client";
import { useEffect, useState } from "react";
import axios from "axios";
import {toast} from 'react-hot-toast'
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function LoginPage() {
    const router = useRouter();
    const [user, setUser] = useState({
        email: '',
        password: '',
      
    })

    const [buttonDisabled, setButtonDisabled] = useState(false);
    const [loading, setloading] = useState(false);

    const onLogin = async()=>{
        try {
            setloading(true)
            const res = await axios.post("/api/users/login", user)
            console.log("Login successfully", res.data);
            router.push("/profile");
            
        } catch (error:any) {
            console.log("Signup failed")
            toast.error(error.message)
        }
    }

    useEffect(()=>{
        if(user.email.length > 0 && user.password.length > 0 ){
            setButtonDisabled(false);
        } else {
            setButtonDisabled(true);
        }
    },[user])
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">

        <h1 className="text-2xl font-bold mb-6">{loading ? "processing":"Login"}</h1>
        <hr/>
        

        <label htmlFor="email">Email</label>
        <input className="border p-2 mb-4 w-full max-w-xs"
        type="email" id="email" value={user.email}
        onChange={(e)=> setUser({...user, email: e.target.value})}
        placeholder="email"
        />
        <label htmlFor="password">Password</label>
        <input className="border p-2 mb-4 w-full max-w-xs"
        type="password" id="password" value={user.password}
        onChange={(e)=> setUser({...user, password: e.target.value})}
        placeholder="password"
        />
        <button className="bg-blue-500 text-white p-2 rounded w-full max-w-xs"
        onClick={onLogin}>
            {buttonDisabled?"No login":"Login"}
            </button>
        <Link href={"/signup"}>Visit Sign Up Page</Link>    
      </div>
    );

    }
