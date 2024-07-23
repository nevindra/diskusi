import { supabase } from "@/database/initDB";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
    const { email, password } = await request.json();
    if (!email || !password) {
        return NextResponse.json(
            { message: "Missing required fields" },
            { status: 400 },
        );
    }
    try {
        const { data, error } = await supabase.auth.signInWithPassword({
            email,
            password,
        });
        if (error) {
            console.error("Login error:", error);
            return NextResponse.json(
                { message: "An error occurred during login. Please try again later." },
                { status: 500 },
            );
        }
        // Return user data along with the success message
        return NextResponse.json(
            { 
                message: "Login successful",
            },
            { status: 200 },
        );
    }
    catch (error) {
        console.error("Unexpected error during login:", error);
        return NextResponse.json(
            { message: "An unexpected error occurred. Please try again later." },
            { status: 500 },
        );
    }
}