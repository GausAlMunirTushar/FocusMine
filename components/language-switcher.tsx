"use client";

import { Button } from "@/components/ui/button";
import { useLanguage } from "@/contexts/language-context";
import { Globe } from "lucide-react";

interface LanguageSwitcherProps {
	variant?: "button" | "icon" | "toggle" | "dropdown";
	size?: "sm" | "md" | "lg";
	showLabel?: boolean;
	className?: string;
}

export function LanguageSwitcher({
	variant = "toggle",
	size = "md",
	showLabel = false,
	className = "",
}: LanguageSwitcherProps) {
	const { language, setLanguage } = useLanguage();

	const toggleLanguage = () => {
		setLanguage(language === "en" ? "bn" : "en");
	};

	const sizeClasses = {
		sm: "h-8 text-xs",
		md: "h-9 text-sm",
		lg: "h-10 text-base",
	};

	if (variant === "icon") {
		return (
			<Button
				variant="ghost"
				size="icon"
				onClick={toggleLanguage}
				className={`${size === "lg" ? "h-10 w-10" : size === "sm" ? "h-8 w-8" : "h-9 w-9"} ${className}`}
				title="Toggle language"
			>
				<Globe className="h-4 w-4" />
			</Button>
		);
	}

	if (variant === "toggle") {
		return (
			<Button
				variant="outline"
				onClick={toggleLanguage}
				className={`flex items-center gap-1.5 ${sizeClasses[size]} ${className}`}
				title="Toggle language"
			>
				<Globe className="h-4 w-4" />
				<span className="font-medium">
					{language === "en" ? "EN" : "BN"}
				</span>
			</Button>
		);
	}

	if (variant === "dropdown") {
		return (
			<div className="flex items-center gap-1">
				<Button
					variant={language === "en" ? "default" : "outline"}
					size={size === "lg" ? "lg" : size === "sm" ? "sm" : "default"}
					onClick={() => setLanguage("en")}
					className={`text-xs ${className}`}
				>
					EN
				</Button>
				<Button
					variant={language === "bn" ? "default" : "outline"}
					size={size === "lg" ? "lg" : size === "sm" ? "sm" : "default"}
					onClick={() => setLanguage("bn")}
					className="text-xs"
				>
					BN
				</Button>
			</div>
		);
	}

	return (
		<Button
			variant="ghost"
			onClick={toggleLanguage}
			className={`flex items-center gap-2 ${className}`}
		>
			<Globe className="h-4 w-4" />
			{showLabel && (
				<span>
					{language === "en" ? "English" : "বাংলা"}
				</span>
			)}
		</Button>
	);
}
