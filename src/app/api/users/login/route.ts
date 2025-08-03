import { connectDB } from "@/dbConfig/dbConfig";
import User from "../../../models/userModels";
import { NextRequest, NextResponse } from "next/server";
import bcryptjs from "bcryptjs";
import jwt from 'jsonwebtoken';


connectDB()

export async function POST(request: NextRequest) {
    try{
    const reqBody = await request.json();
    const {username, email, password} = reqBody;
    console.log(reqBody)

    const user = await User.findOne({email})
    if(!user){
        return NextResponse.json({error: "User does not exists"}, {status: 400});

    }
    console.log("user exists")
    const validPassword = bcryptjs.compare(password, user.password)

    if(!validPassword){
        return NextResponse.json({error: "check your credentials"}, {status: 400});
    }

    const tokenData = {
        userId: user._id,
        username: user.username,
        email: user.email,}

        const token = jwt.sign(tokenData,
        process.env.JWT_SECRET!,
        {expiresIn: '1h'},)

        const res = NextResponse.json({
            message: "Login successful",
            success: true,
        })
        res.cookies.set('token', token, {
            httpOnly: true,
        })
        return res;

    } 
    catch(error:any){
        return NextResponse.json({error: error.message}, {status: 500});
    }
}