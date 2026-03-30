"use client";

import Image from "next/image"
import {
	Timer,
	LayoutDashboard,
	CheckSquare,
	Settings,
	BarChart3,
	FileText,
	Calendar,
	BookOpen,
	FolderOpen,
	Users,
	MessageSquare,
} from "lucide-react";
import {
	Sidebar,
	SidebarContent,
	SidebarGroup,
	SidebarGroupContent,
	SidebarGroupLabel,
	SidebarHeader,
	SidebarMenu,
	SidebarMenuButton,
	SidebarMenuItem,
} from "@/components/ui/sidebar";
import { useLanguage } from "@/contexts/language-context";
import Link from "next/link";
import { usePathname } from "next/navigation";

const menuItems = [
	{
		title: "nav.dashboard",
		url: "/dashboard",
		icon: LayoutDashboard,
	},
	{
		title: "nav.timer",
		url: "/timer",
		icon: Timer,
	},
	{
		title: "Projects",
		url: "/projects",
		icon: FolderOpen,
	},
	{
		title: "nav.tasks",
		url: "/tasks",
		icon: CheckSquare,
	},
	{
		title: "Notes",
		url: "/notes",
		icon: FileText,
	},
	{
		title: "Planner",
		url: "/planner",
		icon: Calendar,
	},
	{
		title: "Learning",
		url: "/learning",
		icon: BookOpen,
	},
	{
		title: "nav.standups",
		url: "/standups",
		icon: MessageSquare,
	},
	{
		title: "nav.members",
		url: "/members",
		icon: Users,
	},
	{
		title: "nav.reports",
		url: "/reports",
		icon: BarChart3,
	},
	{
		title: "nav.settings",
		url: "/settings",
		icon: Settings,
	},
];

export function AppSidebar() {
	const { t } = useLanguage();
	const pathname = usePathname();

	return (
		<Sidebar>
			<SidebarHeader>
				<div className="flex items-center gap-2 px-2 py-1">
					<div className="flex h-8 w-8 items-center justify-center rounded-lg">
						<Image
								src="/focusmine.svg"
								alt="Focus Mine Logo"
								width={40}
								height={40}
							/>
					</div>
							<h1 className="text-lg font-semibold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
							FocusMine
							</h1>
				</div>
			</SidebarHeader>

			<SidebarContent>
				<SidebarGroup>
					<SidebarGroupLabel>Navigation</SidebarGroupLabel>
					<SidebarGroupContent>
						<SidebarMenu>
							{menuItems.map((item) => (
								<SidebarMenuItem key={item.title}>
									<SidebarMenuButton
										asChild
										isActive={
											pathname === item.url ||
											pathname.startsWith(item.url + "/")
										}
									>
										<Link href={item.url}>
											<item.icon />
											<span>
												{item.title.startsWith("nav.")
													? t(item.title)
													: item.title}
											</span>
										</Link>
									</SidebarMenuButton>
								</SidebarMenuItem>
							))}
						</SidebarMenu>
					</SidebarGroupContent>
				</SidebarGroup>
			</SidebarContent>
		</Sidebar>
	);
}
