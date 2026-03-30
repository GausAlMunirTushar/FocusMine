import Image from "next/image";
import {
	Github,
	Linkedin,
	Mail,
	Twitter,
} from "lucide-react";

export function WebFooter() {
	return (
		<footer className="py-8 px-4 bg-muted/30 border-t">
			<div className="max-w-7xl mx-auto">
				<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
					{/* Brand */}
					<div>
						<div className="flex items-center gap-2 mb-4">
							<div className="flex h-8 w-8 items-center justify-center rounded-lg">
								<Image
									src="/focusmine.svg"
									alt="Focus Mine Logo"
									width={40}
									height={40}
								/>
							</div>
							<span className="font-bold text-lg">FocusMine</span>
						</div>
						<p className="text-sm text-muted-foreground">
							Complete productivity suite for focused work and
							achieving your goals.
						</p>
					</div>

					{/* Quick Links */}
					<div>
						<h3 className="font-semibold mb-3">Product</h3>
						<ul className="space-y-2 text-sm">
							<li>
								<a
									href="/timer"
									className="text-muted-foreground hover:text-foreground transition-colors"
								>
									Timer
								</a>
							</li>
							<li>
								<a
									href="/tasks"
									className="text-muted-foreground hover:text-foreground transition-colors"
								>
									Tasks
								</a>
							</li>
							<li>
								<a
									href="/dashboard"
									className="text-muted-foreground hover:text-foreground transition-colors"
								>
									Dashboard
								</a>
							</li>
							<li>
								<a
									href="/pricing"
									className="text-muted-foreground hover:text-foreground transition-colors"
								>
									Pricing
								</a>
							</li>
						</ul>
					</div>

					{/* Resources */}
					<div>
						<h3 className="font-semibold mb-3">Resources</h3>
						<ul className="space-y-2 text-sm">
							<li>
								<a
									href="/privacy"
									className="text-muted-foreground hover:text-foreground transition-colors"
								>
									Privacy Policy
								</a>
							</li>
							<li>
								<a
									href="/terms"
									className="text-muted-foreground hover:text-foreground transition-colors"
								>
									Terms of Service
								</a>
							</li>
						</ul>
					</div>

					{/* Connect */}
					<div>
						<h3 className="font-semibold mb-3">Connect</h3>
						<div className="flex gap-2">
							<a
								href="https://github.com/gausalmunirtushar"
								target="_blank"
								rel="noopener noreferrer"
								className="text-muted-foreground hover:text-foreground transition-colors p-2 rounded-lg hover:bg-background"
							>
								<Github className="w-5 h-5" />
								<span className="sr-only">GitHub</span>
							</a>
							<a
								href="https://linkedin.com/in/gausalmunirtushar"
								target="_blank"
								rel="noopener noreferrer"
								className="text-muted-foreground hover:text-foreground transition-colors p-2 rounded-lg hover:bg-background"
							>
								<Linkedin className="w-5 h-5" />
								<span className="sr-only">LinkedIn</span>
							</a>
							<a
								href="https://twitter.com/gausalmunir"
								target="_blank"
								rel="noopener noreferrer"
								className="text-muted-foreground hover:text-foreground transition-colors p-2 rounded-lg hover:bg-background"
							>
								<Twitter className="w-5 h-5" />
								<span className="sr-only">Twitter</span>
							</a>
							<a
								href="mailto:gausalmunirtushar@gmail.com"
								className="text-muted-foreground hover:text-foreground transition-colors p-2 rounded-lg hover:bg-background"
							>
								<Mail className="w-5 h-5" />
								<span className="sr-only">Email</span>
							</a>
						</div>
					</div>
				</div>

				<div className="border-t pt-8 text-center">
					<p className="text-sm text-muted-foreground">
						&copy; {new Date().getFullYear()} FocusMine. Made with
						❤️ by Gaus Al Munir Tushar. All rights reserved.
					</p>
				</div>
			</div>
		</footer>
	);
}
