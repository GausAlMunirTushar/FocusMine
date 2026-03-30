"use client";

import { Button } from "@/components/ui/button";
import { useTheme } from "next-themes";
import { Sun, Moon } from "lucide-react";
import { useEffect, useState } from "react";

interface ThemeSwitcherProps {
	variant?: "button" | "icon" | "toggle";
	size?: "sm" | "md" | "lg";
	showLabel?: boolean;
	className?: string;
}

export function ThemeSwitcher({
	variant = "icon",
	size = "md",
	showLabel = false,
	className = "",
}: ThemeSwitcherProps) {
	const { theme, setTheme } = useTheme();
	const [mounted, setMounted] = useState(false);

	useEffect(() => {
		setMounted(true);
	}, []);

	const toggleTheme = () => {
		setTheme(theme === "dark" ? "light" : "dark");
	};

	if (!mounted) {
		return (
			<Button
				variant="ghost"
				size={size === "lg" ? "lg" : size === "sm" ? "sm" : "default"}
				className={className}
				disabled
			>
				<Moon className="h-4 w-4" />
			</Button>
		);
	}

	const sizeClasses = {
		sm: "h-8 w-8 p-0",
		md: "h-9 w-9 p-0",
		lg: "h-10 w-10 p-0",
	};

	if (variant === "icon") {
		return (
			<Button
				variant="ghost"
				size="icon"
				onClick={toggleTheme}
				className={`${sizeClasses[size]} ${className}`}
				title={theme === "dark" ? "Switch to light mode" : "Switch to dark mode"}
			>
				{theme === "dark" ? (
					<Sun className="h-4 w-4" />
				) : (
					<Moon className="h-4 w-4" />
				)}
			</Button>
		);
	}

	if (variant === "toggle") {
		return (
			<Button
				variant="outline"
				onClick={toggleTheme}
				className={`flex items-center gap-2 ${className}`}
				title={theme === "dark" ? "Switch to light mode" : "Switch to dark mode"}
			>
				{theme === "dark" ? (
					<Sun className="h-4 w-4" />
				) : (
					<Moon className="h-4 w-4" />
				)}
				{showLabel && (
					<span className="hidden sm:inline">
						{theme === "dark" ? "Light" : "Dark"}
					</span>
				)}
			</Button>
		);
	}

	return (
		<Button
			variant="ghost"
			onClick={toggleTheme}
			className={`flex items-center gap-2 ${className}`}
		>
			{theme === "dark" ? (
				<Sun className="h-4 w-4" />
			) : (
				<Moon className="h-4 w-4" />
			)}
			{showLabel && (
				<span>{theme === "dark" ? "Light Mode" : "Dark Mode"}</span>
			)}
		</Button>
	);
}
