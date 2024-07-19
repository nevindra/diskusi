import { checkSupabaseConnection, supabase } from "@/libs/supabase/initDB";
import { NextResponse } from "next/server";

export async function GET() {
	const isConnected = checkSupabaseConnection();
	if (!isConnected) {
		console.log("Supabase connection not established");
	} else {
		console.log("Supabase connection established");
	}
	return NextResponse.json({ message: "API is working" }, { status: 200 });
}

export async function POST(request: Request) {
	try {
		const { username, email, password } = await request.json();

		if (!username || !email || !password) {
			return NextResponse.json(
				{ message: "Missing required fields" },
				{ status: 400 },
			);
		}

		const { data, error } = await supabase.auth.signUp({
			email,
			password,
			options: {
				data: {
					display_name: username, // Add this line to set the display name
				},
			},
		});

    if (!error) {
			return NextResponse.json(
				{ message: "User registered successfully" },
				{ status: 201 },
			);
		} 

		switch (error?.code) {
			case "over_email_send_rate_limit":
				return NextResponse.json(
					{
						message:
							"You have exceeded the email send rate limit. Please try again later.",
					},
					{ status: 429 },
				);
			case "invalid_email":
				return NextResponse.json(
					{
						message:
							"Invalid email address. Please try again with a valid email.",
					},
					{ status: 400 },
				);
			case "invalid_password":
				return NextResponse.json(
					{
						message:
							"Invalid password. Please try again with a valid password.",
					},
					{ status: 400 },
				);
        case "user_already_exists":
        return NextResponse.json(
          {
            message: "User already exists. Please try again with a different email.",
          },
          { status: 400 },
        );
			default:
        console.error(error);
				return NextResponse.json(
					{
						message: "An error occurred during signup. Please try again later.",
					},
					{ status: 500 },
				);
		}

	} catch (error) {
		console.error("Unexpected error during signup:", error);
		return NextResponse.json(
			{ message: "An unexpected error occurred. Please try again later." },
			{ status: 500 },
		);
	}
}
