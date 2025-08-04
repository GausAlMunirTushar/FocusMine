"use client";

import { useState, useEffect } from "react";
import { NoteListSidebar } from "@/components/notes/note-list-sidebar";
import { NoteEditor } from "@/components/notes/note-editor";
import type { Note } from "@/types/notes";

export default function NotesPage() {
	const [notes, setNotes] = useState<Note[]>([]);
	const [selectedNote, setSelectedNote] = useState<Note | null>(null);
	const [searchQuery, setSearchQuery] = useState("");

	// Load notes from localStorage
	useEffect(() => {
		const savedNotes = localStorage.getItem("FocusMine-notes");
		if (savedNotes) {
			try {
				const parsedNotes = JSON.parse(savedNotes).map((note: any) => ({
					...note,
					createdAt: new Date(note.createdAt),
					updatedAt: new Date(note.updatedAt),
				}));
				setNotes(parsedNotes);
			} catch (error) {
				console.error("Failed to load notes:", error);
			}
		}
	}, []);

	// Save notes to localStorage
	useEffect(() => {
		localStorage.setItem("FocusMine-notes", JSON.stringify(notes));
	}, [notes]);

	const createSlug = (title: string) => {
		return title
			.toLowerCase()
			.replace(/[^a-z0-9]+/g, "-")
			.replace(/(^-|-$)/g, "");
	};

	const handleCreateNote = () => {
		const newNote: Note = {
			id: Date.now().toString(),
			title: "",
			content: "",
			tags: [],
			createdAt: new Date(),
			updatedAt: new Date(),
			slug: "",
		};

		setNotes([newNote, ...notes]);
		setSelectedNote(newNote);
	};

	const handleSaveNote = (updatedNote: Note) => {
		const noteWithSlug = {
			...updatedNote,
			slug: createSlug(updatedNote.title || "untitled"),
		};

		setNotes(
			notes.map((note) =>
				note.id === noteWithSlug.id ? noteWithSlug : note
			)
		);
		setSelectedNote(noteWithSlug);
	};

	const handleDeleteNote = (noteId: string) => {
		setNotes(notes.filter((note) => note.id !== noteId));
		if (selectedNote?.id === noteId) {
			setSelectedNote(null);
		}
	};

	const handleExportNote = (note: Note, format: "md" | "txt") => {
		const content =
			format === "md"
				? note.content
				: note.content.replace(/[#*`_~]/g, "");
		const blob = new Blob([content], { type: "text/plain" });
		const url = URL.createObjectURL(blob);
		const a = document.createElement("a");
		a.href = url;
		a.download = `${note.slug || "note"}.${format}`;
		document.body.appendChild(a);
		a.click();
		document.body.removeChild(a);
		URL.revokeObjectURL(url);
	};

	return (
		<div className="flex h-[calc(100vh-4rem)]">
			<NoteListSidebar
				notes={notes}
				selectedNote={selectedNote}
				onSelectNote={setSelectedNote}
				onCreateNote={handleCreateNote}
				searchQuery={searchQuery}
				onSearchChange={setSearchQuery}
			/>
			<NoteEditor
				note={selectedNote}
				onSave={handleSaveNote}
				onDelete={handleDeleteNote}
				onExport={handleExportNote}
			/>
		</div>
	);
}
