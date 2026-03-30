import type { Metadata } from "next";
import { WebHeader } from "@/components/web-header";
import { WebFooter } from "@/components/web-footer";

export const metadata: Metadata = {
	title: "FocusMine - Complete Productivity Suite",
	description:
		"Your complete productivity toolkit with Pomodoro timer, task management, note-taking, daily planning, and learning tracking.",
};

export default function WebLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<div className="min-h-screen flex flex-col">
			<WebHeader />
			<main className="flex-1">{children}</main>
			<WebFooter />
		</div>
	);
}
