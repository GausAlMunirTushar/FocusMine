"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function TermsPage() {
	return (
		<div className="container mx-auto p-6 max-w-4xl py-12">
			<Card className="border-0 shadow-xl">
				<CardHeader>
					<CardTitle className="text-3xl text-center">
						Terms of Service
					</CardTitle>
					<p className="text-center text-muted-foreground">
						Last updated: December 2024
					</p>
				</CardHeader>
				<CardContent className="prose prose-gray dark:prose-invert max-w-none space-y-6">
					<section>
						<h2 className="text-xl font-semibold mb-3">
							1. Acceptance of Terms
						</h2>
						<p className="text-muted-foreground">
							By accessing and using FocusMine, you accept and
							agree to be bound by the terms and provision of
							this agreement.
						</p>
					</section>

					<section>
						<h2 className="text-xl font-semibold mb-3">
							2. Use License
						</h2>
						<p className="text-muted-foreground">
							Permission is granted to temporarily use
							FocusMine for personal, non-commercial
							transitory viewing only. This is the grant of a
							license, not a transfer of title.
						</p>
					</section>

					<section>
						<h2 className="text-xl font-semibold mb-3">
							3. User Account
						</h2>
						<p className="text-muted-foreground">
							When you create an account with us, you must
							provide information that is accurate, complete,
							and current at all times. You are responsible
							for safeguarding the password.
						</p>
					</section>

					<section>
						<h2 className="text-xl font-semibold mb-3">
							4. Privacy Policy
						</h2>
						<p className="text-muted-foreground">
							Your privacy is important to us. Please review
							our Privacy Policy, which also governs your use
							of the Service.
						</p>
					</section>

					<section>
						<h2 className="text-xl font-semibold mb-3">
							5. Prohibited Uses
						</h2>
						<p className="text-muted-foreground">
							You may not use our service for any unlawful
							purpose or to solicit others to perform unlawful
							acts.
						</p>
					</section>

					<section>
						<h2 className="text-xl font-semibold mb-3">
							6. Contact Information
						</h2>
						<p className="text-muted-foreground">
							If you have any questions about these Terms of
							Service, please contact us at{" "}
							<a
								href="mailto:gausaltushar@gmail.com"
								className="text-primary hover:underline"
							>
								gausaltushar@gmail.com
							</a>
						</p>
					</section>
				</CardContent>
			</Card>
		</div>
	);
}
