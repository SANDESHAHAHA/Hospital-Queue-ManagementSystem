import React from "react";
import {
  Activity,
  Users,
  Clock,
  CheckCircle2,
  BarChart3,
  Heart,
  Stethoscope,
  Bell,
  ArrowRight,
} from "lucide-react";
import { Link } from "@tanstack/react-router";

interface FeatureCard {
  icon: React.ReactNode;
  title: string;
  description: string;
}

export const LandingPage: React.FC = () => {
  const features: FeatureCard[] = [
    {
      icon: <Clock className="w-8 h-8" />,
      title: "Smart Queue Management",
      description: "Real-time queue tracking with estimated wait times and automatic position updates",
    },
    {
      icon: <Users className="w-8 h-8" />,
      title: "Patient Management",
      description: "Complete patient profiles with medical history and appointment records",
    },
    {
      icon: <Stethoscope className="w-8 h-8" />,
      title: "Doctor Scheduling",
      description: "Efficient doctor availability management with flexible time slots",
    },
    {
      icon: <CheckCircle2 className="w-8 h-8" />,
      title: "Appointment Booking",
      description: "Easy online appointment scheduling with instant confirmation",
    },
    {
      icon: <Bell className="w-8 h-8" />,
      title: "Smart Notifications",
      description: "Automated reminders and updates via email and SMS",
    },
    {
      icon: <BarChart3 className="w-8 h-8" />,
      title: "Analytics & Reports",
      description: "Comprehensive insights into hospital operations and patient flow",
    },
  ];

  const benefits = [
    {
      number: "01",
      title: "Reduce Wait Times",
      description: "Optimize patient flow with intelligent queue management",
      color: "bg-emerald-50 dark:bg-emerald-950",
      iconColor: "text-emerald-600 dark:text-emerald-400",
    },
    {
      number: "02",
      title: "Improve Patient Experience",
      description: "Keep patients informed with real-time updates and notifications",
      color: "bg-green-50 dark:bg-green-950",
      iconColor: "text-green-600 dark:text-green-400",
    },
    {
      number: "03",
      title: "Streamline Operations",
      description: "Automate administrative tasks and reduce manual workload",
      color: "bg-teal-50 dark:bg-teal-950",
      iconColor: "text-teal-600 dark:text-teal-400",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-emerald-50 dark:from-slate-950 dark:via-slate-900 dark:to-emerald-950">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-white/80 dark:bg-slate-900/80 backdrop-blur-md border-b border-slate-200 dark:border-slate-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-br from-emerald-600 to-teal-500 rounded-lg flex items-center justify-center">
                <Heart className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold bg-gradient-to-r from-emerald-600 to-teal-500 bg-clip-text text-transparent">
                  MediQueue
                </h1>
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  Hospital Management System
                </p>
              </div>
            </div>
            <nav className="hidden md:flex items-center gap-8">
              <a href="#features" className="text-sm text-slate-600 dark:text-slate-300 hover:text-emerald-600 dark:hover:text-emerald-400 transition">
                Features
              </a>
              <a href="#benefits" className="text-sm text-slate-600 dark:text-slate-300 hover:text-emerald-600 dark:hover:text-emerald-400 transition">
                Benefits
              </a>
              <a href="#cta" className="text-sm text-slate-600 dark:text-slate-300 hover:text-emerald-600 dark:hover:text-emerald-400 transition">
                Get Started
              </a>
            </nav>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-5xl lg:text-6xl font-bold text-slate-900 dark:text-white mb-6 leading-tight">
              Transform Your Hospital Operations
            </h2>
            <p className="text-xl text-slate-600 dark:text-slate-300 mb-8 leading-relaxed">
              Streamline patient queues, manage appointments efficiently, and improve healthcare delivery with our intelligent hospital management system.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
            <Link to="/register">
              <button className="bg-gradient-to-r from-emerald-600 to-teal-500 hover:from-emerald-700 hover:to-teal-600 text-white font-semibold py-3 px-8 rounded-lg transition shadow-lg hover:shadow-xl flex items-center gap-2">
                Start Free Trial
                <ArrowRight className="w-5 h-5" />
              </button>
            </Link>
            </div>
          </div>
          <div className="relative">
            <div className="bg-gradient-to-br from-emerald-100 to-teal-100 dark:from-emerald-900 dark:to-teal-900 rounded-2xl p-8 h-96 flex items-center justify-center">
              <div className="text-center">
                <Activity className="w-24 h-24 text-emerald-600 dark:text-emerald-400 mx-auto mb-4 opacity-50" />
                <p className="text-slate-600 dark:text-slate-400 text-lg font-semibold">Hospital Management Dashboard</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 bg-white dark:bg-slate-900 rounded-2xl my-10">
        <div className="text-center mb-16">
          <h3 className="text-4xl font-bold text-slate-900 dark:text-white mb-4">
            Powerful Features
          </h3>
          <p className="text-lg text-slate-600 dark:text-slate-300 max-w-2xl mx-auto">
            Everything you need to manage your hospital efficiently
          </p>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, idx) => (
            <div
              key={idx}
              className="group bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-800 dark:to-slate-900 rounded-xl p-8 border border-slate-200 dark:border-slate-700 hover:border-emerald-400 dark:hover:border-emerald-500 hover:shadow-lg transition"
            >
              <div className="p-3 bg-emerald-100 dark:bg-emerald-900 rounded-lg w-fit mb-4 group-hover:scale-110 transition">
                <span className="text-emerald-600 dark:text-emerald-400">{feature.icon}</span>
              </div>
              <h4 className="text-xl font-semibold text-slate-900 dark:text-white mb-3">
                {feature.title}
              </h4>
              <p className="text-slate-600 dark:text-slate-400">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Benefits Section */}
      <section id="benefits" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="text-center mb-16">
          <h3 className="text-4xl font-bold text-slate-900 dark:text-white mb-4">
            Why Choose MediQueue?
          </h3>
          <p className="text-lg text-slate-600 dark:text-slate-300 max-w-2xl mx-auto">
            See how our system transforms hospital operations
          </p>
        </div>
        <div className="grid lg:grid-cols-3 gap-8">
          {benefits.map((benefit, idx) => (
            <div key={idx} className="relative">
              <div className={`${benefit.color} rounded-2xl p-10 h-full`}>
                <div className={`text-6xl font-bold ${benefit.iconColor} mb-6 opacity-20`}>
                  {benefit.number}
                </div>
                <h4 className="text-2xl font-bold text-slate-900 dark:text-white mb-3">
                  {benefit.title}
                </h4>
                <p className="text-slate-700 dark:text-slate-300 text-lg">
                  {benefit.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* How It Works */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="text-center mb-16">
          <h3 className="text-4xl font-bold text-slate-900 dark:text-white mb-4">
            How It Works
          </h3>
        </div>
        <div className="grid md:grid-cols-4 gap-8">
          {[
            {
              step: "1",
              title: "Patient Registration",
              description: "Patients sign up with basic information",
            },
            {
              step: "2",
              title: "Book Appointment",
              description: "Choose doctor and preferred time slot",
            },
            {
              step: "3",
              title: "Queue Management",
              description: "Track your position in real-time",
            },
            {
              step: "4",
              title: "Consultation",
              description: "Get notified when it's your turn",
            },
          ].map((item, idx) => (
            <div key={idx} className="text-center">
              <div className="w-16 h-16 bg-gradient-to-br from-emerald-600 to-teal-500 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg">
                <span className="text-2xl font-bold text-white">{item.step}</span>
              </div>
              <h4 className="text-xl font-semibold text-slate-900 dark:text-white mb-2">
                {item.title}
              </h4>
              <p className="text-slate-600 dark:text-slate-400">
                {item.description}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Stats Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {[
            { label: "Hospitals", value: "50+" },
            { label: "Daily Users", value: "10K+" },
            { label: "Appointments", value: "100K+" },
            { label: "Uptime", value: "99.9%" },
          ].map((stat, idx) => (
            <div key={idx} className="text-center p-6 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 hover:shadow-lg transition">
              <p className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-emerald-600 to-teal-500 bg-clip-text text-transparent mb-2">
                {stat.value}
              </p>
              <p className="text-slate-600 dark:text-slate-400 font-semibold">
                {stat.label}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section id="cta" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="bg-gradient-to-r from-emerald-600 to-teal-500 rounded-2xl p-8 md:p-16 text-center shadow-2xl">
          <h3 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Ready to Revolutionize Your Hospital?
          </h3>
          <p className="text-emerald-100 mb-8 max-w-2xl mx-auto text-lg">
            Join hospitals worldwide using MediQueue to improve patient experience and operational efficiency.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/register">
            <button className="bg-white text-emerald-600 hover:bg-emerald-50 font-semibold py-3 px-10 rounded-lg transition shadow-lg hover:shadow-xl">
              Start Free Trial
            </button>
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 py-12 mt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            <div>
              <h5 className="font-semibold text-slate-900 dark:text-white mb-4">Product</h5>
              <ul className="space-y-2 text-sm text-slate-600 dark:text-slate-400">
                <li><a href="#" className="hover:text-emerald-600 dark:hover:text-emerald-400">Features</a></li>
                <li><a href="#" className="hover:text-emerald-600 dark:hover:text-emerald-400">Pricing</a></li>
                <li><a href="#" className="hover:text-emerald-600 dark:hover:text-emerald-400">Security</a></li>
              </ul>
            </div>
            <div>
              <h5 className="font-semibold text-slate-900 dark:text-white mb-4">Company</h5>
              <ul className="space-y-2 text-sm text-slate-600 dark:text-slate-400">
                <li><a href="#" className="hover:text-emerald-600 dark:hover:text-emerald-400">About</a></li>
                <li><a href="#" className="hover:text-emerald-600 dark:hover:text-emerald-400">Blog</a></li>
                <li><a href="#" className="hover:text-emerald-600 dark:hover:text-emerald-400">Careers</a></li>
              </ul>
            </div>
            <div>
              <h5 className="font-semibold text-slate-900 dark:text-white mb-4">Resources</h5>
              <ul className="space-y-2 text-sm text-slate-600 dark:text-slate-400">
                <li><a href="#" className="hover:text-emerald-600 dark:hover:text-emerald-400">Documentation</a></li>
                <li><a href="#" className="hover:text-emerald-600 dark:hover:text-emerald-400">API</a></li>
                <li><a href="#" className="hover:text-emerald-600 dark:hover:text-emerald-400">Support</a></li>
              </ul>
            </div>
            <div>
              <h5 className="font-semibold text-slate-900 dark:text-white mb-4">Legal</h5>
              <ul className="space-y-2 text-sm text-slate-600 dark:text-slate-400">
                <li><a href="#" className="hover:text-emerald-600 dark:hover:text-emerald-400">Privacy</a></li>
                <li><a href="#" className="hover:text-emerald-600 dark:hover:text-emerald-400">Terms</a></li>
                <li><a href="#" className="hover:text-emerald-600 dark:hover:text-emerald-400">Contact</a></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-slate-200 dark:border-slate-700 pt-8 flex flex-col md:flex-row justify-between items-center">
            <p className="text-sm text-slate-600 dark:text-slate-400">
              © 2026 MediQueue. All rights reserved.
            </p>
            <div className="flex gap-6 mt-4 md:mt-0">
              <a href="#" className="text-slate-600 dark:text-slate-400 hover:text-emerald-600 dark:hover:text-emerald-400">Twitter</a>
              <a href="#" className="text-slate-600 dark:text-slate-400 hover:text-emerald-600 dark:hover:text-emerald-400">GitHub</a>
              <a href="#" className="text-slate-600 dark:text-slate-400 hover:text-emerald-600 dark:hover:text-emerald-400">LinkedIn</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};
