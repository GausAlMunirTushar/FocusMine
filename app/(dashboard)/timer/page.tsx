"use client";

import { PomodoroTimer } from "@/components/pomodoro-timer";

export default function TimerPage() {
	return (
		<div className="container mx-auto min-h-[calc(100vh-4rem)] flex items-center justify-center">
			<PomodoroTimer embedded={false} />
		</div>
	);
}
