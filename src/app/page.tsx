"use client";

import Link from 'next/link';
import { ArrowRightIcon, CheckCircleIcon, ChartBarIcon, DocumentTextIcon, RocketLaunchIcon } from '@heroicons/react/24/outline';

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-indigo-50 via-white to-blue-50 overflow-hidden">
        <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>
        <div className="max-w-7xl mx-auto py-20 px-4 sm:px-6 lg:px-8 relative">
          <div className="text-center">
            <div className="inline-flex items-center px-4 py-2 rounded-full bg-indigo-100 text-indigo-700 mb-6 animate-fade-in">
              <RocketLaunchIcon className="h-5 w-5 mr-2" />
              <span className="text-sm font-medium">Your Job Search Journey Starts Here</span>
            </div>
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-extrabold text-gray-900 tracking-tight mb-6 animate-slide-up">
              <span className="block">Streamline Your</span>
              <span className="block bg-gradient-to-r from-indigo-600 to-blue-600 bg-clip-text text-transparent">Job Search Journey</span>
            </h1>
            <p className="mt-3 max-w-2xl mx-auto text-xl text-gray-600 sm:text-2xl md:mt-5 animate-fade-in-delay">
              Track applications, prepare for interviews, and analyze your progress - all in one place.
            </p>
            <div className="mt-8 max-w-md mx-auto sm:flex sm:justify-center md:mt-8 gap-4 animate-slide-up-delay">
              <Link
                href="/signup"
                className="w-full sm:w-auto flex items-center justify-center px-8 py-4 border border-transparent text-base font-medium rounded-xl text-white bg-indigo-600 hover:bg-indigo-700 shadow-lg hover:shadow-xl transition-all duration-200"
              >
                Get Started Free
                <ArrowRightIcon className="ml-2 h-5 w-5" />
              </Link>
              <Link
                href="/login"
                className="mt-3 sm:mt-0 w-full sm:w-auto flex items-center justify-center px-8 py-4 border-2 border-indigo-600 text-base font-medium rounded-xl text-indigo-600 bg-white hover:bg-indigo-50 transition-all duration-200"
              >
                Sign In
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-base text-indigo-600 font-semibold tracking-wide uppercase">Features</h2>
            <p className="mt-2 text-3xl leading-8 font-extrabold tracking-tight text-gray-900 sm:text-4xl">
              Everything you need to succeed
            </p>
            <p className="mt-4 max-w-2xl mx-auto text-xl text-gray-500">
              Powerful tools to help you land your dream job
            </p>
          </div>

          <div className="mt-10">
            <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
              {/* Application Tracker */}
              <div className="relative group">
                <div className="absolute -inset-0.5 bg-gradient-to-r from-indigo-500 to-blue-500 rounded-2xl blur opacity-25 group-hover:opacity-75 transition duration-200"></div>
                <div className="relative bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition duration-200">
                  <div className="flex items-center justify-center h-12 w-12 rounded-xl bg-indigo-100 text-indigo-600 mb-6">
                    <DocumentTextIcon className="h-6 w-6" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-4">Smart Application Tracker</h3>
                  <p className="text-gray-600">
                    Keep track of all your applications, interviews, and offers in one place. Never miss a follow-up or deadline again.
                  </p>
                </div>
              </div>

              {/* Tech Prep */}
              <div className="relative group">
                <div className="absolute -inset-0.5 bg-gradient-to-r from-indigo-500 to-blue-500 rounded-2xl blur opacity-25 group-hover:opacity-75 transition duration-200"></div>
                <div className="relative bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition duration-200">
                  <div className="flex items-center justify-center h-12 w-12 rounded-xl bg-indigo-100 text-indigo-600 mb-6">
                    <RocketLaunchIcon className="h-6 w-6" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-4">Technical Interview Prep</h3>
                  <p className="text-gray-600">
                    Access 150 NeetCode problems with spaced repetition learning. Master the most common interview questions.
                  </p>
                </div>
              </div>

              {/* Analytics */}
              <div className="relative group">
                <div className="absolute -inset-0.5 bg-gradient-to-r from-indigo-500 to-blue-500 rounded-2xl blur opacity-25 group-hover:opacity-75 transition duration-200"></div>
                <div className="relative bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition duration-200">
                  <div className="flex items-center justify-center h-12 w-12 rounded-xl bg-indigo-100 text-indigo-600 mb-6">
                    <ChartBarIcon className="h-6 w-6" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-4">Analytics Dashboard</h3>
                  <p className="text-gray-600">
                    Track your progress with detailed analytics and insights. Make data-driven decisions in your job search.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-base text-indigo-600 font-semibold tracking-wide uppercase">Testimonials</h2>
            <p className="mt-2 text-3xl leading-8 font-extrabold tracking-tight text-gray-900 sm:text-4xl">
              Loved by job seekers
            </p>
          </div>

          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
            {/* Testimonial 1 */}
            <div className="bg-white p-8 rounded-2xl shadow-lg">
              <div className="flex items-center mb-4">
                <div className="h-12 w-12 rounded-full bg-indigo-100 flex items-center justify-center">
                  <span className="text-indigo-600 font-bold">JD</span>
                </div>
                <div className="ml-4">
                  <h4 className="text-lg font-bold text-gray-900">John Doe</h4>
                  <p className="text-gray-600">Software Engineer</p>
                </div>
              </div>
              <p className="text-gray-600">
                "ApplyFlow helped me track my applications and prepare for interviews. I landed my dream job at a top tech company!"
              </p>
            </div>

            {/* Testimonial 2 */}
            <div className="bg-white p-8 rounded-2xl shadow-lg">
              <div className="flex items-center mb-4">
                <div className="h-12 w-12 rounded-full bg-indigo-100 flex items-center justify-center">
                  <span className="text-indigo-600 font-bold">AS</span>
                </div>
                <div className="ml-4">
                  <h4 className="text-lg font-bold text-gray-900">Alice Smith</h4>
                  <p className="text-gray-600">Product Manager</p>
                </div>
              </div>
              <p className="text-gray-600">
                "The technical interview prep section is gold! I was able to practice and track my progress effectively."
              </p>
            </div>

            {/* Testimonial 3 */}
            <div className="bg-white p-8 rounded-2xl shadow-lg">
              <div className="flex items-center mb-4">
                <div className="h-12 w-12 rounded-full bg-indigo-100 flex items-center justify-center">
                  <span className="text-indigo-600 font-bold">RJ</span>
                </div>
                <div className="ml-4">
                  <h4 className="text-lg font-bold text-gray-900">Robert Johnson</h4>
                  <p className="text-gray-600">Data Scientist</p>
                </div>
              </div>
              <p className="text-gray-600">
                "The analytics dashboard gives me great insights into my job search progress. Highly recommended!"
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-br from-indigo-600 to-blue-600">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-extrabold text-white sm:text-4xl">
            Ready to streamline your job search?
          </h2>
          <p className="mt-4 text-xl text-indigo-100">
            Join thousands of job seekers who have already improved their job search process.
          </p>
          <div className="mt-8 flex justify-center">
            <Link
              href="/signup"
              className="inline-flex items-center px-8 py-4 border border-transparent text-base font-medium rounded-xl text-indigo-600 bg-white hover:bg-indigo-50 shadow-lg hover:shadow-xl transition-all duration-200"
            >
              Get Started Free
              <ArrowRightIcon className="ml-2 h-5 w-5" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
