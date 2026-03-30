"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Check } from "lucide-react";
import Link from "next/link";

const plans = [
  {
    name: "Free",
    price: "$0",
    period: "forever",
    description: "Perfect for individuals getting started with productivity tracking",
    features: [
      "Basic Pomodoro timer",
      "Up to 10 tasks",
      "Basic productivity stats",
      "Single device sync",
      "Community support",
    ],
    cta: "Get Started",
    popular: false,
  },
  {
    name: "Pro",
    price: "$9",
    period: "per month",
    description: "For professionals who want advanced features and unlimited access",
    features: [
      "Everything in Free",
      "Unlimited tasks",
      "Advanced analytics & reports",
      "Multi-device sync",
      "Team collaboration (up to 5 members)",
      "Custom timer durations",
      "Priority support",
      "No ads",
    ],
    cta: "Start Free Trial",
    popular: true,
  },
  {
    name: "Team",
    price: "$29",
    period: "per month",
    description: "For teams that want to collaborate and track productivity together",
    features: [
      "Everything in Pro",
      "Unlimited team members",
      "Daily standups",
      "Team productivity dashboard",
      "Member management",
      "Team reports & insights",
      "Admin controls",
      "Dedicated support",
    ],
    cta: "Contact Sales",
    popular: false,
  },
];

export default function PricingPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-muted">
      {/* Hero Section */}
      <section className="container mx-auto px-4 py-20 text-center">
        <h1 className="text-4xl md:text-5xl font-bold mb-4">
          Simple, Transparent Pricing
        </h1>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto mb-8">
          Choose the plan that fits your needs. Start free and upgrade as you grow.
        </p>
      </section>

      {/* Pricing Cards */}
      <section className="container mx-auto px-4 pb-20">
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3 max-w-6xl mx-auto">
          {plans.map((plan) => (
            <Card
              key={plan.name}
              className={`flex flex-col h-full ${
                plan.popular
                  ? "border-primary shadow-lg scale-105 relative"
                  : ""
              }`}
            >
              {plan.popular && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                  <span className="bg-primary text-primary-foreground text-sm font-medium px-3 py-1 rounded-full">
                    Most Popular
                  </span>
                </div>
              )}
              <CardHeader className="text-center pb-4">
                <CardTitle className="text-2xl">{plan.name}</CardTitle>
                <CardDescription className="text-muted-foreground">
                  {plan.description}
                </CardDescription>
              </CardHeader>
              <CardContent className="flex-1">
                <div className="text-center mb-6">
                  <span className="text-5xl font-bold">{plan.price}</span>
                  <span className="text-muted-foreground ml-2">
                    /{plan.period}
                  </span>
                </div>
                <ul className="space-y-3">
                  {plan.features.map((feature, index) => (
                    <li key={index} className="flex items-center gap-2">
                      <Check className="h-5 w-5 text-green-500 shrink-0" />
                      <span className="text-sm">{feature}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
              <CardFooter>
                <Button
                  className="w-full"
                  variant={plan.popular ? "default" : "outline"}
                  size="lg"
                  asChild
                >
                  <Link href="/dashboard">
                    {plan.cta}
                  </Link>
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </section>

      {/* FAQ Section */}
      <section className="container mx-auto px-4 py-20 bg-muted/50">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12">
            Frequently Asked Questions
          </h2>
          <div className="space-y-6">
            <div>
              <h3 className="font-semibold text-lg mb-2">
                Can I change my plan later?
              </h3>
              <p className="text-muted-foreground">
                Yes, you can upgrade or downgrade your plan at any time. Changes
                will be reflected in your next billing cycle.
              </p>
            </div>
            <div>
              <h3 className="font-semibold text-lg mb-2">
                Is there a free trial?
              </h3>
              <p className="text-muted-foreground">
                Yes, the Pro plan comes with a 14-day free trial. No credit card
                required to start.
              </p>
            </div>
            <div>
              <h3 className="font-semibold text-lg mb-2">
                What payment methods do you accept?
              </h3>
              <p className="text-muted-foreground">
                We accept all major credit cards (Visa, MasterCard, American
                Express) and PayPal.
              </p>
            </div>
            <div>
              <h3 className="font-semibold text-lg mb-2">
                Can I cancel my subscription?
              </h3>
              <p className="text-muted-foreground">
                Yes, you can cancel your subscription at any time. You'll
                continue to have access until the end of your billing period.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="container mx-auto px-4 py-20 text-center">
        <h2 className="text-3xl font-bold mb-4">
          Ready to boost your productivity?
        </h2>
        <p className="text-muted-foreground mb-8">
          Join thousands of users who are already more productive with FocusMine.
        </p>
        <Button size="lg" asChild>
          <Link href="/dashboard">Get Started for Free</Link>
        </Button>
      </section>
    </div>
  );
}
