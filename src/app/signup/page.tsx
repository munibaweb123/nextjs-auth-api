"use client";
import { useEffect, useState } from "react";
import axios from "axios";
import {toast} from 'react-hot-toast'
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function SignupPage() {
    const router = useRouter();
    const [user, setUser] = useState({
        email: '',
        password: '',
        username: '',
    })

    const [buttonDisabled, setButtonDisabled] = useState(false);
    const [loading, setloading] = useState(false);

    const onSignup = async()=>{
        try {
            setloading(true)
            const res = await axios.post("/api/users/signup", user)
            console.log("Signup successfully", res.data);
            router.push("/login");
            
        } catch (error:any) {
            console.log("Signup failed")
            toast.error(error.message)
        }
    }

    useEffect(()=>{
        if(user.email.length > 0 && user.password.length > 0 && user.username.length > 0){
            setButtonDisabled(false);
        } else {
            setButtonDisabled(true);
        }
    },[user])
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">

        <h1 className="text-2xl font-bold mb-6">{loading ? "processing":"Sign up"}</h1>
        <hr/>
        <label htmlFor="username">username</label>
        <input className="border p-2 mb-4 w-full max-w-xs"
        type="text" id="username" value={user.username}
        onChange={(e)=> setUser({...user, username: e.target.value})}
        placeholder="username"
        />

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
        onClick={onSignup}>
            {buttonDisabled?"No sign up":"Sign Up"}
            </button>
        <Link href={"/login"}>Visit Login Page</Link>    
      </div>
    );

    }
