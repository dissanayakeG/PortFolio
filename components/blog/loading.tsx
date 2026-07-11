"use client";

// import { motion } from "framer-motion";

export default function Loading() {
	return (
		// <div className="w-full h-screen flex flex-col justify-center items-center">
		// 	<motion.div
		// 		className="w-16 h-16 border-4 border-t-transparent border-secondary-light rounded-full animate-spin"
		// 		animate={{ rotate: 360 }}
		// 		transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
		// 	></motion.div>
		// 	<p className="mt-4 text-lg text-secondary">Loading...</p>
		// </div>

		<div className="w-full h-full py-10 flex justify-center items-center">
			<span className="relative flex justify-center items-center size-20">
				<span className="absolute h-full w-full animate-ping rounded-full bg-primary-light opacity-75"></span>
				<span className="relative size-5 rounded-full bg-theme"></span>
			</span>
		</div>
	);
}
