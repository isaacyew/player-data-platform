import React, { useState } from 'react';
import {
    User, Mail, Calendar, MapPin, Smartphone, Globe,
    AlertTriangle, Shield, CheckCircle, XCircle, X, ChevronDown, FileText, Search, Filter
} from 'lucide-react';

const AccountPage = () => {
    // Search and Filter State for Support Actions
    const [actionSearchQuery, setActionSearchQuery] = useState('');
    const [actionFilterColumn, setActionFilterColumn] = useState('all');
    const [showActionFilterDropdown, setShowActionFilterDropdown] = useState(false);

    // Support Action Logs State
    const [supportActions, setSupportActions] = useState([
        {
            id: 1,
            timestamp: '2023-11-20 09:15:00',
            agentEmail: 'i.yew@playersupport.com',
            actionTaken: 'Reset Password',
            ticketId: '12345',
            actionNote: 'User account compromised'
        },
        {
            id: 2,
            timestamp: '2023-11-18 14:30:00',
            agentEmail: 's.connor@playersupport.com',
            actionTaken: 'Grant Compensation → Type: "Coins", Amount: 5000',
            ticketId: '12298',
            actionNote: 'Lost progress after server error'
        },
        {
            id: 4,
            timestamp: '2023-11-12 16:45:00',
            agentEmail: 'i.yew@playersupport.com',
            actionTaken: 'Grant Compensation → Type: "Lives/Energy", Amount: 10',
            ticketId: '12089',
            actionNote: 'Game crashed during event'
        },
        {
            id: 6,
            timestamp: '2023-11-08 13:22:00',
            agentEmail: 's.connor@playersupport.com',
            actionTaken: 'Grant Compensation → Type: "Boosters", Amount: 3',
            ticketId: '11854',
            actionNote: 'Boosters not applied correctly'
        },
        {
            id: 8,
            timestamp: '2023-11-02 15:10:00',
            agentEmail: 'i.yew@playersupport.com',
            actionTaken: 'Grant Compensation → Type: "Event Currency", Amount: 500',
            ticketId: '11650',
            actionNote: 'Event rewards not delivered'
        },
        {
            id: 9,
            timestamp: '2023-10-28 11:45:00',
            agentEmail: 'j.smith@playersupport.com',
            actionTaken: 'Reset Password',
            ticketId: '11502',
            actionNote: 'User forgot password'
        }
    ]);

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <h1 className="text-2xl font-bold text-slate-900 dark:text-white flex items-center gap-3">
                    <User className="w-8 h-8 text-blue-600 dark:text-blue-500" />
                    Core Account Information
                </h1>
            </div>

            {/* Main Info Card */}
            <div className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl p-6 shadow-sm transition-colors">
                <div className="flex items-start justify-between mb-8">
                    <div className="flex gap-4">
                        <div className="w-20 h-20 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-3xl font-bold text-white shadow-lg">
                            DS
                        </div>
                        <div>
                            <h2 className="text-xl font-bold text-slate-900 dark:text-white">DragonSlayer99</h2>
                            <div className="text-slate-500 dark:text-slate-400 font-mono text-sm mt-1">UID: 8829-3920-1102</div>
                            <div className="flex items-center gap-2 mt-2">
                                <span className="px-2 py-0.5 bg-green-50 dark:bg-green-500/10 text-green-600 dark:text-green-400 text-xs font-medium rounded border border-green-200 dark:border-green-500/20 flex items-center gap-1">
                                    <CheckCircle className="w-3 h-3" /> Active
                                </span>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    <div className="space-y-4">
                        <h3 className="text-sm font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider border-b border-slate-200 dark:border-slate-700 pb-2">Identity & Login</h3>
                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <div className="text-xs text-slate-500 dark:text-slate-400 mb-1">Platform ID (FB)</div>
                                <div className="text-sm text-slate-900 dark:text-slate-200 font-mono">1029384756</div>
                            </div>
                            <div>
                                <div className="text-xs text-slate-500 dark:text-slate-400 mb-1">In-Game Language</div>
                                <div className="text-sm text-slate-900 dark:text-slate-200">English (US)</div>
                            </div>
                            <div>
                                <div className="text-xs text-slate-500 dark:text-slate-400 mb-1">Created</div>
                                <div className="text-sm text-slate-900 dark:text-slate-200">Oct 12, 2023</div>
                            </div>
                            <div>
                                <div className="text-xs text-slate-500 dark:text-slate-400 mb-1">Last Login</div>
                                <div className="text-sm text-slate-900 dark:text-slate-200">Today, 14:30</div>
                            </div>
                        </div>
                    </div>

                    <div className="space-y-4">
                        <h3 className="text-sm font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider border-b border-slate-200 dark:border-slate-700 pb-2">Device & System</h3>
                        <div className="space-y-3">
                            <div className="flex items-center justify-between">
                                <div className="flex items-center gap-2 text-sm text-slate-600 dark:text-slate-300">
                                    <Smartphone className="w-4 h-4 text-slate-400" />
                                    iPhone 14 Pro
                                </div>
                                <span className="text-xs text-slate-500 dark:text-slate-400">iOS 17.1</span>
                            </div>
                            <div className="flex items-center justify-between">
                                <div className="flex items-center gap-2 text-sm text-slate-600 dark:text-slate-300">
                                    <Globe className="w-4 h-4 text-slate-400" />
                                    Chrome Desktop
                                </div>
                                <span className="text-xs text-slate-500 dark:text-slate-400">v119.0.0</span>
                            </div>
                            <div className="flex items-center justify-between">
                                <div className="flex items-center gap-2 text-sm text-slate-600 dark:text-slate-300">
                                    <MapPin className="w-4 h-4 text-slate-400" />
                                    Region
                                </div>
                                <span className="text-xs text-slate-900 dark:text-slate-200">North America (East)</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Player Support Action Tab/Card */}
            <div className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl p-6 shadow-sm transition-colors">
                <h3 className="text-lg font-semibold text-slate-900 dark:text-slate-100 flex items-center gap-2 mb-4">
                    <FileText className="w-5 h-5 text-blue-600 dark:text-blue-500" />
                    Player Support Action
                </h3>

                {/* Search and Filter Bar */}
                <div className="flex items-center gap-4 mb-4">
                    <div className="relative flex-1 max-w-md">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                        <input
                            type="text"
                            value={actionSearchQuery}
                            onChange={(e) => setActionSearchQuery(e.target.value)}
                            placeholder="Search actions..."
                            className="w-full bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg pl-10 pr-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 text-slate-900 dark:text-slate-100 placeholder-slate-400 dark:placeholder-slate-500 transition-colors"
                        />
                    </div>
                    <div className="relative">
                        <button
                            onClick={() => setShowActionFilterDropdown(!showActionFilterDropdown)}
                            className="flex items-center gap-2 px-3 py-2 bg-slate-50 dark:bg-slate-700 border border-slate-200 dark:border-slate-600 rounded-lg text-slate-600 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-600 transition-colors"
                        >
                            <Filter className="w-4 h-4" />
                            <span className="text-sm">
                                {actionFilterColumn === 'all' ? 'All Columns' :
                                    actionFilterColumn === 'timestamp' ? 'Timestamp' :
                                        actionFilterColumn === 'agentEmail' ? 'Agent Email' :
                                            actionFilterColumn === 'actionTaken' ? 'Action Taken' :
                                                actionFilterColumn === 'ticketId' ? 'Ticket ID' : 'Action Note'}
                            </span>
                            <ChevronDown className={`w-4 h-4 transition-transform ${showActionFilterDropdown ? 'rotate-180' : ''}`} />
                        </button>
                        {showActionFilterDropdown && (
                            <div className="absolute right-0 mt-1 w-44 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg shadow-xl z-10 overflow-hidden">
                                {[
                                    { value: 'all', label: 'All Columns' },
                                    { value: 'timestamp', label: 'Timestamp' },
                                    { value: 'agentEmail', label: 'Agent Email' },
                                    { value: 'actionTaken', label: 'Action Taken' },
                                    { value: 'ticketId', label: 'Ticket ID' },
                                    { value: 'actionNote', label: 'Action Note' },
                                ].map(option => (
                                    <button
                                        key={option.value}
                                        onClick={() => {
                                            setActionFilterColumn(option.value);
                                            setShowActionFilterDropdown(false);
                                        }}
                                        className={`w-full px-4 py-2 text-left text-sm hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors ${actionFilterColumn === option.value ? 'bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400' : 'text-slate-600 dark:text-slate-300'
                                            }`}
                                    >
                                        {option.label}
                                    </button>
                                ))}
                            </div>
                        )}
                    </div>
                    <div className="text-xs text-slate-500 dark:text-slate-400">
                        {supportActions.filter(action => {
                            if (actionSearchQuery === '') return true;
                            const query = actionSearchQuery.toLowerCase();
                            if (actionFilterColumn === 'all') {
                                return action.timestamp.toLowerCase().includes(query) ||
                                    action.agentEmail.toLowerCase().includes(query) ||
                                    action.actionTaken.toLowerCase().includes(query) ||
                                    action.ticketId.toLowerCase().includes(query) ||
                                    action.actionNote.toLowerCase().includes(query);
                            }
                            return action[actionFilterColumn]?.toLowerCase().includes(query);
                        }).length} results
                    </div>
                </div>

                <div className="overflow-x-auto rounded-lg border border-slate-200 dark:border-slate-700">
                    <table className="w-full text-left text-sm">
                        <thead className="bg-slate-50 dark:bg-slate-900/50">
                            <tr className="border-b border-slate-200 dark:border-slate-700 text-slate-500 dark:text-slate-400">
                                <th className="px-4 py-3 font-medium">Timestamp</th>
                                <th className="px-4 py-3 font-medium">Agent Email</th>
                                <th className="px-4 py-3 font-medium w-1/3">Action Taken</th>
                                <th className="px-4 py-3 font-medium">Ticket ID</th>
                                <th className="px-4 py-3 font-medium">Action Note</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100 dark:divide-slate-700/50">
                            {supportActions.filter(action => {
                                if (actionSearchQuery === '') return true;
                                const query = actionSearchQuery.toLowerCase();
                                if (actionFilterColumn === 'all') {
                                    return action.timestamp.toLowerCase().includes(query) ||
                                        action.agentEmail.toLowerCase().includes(query) ||
                                        action.actionTaken.toLowerCase().includes(query) ||
                                        action.ticketId.toLowerCase().includes(query) ||
                                        action.actionNote.toLowerCase().includes(query);
                                }
                                return action[actionFilterColumn]?.toLowerCase().includes(query);
                            }).map((action) => (
                                <tr key={action.id} className="hover:bg-slate-50 dark:hover:bg-slate-700/30 transition-colors">
                                    <td className="px-4 py-3 text-slate-600 dark:text-slate-300 font-mono text-xs">{action.timestamp}</td>
                                    <td className="px-4 py-3 text-slate-500 dark:text-slate-400">{action.agentEmail}</td>
                                    <td className="px-4 py-3 text-slate-900 dark:text-slate-200">
                                        <div className="break-words line-clamp-2" title={action.actionTaken}>
                                            {action.actionTaken}
                                        </div>
                                    </td>
                                    <td className="px-4 py-3 text-slate-500 dark:text-slate-400 font-mono text-xs">{action.ticketId || '-'}</td>
                                    <td className="px-4 py-3 text-slate-500 dark:text-slate-400 italic">{action.actionNote || '-'}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                    {supportActions.filter(action => {
                        if (actionSearchQuery === '') return true;
                        const query = actionSearchQuery.toLowerCase();
                        if (actionFilterColumn === 'all') {
                            return action.timestamp.toLowerCase().includes(query) ||
                                action.agentEmail.toLowerCase().includes(query) ||
                                action.actionTaken.toLowerCase().includes(query) ||
                                action.ticketId.toLowerCase().includes(query) ||
                                action.actionNote.toLowerCase().includes(query);
                        }
                        return action[actionFilterColumn]?.toLowerCase().includes(query);
                    }).length === 0 && (
                            <div className="text-center py-6 text-slate-500 dark:text-slate-400 text-xs">
                                No support actions match your search criteria.
                            </div>
                        )}
                </div>
            </div>
        </div>
    );
};

export default AccountPage;
