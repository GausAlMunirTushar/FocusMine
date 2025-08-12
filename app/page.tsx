"use client";

import Image from "next/image";
import { Button } from "@/components/ui/button";
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
	Timer,
	Target,
	BarChart3,
	Settings,
	CheckSquare,
	ArrowRight,
	Play,
	Github,
	Linkedin,
	Mail,
	Twitter,
	Sun,
	Moon,
	Monitor,
	Menu,
	FileText,
	Calendar,
	BookOpen,
} from "lucide-react";
import Link from "next/link";
import { useLanguage } from "@/contexts/language-context";
import { useTheme } from "next-themes";
import { PomodoroTimer } from "@/components/pomodoro-timer";

const tools = [
	{
		name: "Pomodoro Timer",
		description: "25-minute focused work sessions with customizable breaks",
		icon: Timer,
		href: "/timer",
		color: "from-blue-500 to-blue-600",
		bgColor: "bg-blue-50 dark:bg-blue-950/20",
	},
	{
		name: "Task Manager",
		description: "Organize and track your tasks with Pomodoro integration",
		icon: CheckSquare,
		href: "/tasks",
		color: "from-green-500 to-green-600",
		bgColor: "bg-green-50 dark:bg-green-950/20",
	},
	{
		name: "Notes Editor",
		description: "Write and organize notes with Markdown support",
		icon: FileText,
		href: "/notes",
		color: "from-purple-500 to-purple-600",
		bgColor: "bg-purple-50 dark:bg-purple-950/20",
	},
	{
		name: "Daily Planner",
		description: "Visual time-block planner with drag-and-drop",
		icon: Calendar,
		href: "/planner",
		color: "from-indigo-500 to-indigo-600",
		bgColor: "bg-indigo-50 dark:bg-indigo-950/20",
	},
	{
		name: "Learning Tracker",
		description: "Track progress on books, courses, and learning goals",
		icon: BookOpen,
		href: "/learning",
		color: "from-teal-500 to-teal-600",
		bgColor: "bg-teal-50 dark:bg-teal-950/20",
	},
	{
		name: "Dashboard",
		description: "Overview of your productivity and progress",
		icon: Target,
		href: "/dashboard",
		color: "from-orange-500 to-orange-600",
		bgColor: "bg-orange-50 dark:bg-orange-950/20",
	},
	{
		name: "Analytics",
		description: "Detailed reports and productivity insights",
		icon: BarChart3,
		href: "/reports",
		color: "from-red-500 to-red-600",
		bgColor: "bg-red-50 dark:bg-red-950/20",
	},
	{
		name: "Settings",
		description: "Customize timers, themes, and preferences",
		icon: Settings,
		href: "/settings",
		color: "from-gray-500 to-gray-600",
		bgColor: "bg-gray-50 dark:bg-gray-950/20",
	},
];

