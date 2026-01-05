"use client";

import { ReactNode, useState } from 'react';
import Link from 'next/link';
import {
    BookOpen,
    User,
    Bell,
    LogOut,
    LayoutDashboard,
    Menu,
    ChevronLeft,
    ChevronRight
} from 'lucide-react';

export default function DashboardLayout({ children }: { children: ReactNode }) {
    const [isPinned, setIsPinned] = useState(true);
    const [isHovered, setIsHovered] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false); // Mobile & Tablet Drawer
    const [ignoreHover, setIgnoreHover] = useState(false);

    // Sidebar Logic:
    // 1. Mobile/Tablet (< lg): Controlled by isMobileMenuOpen.
    // 2. Desktop (>= lg): Controlled by isPinned + Hover logic.
    const isExpanded = isPinned || (isHovered && !ignoreHover);

    const handleToggle = () => {
        if (isPinned) {
            setIsPinned(false);
            setIgnoreHover(true);
        } else {
            setIsPinned(true);
            setIgnoreHover(false);
        }
    };

    return (
        <div className="flex h-screen bg-gray-100 overflow-hidden">

            {/* ------------------------------------------------ */}
            {/* BACKDROP OVERLAY */}
            {/* Visible on Mobile (< md) AND Tablet (< lg) when menu is open */}
            {/* ------------------------------------------------ */}
            {isMobileMenuOpen && (
                <div
                    className="fixed inset-0 z-[99] bg-black/50 lg:hidden"
                    onClick={() => setIsMobileMenuOpen(false)}
                />
            )}

            {/* ------------------------------------------------ */}
            {/* SIDEBAR */}
            {/* Changed 'md:relative' to 'lg:relative' */}
            {/* ------------------------------------------------ */}
            <aside
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => { setIsHovered(false); setIgnoreHover(false); }}
                className={`
                    fixed lg:relative z-[100] h-full bg-white border-r border-gray-200 
                    transition-all duration-300 ease-in-out flex flex-col
                    
                    /* MOBILE & TABLET BEHAVIOR (< lg) */
                    ${isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
                    
                    /* DESKTOP BEHAVIOR (>= lg) */
                    ${isExpanded ? 'lg:w-64' : 'lg:w-20'} 
                `}
            >
                {/* Header / Logo */}
                <div className="h-16 flex items-center justify-between px-4 border-b border-gray-200">
                    <h2 className={`
                        text-2xl font-bold text-indigo-600 transition-opacity duration-200 whitespace-nowrap
                        /* Only show text if expanded on Desktop, or always on Mobile/Tablet if menu is open */
                        ${isExpanded ? 'opacity-100' : 'opacity-0 hidden lg:block'}
                    `}>
                        EduTech
                    </h2>

                    {/* Desktop Toggle Button (Only visible on Large Screens) */}
                    <button
                        onClick={handleToggle}
                        className="hidden lg:flex p-1.5 rounded-lg bg-gray-50 hover:bg-gray-200 text-gray-600"
                    >
                        {isPinned ? <ChevronLeft size={20} /> : <ChevronRight size={20} />}
                    </button>

                    {/* Mobile/Tablet Close Button */}
                    <button
                        onClick={() => setIsMobileMenuOpen(false)}
                        className="lg:hidden p-1 text-gray-600"
                    >
                        <ChevronLeft size={24} />
                    </button>
                </div>

                {/* Navigation Items */}
                <nav className="flex-1 p-4 space-y-2 overflow-x-hidden">
                    {/* On Mobile/Tablet, we always show full labels because it's a drawer. 
                        On Desktop, we check 'isExpanded' */}
                    <NavItem href="/dashboard" icon={<LayoutDashboard size={20} />} label="Overview" showLabel={true} isDesktopExpanded={isExpanded} />
                    <NavItem href="/my-courses" icon={<BookOpen size={20} />} label="My Learning" showLabel={true} isDesktopExpanded={isExpanded} />
                    <NavItem href="/profile" icon={<User size={20} />} label="My Profile" showLabel={true} isDesktopExpanded={isExpanded} />
                    <NavItem href="/messages" icon={<Bell size={20} />} label="Admin Messages" showLabel={true} isDesktopExpanded={isExpanded} />
                </nav>

                {/* Footer */}
                <div className="p-4 border-t border-gray-200">
                    <button className="flex items-center gap-3 w-full px-2 py-2 text-gray-600 hover:bg-red-50 hover:text-red-600 rounded-lg transition-colors whitespace-nowrap">
                        <LogOut size={20} className="min-w-[20px]" />
                        <span className={`transition-opacity duration-200 ${isExpanded ? 'opacity-100' : 'opacity-0 w-0 overflow-hidden lg:block hidden'}`}>
                            Sign Out
                        </span>
                    </button>
                </div>
            </aside>

            {/* ------------------------------------------------ */}
            {/* MAIN CONTENT */}
            {/* ------------------------------------------------ */}
            <main className="flex-1 flex flex-col h-screen overflow-hidden relative">

                {/* Header (Visible on Mobile AND Tablet now) */}
                <header className="lg:hidden h-16 bg-white border-b border-gray-200 flex items-center px-4 shrink-0">
                    <button
                        onClick={() => setIsMobileMenuOpen(true)}
                        className="p-2 -ml-2 text-gray-700 hover:bg-gray-100 rounded-lg"
                    >
                        <Menu size={24} />
                    </button>
                    <span className="ml-4 text-xl font-bold text-indigo-600">EduTech</span>
                </header>

                <div className="flex-1 overflow-y-auto p-4 md:p-8">
                    {children}
                </div>
            </main>
        </div>
    );
}

function NavItem({ href, icon, label, showLabel, isDesktopExpanded }: any) {
    return (
        <Link
            href={href}
            className="flex items-center gap-3 px-2 py-3 text-gray-700 hover:bg-indigo-50 hover:text-indigo-600 rounded-lg transition-colors font-medium whitespace-nowrap"
        >
            <div className="min-w-[20px]">{icon}</div>
            {/* Label Logic: 
                - On Mobile/Tablet (lg:hidden): Always show label (opacity-100)
                - On Desktop (lg:block): Fade in/out based on isDesktopExpanded
            */}
            <span className={`
                transition-all duration-200 origin-left
                block lg:hidden opacity-100
            `}>
                {label}
            </span>
            <span className={`
                transition-all duration-200 origin-left
                hidden lg:block
                ${isDesktopExpanded ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-5 w-0 overflow-hidden'}
            `}>
                {label}
            </span>
        </Link>
    );
}