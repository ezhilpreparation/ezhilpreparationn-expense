import { Link } from "react-router-dom";
import { ArrowRight, BarChart3, Wallet, PieChart, Menu, X } from "lucide-react";
import { useState } from "react";

export default function LandingPage() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const scrollToHowItWorks = () => {
    const element = document.getElementById("how-it-works");
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div className="bg-gray-50 min-h-screen flex flex-col">
      {/* Header */}
      <header className="bg-white shadow-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="text-2xl font-bold text-indigo-600">
            Expense<span className="text-blue-600">Trace</span>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-6 font-medium">
            <button
              onClick={scrollToHowItWorks}
              className="text-gray-700 hover:text-indigo-600"
            >
              How it Works
            </button>
            <Link to="/login" className="text-gray-700 hover:text-indigo-600">
              Login
            </Link>
            <Link
              to="/signup"
              className="bg-indigo-600 text-white px-4 py-2 rounded-full hover:bg-indigo-700 transition"
            >
              Sign Up
            </Link>
          </nav>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden text-gray-700"
          >
            {mobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>

        {/* Mobile Nav */}
        {mobileMenuOpen && (
          <div className="md:hidden bg-white shadow-md">
            <div className="flex flex-col px-4 py-3 gap-3">
              <button
                onClick={scrollToHowItWorks}
                className="text-gray-700 text-left hover:text-indigo-600"
              >
                How it Works
              </button>
              <Link to="/login" className="text-gray-700 hover:text-indigo-600">
                Login
              </Link>
              <Link
                to="/signup"
                className="bg-indigo-600 text-white px-4 py-2 rounded-full hover:bg-indigo-700 transition w-fit"
              >
                Sign Up
              </Link>
            </div>
          </div>
        )}
      </header>

      {/* Main Content */}
      <main className="flex-grow">
        {/* Hero Section */}
        <section className="pt-16 sm:pt-20 lg:pt-24 pb-12 sm:pb-16 lg:pb-20">
          <div className="container mx-auto px-4 text-center max-w-4xl">
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-6 leading-tight">
              Take Control of Your{" "}
              <span className="text-blue-600">Expenses</span> &{" "}
              <span className="text-indigo-600">Savings</span>
            </h1>
            <p className="text-base sm:text-lg text-gray-700 mb-8 sm:mb-10 lg:mb-12 max-w-2xl mx-auto">
              Track your income and expenses effortlessly. Get insights that
              help you save more and spend smarter.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/signup"
                className="bg-indigo-600 text-white px-6 sm:px-8 py-2.5 sm:py-3 rounded-full hover:bg-indigo-700 transition font-semibold flex items-center justify-center text-sm sm:text-base"
              >
                Get Started
                <ArrowRight className="ml-1.5 sm:ml-2 h-4 w-4 sm:h-5 sm:w-5" />
              </Link>

              <button
                onClick={scrollToHowItWorks}
                className="border border-blue-600 text-blue-600 px-6 sm:px-8 py-2.5 sm:py-3 rounded-full hover:bg-blue-50 transition font-medium text-sm sm:text-base"
              >
                See How It Works
              </button>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section
          id="how-it-works"
          className="py-12 sm:py-16 lg:py-20 bg-white"
        >
          <div className="container mx-auto px-4">
            <h2 className="text-2xl sm:text-3xl font-bold text-center text-gray-900 mb-12">
              How ExpenseTrace Works
            </h2>

            <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
              <div className="p-6 bg-gray-50 rounded-xl shadow-sm hover:shadow-md transition">
                <div className="w-12 h-12 bg-blue-100 text-blue-600 rounded-lg flex items-center justify-center mb-4">
                  <Wallet className="w-6 h-6" />
                </div>
                <h3 className="text-lg font-semibold mb-2">
                  Track Transactions
                </h3>
                <p className="text-gray-600 text-sm">
                  Easily log your income and expenses in just a few clicks.
                  Categorize and manage them efficiently.
                </p>
              </div>

              <div className="p-6 bg-gray-50 rounded-xl shadow-sm hover:shadow-md transition">
                <div className="w-12 h-12 bg-indigo-100 text-indigo-600 rounded-lg flex items-center justify-center mb-4">
                  <PieChart className="w-6 h-6" />
                </div>
                <h3 className="text-lg font-semibold mb-2">Visual Insights</h3>
                <p className="text-gray-600 text-sm">
                  Understand your spending habits with simple yet powerful
                  visual reports and charts.
                </p>
              </div>

              <div className="p-6 bg-gray-50 rounded-xl shadow-sm hover:shadow-md transition">
                <div className="w-12 h-12 bg-blue-100 text-blue-600 rounded-lg flex items-center justify-center mb-4">
                  <BarChart3 className="w-6 h-6" />
                </div>
                <h3 className="text-lg font-semibold mb-2">Plan & Save</h3>
                <p className="text-gray-600 text-sm">
                  Set savings goals, track progress, and take control of your
                  future finances.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 sm:py-20 lg:py-24 bg-gradient-to-r from-indigo-600 to-blue-600 text-white">
          <div className="container mx-auto px-4 text-center max-w-3xl">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-6">
              Start Managing Your Money Smarter Today
            </h2>
            <p className="mb-8 text-base sm:text-lg text-indigo-100">
              Join thousands of users who are already improving their financial
              health with ExpenseTrace.
            </p>
            <Link
              to="/signup"
              className="bg-white text-indigo-600 px-6 sm:px-8 py-2.5 sm:py-3 rounded-full hover:bg-indigo-50 transition font-semibold text-sm sm:text-base"
            >
              Create Free Account
            </Link>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-gray-900 text-gray-300">
        <div className="container mx-auto px-4 py-12 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div>
            <h3 className="text-xl font-bold text-white mb-4">ExpenseTrace</h3>
            <p className="text-gray-400 text-sm leading-relaxed">
              Your personal finance companion. Track, manage, and save smarter
              with powerful insights and tools.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-semibold text-white mb-4">
              Quick Links
            </h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link to="/" className="hover:text-white">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/features" className="hover:text-white">
                  Features
                </Link>
              </li>
              <li>
                <Link to="/pricing" className="hover:text-white">
                  Pricing
                </Link>
              </li>
              <li>
                <Link to="/blog" className="hover:text-white">
                  Blog
                </Link>
              </li>
              <li>
                <Link to="/contact" className="hover:text-white">
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h4 className="text-lg font-semibold text-white mb-4">Support</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link to="/help" className="hover:text-white">
                  Help Center
                </Link>
              </li>
              <li>
                <Link to="/faq" className="hover:text-white">
                  FAQs
                </Link>
              </li>
              <li>
                <Link to="/privacy" className="hover:text-white">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link to="/terms" className="hover:text-white">
                  Terms & Conditions
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-lg font-semibold text-white mb-4">
              Get in Touch
            </h4>
            <ul className="space-y-2 text-sm">
              <li>
                Email:{" "}
                <a
                  href="mailto:support@expensetrace.com"
                  className="hover:text-white"
                >
                  support@expensetrace.com
                </a>
              </li>
              <li>
                Phone:{" "}
                <a href="tel:+1234567890" className="hover:text-white">
                  +1 234 567 890
                </a>
              </li>
              <li>
                Address:{" "}
                <span className="text-gray-400">
                  123 Finance Street, Mumbai, India
                </span>
              </li>
            </ul>
            <div className="flex space-x-4 mt-4">
              <a href="#" className="hover:text-white">
                🐦
              </a>
              <a href="#" className="hover:text-white">
                📘
              </a>
              <a href="#" className="hover:text-white">
                📸
              </a>
              <a href="#" className="hover:text-white">
                💼
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-700 py-4 text-center text-sm text-gray-400">
          © {new Date().getFullYear()} ExpenseTrace. All rights reserved.
          <span className="block sm:inline">
            {" "}
            | Built with ❤️ to make money management simple.
          </span>
        </div>
      </footer>
    </div>
  );
}