export default function HomePage() {
	const { t } = useLanguage();
	const { theme, setTheme } = useTheme();

	return (
		<div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-100 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
			{/* Header */}
			<header className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 sticky top-0 z-50">
				<div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
					<Link href="/home" className="flex items-center gap-2">
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

					<div className="flex items-center gap-3">
						{/* Theme Switcher */}
						<DropdownMenu>
							<DropdownMenuTrigger asChild>
								<Button
									variant="ghost"
									size="sm"
									className="h-9 w-9 p-0"
								>
									{theme === "dark" ? (
										<Moon className="h-4 w-4" />
									) : theme === "light" ? (
										<Sun className="h-4 w-4" />
									) : (
										<Monitor className="h-4 w-4" />
									)}
									<span className="sr-only">
										Toggle theme
									</span>
								</Button>
							</DropdownMenuTrigger>
							<DropdownMenuContent align="end">
								<DropdownMenuItem
									onClick={() => setTheme("light")}
								>
									<Sun className="h-4 w-4 mr-2" />
									Light
								</DropdownMenuItem>
								<DropdownMenuItem
									onClick={() => setTheme("dark")}
								>
									<Moon className="h-4 w-4 mr-2" />
									Dark
								</DropdownMenuItem>
								<DropdownMenuItem
									onClick={() => setTheme("system")}
								>
									<Monitor className="h-4 w-4 mr-2" />
									System
								</DropdownMenuItem>
							</DropdownMenuContent>
						</DropdownMenu>

						<div className="hidden sm:flex items-center gap-3">
							<Link href="/auth/signin">
								<Button variant="ghost" size="sm">
									Sign In
								</Button>
							</Link>
							<Link href="/auth/signup">
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
							<DropdownMenu>
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
									<DropdownMenuItem asChild>
										<Link href="/auth/signin">Sign In</Link>
									</DropdownMenuItem>
									<DropdownMenuItem asChild>
										<Link href="/auth/signup">Sign Up</Link>
									</DropdownMenuItem>
								</DropdownMenuContent>
							</DropdownMenu>
						</div>
					</div>
				</div>
			</header>

			{/* Hero Section */}
			<section className="py-8 sm:py-16 px-4">
				<div className="max-w-7xl mx-auto text-center max-w-4xl">
					<Badge className="mb-4 bg-gradient-to-r from-blue-500 to-purple-600 text-white border-0">
						✨ Complete Productivity Suite
					</Badge>

					<h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-gray-900 via-blue-800 to-purple-800 dark:from-white dark:via-blue-200 dark:to-purple-200 bg-clip-text text-transparent">
						Focus. Learn. Achieve.
					</h1>

					<p className="text-lg sm:text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
						Your complete productivity toolkit with Pomodoro timer,
						task management, note-taking, daily planning, and
						learning tracking.
					</p>

					<div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
						<Link href="/timer">
							<Button
								size="lg"
								className="w-full sm:w-auto bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white px-8"
							>
								<Play className="w-4 h-4 mr-2" />
								Start Focusing
							</Button>
						</Link>
						<Link href="/dashboard">
							<Button
								size="lg"
								variant="outline"
								className="w-full sm:w-auto px-8 bg-transparent"
							>
								View Dashboard
								<ArrowRight className="w-4 h-4 ml-2" />
							</Button>
						</Link>
					</div>
				</div>
			</section>

			{/* Embedded Pomodoro Timer */}
			<section className="py-8 px-4">
				<div className="container mx-auto max-w-2xl">
					<div className="text-center mb-8">
						<h2 className="text-2xl sm:text-3xl font-bold mb-4">
							Try the Pomodoro Timer
						</h2>
						<p className="text-muted-foreground">
							Experience our focus timer right here. Start a
							25-minute session and boost your productivity.
						</p>
					</div>

					<Card className="border bg-card/50 backdrop-blur">
						<CardContent className="p-4 sm:p-6">
							<PomodoroTimer embedded />
						</CardContent>
					</Card>
				</div>
			</section>

			{/* Tools Section */}
			<section className="py-8 sm:py-16 px-4">
				<div className="container mx-auto">
					<div className="text-center mb-8 sm:mb-12">
						<h2 className="text-2xl sm:text-3xl font-bold mb-4">
							Complete Productivity Suite
						</h2>
						<p className="text-lg text-muted-foreground max-w-2xl mx-auto">
							Everything you need to stay focused, organized, and
							productive in one integrated platform.
						</p>
					</div>

					<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6 max-w-7xl mx-auto">
						{tools.map((tool, index) => (
							<Link key={index} href={tool.href}>
								<Card
									className={`transition-all duration-300 cursor-pointer group h-full ${tool.bgColor}`}
								>
									<CardHeader className="text-center pb-4">
										<div
											className={`w-12 h-12 sm:w-16 sm:h-16 rounded-2xl bg-gradient-to-br ${tool.color} flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform shadow-lg`}
										>
											<tool.icon className="w-6 h-6 sm:w-8 sm:h-8 text-white" />
										</div>
										<CardTitle className="text-lg sm:text-xl mb-2">
											{tool.name}
										</CardTitle>
										<CardDescription className="text-sm">
											{tool.description}
										</CardDescription>
									</CardHeader>
									<CardContent className="pt-0 text-center">
										<Button
											variant="ghost"
											size="sm"
											className="group-hover:bg-background/50"
										>
											Open Tool
											<ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
										</Button>
									</CardContent>
								</Card>
							</Link>
						))}
					</div>
				</div>
			</section>

			{/* Stats Section */}
			<section className="py-8 sm:py-16 px-4 bg-muted/30">
				<div className="container mx-auto">
					<div className="grid grid-cols-1 sm:grid-cols-4 gap-6 sm:gap-8 text-center max-w-6xl mx-auto">
						<div className="p-6 rounded-lg bg-background/50 backdrop-blur border shadow-sm">
							<div className="text-3xl sm:text-4xl font-bold text-blue-600 dark:text-blue-400 mb-2">
								8
							</div>
							<p className="text-muted-foreground">
								Productivity Tools
							</p>
						</div>
						<div className="p-6 rounded-lg bg-background/50 backdrop-blur border shadow-sm">
							<div className="text-3xl sm:text-4xl font-bold text-green-600 dark:text-green-400 mb-2">
								25:00
							</div>
							<p className="text-muted-foreground">
								Perfect Focus Duration
							</p>
						</div>
						<div className="p-6 rounded-lg bg-background/50 backdrop-blur border shadow-sm">
							<div className="text-3xl sm:text-4xl font-bold text-purple-600 dark:text-purple-400 mb-2">
								2+
							</div>
							<p className="text-muted-foreground">
								Languages Supported
							</p>
						</div>
						<div className="p-6 rounded-lg bg-background/50 backdrop-blur border shadow-sm">
							<div className="text-3xl sm:text-4xl font-bold text-orange-600 dark:text-orange-400 mb-2">
								100%
							</div>
							<p className="text-muted-foreground">
								Free & Open Source
							</p>
						</div>
					</div>
				</div>
			</section>

			{/* CTA Section */}
			<section className="py-12 sm:py-20 px-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white">
				<div className="container mx-auto text-center">
					<h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4">
						Ready to supercharge your productivity?
					</h2>
					<p className="text-lg sm:text-xl mb-8 opacity-90 max-w-2xl mx-auto">
						Join thousands of developers and knowledge workers who
						use FocusMine's complete productivity suite to stay
						focused and achieve their goals.
					</p>
					<div className="flex flex-col sm:flex-row gap-4 justify-center">
						<Link href="/timer">
							<Button
								size="lg"
								variant="secondary"
								className="w-full sm:w-auto px-8"
							>
								<Timer className="w-4 h-4 mr-2" />
								Start Your First Session
							</Button>
						</Link>
						<Link href="/dashboard">
							<Button
								size="lg"
								variant="outline"
								className="w-full sm:w-auto px-8 border-white text-white hover:bg-white hover:text-blue-600 bg-transparent"
							>
								Explore Dashboard
							</Button>
						</Link>
					</div>
				</div>
			</section>

			{/* Footer */}
			<footer className="py-4 sm:py-8 px-4 bg-muted/30 border-t">
				<div className="max-w-7xl mx-auto">
					<div className="grid grid-cols-1 sm:grid-cols-2 gap-6 sm:gap-8 items-center">
						<div className="text-center sm:text-left">
							<div className="flex items-center gap-2 justify-center sm:justify-start mb-3">
								<div className="flex h-8 w-8 items-center justify-center rounded-lg ">
									<Image
										src="/focusmine.svg"
										alt="Focus Mine Logo"
										width={40}
										height={40}
									/>
								</div>
								<span className="font-bold">FocusMine</span>
							</div>
							<p className="text-sm text-muted-foreground">
								Complete productivity suite for focused work.
							</p>
						</div>

						<div className="flex justify-center lg:justify-end gap-2">
							<a
								href="https://github.com/gausalmunirtushar"
								target="_blank"
								rel="noopener noreferrer"
								className="text-muted-foreground hover:text-foreground transition-colors p-2 rounded-lg hover:bg-background"
							>
								<Github className="w-5 h-5" />
								<span className="sr-only">GitHub</span>
							</a>
							<a
								href="https://linkedin.com/in/gausalmunirtushar"
								target="_blank"
								rel="noopener noreferrer"
								className="text-muted-foreground hover:text-foreground transition-colors p-2 rounded-lg hover:bg-background"
							>
								<Linkedin className="w-5 h-5" />
								<span className="sr-only">LinkedIn</span>
							</a>
							<a
								href="https://twitter.com/gausalmunir"
								target="_blank"
								rel="noopener noreferrer"
								className="text-muted-foreground hover:text-foreground transition-colors p-2 rounded-lg hover:bg-background"
							>
								<Twitter className="w-5 h-5" />
								<span className="sr-only">Twitter</span>
							</a>
							<a
								href="mailto:gausalmunirtushar@gmail.com"
								className="text-muted-foreground hover:text-foreground transition-colors p-2 rounded-lg hover:bg-background"
							>
								<Mail className="w-5 h-5" />
								<span className="sr-only">Email</span>
							</a>
						</div>
					</div>

					<div className="border-t mt-6 sm:mt-8 pt-4 sm:pt-6 text-center">
						<p className="text-xs text-muted-foreground">
							&copy; {new Date().getFullYear()} FocusMine. Made
							with ❤️ by Gaus Al Munir Tushar. All rights
							reserved.
						</p>
					</div>
				</div>
			</footer>
		</div>
	);
}
