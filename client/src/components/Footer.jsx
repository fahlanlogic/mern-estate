import { Link } from "react-router-dom";

export default function Footer() {
	return (
		<div className="text-center mx-auto w-full px-3 py-3 md:max-w-2xl lg:max-w-4xl xl:max-w-6xl">
			<h1>
				<Link to="/">
					<div className="flex gap-1 items-center justify-center">
						<svg
							xmlns="http://www.w3.org/2000/svg"
							fill="none"
							viewBox="0 0 24 24"
							strokeWidth={1.5}
							stroke="currentColor"
							className="w-10 h-10 text-pink-600 -rotate-90 xl:w-9 xl:h-9">
							<path
								strokeLinecap="round"
								strokeLinejoin="round"
								d="M6 12L3.269 3.126A59.768 59.768 0 0121.485 12 59.77 59.77 0 013.27 20.876L5.999 12zm0 0h7.5"
							/>
						</svg>
						<span className="font-bold text-pink-600 text-2xl">
							airbnb
						</span>
					</div>
				</Link>
			</h1>
			<div className="text-xs mt-4 pl-1.5">
				<p className="pb-2">PT. Airbnb Fahdi Alan</p>
				<p className="pb-2">
					Jl. Sudirman, Sukajadi, Batam - Kepulauan Riau
				</p>
				<p className="pb-2">Copyright © 2024</p>
			</div>
			{/* <div className="text-xs flex-1 text-center">
				<ul className="flex flex-col gap-2">
					<li>Home</li>
					<li>About</li>
					<li>Contact</li>
					<li>Privacy</li>
					<li>Terms</li>
				</ul>
			</div> */}
		</div>
	);
}
