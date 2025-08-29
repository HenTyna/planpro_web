// RootLayout.tsx
import React, { useState } from 'react';
import Sidebar from './Sidebar';
import NavBar from './Navbar';

interface RootLayoutProps {
    children: React.ReactNode;
}

function RootLayout({ children }: RootLayoutProps) {
    const [sidebarOpen, setSidebarOpen] = useState(true);

    return (
        <div className="w-full flex flex-col min-h-screen max-h-screen overflow-x-hidden">
            {/* Sidebar */}
            <Sidebar isOpen={sidebarOpen} setIsOpen={setSidebarOpen} />

            {/* Main content area with navbar and children */}
            <div
                className="flex flex-col transition-all duration-300 "
                style={{
                    marginLeft: sidebarOpen ? '16rem' : '5rem',
                    background: "white"
                }}
            >
                {/* Navbar */}
                {/* <NavBar 
                    toggleSidebar={() => setSidebarOpen(!sidebarOpen)} 
                    isDarkMode={false} 
                    currentTheme={{
                        color: '',
                        ring: '',
                        name: '',
                        gradient: ''
                    }}
                /> */}

                {/* Page content */}
                <main className="flex-grow">
                    {children}
                </main>
            </div>
        </div>
    );
}

export default RootLayout;