"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function PrivacyPage() {
	return (
		<div className="container mx-auto p-6 max-w-4xl py-12">
			<Card className="border-0 shadow-xl">
				<CardHeader>
					<CardTitle className="text-3xl text-center">
						Privacy Policy
					</CardTitle>
					<p className="text-center text-muted-foreground">
						Last updated: December 2024
					</p>
				</CardHeader>
				<CardContent className="prose prose-gray dark:prose-invert max-w-none space-y-6">
					<section>
						<h2 className="text-xl font-semibold mb-3">
							1. Information We Collect
						</h2>
						<p className="text-muted-foreground">
							We collect information you provide directly to
							us, such as when you create an account, use our
							services, or contact us for support.
						</p>
					</section>

					<section>
						<h2 className="text-xl font-semibold mb-3">
							2. How We Use Your Information
						</h2>
						<p className="text-muted-foreground">
							We use the information we collect to provide,
							maintain, and improve our services, process
							transactions, and communicate with you.
						</p>
					</section>

					<section>
						<h2 className="text-xl font-semibold mb-3">
							3. Information Sharing
						</h2>
						<p className="text-muted-foreground">
							We do not sell, trade, or otherwise transfer
							your personal information to third parties
							without your consent, except as described in
							this policy.
						</p>
					</section>

					<section>
						<h2 className="text-xl font-semibold mb-3">
							4. Data Security
						</h2>
						<p className="text-muted-foreground">
							We implement appropriate security measures to
							protect your personal information against
							unauthorized access, alteration, disclosure, or
							destruction.
						</p>
					</section>

					<section>
						<h2 className="text-xl font-semibold mb-3">
							5. Local Storage
						</h2>
						<p className="text-muted-foreground">
							FocusMine uses local storage to save your
							preferences, tasks, and settings on your device.
							This data remains on your device and is not
							transmitted to our servers unless you create an
							account.
						</p>
					</section>

					<section>
						<h2 className="text-xl font-semibold mb-3">
							6. Contact Us
						</h2>
						<p className="text-muted-foreground">
							If you have any questions about this Privacy
							Policy, please contact us at{" "}
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
