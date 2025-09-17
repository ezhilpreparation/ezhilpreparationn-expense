import { Link } from "react-router-dom";
import {
  BarChart3,
  Wallet,
  PieChart,
  Shield,
  Zap,
} from "lucide-react";

export default function LandingPage() {
  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-b from-blue-50 via-white to-white">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-white/70 backdrop-blur border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <Link to="/" className="flex-shrink-0">
            <img src="../logo.png" alt="App Logo" className="h-8 w-auto" />
          </Link>
          <div className="flex items-center gap-4">
            <Link
              to="/log-in-or-create-account"
              className="px-4 py-2 bg-blue-600 text-white rounded-full font-semibold hover:bg-blue-700 transition"
            >
              Sign In
            </Link>
          </div>
        </div>
      </header>

      <main className="flex-grow">
        {/* Hero */}
        <section className="relative overflow-hidden bg-gradient-to-r from-blue-600 via-blue-500 to-blue-600 text-white">
          <div className="max-w-7xl mx-auto px-6 py-24 lg:py-32 grid lg:grid-cols-2 gap-10 items-center">
            <div className="max-w-2xl mx-auto lg:mx-0 text-center">
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-4 leading-snug">
                Manage & Automate{" "}
                <span className="text-blue-300">All Your Finances</span>
              </h1>

              <p className="text-base sm:text-lg md:text-xl text-blue-50/90 mb-6 max-w-xl mx-auto lg:mx-0">
                From categories to accounts, transactions, and debt – everything
                you need to stay in control of your money in one powerful app.
              </p>

              <Link
                to="/log-in-or-create-account"
                className="px-4 sm:px-5 py-3 sm:py-4 bg-white text-blue-700 rounded-full text-base sm:text-lg font-medium hover:bg-gray-100 transition shadow hover:shadow-lg"
              >
                Get Started
              </Link>
            </div>
            <div className="relative flex justify-center lg:justify-end">
              <img
                src="/app-screenshot.png"
                alt="App screenshot"
                className="rounded-2xl shadow-2xl border border-gray-100 w-full max-w-sm sm:max-w-md lg:max-w-lg"
              />

              {/* Badges */}
              <div className="w-full h-full">
                {[
                  { icon: Wallet, text: "Account Management", color: "text-blue-500", style: "absolute top-2 right-6" },
                  { icon: BarChart3, text: "Category Management", color: "text-green-500", style: "absolute bottom-11 right-6" },
                  { icon: PieChart, text: "Debt Management", color: "text-yellow-500", style: "absolute top-1/2 left-1/2 -translate-x-1/3 -translate-y-1/2" },
                  { icon: Zap, text: "Automated Scheduling", color: "text-purple-500", style: "absolute bottom-6 left-8" },
                ].map((badge, idx) => (
                  <div
                    key={idx}
                    className={`${badge.style} bg-white shadow-xl px-4 py-3 rounded-2xl flex items-center gap-3 text-sm font-medium text-gray-700
                 transition transform hover:-translate-y-1 hover:shadow-2xl`}
                  >
                    <badge.icon className={`w-6 h-6 ${badge.color} flex-shrink-0`} />
                    <span>{badge.text}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* How It Works */}
        <section className="bg-gradient-to-b from-blue-50 to-white py-24 relative overflow-hidden">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-12 sm:mb-16 leading-snug sm:leading-tight">
            How It Works in <br className="sm:hidden" />
            <span className="text-blue-600">3 Easy Steps</span>
          </h2>

          <div className="max-w-6xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-16">
            {[
              {
                icon: Wallet,
                title: "Add Accounts & Categories",
                desc: "Create categories and link multiple accounts in seconds.",
              },
              {
                icon: BarChart3,
                title: "Track & Schedule Transactions",
                desc: "Record transactions or let them sync automatically.",
              },
              {
                icon: PieChart,
                title: "Analyze & Manage Debt",
                desc: "Dashboards show spending, budgets, and debt at a glance.",
              },
            ].map((step, idx) => (
              <div key={idx} className="relative flex-1 flex flex-col items-center text-center">
                <div className="w-20 h-20 flex items-center justify-center bg-blue-100 text-blue-600 rounded-full mb-4">
                  <step.icon className="w-10 h-10" />
                </div>
                <h3 className="text-2xl font-semibold mb-2">{step.title}</h3>
                <p className="text-gray-600">{step.desc}</p>

                {/* Horizontal line for md+ */}
                {idx < 2 && (
                  <div className="hidden md:block absolute top-1/2 left-full w-16 h-1 bg-blue-200"></div>
                )}

                {/* Vertical line for mobile */}
                {idx < 2 && (
                  <div className="md:hidden w-1 h-16 bg-blue-200 mt-4"></div>
                )}
              </div>
            ))}
          </div>
        </section>

        {/* Why Our App Stands Out */}
        <section className="bg-white py-20 relative">
          <h2 className="text-3xl font-bold text-gray-900 text-center mb-16">
            Why Our App Stands Out
          </h2>

          <div className="max-w-6xl mx-auto px-6 grid md:grid-cols-3 gap-12">
            {[{
              icon: Shield,
              title: "Full Financial Suite",
              desc: "Manage categories, accounts, transactions, debt, and analysis.",
              color: "blue-500"
            }, {
              icon: Zap,
              title: "Smart Scheduling",
              desc: "Automate recurring transactions easily.",
              color: "yellow-400"
            }, {
              icon: BarChart3,
              title: "Actionable Insights",
              desc: "Understand spending patterns and hit goals faster.",
              color: "green-500"
            }].map((feature, idx) => (
              <div key={idx} className="flex flex-col items-center text-center">
                <div className={`w-24 h-24 flex items-center justify-center text-${feature.color} mb-4`}>
                  <feature.icon className="w-16 h-16" />
                </div>
                <h3 className="text-2xl font-semibold mb-2">{feature.title}</h3>
                <p className="text-gray-600">{feature.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* FAQ */}
        <section className="bg-white py-20">
          <div className="max-w-3xl mx-auto px-6">
            <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
              Frequently Asked Questions
            </h2>

            {/* new FAQ items */}
            <details className="mb-4">
              <summary className="cursor-pointer text-lg font-semibold text-gray-800">
                How to create sub-categories?
              </summary>
              <p className="mt-2 text-gray-600">
                We provide sub-category functionality through Tags.
                For example, you can add a <em>milk</em> tag on each milk transaction
                while categorising it into the Food category to still get totals for Food.
              </p>
            </details>

            <details className="mb-4">
              <summary className="cursor-pointer text-lg font-semibold text-gray-800">
                How to manage multiple accounts inside the app?
              </summary>
              <p className="mt-2 text-gray-600">
                Use Tags to simulate multiple accounts. For instance, add “business” and
                “personal” tags to transactions. You can then filter or view analysis
                for a single tag on the Custom View or analysis pages.
              </p>
            </details>

            <details className="mb-4">
              <summary className="cursor-pointer text-lg font-semibold text-gray-800">
                What are transfer transactions?
              </summary>
              <p className="mt-2 text-gray-600">
                They are neither expense nor income but help track transfers between
                your different payment modes. E.g. paying a credit card bill or
                withdrawing cash from an ATM can be logged as a transfer transaction.
              </p>
            </details>

            <details className="mb-4">
              <summary className="cursor-pointer text-lg font-semibold text-gray-800">
                How to edit or create new categories?
              </summary>
              <p className="mt-2 text-gray-600">
                The app provides 18 predefined categories (14 expense &amp; 4 income).
                You can edit or add new categories on the Categories page.
              </p>
            </details>
          </div>
        </section>

        {/* Final CTA */}
        <section className="py-16 sm:py-20 bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 text-white text-center px-4">
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-4 sm:mb-6 leading-snug sm:leading-tight">
            Ready to take control of your finances?
          </h2>
          <p className="text-base sm:text-lg md:text-xl mb-6 sm:mb-8 opacity-90 max-w-2xl mx-auto">
            Join thousands of people already using our app to manage accounts,
            categories, transactions, debt and analysis.
          </p>
          <Link
            to="/log-in-or-create-account"
            className="inline-block px-6 sm:px-8 py-3 sm:py-4 bg-white text-blue-600 rounded-full text-base sm:text-lg font-semibold hover:bg-gray-100 transition"
          >
            Start Free Today
          </Link>
        </section>
      </main>

      <footer className="bg-gray-900 text-gray-300">
        <div className="max-w-7xl mx-auto px-5 py-8 flex flex-col sm:flex-row justify-center sm:justify-between items-center gap-4">
          <div className="text-xs sm:text-sm text-gray-400 text-center sm:text-left">
            © {new Date().getFullYear()} ExpenseTrace. All rights reserved.
          </div>
          <div className="flex flex-wrap justify-center gap-4 text-sm sm:text-base">
            <Link to="/about" className="hover:text-white">
              About
            </Link>
            <Link to="/privacy" className="hover:text-white">
              Privacy Policy
            </Link>
            <Link to="/terms" className="hover:text-white">
              Terms & Conditions
            </Link>
          </div>
        </div>
      </footer>
    </div>
  );
}