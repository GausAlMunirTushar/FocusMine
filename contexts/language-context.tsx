"use client";

import type React from "react";
import { createContext, useContext, useState, useEffect } from "react";

type Language = "en" | "bn";

interface LanguageContextType {
	language: Language;
	setLanguage: (lang: Language) => void;
	t: (key: string) => string;
}

const translations = {
	en: {
		// Navigation
		"nav.timer": "Timer",
		"nav.dashboard": "Dashboard",
		"nav.tasks": "Tasks",
		"nav.projects": "Projects",
		"nav.settings": "Settings",
		"nav.reports": "Reports",
		"nav.standups": "Standups",
		"nav.members": "Members",

		// Timer
		"timer.pomodoro": "Pomodoro",
		"timer.shortBreak": "Short Break",
		"timer.longBreak": "Long Break",
		"timer.start": "Start",
		"timer.pause": "Pause",
		"timer.reset": "Reset",
		"timer.timeToFocus": "Time to focus!",
		"timer.timeForBreak": "Time for a break!",
		"timer.timeForLongBreak": "Time for a long break!",

		// Tasks
		"tasks.title": "Tasks",
		"tasks.addTask": "Add Task",
		"tasks.newTask": "New task...",
		"tasks.completed": "Completed",
		"tasks.pending": "Pending",
		"tasks.delete": "Delete",
		"tasks.edit": "Edit",

		// Dashboard
		"dashboard.title": "Dashboard",
		"dashboard.todayPomodoros": "Today's Pomodoros",
		"dashboard.pendingTasks": "Pending Tasks",
		"dashboard.completedTasks": "Completed Tasks",
		"dashboard.quickStart": "Quick Start",

		// Standups
		"standups.title": "Daily Standups",
		"standups.subtitle": "Track what your team is working on",
		"standups.add": "Add Standup",
		"standups.dialogTitle": "Add Your Daily Standup",
		"standups.yesterday": "What did you do yesterday?",
		"standups.yesterdayPlaceholder": "I completed...",
		"standups.today": "What will you do today?",
		"standups.todayPlaceholder": "I will work on...",
		"standups.blockers": "Any blockers or impediments?",
		"standups.blockersPlaceholder": "I'm blocked by...",
		"standups.mood": "How are you feeling?",
		"standups.moodHappy": "Happy",
		"standups.moodNeutral": "Neutral",
		"standups.moodStressed": "Stressed",
		"standups.submit": "Submit Standup",

		// Members
		"members.title": "Team Members",
		"members.subtitle": "Manage your team and track productivity",
		"members.add": "Add Member",
		"members.dialogTitle": "Add New Team Member",
		"members.name": "Name",
		"members.namePlaceholder": "John Doe",
		"members.email": "Email",
		"members.emailPlaceholder": "john@example.com",
		"members.role": "Role",
		"members.rolePlaceholder": "Frontend Developer",
		"members.totalMembers": "Total Members",
		"members.activeNow": "active now",
		"members.tasksCompleted": "Tasks Completed",
		"members.allTime": "All time",
		"members.todayPomodoros": "Today's Pomodoros",
		"members.focusSessions": "Focus sessions",
		"members.productivity": "Productivity",
		"members.avgTasks": "Avg tasks/member",
		"members.search": "Search members...",
		"members.noMembers": "No members found",
		"members.tryAdjusting": "Try adjusting your search or add a new member",

		// Settings
		"settings.title": "Settings",
		"settings.timerDurations": "Timer Durations",
		"settings.pomodoroDuration": "Pomodoro Duration (minutes)",
		"settings.shortBreakDuration": "Short Break Duration (minutes)",
		"settings.longBreakDuration": "Long Break Duration (minutes)",
		"settings.autoStart": "Auto-start next session",
		"settings.showInTitle": "Show countdown in browser title",
		"settings.soundEnabled": "Sound notifications",
		"settings.theme": "Theme",
		"settings.language": "Language",
		"settings.light": "Light",
		"settings.dark": "Dark",
		"settings.system": "System",

		// Common
		"common.save": "Save",
		"common.cancel": "Cancel",
		"common.delete": "Delete",
		"common.edit": "Edit",
		"common.add": "Add",
		"common.close": "Close",
	},
	bn: {
		// Navigation
		"nav.timer": "টাইমার",
		"nav.dashboard": "ড্যাশবোর্ড",
		"nav.tasks": "কাজ",
		"nav.settings": "সেটিংস",
		"nav.reports": "রিপোর্ট",
		"nav.standups": "স্ট্যান্ডআপ",
		"nav.members": "সদস্য",

		// Timer
		"timer.pomodoro": "পোমোডোরো",
		"timer.shortBreak": "ছোট বিরতি",
		"timer.longBreak": "দীর্ঘ বিরতি",
		"timer.start": "শুরু",
		"timer.pause": "বিরতি",
		"timer.reset": "রিসেট",
		"timer.timeToFocus": "মনোযোগ দেওয়ার সময়!",
		"timer.timeForBreak": "বিরতির সময়!",
		"timer.timeForLongBreak": "দীর্ঘ বিরতির সময়!",

		// Tasks
		"tasks.title": "কাজসমূহ",
		"tasks.addTask": "কাজ যোগ করুন",
		"tasks.newTask": "নতুন কাজ...",
		"tasks.completed": "সম্পন্ন",
		"tasks.pending": "অপেক্ষমাণ",
		"tasks.delete": "মুছুন",
		"tasks.edit": "সম্পাদনা",

		// Dashboard
		"dashboard.title": "ড্যাশবোর্ড",
		"dashboard.todayPomodoros": "আজকের পোমোডোরো",
		"dashboard.pendingTasks": "অপেক্ষমাণ কাজ",
		"dashboard.completedTasks": "সম্পন্ন কাজ",
		"dashboard.quickStart": "দ্রুত শুরু",

		// Standups
		"standups.title": "দৈনিক স্ট্যান্ডআপ",
		"standups.subtitle": "আপনার দল কী নিয়ে কাজ করছে তা ট্র্যাক করুন",
		"standups.add": "স্ট্যান্ডআপ যোগ করুন",
		"standups.dialogTitle": "আপনার দৈনিক স্ট্যান্ডআপ যোগ করুন",
		"standups.yesterday": "গতকাল আপনি কী করেছেন?",
		"standups.yesterdayPlaceholder": "আমি সম্পন্ন করেছি...",
		"standups.today": "আজ আপনি কী করবেন?",
		"standups.todayPlaceholder": "আমি কাজ করব...",
		"standups.blockers": "কোনো বাধা আছে?",
		"standups.blockersPlaceholder": "আমি আটকে আছি...",
		"standups.mood": "আপনি কেমন অনুভব করছেন?",
		"standups.moodHappy": "খুশি",
		"standups.moodNeutral": "সাধারণ",
		"standups.moodStressed": "চাপে",
		"standups.submit": "স্ট্যান্ডআপ জমা দিন",

		// Members
		"members.title": "দলের সদস্য",
		"members.subtitle": "আপনার দল পরিচালনা করুন এবং উৎপাদনশীলতা ট্র্যাক করুন",
		"members.add": "সদস্য যোগ করুন",
		"members.dialogTitle": "নতুন দলের সদস্য যোগ করুন",
		"members.name": "নাম",
		"members.namePlaceholder": "জন ডো",
		"members.email": "ইমেইল",
		"members.emailPlaceholder": "john@example.com",
		"members.role": "ভূমিকা",
		"members.rolePlaceholder": "ফ্রন্টএন্ড ডেভেলপার",
		"members.totalMembers": "মোট সদস্য",
		"members.activeNow": "এখন সক্রিয়",
		"members.tasksCompleted": "কাজ সম্পন্ন",
		"members.allTime": "সর্বকাল",
		"members.todayPomodoros": "আজকের পোমোডোরো",
		"members.focusSessions": "ফোকাস সেশন",
		"members.productivity": "উৎপাদনশীলতা",
		"members.avgTasks": "গড় কাজ/সদস্য",
		"members.search": "সদস্য অনুসন্ধান...",
		"members.noMembers": "কোনো সদস্য পাওয়া যায়নি",
		"members.tryAdjusting": "আপনার অনুসন্ধান পরিবর্তন করুন অথবা নতুন সদস্য যোগ করুন",

		// Settings
		"settings.title": "সেটিংস",
		"settings.timerDurations": "টাইমার সময়কাল",
		"settings.pomodoroDuration": "পোমোডোরো সময়কাল (মিনিট)",
		"settings.shortBreakDuration": "ছোট বিরতির সময়কাল (মিনিট)",
		"settings.longBreakDuration": "দীর্ঘ বিরতির সময়কাল (মিনিট)",
		"settings.autoStart": "পরবর্তী সেশন স্বয়ংক্রিয়ভাবে শুরু করুন",
		"settings.showInTitle": "ব্রাউজার শিরোনামে কাউন্টডাউন দেখান",
		"settings.soundEnabled": "শব্দ বিজ্ঞপ্তি",
		"settings.theme": "থিম",
		"settings.language": "ভাষা",
		"settings.light": "হালকা",
		"settings.dark": "অন্ধকার",
		"settings.system": "সিস্টেম",

		// Common
		"common.save": "সংরক্ষণ",
		"common.cancel": "বাতিল",
		"common.delete": "মুছুন",
		"common.edit": "সম্পাদনা",
		"common.add": "যোগ করুন",
		"common.close": "বন্ধ করুন",
	},
};

const LanguageContext = createContext<LanguageContextType | undefined>(
	undefined
);

export function LanguageProvider({ children }: { children: React.ReactNode }) {
	const [language, setLanguage] = useState<Language>("en");

	useEffect(() => {
		const savedLanguage = localStorage.getItem(
			"FocusMine-language"
		) as Language;
		if (
			savedLanguage &&
			(savedLanguage === "en" || savedLanguage === "bn")
		) {
			setLanguage(savedLanguage);
		}
	}, []);

	const handleSetLanguage = (lang: Language) => {
		setLanguage(lang);
		localStorage.setItem("FocusMine-language", lang);
	};

	const t = (key: string): string => {
		return (
			translations[language][
				key as keyof (typeof translations)[typeof language]
			] || key
		);
	};

	return (
		<LanguageContext.Provider
			value={{ language, setLanguage: handleSetLanguage, t }}
		>
			{children}
		</LanguageContext.Provider>
	);
}

export function useLanguage() {
	const context = useContext(LanguageContext);
	if (context === undefined) {
		throw new Error("useLanguage must be used within a LanguageProvider");
	}
	return context;
}
