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
	},
	{
		name: "Task Manager",
		description: "Organize and track your tasks with Pomodoro integration",
		icon: CheckSquare,
		href: "/tasks",
	},
	{
		name: "Notes Editor",
		description: "Write and organize notes with Markdown support",
		icon: FileText,
		href: "/notes",
	},
	{
		name: "Daily Planner",
		description: "Visual time-block planner with drag-and-drop",
		icon: Calendar,
		href: "/planner",
	},
	{
		name: "Learning Tracker",
		description: "Track progress on books, courses, and learning goals",
		icon: BookOpen,
		href: "/learning",
	},
	{
		name: "Dashboard",
		description: "Overview of your productivity and progress",
		icon: Target,
		href: "/dashboard",
	},
	{
		name: "Analytics",
		description: "Detailed reports and productivity insights",
		icon: BarChart3,
		href: "/reports",
	},
	{
		name: "Settings",
		description: "Customize timers, themes, and preferences",
		icon: Settings,
		href: "/settings",
	},
];

export default function HomePage() {
	return (
		<div className="min-h-screen bg-background">

			{/* Hero Section */}
			<section className="py-8 sm:py-16 px-4">
				<div className="container mx-auto text-center max-w-4xl">
					<Badge className="mb-4 bg-primary text-primary-foreground border-0">
						✨ Complete Productivity Suite
					</Badge>

					<h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 text-foreground">
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
								className="w-full sm:w-auto bg-primary text-primary-foreground hover:bg-primary/90 px-8"
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
									className="transition-all duration-300 cursor-pointer group h-full hover-lift"
								>
									<CardHeader className="text-center pb-4">
										<div
											className="w-12 h-12 sm:w-16 sm:h-16 rounded-2xl bg-primary text-primary-foreground flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform shadow-lg"
										>
											<tool.icon className="w-6 h-6 sm:w-8 sm:h-8" />
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
						<div className="p-6 rounded-lg bg-surface border shadow-sm">
							<div className="text-3xl sm:text-4xl font-bold text-primary mb-2">
								8
							</div>
							<p className="text-muted-foreground">
								Productivity Tools
							</p>
						</div>
						<div className="p-6 rounded-lg bg-surface border shadow-sm">
							<div className="text-3xl sm:text-4xl font-bold text-primary mb-2">
								25:00
							</div>
							<p className="text-muted-foreground">
								Perfect Focus Duration
							</p>
						</div>
						<div className="p-6 rounded-lg bg-surface border shadow-sm">
							<div className="text-3xl sm:text-4xl font-bold text-primary mb-2">
								2+
							</div>
							<p className="text-muted-foreground">
								Languages Supported
							</p>
						</div>
						<div className="p-6 rounded-lg bg-surface border shadow-sm">
							<div className="text-3xl sm:text-4xl font-bold text-primary mb-2">
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
			<section className="py-12 sm:py-20 px-4 bg-primary text-primary-foreground">
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
								className="w-full sm:w-auto px-8 border-primary-foreground text-primary-foreground hover:bg-primary-foreground hover:text-primary bg-transparent"
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
