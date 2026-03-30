"use client";

import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Separator } from "@/components/ui/separator";
import { useLanguage } from "@/contexts/language-context";
import {
	Lock,
	Bell,
	Palette,
	Globe,
	Shield,
	Key,
	Mail,
	Trash2,
	Download,
	Upload,
	LogOut,
	Check,
	Sun,
	Moon,
	ArrowRight,
} from "lucide-react";
import { useTheme } from "next-themes";
import { ThemeSwitcher } from "@/components/theme-switcher";
import { LanguageSwitcher } from "@/components/language-switcher";
import Link from "next/link";

export default function AccountSettingsPage() {
	const { t } = useLanguage();
	const { theme, setTheme } = useTheme();
	const [settings, setSettings] = useState({
		emailNotifications: true,
		pushNotifications: true,
		standupReminders: true,
		taskReminders: false,
		autoStartPomodoro: false,
		showBreakReminders: true,
		twoFactorAuth: false,
		sessionTimeout: true,
	});

	const handleSaveSettings = () => {
		// Save settings logic
	};

	return (
		<div className="container mx-auto p-6 space-y-6">
			<div>
				<h1 className="text-3xl font-bold">Account Settings</h1>
				<p className="text-muted-foreground">
					Manage your account settings and preferences
				</p>
			</div>

			<div className="grid gap-6 md:grid-cols-2">
				{/* Security */}
				<Card>
					<CardHeader>
						<div className="flex items-center gap-2">
							<Lock className="h-5 w-5" />
							<CardTitle>Security</CardTitle>
						</div>
						<CardDescription>Manage your password and security settings</CardDescription>
					</CardHeader>
					<CardContent className="space-y-4">
						<Link href="/settings/change-password">
							<div className="flex items-center justify-between p-3 rounded-lg border hover:bg-muted/50 cursor-pointer transition-colors">
								<div className="flex items-center gap-3">
									<Key className="h-5 w-5 text-muted-foreground" />
									<div>
										<p className="text-sm font-medium">Change Password</p>
										<p className="text-xs text-muted-foreground">Update your password</p>
									</div>
								</div>
								<ArrowRight className="h-4 w-4 text-muted-foreground" />
							</div>
						</Link>
						<Separator />
						<div className="flex items-center justify-between">
							<div className="flex items-center gap-2">
								<Shield className="h-4 w-4" />
								<div>
									<p className="text-sm font-medium">Two-Factor Authentication</p>
									<p className="text-xs text-muted-foreground">Add an extra layer of security</p>
								</div>
							</div>
							<Switch
								checked={settings.twoFactorAuth}
								onCheckedChange={(checked) =>
									setSettings({ ...settings, twoFactorAuth: checked })
								}
							/>
						</div>
					</CardContent>
				</Card>

				{/* Appearance */}
				<Card>
					<CardHeader>
						<div className="flex items-center gap-2">
							<Palette className="h-5 w-5" />
							<CardTitle>Appearance</CardTitle>
						</div>
						<CardDescription>Customize how FocusMine looks</CardDescription>
					</CardHeader>
					<CardContent className="space-y-4">
						<div className="space-y-2">
							<Label>Theme</Label>
							<div className="flex gap-2">
								<Button
									variant={theme === "light" ? "default" : "outline"}
									size="sm"
									onClick={() => setTheme("light")}
									className="flex-1"
								>
									<Sun className="h-4 w-4 mr-2" />
									Light
								</Button>
								<Button
									variant={theme === "dark" ? "default" : "outline"}
									size="sm"
									onClick={() => setTheme("dark")}
									className="flex-1"
								>
									<Moon className="h-4 w-4 mr-2" />
									Dark
								</Button>
							</div>
						</div>
						<Separator />
						<div className="space-y-2">
							<Label>Quick Toggles</Label>
							<div className="flex gap-2">
								<ThemeSwitcher variant="toggle" />
								<LanguageSwitcher variant="toggle" />
							</div>
						</div>
					</CardContent>
				</Card>

				{/* Notifications */}
				<Card>
					<CardHeader>
						<div className="flex items-center gap-2">
							<Bell className="h-5 w-5" />
							<CardTitle>Notifications</CardTitle>
						</div>
						<CardDescription>Choose what notifications you receive</CardDescription>
					</CardHeader>
					<CardContent className="space-y-4">
						<div className="flex items-center justify-between">
							<div>
								<p className="text-sm font-medium">Email Notifications</p>
								<p className="text-xs text-muted-foreground">Receive updates via email</p>
							</div>
							<Switch
								checked={settings.emailNotifications}
								onCheckedChange={(checked) =>
									setSettings({ ...settings, emailNotifications: checked })
								}
							/>
						</div>
						<Separator />
						<div className="flex items-center justify-between">
							<div>
								<p className="text-sm font-medium">Push Notifications</p>
								<p className="text-xs text-muted-foreground">Browser notifications</p>
							</div>
							<Switch
								checked={settings.pushNotifications}
								onCheckedChange={(checked) =>
									setSettings({ ...settings, pushNotifications: checked })
								}
							/>
						</div>
						<Separator />
						<div className="flex items-center justify-between">
							<div>
								<p className="text-sm font-medium">Standup Reminders</p>
								<p className="text-xs text-muted-foreground">Daily standup notifications</p>
							</div>
							<Switch
								checked={settings.standupReminders}
								onCheckedChange={(checked) =>
									setSettings({ ...settings, standupReminders: checked })
								}
							/>
						</div>
						<Separator />
						<div className="flex items-center justify-between">
							<div>
								<p className="text-sm font-medium">Task Reminders</p>
								<p className="text-xs text-muted-foreground">Reminder for pending tasks</p>
							</div>
							<Switch
								checked={settings.taskReminders}
								onCheckedChange={(checked) =>
									setSettings({ ...settings, taskReminders: checked })
								}
							/>
						</div>
					</CardContent>
				</Card>

				{/* Timer Settings */}
				<Card>
					<CardHeader>
						<div className="flex items-center gap-2">
							<Mail className="h-5 w-5" />
							<CardTitle>Timer Preferences</CardTitle>
						</div>
						<CardDescription>Customize your Pomodoro experience</CardDescription>
					</CardHeader>
					<CardContent className="space-y-4">
						<div className="flex items-center justify-between">
							<div>
								<p className="text-sm font-medium">Auto-start Pomodoro</p>
								<p className="text-xs text-muted-foreground">Automatically start next session</p>
							</div>
							<Switch
								checked={settings.autoStartPomodoro}
								onCheckedChange={(checked) =>
									setSettings({ ...settings, autoStartPomodoro: checked })
								}
							/>
						</div>
						<Separator />
						<div className="flex items-center justify-between">
							<div>
								<p className="text-sm font-medium">Break Reminders</p>
								<p className="text-xs text-muted-foreground">Notify when break is over</p>
							</div>
							<Switch
								checked={settings.showBreakReminders}
								onCheckedChange={(checked) =>
									setSettings({ ...settings, showBreakReminders: checked })
								}
							/>
						</div>
					</CardContent>
				</Card>

				{/* Data & Privacy */}
				<Card>
					<CardHeader>
						<div className="flex items-center gap-2">
							<Shield className="h-5 w-5" />
							<CardTitle>Data & Privacy</CardTitle>
						</div>
						<CardDescription>Manage your data and privacy settings</CardDescription>
					</CardHeader>
					<CardContent className="space-y-4">
						<div className="flex items-center justify-between">
							<div>
								<p className="text-sm font-medium">Session Timeout</p>
								<p className="text-xs text-muted-foreground">Auto-logout after inactivity</p>
							</div>
							<Switch
								checked={settings.sessionTimeout}
								onCheckedChange={(checked) =>
									setSettings({ ...settings, sessionTimeout: checked })
								}
							/>
						</div>
						<Separator />
						<div className="flex gap-2">
							<Button variant="outline" className="flex-1">
								<Download className="w-4 h-4 mr-2" />
								Export Data
							</Button>
							<Button variant="outline" className="flex-1">
								<Upload className="w-4 h-4 mr-2" />
								Import Data
							</Button>
						</div>
					</CardContent>
				</Card>

				{/* Danger Zone */}
				<Card className="border-red-200 dark:border-red-900">
					<CardHeader>
						<div className="flex items-center gap-2">
							<Trash2 className="h-5 w-5 text-red-500" />
							<CardTitle className="text-red-500">Danger Zone</CardTitle>
						</div>
						<CardDescription>Irreversible actions</CardDescription>
					</CardHeader>
					<CardContent className="space-y-4">
						<div className="flex items-center justify-between p-3 rounded-lg bg-red-50 dark:bg-red-950/20">
							<div>
								<p className="text-sm font-medium text-red-600 dark:text-red-400">Log Out</p>
								<p className="text-xs text-muted-foreground">Sign out of your account</p>
							</div>
							<Button variant="outline" size="sm" className="text-red-600 border-red-200 hover:bg-red-100">
								<LogOut className="w-4 h-4 mr-2" />
								Log Out
							</Button>
						</div>
						<div className="flex items-center justify-between p-3 rounded-lg bg-red-50 dark:bg-red-950/20">
							<div>
								<p className="text-sm font-medium text-red-600 dark:text-red-400">Delete Account</p>
								<p className="text-xs text-muted-foreground">Permanently delete your account and data</p>
							</div>
							<Button variant="destructive" size="sm">
								<Trash2 className="w-4 h-4 mr-2" />
								Delete
							</Button>
						</div>
					</CardContent>
				</Card>
			</div>

			<div className="flex justify-end">
				<Button onClick={handleSaveSettings}>
					<Check className="w-4 h-4 mr-2" />
					Save All Settings
				</Button>
			</div>
		</div>
	);
}
