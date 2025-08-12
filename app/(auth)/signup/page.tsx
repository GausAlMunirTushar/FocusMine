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
import { Separator } from "@/components/ui/separator";
import { Checkbox } from "@/components/ui/checkbox";
import { Timer, Eye, EyeOff, Github, Mail } from "lucide-react";
import Link from "next/link";

export default function SignUpPage() {
	const [showPassword, setShowPassword] = useState(false);
	const [showConfirmPassword, setShowConfirmPassword] = useState(false);
	const [formData, setFormData] = useState({
		name: "",
		email: "",
		password: "",
		confirmPassword: "",
		agreeToTerms: false,
	});

	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault();
		// Handle sign up logic here
		console.log("Sign up:", formData);
	};

	const handleInputChange = (field: string, value: string | boolean) => {
		setFormData((prev) => ({ ...prev, [field]: value }));
	};

	return (
		<div className="min-h-screen flex items-center justify-center p-4 bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
			<div className="w-full max-w-md">
				<div className="text-center mb-8">
					<Link
						href="/"
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
							Create your account
						</CardTitle>
						<CardDescription>
							Get started with FocusMine today
						</CardDescription>
					</CardHeader>
					<CardContent className="space-y-6">
						<form onSubmit={handleSubmit} className="space-y-4">
							<div className="space-y-2">
								<Label htmlFor="name">Full Name</Label>
								<Input
									id="name"
									type="text"
									placeholder="Enter your full name"
									value={formData.name}
									onChange={(e) =>
										handleInputChange(
											"name",
											e.target.value
										)
									}
									required
								/>
							</div>

							<div className="space-y-2">
								<Label htmlFor="email">Email</Label>
								<Input
									id="email"
									type="email"
									placeholder="Enter your email"
									value={formData.email}
									onChange={(e) =>
										handleInputChange(
											"email",
											e.target.value
										)
									}
									required
								/>
							</div>

							<div className="space-y-2">
								<Label htmlFor="password">Password</Label>
								<div className="relative">
									<Input
										id="password"
										type={
											showPassword ? "text" : "password"
										}
										placeholder="Create a password"
										value={formData.password}
										onChange={(e) =>
											handleInputChange(
												"password",
												e.target.value
											)
										}
										required
									/>
									<Button
										type="button"
										variant="ghost"
										size="sm"
										className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
										onClick={() =>
											setShowPassword(!showPassword)
										}
									>
										{showPassword ? (
											<EyeOff className="h-4 w-4" />
										) : (
											<Eye className="h-4 w-4" />
										)}
									</Button>
								</div>
							</div>

							<div className="space-y-2">
								<Label htmlFor="confirmPassword">
									Confirm Password
								</Label>
								<div className="relative">
									<Input
										id="confirmPassword"
										type={
											showConfirmPassword
												? "text"
												: "password"
										}
										placeholder="Confirm your password"
										value={formData.confirmPassword}
										onChange={(e) =>
											handleInputChange(
												"confirmPassword",
												e.target.value
											)
										}
										required
									/>
									<Button
										type="button"
										variant="ghost"
										size="sm"
										className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
										onClick={() =>
											setShowConfirmPassword(
												!showConfirmPassword
											)
										}
									>
										{showConfirmPassword ? (
											<EyeOff className="h-4 w-4" />
										) : (
											<Eye className="h-4 w-4" />
										)}
									</Button>
								</div>
							</div>

							<div className="flex items-center space-x-2">
								<Checkbox
									id="terms"
									checked={formData.agreeToTerms}
									onCheckedChange={(checked) =>
										handleInputChange(
											"agreeToTerms",
											checked as boolean
										)
									}
								/>
								<Label htmlFor="terms" className="text-sm">
									I agree to the{" "}
									<Link
										href="/terms"
										className="text-primary hover:underline"
									>
										Terms of Service
									</Link>{" "}
									and{" "}
									<Link
										href="/privacy"
										className="text-primary hover:underline"
									>
										Privacy Policy
									</Link>
								</Label>
							</div>

							<Button
								type="submit"
								className="w-full bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700"
								disabled={!formData.agreeToTerms}
							>
								Create Account
							</Button>
						</form>

						<div className="relative">
							<div className="absolute inset-0 flex items-center">
								<Separator className="w-full" />
							</div>
							<div className="relative flex justify-center text-xs uppercase">
								<span className="bg-background px-2 text-muted-foreground">
									Or continue with
								</span>
							</div>
						</div>

						<div className="grid grid-cols-2 gap-4">
							<Button
								variant="outline"
								className="bg-transparent"
							>
								<Github className="w-4 h-4 mr-2" />
								GitHub
							</Button>
							<Button
								variant="outline"
								className="bg-transparent"
							>
								<Mail className="w-4 h-4 mr-2" />
								Google
							</Button>
						</div>

						<div className="text-center text-sm">
							Already have an account?{" "}
							<Link
								href="/signin"
								className="text-primary hover:underline font-medium"
							>
								Sign in
							</Link>
						</div>
					</CardContent>
				</Card>
			</div>
		</div>
	);
}
