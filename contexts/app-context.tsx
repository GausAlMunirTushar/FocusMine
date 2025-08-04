"use client";

import type React from "react";
import { createContext, useContext, useReducer, useEffect } from "react";

export interface Task {
	id: string;
	title: string;
	completed: boolean;
	pomodorosCompleted: number;
	createdAt: Date;
}

export interface Settings {
	pomodoroDuration: number;
	shortBreakDuration: number;
	longBreakDuration: number;
	autoStart: boolean;
	showInTitle: boolean;
	soundEnabled: boolean;
}

export interface AppState {
	tasks: Task[];
	settings: Settings;
	currentSession: "pomodoro" | "shortBreak" | "longBreak";
	isRunning: boolean;
	timeLeft: number;
	completedPomodoros: number;
}

type AppAction =
	| { type: "ADD_TASK"; payload: { title: string } }
	| { type: "TOGGLE_TASK"; payload: { id: string } }
	| { type: "DELETE_TASK"; payload: { id: string } }
	| { type: "UPDATE_TASK"; payload: { id: string; title: string } }
	| { type: "REORDER_TASKS"; payload: { tasks: Task[] } }
	| { type: "UPDATE_SETTINGS"; payload: Partial<Settings> }
	| { type: "SET_SESSION"; payload: "pomodoro" | "shortBreak" | "longBreak" }
	| { type: "START_TIMER" }
	| { type: "PAUSE_TIMER" }
	| { type: "RESET_TIMER" }
	| { type: "TICK" }
	| { type: "COMPLETE_SESSION" }
	| { type: "LOAD_STATE"; payload: Partial<AppState> };

const defaultSettings: Settings = {
	pomodoroDuration: 25,
	shortBreakDuration: 5,
	longBreakDuration: 15,
	autoStart: false,
	showInTitle: true,
	soundEnabled: true,
};

const initialState: AppState = {
	tasks: [],
	settings: defaultSettings,
	currentSession: "pomodoro",
	isRunning: false,
	timeLeft: 25 * 60,
	completedPomodoros: 0,
};

function appReducer(state: AppState, action: AppAction): AppState {
	switch (action.type) {
		case "ADD_TASK":
			const newTask: Task = {
				id: Date.now().toString(),
				title: action.payload.title,
				completed: false,
				pomodorosCompleted: 0,
				createdAt: new Date(),
			};
			return { ...state, tasks: [...state.tasks, newTask] };

		case "TOGGLE_TASK":
			return {
				...state,
				tasks: state.tasks.map((task) =>
					task.id === action.payload.id
						? { ...task, completed: !task.completed }
						: task
				),
			};

		case "DELETE_TASK":
			return {
				...state,
				tasks: state.tasks.filter(
					(task) => task.id !== action.payload.id
				),
			};

		case "UPDATE_TASK":
			return {
				...state,
				tasks: state.tasks.map((task) =>
					task.id === action.payload.id
						? { ...task, title: action.payload.title }
						: task
				),
			};

		case "REORDER_TASKS":
			return { ...state, tasks: action.payload.tasks };

		case "UPDATE_SETTINGS":
			const newSettings = { ...state.settings, ...action.payload };
			return {
				...state,
				settings: newSettings,
				timeLeft: state.isRunning
					? state.timeLeft
					: getSessionDuration(state.currentSession, newSettings),
			};

		case "SET_SESSION":
			return {
				...state,
				currentSession: action.payload,
				timeLeft: getSessionDuration(action.payload, state.settings),
				isRunning: false,
			};

		case "START_TIMER":
			return { ...state, isRunning: true };

		case "PAUSE_TIMER":
			return { ...state, isRunning: false };

		case "RESET_TIMER":
			return {
				...state,
				isRunning: false,
				timeLeft: getSessionDuration(
					state.currentSession,
					state.settings
				),
			};

		case "TICK":
			if (state.timeLeft <= 1) {
				return { ...state, timeLeft: 0, isRunning: false };
			}
			return { ...state, timeLeft: state.timeLeft - 1 };

		case "COMPLETE_SESSION":
			const newCompletedPomodoros =
				state.currentSession === "pomodoro"
					? state.completedPomodoros + 1
					: state.completedPomodoros;

			return {
				...state,
				completedPomodoros: newCompletedPomodoros,
				isRunning: false,
				timeLeft: getSessionDuration(
					state.currentSession,
					state.settings
				),
			};

		case "LOAD_STATE":
			return { ...state, ...action.payload };

		default:
			return state;
	}
}

function getSessionDuration(
	session: "pomodoro" | "shortBreak" | "longBreak",
	settings: Settings
): number {
	switch (session) {
		case "pomodoro":
			return settings.pomodoroDuration * 60;
		case "shortBreak":
			return settings.shortBreakDuration * 60;
		case "longBreak":
			return settings.longBreakDuration * 60;
	}
}

interface AppContextType {
	state: AppState;
	dispatch: React.Dispatch<AppAction>;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export function AppProvider({ children }: { children: React.ReactNode }) {
	const [state, dispatch] = useReducer(appReducer, initialState);

	// Load state from localStorage on mount
	useEffect(() => {
		const savedState = localStorage.getItem("FocusMine-state");
		if (savedState) {
			try {
				const parsedState = JSON.parse(savedState);
				dispatch({ type: "LOAD_STATE", payload: parsedState });
			} catch (error) {
				console.error("Failed to load saved state:", error);
			}
		}
	}, []);

	// Save state to localStorage whenever it changes
	useEffect(() => {
		const stateToSave = {
			tasks: state.tasks,
			settings: state.settings,
			completedPomodoros: state.completedPomodoros,
		};
		localStorage.setItem("FocusMine-state", JSON.stringify(stateToSave));
	}, [state.tasks, state.settings, state.completedPomodoros]);

	return (
		<AppContext.Provider value={{ state, dispatch }}>
			{children}
		</AppContext.Provider>
	);
}

export function useApp() {
	const context = useContext(AppContext);
	if (context === undefined) {
		throw new Error("useApp must be used within an AppProvider");
	}
	return context;
}
