import { Link } from "react-router-dom";

export default function Footer() {
	return (
		<footer>
			<div className="text-center mx-auto w-full px-4 my-8 md:w-5/6">
				<div className="flex items-center gap-4 justify-between">
					<h1>
						<Link to="/">
							<div className="flex gap-1 items-center justify-center">
								<svg
									xmlns="http://www.w3.org/2000/svg"
									fill="none"
									viewBox="0 0 24 24"
									strokeWidth={2.5}
									stroke="currentColor"
									className="w-10 h-10 hidden md:block text-pink-600 -rotate-90 xl:w-9 xl:h-9">
									<path
										strokeLinecap="round"
										strokeLinejoin="round"
										d="M6 12L3.269 3.126A59.768 59.768 0 0121.485 12 59.77 59.77 0 013.27 20.876L5.999 12zm0 0h7.5"
									/>
								</svg>
								<span className="font-bold font-bevietnampro text-pink-600 text-4xl">
									airbnb
								</span>
							</div>
						</Link>
					</h1>
					<div className="text-xs text-right">
						<p className="pb-1">
							PT. Airbnb Fahdi Alan
						</p>
						<p className="">Batam Kota - Indonesia</p>
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
			</div>
			<div className="bg-gradient-to-b from-pink-600 to-pink-700 py-1">
				<p className="text-white text-center text-sm">
					Fahdi Alan Copyright &copy; 2024. All Right
					Reserved
				</p>
			</div>
		</footer>
	);
}
