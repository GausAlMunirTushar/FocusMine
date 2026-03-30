"use client";

import Image from "next/image";
import { Button } from "@/components/ui/button";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Menu } from "lucide-react";
import Link from "next/link";
import { ThemeSwitcher } from "@/components/theme-switcher";
import { LanguageSwitcher } from "@/components/language-switcher";
import { useState } from "react";

export function WebHeader() {
	const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

	const navLinks = [
		{ href: "/", label: "Home" },
		{ href: "/pricing", label: "Pricing" },
		{ href: "/privacy", label: "Privacy" },
		{ href: "/terms", label: "Terms" },
	];

	return (
		<header className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 sticky top-0 z-50">
			<div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
				<Link href="/" className="flex items-center gap-2">
					<div className="flex h-8 w-8 items-center justify-center rounded-l text-white">
						<Image
							src="/focusmine.svg"
							alt="Focus Mine Logo"
							width={40}
							height={40}
						/>
					</div>
					<span className="font-bold text-xl bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
						FocusMine
					</span>
				</Link>

				{/* Desktop Navigation */}
				<nav className="hidden md:flex items-center gap-6">
					{navLinks.map((link) => (
						<Link
							key={link.href}
							href={link.href}
							className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
						>
							{link.label}
						</Link>
					))}
				</nav>

				<div className="flex items-center gap-3">
					{/* Theme Switcher */}
					<ThemeSwitcher variant="icon" size="md" />

					{/* Language Switcher */}
					<LanguageSwitcher variant="toggle" size="sm" />

					<div className="hidden sm:flex items-center gap-3">
						<Link href="/signin">
							<Button variant="ghost" size="sm">
								Sign In
							</Button>
						</Link>
						<Link href="/signup">
							<Button
								size="sm"
								className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700"
							>
								Sign Up
							</Button>
						</Link>
					</div>

					{/* Mobile menu */}
					<div className="sm:hidden">
						<DropdownMenu open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
							<DropdownMenuTrigger asChild>
								<Button
									variant="ghost"
									size="sm"
									className="h-9 w-9 p-0"
								>
									<Menu className="h-4 w-4" />
									<span className="sr-only">
										Open menu
									</span>
								</Button>
							</DropdownMenuTrigger>
							<DropdownMenuContent align="end">
								{navLinks.map((link) => (
									<DropdownMenuItem key={link.href} asChild>
										<Link href={link.href}>{link.label}</Link>
									</DropdownMenuItem>
								))}
								<DropdownMenuItem asChild>
									<Link href="/signin">Sign In</Link>
								</DropdownMenuItem>
								<DropdownMenuItem asChild>
									<Link href="/signup">Sign Up</Link>
								</DropdownMenuItem>
							</DropdownMenuContent>
						</DropdownMenu>
					</div>
				</div>
			</div>
		</header>
	);
}
