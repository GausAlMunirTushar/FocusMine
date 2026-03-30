"use client";

import type React from "react";

import { usePathname } from "next/navigation";
import {
	SidebarProvider,
	SidebarInset,
	SidebarTrigger,
} from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/app-sidebar";
import { ThemeSwitcher } from "@/components/theme-switcher";
import { LanguageSwitcher } from "@/components/language-switcher";
import { NotificationSwitcher } from "@/components/notification-switcher";
import { Button } from "@/components/ui/button";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { LogOut, User, Settings } from "lucide-react";

export function AppLayout({ children }: { children: React.ReactNode }) {
	const pathname = usePathname();
	const isHomePage = pathname === "/" || pathname === "/home";

	if (isHomePage) {
		return <>{children}</>;
	}

	return (
		<SidebarProvider>
			<AppSidebar />
			<SidebarInset>
				<header className="flex h-16 shrink-0 items-center justify-between gap-2 border-b px-4 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
					<div className="flex items-center gap-2">
						<SidebarTrigger className="-ml-1" />
					</div>
					
					<div className="flex items-center gap-2">
						{/* Notification Switcher */}
						<NotificationSwitcher variant="icon" size="md" />

						{/* Theme Switcher */}
						<ThemeSwitcher variant="icon" size="md" />

						{/* Language Switcher */}
						<LanguageSwitcher variant="toggle" size="sm" />

						{/* User Menu */}
						<DropdownMenu>
							<DropdownMenuTrigger asChild>
								<Button variant="ghost" size="icon" className="relative">
									<Avatar className="h-8 w-8">
										<AvatarFallback className="bg-gradient-to-br from-blue-500 to-purple-500 text-white text-sm">
											U
										</AvatarFallback>
									</Avatar>
								</Button>
							</DropdownMenuTrigger>
							<DropdownMenuContent align="end" className="w-56">
								<div className="flex items-center gap-2 p-2 border-b mb-1">
									<Avatar className="h-8 w-8">
										<AvatarFallback className="bg-gradient-to-br from-blue-500 to-purple-500 text-white text-sm">
											U
										</AvatarFallback>
									</Avatar>
									<div className="flex flex-col">
										<span className="text-sm font-medium">User</span>
										<span className="text-xs text-muted-foreground">user@example.com</span>
									</div>
								</div>
								<DropdownMenuItem>
									<User className="mr-2 h-4 w-4" />
									Profile
								</DropdownMenuItem>
								<DropdownMenuItem>
									<Settings className="mr-2 h-4 w-4" />
									Account Settings
								</DropdownMenuItem>
								<DropdownMenuItem className="text-red-600">
									<LogOut className="mr-2 h-4 w-4" />
									Log out
								</DropdownMenuItem>
							</DropdownMenuContent>
						</DropdownMenu>
					</div>
				</header>
				<main className="flex-1 overflow-auto">{children}</main>
			</SidebarInset>
		</SidebarProvider>
	);
}
