import Link from "next/link";
import React from "react";
import { FaGithub, FaLinkedinIn } from "react-icons/fa";
import { HiOutlineMail } from "react-icons/hi";

const Footer = () => {
  const year = new Date().getFullYear();

  return (
    <footer className="mt-16 border-t border-gray-200/80 dark:border-gray-700/70 bg-white/60 dark:bg-white/5 backdrop-blur-sm">
      <div className="w-[92%] 800px:w-[85%] mx-auto py-10 md:py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-10">
          <div>
            <h3 className="text-[22px] font-Poppins font-bold text-slate-800 dark:text-slate-100">
              ZyLO Learning
            </h3>
            <p className="mt-3 text-[14px] leading-relaxed text-slate-600 dark:text-slate-300">
              Build real-world skills with project-based learning, expert guidance,
              and a community that supports your growth.
            </p>
          </div>

          <div>
            <h4 className="text-[16px] font-semibold text-slate-800 dark:text-slate-100">Quick Links</h4>
            <ul className="mt-3 space-y-2 text-[14px] text-slate-600 dark:text-slate-300">
              <li>
                <Link href="/" className="hover:text-purple-600 dark:hover:text-purple-400 transition-colors duration-200">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/courses" className="hover:text-purple-600 dark:hover:text-purple-400 transition-colors duration-200">
                  Courses
                </Link>
              </li>
              <li>
                <Link href="/faq" className="hover:text-purple-600 dark:hover:text-purple-400 transition-colors duration-200">
                  FAQ
                </Link>
              </li>
              <li>
                <Link href="/profile" className="hover:text-purple-600 dark:hover:text-purple-400 transition-colors duration-200">
                  Profile
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-[16px] font-semibold text-slate-800 dark:text-slate-100">Contact</h4>
            <ul className="mt-3 space-y-2 text-[14px] text-slate-600 dark:text-slate-300">
              <li>Email: support@zylolearning.com</li>
              <li>Mon - Sat: 9:00 AM - 6:00 PM</li>
              <li>Remote-first learning platform</li>
            </ul>
          </div>

          <div>
            <h4 className="text-[16px] font-semibold text-slate-800 dark:text-slate-100">Connect</h4>
            <div className="mt-4 flex items-center gap-3">
              <a
                href="https://github.com"
                target="_blank"
                rel="noreferrer"
                aria-label="GitHub"
                className="h-10 w-10 rounded-full border border-gray-300 dark:border-gray-700 flex items-center justify-center text-slate-700 dark:text-slate-200 hover:text-white hover:bg-purple-600 dark:hover:bg-purple-500 hover:border-purple-600 dark:hover:border-purple-500 transition-all duration-200"
              >
                <FaGithub size={18} />
              </a>

              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noreferrer"
                aria-label="LinkedIn"
                className="h-10 w-10 rounded-full border border-gray-300 dark:border-gray-700 flex items-center justify-center text-slate-700 dark:text-slate-200 hover:text-white hover:bg-purple-600 dark:hover:bg-purple-500 hover:border-purple-600 dark:hover:border-purple-500 transition-all duration-200"
              >
                <FaLinkedinIn size={18} />
              </a>

              <a
                href="mailto:support@zylolearning.com"
                aria-label="Email"
                className="h-10 w-10 rounded-full border border-gray-300 dark:border-gray-700 flex items-center justify-center text-slate-700 dark:text-slate-200 hover:text-white hover:bg-purple-600 dark:hover:bg-purple-500 hover:border-purple-600 dark:hover:border-purple-500 transition-all duration-200"
              >
                <HiOutlineMail size={20} />
              </a>
            </div>
          </div>
        </div>

        <div className="mt-8 border-t border-gray-200/80 dark:border-gray-700/70 pt-5 flex flex-col sm:flex-row items-center justify-between gap-3 text-[13px] text-slate-500 dark:text-slate-400">
          <p>© {year} ZyLO Learning. All rights reserved.</p>
          <p>Made with focus, code, and consistency.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;