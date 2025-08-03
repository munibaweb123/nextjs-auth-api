import { NextRequest } from "next/server";
import jwt from "jsonwebtoken";

export const getDataFromToken = (request: NextRequest) => {
  try {
    const token = request.cookies.get("token")?.value;

    if (!token) {
      throw new Error("Token not found in cookies");
    }

    const decodedToken: any = jwt.verify(token, process.env.JWTSECRET!);
    return decodedToken.id;
  } catch (error: any) {
    console.error("JWT Error:", error.message);
    throw new Error(error.message);
  }
};
