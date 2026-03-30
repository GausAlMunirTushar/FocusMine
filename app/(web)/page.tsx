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
	Timer,
	Target,
	BarChart3,
	Settings,
	CheckSquare,
	ArrowRight,
	Play,
	FileText,
	Calendar,
	BookOpen,
} from "lucide-react";
import Link from "next/link";
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
	return (
		<div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-100 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">

			{/* Hero Section */}
			<section className="py-8 sm:py-16 px-4">
				<div className="container mx-auto text-center max-w-4xl">
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
		</div>
	);
}
