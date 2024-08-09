import { LeftSideComponent } from '@/components/auth/left-side';
import { FormComponent } from '@/components/auth/registerForm';

export default function SignUp() {
	return (
		<div className="flex items-center justify-center mt-10 ">
			<div className="flex flex-col max-w-[82rem] 2xl:mx-32 xl:mx-12 lg:mx-8 md:mx-4 sm:mx-2 lg:flex-row rounded-2xl min-h-[75vh] lg:bg-gradient-to-br lg:to-[#d8b5ff] lg:from-primary">
				{/* Left side - Product info */}
				<LeftSideComponent />
				{/* Right side - Sign up form */}
				<FormComponent redirectPath="/login" />
			</div>
		</div>
	);
}
