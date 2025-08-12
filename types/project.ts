import type { Task, Note, TimeBlock, LearningGoal } from "./task";

export interface Project {
	id: string;
	name: string;
	description?: string;
	color: string;
	emoji?: string;
	isFavorite: boolean;
	isArchived: boolean;
	createdAt: Date;
	updatedAt: Date;
	stats: {
		totalTasks: number;
		completedTasks: number;
		totalPomodoros: number;
		totalTimeSpent: number; 
		lastActivity: Date;
	};
}

export interface ProjectData {
	tasks: Task[];
	notes: Note[];
	timeBlocks: TimeBlock[];
	learningGoals: LearningGoal[];
	journalEntries: JournalEntry[];
	pomodoroSessions: PomodoroSession[];
}

export interface JournalEntry {
	id: string;
	projectId: string;
	title: string;
	content: string;
	date: Date;
	mood?: 1 | 2 | 3 | 4 | 5; // 1 = bad, 5 = excellent
	focusScore?: 1 | 2 | 3 | 4 | 5;
	tags: string[];
	createdAt: Date;
	updatedAt: Date;
}

export interface PomodoroSession {
	id: string;
	projectId: string;
	taskId?: string;
	duration: number; // in minutes
	type: "pomodoro" | "shortBreak" | "longBreak";
	completedAt: Date;
	notes?: string;
}
