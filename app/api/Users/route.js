import { NextResponse } from "next/server";
import User from "@/app/(models)/User";
import bcrypt from "bcrypt"

export async function POST(req) {
    try {
        const body = await req.json();
        const userData = body;

        if (!userData.email || !userData.password) {
            return NextResponse.json({ message: "All parameters are required", err }, { status: 400 })
        }
        const duplicate = await User.findOne({ email: userData.email }).lean().exec();

        if (duplicate) {
            return NextResponse.json({ message: "Duplicate email", err }, { status: 209 })

        }

        const hashPass = bcrypt.hashSync(userData.password, 10);
        userData.password = hashPass
        await User.create(userData);
        return NextResponse.json({ message: "User Created" }, { status: 201 })

    }
    catch (error) {
        console.log(error);
        return NextResponse.json({ message: "Error", error }, { status: 500 })
    }
}