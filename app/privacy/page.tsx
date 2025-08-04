"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Timer, ArrowLeft } from "lucide-react"
import Link from "next/link"

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      <div className="container mx-auto p-6 max-w-4xl">
        <div className="text-center mb-8">
          <Link href="/home" className="inline-flex items-center gap-2 mb-4">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-gradient-to-br from-blue-500 to-purple-600 text-white">
              <Timer className="h-5 w-5" />
            </div>
            <span className="font-bold text-2xl bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              FocusNest
            </span>
          </Link>
        </div>

        <Card className="border-0 shadow-xl">
          <CardHeader>
            <CardTitle className="text-3xl text-center">Privacy Policy</CardTitle>
            <p className="text-center text-muted-foreground">Last updated: December 2024</p>
          </CardHeader>
          <CardContent className="prose prose-gray dark:prose-invert max-w-none space-y-6">
            <section>
              <h2 className="text-xl font-semibold mb-3">1. Information We Collect</h2>
              <p className="text-muted-foreground">
                We collect information you provide directly to us, such as when you create an account, use our services,
                or contact us for support.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold mb-3">2. How We Use Your Information</h2>
              <p className="text-muted-foreground">
                We use the information we collect to provide, maintain, and improve our services, process transactions,
                and communicate with you.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold mb-3">3. Information Sharing</h2>
              <p className="text-muted-foreground">
                We do not sell, trade, or otherwise transfer your personal information to third parties without your
                consent, except as described in this policy.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold mb-3">4. Data Security</h2>
              <p className="text-muted-foreground">
                We implement appropriate security measures to protect your personal information against unauthorized
                access, alteration, disclosure, or destruction.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold mb-3">5. Local Storage</h2>
              <p className="text-muted-foreground">
                FocusNest uses local storage to save your preferences, tasks, and settings on your device. This data
                remains on your device and is not transmitted to our servers unless you create an account.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold mb-3">6. Contact Us</h2>
              <p className="text-muted-foreground">
                If you have any questions about this Privacy Policy, please contact us at{" "}
                <a href="mailto:gausaltushar@gmail.com" className="text-primary hover:underline">
                  gausaltushar@gmail.com
                </a>
              </p>
            </section>
          </CardContent>
        </Card>

        <div className="text-center mt-8">
          <Link href="/auth/signup">
            <Button variant="outline" className="bg-transparent">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Sign Up
            </Button>
          </Link>
        </div>
      </div>
    </div>
  )
}
