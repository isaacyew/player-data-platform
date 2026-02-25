import React from 'react';
import { Search } from 'lucide-react';
import TopBar from './TopBar';
import Sidebar from './Sidebar';
import { usePlayer } from '../../context/PlayerContext';
import { useAuth } from '../../context/AuthContext';

const LoginModal = () => {
    const { login } = useAuth();

    const handleSubmit = (e) => {
        e.preventDefault();
        login();
    };

    return (
        <div className="fixed inset-0 bg-slate-900/20 dark:bg-black/50 backdrop-blur-md flex items-center justify-center z-50 transition-colors duration-200">
            <div className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-2xl p-8 max-w-md w-full mx-4 shadow-2xl transition-colors duration-200">
                {/* Logo */}
                <div className="text-center mb-8">
                    <div className="text-2xl font-bold mb-2">
                        <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">PDP</span>
                        <span className="text-slate-400 mx-2">|</span>
                        <span className="text-slate-700 dark:text-slate-300">Player Data Platform</span>
                    </div>
                    <p className="text-slate-500 dark:text-slate-400 text-sm">Sign in to access the Player Data Platform</p>
                </div>

                {/* Sign In */}
                <form onSubmit={handleSubmit}>
                    <button
                        type="submit"
                        className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white rounded-lg py-3 font-medium transition-all shadow-lg shadow-blue-500/20"
                    >
                        Sign In
                    </button>
                </form>
            </div>
        </div>
    );
};

const LandingPage = () => {
    return (
        <div className="flex-1 flex items-center justify-center min-h-[calc(100vh-4rem)]">
            <div className="text-center max-w-xl px-6">
                <div className="w-20 h-20 bg-blue-50 dark:bg-blue-900/20 rounded-full flex items-center justify-center mx-auto mb-6 border border-blue-100 dark:border-blue-800 transition-colors">
                    <Search className="w-10 h-10 text-blue-600 dark:text-blue-400" />
                </div>
                <h1 className="text-3xl font-bold text-slate-900 dark:text-white mb-4">
                    Player Data Platform
                </h1>
                <p className="text-slate-500 dark:text-slate-400 mb-6">
                    Search for a player by their Player ID, Username, or Email to view their account information and game data.
                </p>
                <div className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl p-6 text-left shadow-sm transition-colors">
                    <h3 className="text-sm font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-3">
                        Demo Account
                    </h3>
                    <div className="space-y-2 text-sm">
                        <div className="flex justify-between">
                            <span className="text-slate-500 dark:text-slate-400">Username:</span>
                            <span className="text-slate-900 dark:text-slate-200 font-mono">DragonSlayer99</span>
                        </div>
                        <div className="flex justify-between">
                            <span className="text-slate-500 dark:text-slate-400">Email:</span>
                            <span className="text-slate-900 dark:text-slate-200 font-mono">test@playersupport.com</span>
                        </div>
                        <div className="flex justify-between">
                            <span className="text-slate-500 dark:text-slate-400">UID:</span>
                            <span className="text-slate-900 dark:text-slate-200 font-mono">8829-3920-1102</span>
                        </div>
                    </div>
                </div>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-4">
                    Use the search bar above to search for this demo account
                </p>
            </div>
        </div>
    );
};

const Layout = ({ children }) => {
    const { isPlayerLoaded } = usePlayer();
    const { isAuthenticated } = useAuth();

    return (
        <div className="min-h-screen bg-slate-50 dark:bg-slate-900 text-slate-900 dark:text-slate-100 font-sans selection:bg-blue-100 dark:selection:bg-blue-900 transition-colors duration-200">
            {/* Login Modal - shows when not authenticated */}
            {!isAuthenticated && <LoginModal />}

            <TopBar />
            <div className="flex">
                {isPlayerLoaded ? (
                    <>
                        <Sidebar />
                        <main className="flex-1 p-8 overflow-x-hidden">
                            <div className="max-w-7xl mx-auto space-y-6">
                                {children}
                            </div>
                        </main>
                    </>
                ) : (
                    <LandingPage />
                )}
            </div>
        </div>
    );
};

export default Layout;
