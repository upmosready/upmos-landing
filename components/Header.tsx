'use client';

import { useState } from 'react';
import Link from 'next/link';

interface MenuItem {
  id: number;
  title: string;
  url: string;
  children?: MenuItem[];
}

export default function Header() {
  const [openDropdown, setOpenDropdown] = useState<number | null>(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const menuItems: MenuItem[] = [
    { id: 1, title: 'Home', url: '/' },
    {
      id: 2,
      title: 'Shop',
      url: '/shop',
      children: [
        { id: 21, title: 'Electronics', url: '/shop/electronics' },
        { id: 22, title: 'Fashion', url: '/shop/fashion' },
        { id: 23, title: 'Home & Garden', url: '/shop/home-garden' },
      ],
    },
    {
      id: 3,
      title: 'Vendors',
      url: '/vendors',
      children: [
        { id: 31, title: 'Become a Vendor', url: '/vendor-register' },
        { id: 32, title: 'Vendor Dashboard', url: '/vendor-dashboard' },
      ],
    },
    { id: 4, title: 'About', url: '/about' },
    { id: 5, title: 'Contact', url: '/contact' },
  ];

  return (
    <header id="upmos-header" className="bg-slate-900 text-white shadow-lg sticky top-0 z-50">
      <nav className="container mx-auto px-4 py-4">
        <div className="flex justify-between items-center">
          {/* Logo */}
          <Link
            href="/"
            className="text-2xl font-bold text-white hover:text-blue-400 transition-colors duration-200"
          >
            UPMOS
          </Link>

          {/* Desktop Navigation */}
          <ul className="hidden md:flex gap-8 items-center">
            {menuItems.map((item) => (
              <li
                key={item.id}
                className="relative"
                onMouseEnter={() => item.children && setOpenDropdown(item.id)}
                onMouseLeave={() => setOpenDropdown(null)}
              >
                <Link
                  href={item.url}
                  className="text-white hover:text-blue-400 transition-colors duration-200 flex items-center gap-1"
                >
                  {item.title}
                  {item.children && (
                    <svg
                      className="w-4 h-4"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M19 9l-7 7-7-7"
                      />
                    </svg>
                  )}
                </Link>

                {/* Dropdown Menu */}
                {item.children && openDropdown === item.id && (
                  <ul className="absolute top-full left-0 mt-2 bg-white text-slate-900 rounded-lg shadow-xl min-w-[200px] py-2">
                    {item.children.map((child) => (
                      <li key={child.id}>
                        <Link
                          href={child.url}
                          className="block px-4 py-2 hover:bg-blue-50 hover:text-blue-600 transition-colors duration-200"
                        >
                          {child.title}
                        </Link>
                      </li>
                    ))}
                  </ul>
                )}
              </li>
            ))}
          </ul>

          {/* User Actions */}
          <div className="hidden md:flex gap-4 items-center">
            <Link
              href="/cart"
              className="text-white hover:text-blue-400 transition-colors duration-200 flex items-center gap-2"
            >
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
                />
              </svg>
              Cart
            </Link>
            <Link
              href="/my-account"
              className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors duration-200"
            >
              My Account
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden text-white"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle mobile menu"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {mobileMenuOpen ? (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              ) : (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              )}
            </svg>
          </button>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden mt-4 pb-4 border-t border-slate-700 pt-4">
            <ul className="space-y-2">
              {menuItems.map((item) => (
                <li key={item.id}>
                  <Link
                    href={item.url}
                    className="block text-white hover:text-blue-400 transition-colors duration-200 py-2"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    {item.title}
                  </Link>
                  {item.children && (
                    <ul className="ml-4 mt-2 space-y-1">
                      {item.children.map((child) => (
                        <li key={child.id}>
                          <Link
                            href={child.url}
                            className="block text-slate-300 hover:text-blue-400 transition-colors duration-200 py-1"
                            onClick={() => setMobileMenuOpen(false)}
                          >
                            {child.title}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  )}
                </li>
              ))}
              <li className="pt-4 border-t border-slate-700">
                <Link
                  href="/cart"
                  className="block text-white hover:text-blue-400 transition-colors duration-200 py-2"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Cart
                </Link>
              </li>
              <li>
                <Link
                  href="/my-account"
                  className="block bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors duration-200 text-center"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  My Account
                </Link>
              </li>
            </ul>
          </div>
        )}
      </nav>
    </header>
  );
}
