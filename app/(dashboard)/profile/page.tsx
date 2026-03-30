"use client";

import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { useLanguage } from "@/contexts/language-context";
import {
	User,
	Mail,
	Calendar,
	MapPin,
	Link as LinkIcon,
	Camera,
	Save,
	Shield,
	Bell,
	Palette,
} from "lucide-react";

export default function ProfilePage() {
	const { t } = useLanguage();
	const [isEditing, setIsEditing] = useState(false);
	const [profile, setProfile] = useState({
		name: "John Doe",
		email: "john@example.com",
		bio: "Productivity enthusiast | Developer | Coffee lover",
		location: "New York, USA",
		website: "https://johndoe.com",
		joinDate: "January 2024",
		role: "Team Member",
	});

	const handleSave = () => {
		setIsEditing(false);
		// Save profile logic here
	};

	const stats = [
		{ label: "Tasks Completed", value: "124" },
		{ label: "Pomodoros", value: "456" },
		{ label: "Hours Focused", value: "152" },
		{ label: "Day Streak", value: "12" },
	];

	const recentActivity = [
		{ action: "Completed task", item: "Update documentation", time: "2 hours ago" },
		{ action: "Submitted standup", item: "Daily standup", time: "5 hours ago" },
		{ action: "Finished pomodoro", item: "Session #45", time: "Yesterday" },
		{ action: "Added note", item: "Meeting notes", time: "2 days ago" },
	];

	return (
		<div className="container mx-auto p-6 space-y-6">
			<div className="flex items-center justify-between">
				<div>
					<h1 className="text-3xl font-bold">Profile</h1>
					<p className="text-muted-foreground">
						Manage your profile and preferences
					</p>
				</div>
				<Button onClick={isEditing ? handleSave : () => setIsEditing(true)}>
					<Save className="w-4 h-4 mr-2" />
					{isEditing ? "Save Changes" : "Edit Profile"}
				</Button>
			</div>

			<div className="grid gap-6 md:grid-cols-3">
				{/* Profile Card */}
				<Card className="md:col-span-1">
					<CardHeader className="text-center">
						<div className="flex justify-center mb-4">
							<div className="relative">
								<Avatar className="h-24 w-24">
									<AvatarFallback className="bg-primary text-primary-foreground text-3xl">
										JD
									</AvatarFallback>
								</Avatar>
								{isEditing && (
									<Button
										size="icon"
										className="absolute bottom-0 right-0 h-8 w-8 rounded-full"
									>
										<Camera className="h-4 w-4" />
									</Button>
								)}
							</div>
						</div>
						<CardTitle className="text-xl">{profile.name}</CardTitle>
						<CardDescription className="flex items-center justify-center gap-1">
							<Shield className="h-3 w-3" />
							{profile.role}
						</CardDescription>
					</CardHeader>
					<CardContent className="space-y-4">
						<Separator />
						<div className="space-y-3">
							<div className="flex items-center gap-2 text-sm">
								<Mail className="h-4 w-4 text-muted-foreground" />
								{profile.email}
							</div>
							<div className="flex items-center gap-2 text-sm">
								<MapPin className="h-4 w-4 text-muted-foreground" />
								{profile.location}
							</div>
							<div className="flex items-center gap-2 text-sm">
								<LinkIcon className="h-4 w-4 text-muted-foreground" />
								<a href={profile.website} className="text-primary hover:underline">
									{profile.website.replace("https://", "")}
								</a>
							</div>
							<div className="flex items-center gap-2 text-sm">
								<Calendar className="h-4 w-4 text-muted-foreground" />
								Joined {profile.joinDate}
							</div>
						</div>
					</CardContent>
				</Card>

				{/* Main Content */}
				<div className="md:col-span-2 space-y-6">
					{/* Stats */}
					<Card>
						<CardHeader>
							<CardTitle>Your Stats</CardTitle>
							<CardDescription>Your productivity metrics</CardDescription>
						</CardHeader>
						<CardContent>
							<div className="grid grid-cols-2 md:grid-cols-4 gap-4">
								{stats.map((stat) => (
									<div key={stat.label} className="text-center p-4 rounded-lg bg-muted/50">
										<div className="text-2xl font-bold text-primary">{stat.value}</div>
										<div className="text-xs text-muted-foreground mt-1">{stat.label}</div>
									</div>
								))}
							</div>
						</CardContent>
					</Card>

					{/* Profile Information */}
					<Card>
						<CardHeader>
							<CardTitle>Profile Information</CardTitle>
							<CardDescription>Update your profile details</CardDescription>
						</CardHeader>
						<CardContent className="space-y-4">
							<div className="grid gap-4 md:grid-cols-2">
								<div className="space-y-2">
									<Label htmlFor="name">Full Name</Label>
									<Input
										id="name"
										value={profile.name}
										onChange={(e) => setProfile({ ...profile, name: e.target.value })}
										disabled={!isEditing}
									/>
								</div>
								<div className="space-y-2">
									<Label htmlFor="email">Email</Label>
									<Input
										id="email"
										type="email"
										value={profile.email}
										onChange={(e) => setProfile({ ...profile, email: e.target.value })}
										disabled={!isEditing}
									/>
								</div>
							</div>
							<div className="space-y-2">
								<Label htmlFor="bio">Bio</Label>
								<Textarea
									id="bio"
									value={profile.bio}
									onChange={(e) => setProfile({ ...profile, bio: e.target.value })}
									disabled={!isEditing}
									className="min-h-[80px]"
								/>
							</div>
							<div className="grid gap-4 md:grid-cols-2">
								<div className="space-y-2">
									<Label htmlFor="location">Location</Label>
									<Input
										id="location"
										value={profile.location}
										onChange={(e) => setProfile({ ...profile, location: e.target.value })}
										disabled={!isEditing}
									/>
								</div>
								<div className="space-y-2">
									<Label htmlFor="website">Website</Label>
									<Input
										id="website"
										value={profile.website}
										onChange={(e) => setProfile({ ...profile, website: e.target.value })}
										disabled={!isEditing}
									/>
								</div>
							</div>
						</CardContent>
					</Card>

					{/* Recent Activity */}
					<Card>
						<CardHeader>
							<CardTitle>Recent Activity</CardTitle>
							<CardDescription>Your latest actions</CardDescription>
						</CardHeader>
						<CardContent>
							<div className="space-y-4">
								{recentActivity.map((activity, index) => (
									<div key={index} className="flex items-center justify-between p-3 rounded-lg bg-muted/30">
										<div className="space-y-1">
											<div className="flex items-center gap-2">
												<span className="text-sm font-medium">{activity.action}</span>
												<Badge variant="secondary" className="text-xs">
													{activity.item}
												</Badge>
											</div>
											<p className="text-xs text-muted-foreground">{activity.time}</p>
										</div>
									</div>
								))}
							</div>
						</CardContent>
					</Card>
				</div>
			</div>
		</div>
	);
}
