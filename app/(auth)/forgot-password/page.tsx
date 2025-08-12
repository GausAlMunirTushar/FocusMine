"use client";

import type React from "react";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { Timer, ArrowLeft, Mail } from "lucide-react";
import Link from "next/link";

export default function ForgotPasswordPage() {
	const [email, setEmail] = useState("");
	const [isSubmitted, setIsSubmitted] = useState(false);

	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault();
		// Handle forgot password logic here
		console.log("Forgot password:", { email });
		setIsSubmitted(true);
	};

	return (
		<div className="min-h-screen flex items-center justify-center p-4 bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
			<div className="w-full max-w-md">
				<div className="text-center mb-8">
					<Link
						href="/home"
						className="inline-flex items-center gap-2 mb-4"
					>
						<div className="flex h-10 w-10 items-center justify-center rounded-lg bg-gradient-to-br from-blue-500 to-purple-600 text-white">
							<Timer className="h-5 w-5" />
						</div>
						<span className="font-bold text-2xl bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
							FocusMine
						</span>
					</Link>
				</div>

				<Card className="border-0 shadow-xl">
					<CardHeader className="text-center">
						<CardTitle className="text-2xl">
							{isSubmitted
								? "Check your email"
								: "Forgot your password?"}
						</CardTitle>
						<CardDescription>
							{isSubmitted
								? "We've sent a password reset link to your email address."
								: "Enter your email address and we'll send you a link to reset your password."}
						</CardDescription>
					</CardHeader>
					<CardContent className="space-y-6">
						{!isSubmitted ? (
							<form onSubmit={handleSubmit} className="space-y-4">
								<div className="space-y-2">
									<Label htmlFor="email">Email</Label>
									<Input
										id="email"
										type="email"
										placeholder="Enter your email"
										value={email}
										onChange={(e) =>
											setEmail(e.target.value)
										}
										required
									/>
								</div>

								<Button
									type="submit"
									className="w-full bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700"
								>
									Send Reset Link
								</Button>
							</form>
						) : (
							<div className="text-center space-y-4">
								<div className="w-16 h-16 bg-green-100 dark:bg-green-900/20 rounded-full flex items-center justify-center mx-auto">
									<Mail className="w-8 h-8 text-green-600" />
								</div>
								<p className="text-sm text-muted-foreground">
									If an account with that email exists, you'll
									receive a password reset link shortly.
								</p>
								<Button
									onClick={() => setIsSubmitted(false)}
									variant="outline"
									className="w-full bg-transparent"
								>
									Send Another Email
								</Button>
							</div>
						)}

						<div className="text-center">
							<Link
								href="/signin"
								className="inline-flex items-center text-sm text-primary hover:underline"
							>
								<ArrowLeft className="w-4 h-4 mr-1" />
								Back to sign in
							</Link>
						</div>
					</CardContent>
				</Card>
			</div>
		</div>
	);
}
