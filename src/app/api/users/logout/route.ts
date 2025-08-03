import { connectDB } from "@/dbConfig/dbConfig";
import User from "../../../models/userModels";
import { NextRequest, NextResponse } from "next/server";
import bcryptjs from "bcryptjs";
import jwt from 'jsonwebtoken';


connectDB()

export async function GET(request: NextRequest) {
    try {
        const res = NextResponse.json({
            message: "Logout successfully",
            success: true,
        })
        res.cookies.set('token', '', {
            httpOnly: true,
            expires: new Date(0)
        })
        return res;
    }
    catch (error:any){
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}