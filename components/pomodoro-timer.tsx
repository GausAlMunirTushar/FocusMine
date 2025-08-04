"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Play, Pause, RotateCcw } from "lucide-react";
import { useApp } from "@/contexts/app-context";
import { useLanguage } from "@/contexts/language-context";

interface PomodoroTimerProps {
	embedded?: boolean;
}

export function PomodoroTimer({ embedded = false }: PomodoroTimerProps) {
	const { state, dispatch } = useApp();
	const { t } = useLanguage();
	const [sessionCount, setSessionCount] = useState(1);

	// Timer effect
	useEffect(() => {
		let interval: NodeJS.Timeout | null = null;

		if (state.isRunning && state.timeLeft > 0) {
			interval = setInterval(() => {
				dispatch({ type: "TICK" });
			}, 1000);
		} else if (state.timeLeft === 0 && state.isRunning) {
			dispatch({ type: "COMPLETE_SESSION" });

			// Play notification sound if enabled
			if (state.settings.soundEnabled) {
				const audio = new Audio("/notification.mp3");
				audio.play().catch(() => {
					// Fallback to system beep if audio file not available
					console.log("Session completed!");
				});
			}
		}

		return () => {
			if (interval) clearInterval(interval);
		};
	}, [
		state.isRunning,
		state.timeLeft,
		dispatch,
		state.settings.soundEnabled,
	]);

	// Update browser title
	useEffect(() => {
		if (state.settings.showInTitle && state.isRunning && !embedded) {
			const minutes = Math.floor(state.timeLeft / 60);
			const seconds = state.timeLeft % 60;
			const timeString = `${minutes.toString().padStart(2, "0")}:${seconds
				.toString()
				.padStart(2, "0")}`;
			document.title = `${timeString} - FocusMine`;
		} else if (!embedded) {
			document.title = "FocusMine";
		}

		return () => {
			if (!embedded) {
				document.title = "FocusMine";
			}
		};
	}, [state.timeLeft, state.isRunning, state.settings.showInTitle, embedded]);

	const formatTime = (seconds: number) => {
		const mins = Math.floor(seconds / 60);
		const secs = seconds % 60;
		return `${mins.toString().padStart(2, "0")}:${secs
			.toString()
			.padStart(2, "0")}`;
	};

	const getSessionMessage = () => {
		switch (state.currentSession) {
			case "pomodoro":
				return t("timer.timeToFocus");
			case "shortBreak":
				return t("timer.timeForBreak");
			case "longBreak":
				return t("timer.timeForLongBreak");
		}
	};

	const handleStart = () => {
		dispatch({ type: "START_TIMER" });
	};

	const handlePause = () => {
		dispatch({ type: "PAUSE_TIMER" });
	};

	const handleReset = () => {
		dispatch({ type: "RESET_TIMER" });
	};

	const handleSessionChange = (
		session: "pomodoro" | "shortBreak" | "longBreak"
	) => {
		dispatch({ type: "SET_SESSION", payload: session });
	};

	const containerClass = embedded
		? "flex flex-col items-center justify-center p-4"
		: "flex flex-col items-center justify-center min-h-[80vh] p-4";

	const cardClass = embedded ? "w-full" : "w-full max-w-md";

	return (
		<div className={containerClass}>
			<Card className={cardClass}>
				<CardContent className={embedded ? "p-4 sm:p-6" : "p-8"}>
					<Tabs
						value={state.currentSession}
						onValueChange={(value) =>
							handleSessionChange(value as any)
						}
						className="w-full"
					>
						<TabsList className="grid w-full grid-cols-3 mb-6">
							<TabsTrigger
								value="pomodoro"
								className="text-xs sm:text-sm"
							>
								{embedded ? "Focus" : t("timer.pomodoro")}
							</TabsTrigger>
							<TabsTrigger
								value="shortBreak"
								className="text-xs sm:text-sm"
							>
								{embedded ? "Break" : t("timer.shortBreak")}
							</TabsTrigger>
							<TabsTrigger
								value="longBreak"
								className="text-xs sm:text-sm"
							>
								{embedded ? "Long" : t("timer.longBreak")}
							</TabsTrigger>
						</TabsList>

						<div className="text-center">
							<div
								className={`font-mono font-bold mb-4 ${
									embedded
										? "text-4xl sm:text-5xl"
										: "text-6xl"
								}`}
							>
								{formatTime(state.timeLeft)}
							</div>

							<p
								className={`text-muted-foreground mb-6 ${
									embedded
										? "text-sm sm:text-base"
										: "text-lg"
								}`}
							>
								#{sessionCount} {getSessionMessage()}
							</p>

							<div className="flex gap-2 sm:gap-4 justify-center">
								{!state.isRunning ? (
									<Button
										onClick={handleStart}
										size={embedded ? "default" : "lg"}
										className="px-4 sm:px-8"
									>
										<Play className="w-4 h-4 mr-2" />
										{t("timer.start")}
									</Button>
								) : (
									<Button
										onClick={handlePause}
										size={embedded ? "default" : "lg"}
										className="px-4 sm:px-8"
										variant="secondary"
									>
										<Pause className="w-4 h-4 mr-2" />
										{t("timer.pause")}
									</Button>
								)}

								<Button
									onClick={handleReset}
									size={embedded ? "default" : "lg"}
									variant="outline"
								>
									<RotateCcw className="w-4 h-4 mr-2" />
									{embedded ? "Reset" : t("timer.reset")}
								</Button>
							</div>
						</div>
					</Tabs>
				</CardContent>
			</Card>

			{!embedded && (
				<div className="mt-6 text-center">
					<p className="text-sm text-muted-foreground">
						{t("dashboard.todayPomodoros")}:{" "}
						{state.completedPomodoros}
					</p>
				</div>
			)}
		</div>
	);
}
