import React, { useState } from 'react';
import {
    User,
    Gamepad2,
    Coins,
    CreditCard,
    Tv,
    FileTerminal,
    ShieldCheck,
    ChevronDown,
    ChevronRight,
    ChevronLeft
} from 'lucide-react';
import { useNavigate, useLocation } from 'react-router-dom';

const SidebarItem = ({ icon: Icon, label, active, hasSubmenu, expanded, onClick, collapsed }) => {
    return (
        <button
            onClick={onClick}
            title={collapsed ? label : undefined}
            className={`w-full flex items-center justify-between px-4 py-3 text-sm font-medium transition-colors
        ${active
                    ? 'bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 border-r-2 border-blue-500'
                    : 'text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800 hover:text-slate-900 dark:hover:text-slate-200'
                }`}
        >
            <div className={`flex items-center ${collapsed ? 'justify-center w-full' : 'gap-3'}`}>
                <Icon className={`w-5 h-5 ${active ? 'text-blue-600 dark:text-blue-400' : 'text-slate-500 dark:text-slate-500'}`} />
                {!collapsed && <span>{label}</span>}
            </div>
            {!collapsed && hasSubmenu && (
                expanded ? <ChevronDown className="w-4 h-4" /> : <ChevronRight className="w-4 h-4" />
            )}
        </button>
    );
};

const Sidebar = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const [expandedSection, setExpandedSection] = useState('account');
    const [isCollapsed, setIsCollapsed] = useState(false);

    const toggleSection = (section) => {
        setExpandedSection(expandedSection === section ? null : section);
    };

    const handleNavigation = (path) => {
        navigate(path);
    };

    const isActive = (path) => location.pathname === path;

    const toggleSidebar = () => {
        setIsCollapsed(!isCollapsed);
    };

    return (
        <div className="relative">
            <div className={`${isCollapsed ? 'w-16' : 'w-64'} bg-white dark:bg-slate-900 border-r border-slate-200 dark:border-slate-800 h-[calc(100vh-4rem)] overflow-y-auto overflow-x-hidden sticky top-16 transition-all duration-300`}>
                <div className="pt-4 pb-4">
                    {/* Header section with more space for the toggle button */}
                    <div className="h-10 flex items-center">
                        {!isCollapsed && (
                            <div className="px-4 text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider">
                                Player Data
                            </div>
                        )}
                    </div>

                    {/* Menu items */}
                    <div className="mt-2">
                        <SidebarItem
                            icon={User}
                            label="Core Account Info"
                            active={isActive('/account') || isActive('/')}
                            onClick={() => handleNavigation('/account')}
                            collapsed={isCollapsed}
                        />

                        <SidebarItem
                            icon={Gamepad2}
                            label="Game Progress"
                            active={isActive('/progress')}
                            onClick={() => handleNavigation('/progress')}
                            collapsed={isCollapsed}
                        />

                        <SidebarItem
                            icon={Coins}
                            label="Currency & Inventory"
                            active={isActive('/currency')}
                            onClick={() => handleNavigation('/currency')}
                            collapsed={isCollapsed}
                        />

                        <SidebarItem
                            icon={CreditCard}
                            label="Purchase History"
                            active={isActive('/history')}
                            onClick={() => handleNavigation('/history')}
                            collapsed={isCollapsed}
                        />

                        <SidebarItem
                            icon={Tv}
                            label="Ads & Rewards"
                            active={isActive('/ads')}
                            onClick={() => handleNavigation('/ads')}
                            collapsed={isCollapsed}
                        />

                        <SidebarItem
                            icon={FileTerminal}
                            label="Technical Logs"
                            active={isActive('/logs')}
                            onClick={() => handleNavigation('/logs')}
                            collapsed={isCollapsed}
                        />

                        <SidebarItem
                            icon={ShieldCheck}
                            label="Admin Panel"
                            active={isActive('/admin')}
                            onClick={() => handleNavigation('/admin')}
                            collapsed={isCollapsed}
                        />
                    </div>
                </div>
            </div>

            {/* Collapse Toggle Button - Positioned on the right border, in the header area */}
            <button
                onClick={toggleSidebar}
                className={`absolute top-8 z-10 w-7 h-7 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg flex items-center justify-center text-slate-400 hover:text-slate-900 dark:hover:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-800 transition-all duration-300 shadow-sm ${isCollapsed ? 'left-[52px]' : 'left-[252px]'}`}
                style={{ transform: 'translateX(-50%)' }}
                title={isCollapsed ? 'Expand sidebar' : 'Collapse sidebar'}
            >
                {isCollapsed ? (
                    <ChevronRight className="w-4 h-4" />
                ) : (
                    <ChevronLeft className="w-4 h-4" />
                )}
            </button>
        </div>
    );
};

export default Sidebar;
