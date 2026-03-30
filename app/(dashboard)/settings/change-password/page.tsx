"use client";

import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { useLanguage } from "@/contexts/language-context";
import {
	Key,
	Lock,
	Shield,
	Eye,
	EyeOff,
	CheckCircle,
	AlertCircle,
	ArrowLeft,
} from "lucide-react";
import Link from "next/link";

interface PasswordStrength {
	score: number;
	label: string;
	color: string;
	requirements: {
		length: boolean;
		uppercase: boolean;
		lowercase: boolean;
		number: boolean;
		special: boolean;
	};
}

export default function ChangePasswordPage() {
	const { t } = useLanguage();
	const [passwords, setPasswords] = useState({
		current: "",
		new: "",
		confirm: "",
	});
	const [showPasswords, setShowPasswords] = useState({
		current: false,
		new: false,
		confirm: false,
	});
	const [isLoading, setIsLoading] = useState(false);
	const [error, setError] = useState("");
	const [success, setSuccess] = useState("");

	const calculatePasswordStrength = (password: string): PasswordStrength => {
		const requirements = {
			length: password.length >= 8,
			uppercase: /[A-Z]/.test(password),
			lowercase: /[a-z]/.test(password),
			number: /[0-9]/.test(password),
			special: /[!@#$%^&*(),.?":{}|<>]/.test(password),
		};

		const score = Object.values(requirements).filter(Boolean).length;
		
		const strengthLevels = [
			{ label: "Very Weak", color: "bg-red-500" },
			{ label: "Weak", color: "bg-orange-500" },
			{ label: "Fair", color: "bg-yellow-500" },
			{ label: "Good", color: "bg-blue-500" },
			{ label: "Strong", color: "bg-green-500" },
		];

		return {
			score,
			label: strengthLevels[score]?.label || "Very Weak",
			color: strengthLevels[score]?.color || "bg-red-500",
			requirements,
		};
	};

	const passwordStrength = calculatePasswordStrength(passwords.new);

	const validatePasswords = (): boolean => {
		if (!passwords.current) {
			setError("Current password is required");
			return false;
		}
		if (!passwords.new) {
			setError("New password is required");
			return false;
		}
		if (passwords.new.length < 8) {
			setError("New password must be at least 8 characters");
			return false;
		}
		if (passwords.new !== passwords.confirm) {
			setError("New passwords do not match");
			return false;
		}
		if (passwords.new === passwords.current) {
			setError("New password must be different from current password");
			return false;
		}
		return true;
	};

	const handleChangePassword = async () => {
		setError("");
		setSuccess("");

		if (!validatePasswords()) {
			return;
		}

		setIsLoading(true);

		// Simulate API call
		setTimeout(() => {
			setIsLoading(false);
			setSuccess("Password changed successfully!");
			setPasswords({ current: "", new: "", confirm: "" });
		}, 1500);
	};

	const togglePasswordVisibility = (field: keyof typeof showPasswords) => {
		setShowPasswords({
			...showPasswords,
			[field]: !showPasswords[field],
		});
	};

	return (
		<div className="container mx-auto p-6 space-y-6 max-w-4xl">
			<div className="flex items-center gap-4">
				<Link href="/settings/account">
					<Button variant="ghost" size="icon">
						<ArrowLeft className="h-4 w-4" />
					</Button>
				</Link>
				<div>
					<h1 className="text-3xl font-bold">Change Password</h1>
					<p className="text-muted-foreground">
						Update your password to keep your account secure
					</p>
				</div>
			</div>

			{error && (
				<Alert variant="destructive">
					<AlertCircle className="h-4 w-4" />
					<AlertDescription>{error}</AlertDescription>
				</Alert>
			)}

			{success && (
				<Alert className="border-green-500 text-green-600">
					<CheckCircle className="h-4 w-4" />
					<AlertDescription>{success}</AlertDescription>
				</Alert>
			)}

			<div className="grid gap-6">
				<Card>
					<CardHeader>
						<div className="flex items-center gap-2">
							<Lock className="h-5 w-5" />
							<CardTitle>Password Requirements</CardTitle>
						</div>
						<CardDescription>
							Your new password must meet the following requirements
						</CardDescription>
					</CardHeader>
					<CardContent>
						<div className="space-y-3">
							<div className="flex items-center gap-2">
								<div
									className={`w-4 h-4 rounded-full ${
										passwordStrength.requirements.length
											? "bg-green-500"
											: "bg-gray-300 dark:bg-gray-600"
									}`}
								/>
								<span className="text-sm">
									At least 8 characters
								</span>
							</div>
							<div className="flex items-center gap-2">
								<div
									className={`w-4 h-4 rounded-full ${
										passwordStrength.requirements.uppercase
											? "bg-green-500"
											: "bg-gray-300 dark:bg-gray-600"
									}`}
								/>
								<span className="text-sm">
									One uppercase letter
								</span>
							</div>
							<div className="flex items-center gap-2">
								<div
									className={`w-4 h-4 rounded-full ${
										passwordStrength.requirements.lowercase
											? "bg-green-500"
											: "bg-gray-300 dark:bg-gray-600"
									}`}
								/>
								<span className="text-sm">
									One lowercase letter
								</span>
							</div>
							<div className="flex items-center gap-2">
								<div
									className={`w-4 h-4 rounded-full ${
										passwordStrength.requirements.number
											? "bg-green-500"
											: "bg-gray-300 dark:bg-gray-600"
									}`}
								/>
								<span className="text-sm">One number</span>
							</div>
							<div className="flex items-center gap-2">
								<div
									className={`w-4 h-4 rounded-full ${
										passwordStrength.requirements.special
											? "bg-green-500"
											: "bg-gray-300 dark:bg-gray-600"
									}`}
								/>
								<span className="text-sm">
									One special character
								</span>
							</div>

							{passwords.new && (
								<>
									<Separator />
									<div className="space-y-2">
										<div className="flex items-center justify-between">
											<span className="text-sm font-medium">
												Password Strength
											</span>
											<span
												className={`text-sm ${
													passwordStrength.score >= 4
														? "text-green-600"
														: passwordStrength.score >= 3
														? "text-blue-600"
														: "text-orange-600"
												}`}
											>
												{passwordStrength.label}
											</span>
										</div>
										<div className="flex gap-1">
											{[0, 1, 2, 3, 4].map((index) => (
												<div
													key={index}
													className={`h-2 flex-1 rounded-full ${
														index < passwordStrength.score
															? passwordStrength.color
															: "bg-gray-200 dark:bg-gray-700"
													}`}
												/>
											))}
										</div>
									</div>
								</>
							)}
						</div>
					</CardContent>
				</Card>

				<Card>
					<CardHeader>
						<div className="flex items-center gap-2">
							<Key className="h-5 w-5" />
							<CardTitle>Update Password</CardTitle>
						</div>
						<CardDescription>
							Enter your current password and choose a new one
						</CardDescription>
					</CardHeader>
					<CardContent className="space-y-4">
						<div className="space-y-2">
							<Label htmlFor="current-password">
								Current Password
							</Label>
							<div className="relative">
								<Input
									id="current-password"
									type={
										showPasswords.current
											? "text"
											: "password"
									}
									value={passwords.current}
									onChange={(e) =>
										setPasswords({
											...passwords,
											current: e.target.value,
										})
									}
									placeholder="Enter current password"
									className="pr-10"
								/>
								<Button
									type="button"
									variant="ghost"
									size="icon"
									className="absolute right-0 top-0 h-full px-3 hover:bg-transparent"
									onClick={() =>
										togglePasswordVisibility("current")
									}
								>
									{showPasswords.current ? (
										<EyeOff className="h-4 w-4 text-muted-foreground" />
									) : (
										<Eye className="h-4 w-4 text-muted-foreground" />
									)}
								</Button>
							</div>
						</div>

						<div className="space-y-2">
							<Label htmlFor="new-password">New Password</Label>
							<div className="relative">
								<Input
									id="new-password"
									type={
										showPasswords.new ? "text" : "password"
									}
									value={passwords.new}
									onChange={(e) =>
										setPasswords({
											...passwords,
											new: e.target.value,
										})
									}
									placeholder="Enter new password"
									className="pr-10"
								/>
								<Button
									type="button"
									variant="ghost"
									size="icon"
									className="absolute right-0 top-0 h-full px-3 hover:bg-transparent"
									onClick={() =>
										togglePasswordVisibility("new")
									}
								>
									{showPasswords.new ? (
										<EyeOff className="h-4 w-4 text-muted-foreground" />
									) : (
										<Eye className="h-4 w-4 text-muted-foreground" />
									)}
								</Button>
							</div>
						</div>

						<div className="space-y-2">
							<Label htmlFor="confirm-password">
								Confirm New Password
							</Label>
							<div className="relative">
								<Input
									id="confirm-password"
									type={
										showPasswords.confirm
											? "text"
											: "password"
									}
									value={passwords.confirm}
									onChange={(e) =>
										setPasswords({
											...passwords,
											confirm: e.target.value,
										})
									}
									placeholder="Confirm new password"
									className="pr-10"
								/>
								<Button
									type="button"
									variant="ghost"
									size="icon"
									className="absolute right-0 top-0 h-full px-3 hover:bg-transparent"
									onClick={() =>
										togglePasswordVisibility("confirm")
									}
								>
									{showPasswords.confirm ? (
										<EyeOff className="h-4 w-4 text-muted-foreground" />
									) : (
										<Eye className="h-4 w-4 text-muted-foreground" />
									)}
								</Button>
							</div>
						</div>

						<div className="pt-4">
							<Button
								onClick={handleChangePassword}
								disabled={isLoading}
								className="w-full"
							>
								{isLoading ? (
									<>Changing Password...</>
								) : (
									<>
										<Shield className="w-4 h-4 mr-2" />
										Change Password
									</>
								)}
							</Button>
						</div>
					</CardContent>
				</Card>

				<Card>
					<CardHeader>
						<CardTitle>Password Tips</CardTitle>
					</CardHeader>
					<CardContent>
						<ul className="space-y-2 text-sm text-muted-foreground">
							<li className="flex items-start gap-2">
								<CheckCircle className="h-4 w-4 text-green-500 mt-0.5" />
								Use a password you don&apos;t use elsewhere
							</li>
							<li className="flex items-start gap-2">
								<CheckCircle className="h-4 w-4 text-green-500 mt-0.5" />
								Consider using a passphrase (multiple words)
							</li>
							<li className="flex items-start gap-2">
								<CheckCircle className="h-4 w-4 text-green-500 mt-0.5" />
								Enable two-factor authentication for extra security
							</li>
							<li className="flex items-start gap-2">
								<CheckCircle className="h-4 w-4 text-green-500 mt-0.5" />
								Change your password regularly
							</li>
						</ul>
					</CardContent>
				</Card>
			</div>
		</div>
	);
}
