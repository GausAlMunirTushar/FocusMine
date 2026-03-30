"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuGroup,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Badge } from "@/components/ui/badge";
import { Bell, Check, CheckCheck, Trash2 } from "lucide-react";

interface Notification {
	id: string;
	title: string;
	message: string;
	type: "info" | "success" | "warning" | "error";
	read: boolean;
	createdAt: Date;
}

interface NotificationSwitcherProps {
	variant?: "icon" | "button";
	size?: "sm" | "md" | "lg";
	className?: string;
}

const initialNotifications: Notification[] = [
	{
		id: "1",
		title: "Task Completed",
		message: "You completed 5 tasks today. Great job!",
		type: "success",
		read: false,
		createdAt: new Date(),
	},
	{
		id: "2",
		title: "New Team Member",
		message: "John Doe joined your team",
		type: "info",
		read: false,
		createdAt: new Date(Date.now() - 3600000),
	},
	{
		id: "3",
		title: "Standup Reminder",
		message: "Don't forget to submit your daily standup",
		type: "warning",
		read: true,
		createdAt: new Date(Date.now() - 7200000),
	},
];

export function NotificationSwitcher({
	variant = "icon",
	size = "md",
	className = "",
}: NotificationSwitcherProps) {
	const [notifications, setNotifications] = useState<Notification[]>(
		initialNotifications
	);
	const [open, setOpen] = useState(false);

	const unreadCount = notifications.filter((n) => !n.read).length;

	const markAsRead = (id: string) => {
		setNotifications(
			notifications.map((n) => (n.id === id ? { ...n, read: true } : n))
		);
	};

	const markAllAsRead = () => {
		setNotifications(notifications.map((n) => ({ ...n, read: true })));
	};

	const deleteNotification = (id: string) => {
		setNotifications(notifications.filter((n) => n.id !== id));
	};

	const clearAll = () => {
		setNotifications([]);
	};

	const getTypeColor = (type: string) => {
		switch (type) {
			case "success":
				return "bg-green-500";
			case "warning":
				return "bg-yellow-500";
			case "error":
				return "bg-red-500";
			default:
				return "bg-blue-500";
		}
	};

	const sizeClasses = {
		sm: "h-8 w-8 p-0",
		md: "h-9 w-9 p-0",
		lg: "h-10 w-10 p-0",
	};

	return (
		<DropdownMenu open={open} onOpenChange={setOpen}>
			<DropdownMenuTrigger asChild>
				<Button
					variant="ghost"
					size="icon"
					className={`relative ${sizeClasses[size]} ${className}`}
					title="Notifications"
				>
					<Bell className="h-4 w-4" />
					{unreadCount > 0 && (
						<Badge
							variant="destructive"
							className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center p-0 text-xs"
						>
							{unreadCount > 9 ? "9+" : unreadCount}
						</Badge>
					)}
				</Button>
			</DropdownMenuTrigger>
			<DropdownMenuContent className="w-80" align="end">
				<DropdownMenuLabel className="flex items-center justify-between">
					Notifications
					{unreadCount > 0 && (
						<Badge variant="secondary">{unreadCount} new</Badge>
					)}
				</DropdownMenuLabel>
				<DropdownMenuSeparator />

				{notifications.length === 0 ? (
					<div className="p-4 text-center text-muted-foreground">
						<Bell className="h-8 w-8 mx-auto mb-2 opacity-50" />
						<p className="text-sm">No notifications</p>
					</div>
				) : (
					<>
						<DropdownMenuGroup>
							{notifications.map((notification) => (
								<DropdownMenuItem
									key={notification.id}
									className={`flex items-start gap-3 p-3 cursor-pointer ${
										!notification.read
											? "bg-muted/50"
											: ""
									}`}
									onClick={() =>
										markAsRead(notification.id)
									}
								>
									<div
										className={`w-2 h-2 rounded-full mt-1.5 shrink-0 ${getTypeColor(
											notification.type
										)}`}
									/>
									<div className="flex-1 min-w-0">
										<p
											className={`text-sm font-medium ${
												!notification.read
													? "font-semibold"
													: ""
											}`}
										>
											{notification.title}
										</p>
										<p className="text-xs text-muted-foreground truncate">
											{notification.message}
										</p>
									</div>
									<Button
										variant="ghost"
										size="icon"
										className="h-6 w-6 shrink-0"
										onClick={(e) => {
											e.stopPropagation();
											deleteNotification(
												notification.id
											);
										}}
									>
										<Trash2 className="h-3 w-3" />
									</Button>
								</DropdownMenuItem>
							))}
						</DropdownMenuGroup>
						<DropdownMenuSeparator />
						<DropdownMenuGroup className="flex gap-2 p-2">
							<DropdownMenuItem
								onClick={markAllAsRead}
								className="flex-1 justify-center cursor-pointer"
							>
								<CheckCheck className="h-4 w-4 mr-2" />
								Mark all read
							</DropdownMenuItem>
							<DropdownMenuItem
								onClick={clearAll}
								className="flex-1 justify-center text-red-600 cursor-pointer"
							>
								<Trash2 className="h-4 w-4 mr-2" />
								Clear all
							</DropdownMenuItem>
						</DropdownMenuGroup>
					</>
				)}
			</DropdownMenuContent>
		</DropdownMenu>
	);
}
