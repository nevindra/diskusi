import { FormComponent } from "@/components/auth/form";
import { LeftSideComponent } from "@/components/auth/left-side";

export default function SignUp() {
	return (
		<div className="flex items-center justify-center mt-10 ">
			<div className="flex flex-col 2xl:mx-16 xl:mx-12 lg:mx-8 md:mx-4 sm:mx-2 lg:flex-row rounded-2xl min-h-[75vh] lg:bg-gradient-to-br lg:to-[#d8b5ff] lg:from-secondary">
				{/* Left side - Product info */}
				<LeftSideComponent />
				{/* Right side - Sign up form */}
				<FormComponent mode="signup" redirectPath="/login" />
			</div>
		</div>
	);
}
