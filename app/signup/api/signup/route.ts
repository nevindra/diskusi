import { db } from "@/db/db";
import { users } from "@/db/schema/users";
import { hash } from "argon2";
import { NextResponse } from "next/server";

export async function GET() {
	return NextResponse.json({ message: "API is working" }, { status: 200 });
}

export async function POST(request: Request) {
	try {
		const { name, email, password } = await request.json();
	
		// Basic validation
		if (!name || !email || !password) {
			return NextResponse.json(
				{ message: "Missing required fields" },
				{ status: 400 },
			);
		}
	
		// Hash the password
		const hashedPassword = await hash(password);
		const user = {
			name,
			email,
			password: hashedPassword,
		};
	
		try {
			const result = await db.insert(users).values({
				name: user.name,
				email: user.email,
				password: user.password,
			});
			console.log(result);
			return NextResponse.json(
				{ message: "User registered successfully" },
				{ status: 201 },
			);
		// biome-ignore lint/suspicious/noExplicitAny: <explanation>
		} catch (dbError:any) {
			if (dbError.code === 'SQLITE_CONSTRAINT_UNIQUE') {
				return NextResponse.json(
					{ message: "Email already registered" },
					{ status: 409 },
				);
			}
			throw dbError;
		}
	} catch (error) {
		console.error("Signup error:", error);
		return NextResponse.json(
			{ message: "Sorry there are some error in our service, please try again later." },
			{ status: 500 },
		);
	}
}
