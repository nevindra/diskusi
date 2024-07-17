import { FormComponent } from "@/components/auth/form";
import { LeftSideComponent } from "@/components/auth/left-side";

export default function SignUp() {
	return (
		<div className="flex items-center justify-center min-h-screen">
			<div className="flex flex-col 2xl:mx-16 xl:mx-12 lg:mx-8 md:mx-4 sm:mx-2 lg:flex-row mt-10 rounded-2xl min-h-[75vh] lg:bg-gradient-to-br lg:from-[#ff8d3cb3] lg:to-[#e1b349e2]">
				{/* Left side - Product info */}
				<LeftSideComponent/>
				{/* Right side - Sign up form */}
                <FormComponent/>
			</div>
		</div>
	);
}
