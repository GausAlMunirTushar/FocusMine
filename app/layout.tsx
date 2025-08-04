import type React from "react";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import { AppProvider } from "@/contexts/app-context";
import { LanguageProvider } from "@/contexts/language-context";
import { CustomThemeProvider } from "@/contexts/theme-context";
import { ProjectProvider } from "@/contexts/project-context";
import { AppLayout } from "@/components/app-layout";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
	title: "FocusMine - Project-Based Productivity Suite",
	description:
		"A comprehensive project-based productivity suite with Pomodoro timer, task management, note-taking, planning, and learning tracking.",
	keywords:
		"pomodoro, timer, productivity, focus, task management, time tracking, project management",
	authors: [
		{
			name: "Gaus Al Munir Tushar",
			url: "https://github.com/gausalmunirtushar",
		},
	],
	creator: "Gaus Al Munir Tushar",
};

export default function RootLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<html lang="en" suppressHydrationWarning>
			<body className={inter.className}>
				<ThemeProvider
					attribute="class"
					defaultTheme="system"
					enableSystem
					disableTransitionOnChange
				>
					<CustomThemeProvider>
						<LanguageProvider>
							<AppProvider>
								<ProjectProvider>
									<AppLayout>{children}</AppLayout>
								</ProjectProvider>
							</AppProvider>
						</LanguageProvider>
					</CustomThemeProvider>
				</ThemeProvider>
			</body>
		</html>
	);
}
