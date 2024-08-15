// The client you created from the Server-Side Auth instructions
import { UsersTable } from '@/database/dbSchema';
import { db } from '@/database/initDB';
import { createClient } from '@/database/server';
import { eq } from 'drizzle-orm';
import { NextResponse } from 'next/server';

export async function GET(request: Request) {
	const { searchParams, origin } = new URL(request.url);
	const code = searchParams.get('code');

	if (code) {
		const supabase = createClient();
		const { error } = await supabase.auth.exchangeCodeForSession(code);
		if (!error) {
			const {
				data: { user },
			} = await supabase.auth.getUser();
			const userId = user?.id;
			if (userId) {
				const users = await db
					.select()
					.from(UsersTable)
					.where(eq(UsersTable.id, userId))
					.execute();
				console.log('users', users)
				if (users.length > 0) {
					if (users[0].avatarUrl === null) {
						return NextResponse.redirect(`${origin}/auth/onboarding`);
					}
					return NextResponse.redirect(`${process.env.NEXT_PUBLIC_BASE_URL}/id/${users[0].username}`);
				} 
			}
			return NextResponse.redirect(`${origin}`);
		}
	}

	// return the user to an error page with instructions
	return NextResponse.redirect(`${origin}/auth/auth-code-error`);
}
