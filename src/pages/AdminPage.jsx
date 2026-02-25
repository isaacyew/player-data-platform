import React, { useState } from 'react';
import { ShieldAlert, Users, FileText, UserPlus, UserX, Globe, X, Search, Loader2, AlertTriangle } from 'lucide-react';

const AdminPage = () => {
    const [selectedUser, setSelectedUser] = useState(null);
    const [auditLogUser, setAuditLogUser] = useState(null);
    const [isLoadingLogs, setIsLoadingLogs] = useState(false);
    const [auditLogs, setAuditLogs] = useState([]);
    const [showGdprConfirm, setShowGdprConfirm] = useState(false);

    const [users, setUsers] = useState([
        { id: 1, name: 'John Smith', email: 'john@playersupport.com', role: 'Agent', status: 'active', lastAction: '2 mins ago', gdprAccess: false },
        { id: 2, name: 'Sarah Connor', email: 'sarah@playersupport.com', role: 'Lead', status: 'active', lastAction: '15 mins ago', gdprAccess: true },
        { id: 3, name: 'Mike Johnson', email: 'mike@playersupport.com', role: 'Admin', status: 'active', lastAction: '1 hour ago', gdprAccess: true },
        { id: 4, name: 'Emily Davis', email: 'emily@playersupport.com', role: 'Agent', status: 'disabled', lastAction: '2 days ago', gdprAccess: false },
    ]);

    // Simulated audit logs per user
    const mockAuditLogs = {
        1: [
            { time: '22:15:30', action: 'Viewed player UID-8829-3920', type: 'view' },
            { time: '22:14:22', action: 'Added 500 coins to UID-8829-3920', type: 'compensation' },
            { time: '21:50:10', action: 'Viewed player UID-1111-2222', type: 'view' },
            { time: '21:30:00', action: 'Exported player data UID-8829-3920', type: 'export' },
        ],
        2: [
            { time: '22:10:05', action: 'Exported purchase history for UID-1234-5678', type: 'export' },
            { time: '21:55:00', action: 'Banned player UID-9999-0001', type: 'moderation' },
            { time: '20:30:15', action: 'Unbanned player UID-8888-0002', type: 'moderation' },
        ],
        3: [
            { time: '22:05:18', action: 'Created new user: Emily Davis', type: 'admin' },
            { time: '21:00:00', action: 'Disabled user: Old User', type: 'admin' },
            { time: '20:45:30', action: 'Updated role for Sarah Connor to Lead', type: 'admin' },
        ],
        4: [
            { time: '2 days ago', action: 'Viewed player UID-5555-6666', type: 'view' },
            { time: '2 days ago', action: 'Added 100 gems to UID-5555-6666', type: 'compensation' },
        ],
    };

    const handleViewAuditLog = (user, e) => {
        e.stopPropagation();
        setIsLoadingLogs(true);
        setAuditLogUser(user);
        setAuditLogs([]);

        setTimeout(() => {
            setAuditLogs(mockAuditLogs[user.id] || []);
            setIsLoadingLogs(false);
        }, 500);
    };

    const closeAuditLog = () => {
        setAuditLogUser(null);
        setAuditLogs([]);
    };

    const handleGdprToggleClick = () => {
        if (selectedUser) {
            setShowGdprConfirm(true);
        }
    };

    const confirmGdprToggle = () => {
        if (selectedUser) {
            const newGdprStatus = !selectedUser.gdprAccess;
            setUsers(users.map(u =>
                u.id === selectedUser.id ? { ...u, gdprAccess: newGdprStatus } : u
            ));
            setSelectedUser({ ...selectedUser, gdprAccess: newGdprStatus });
        }
        setShowGdprConfirm(false);
    };

    const cancelGdprToggle = () => {
        setShowGdprConfirm(false);
    };

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <h1 className="text-2xl font-bold text-slate-900 dark:text-white flex items-center gap-3">
                    <ShieldAlert className="w-8 h-8 text-red-600" />
                    Security &amp; Admin Controls
                </h1>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* User Role Administration */}
                <div className="lg:col-span-2 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl p-6 shadow-sm">
                    <div className="flex items-center justify-between mb-6">
                        <h3 className="text-lg font-semibold text-slate-900 dark:text-white flex items-center gap-2">
                            <Users className="w-5 h-5 text-blue-600" />
                            User Role Administration
                        </h3>
                        <button className="px-4 py-2 bg-blue-600 hover:bg-blue-500 text-white rounded-lg text-sm font-medium transition-colors flex items-center gap-2">
                            <UserPlus className="w-4 h-4" />
                            Create New User
                        </button>
                    </div>

                    <div className="relative mb-4">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                        <input
                            type="text"
                            placeholder="Search users..."
                            className="w-full bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg pl-10 pr-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 text-slate-900 dark:text-slate-100 placeholder-slate-400 dark:placeholder-slate-500 transition-colors"
                        />
                    </div>

                    <div className="overflow-x-auto">
                        <table className="w-full text-left text-sm">
                            <thead>
                                <tr className="border-b border-slate-200 dark:border-slate-700 text-slate-500 dark:text-slate-400">
                                    <th className="pb-3 font-medium">User</th>
                                    <th className="pb-3 font-medium">Role</th>
                                    <th className="pb-3 font-medium">Status</th>
                                    <th className="pb-3 font-medium">Last Action</th>
                                    <th className="pb-3 font-medium">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-100 dark:divide-slate-700">
                                {users.map((user) => (
                                    <tr
                                        key={user.id}
                                        className={`transition-colors cursor-pointer ${selectedUser?.id === user.id
                                            ? 'bg-blue-50 dark:bg-blue-900/20'
                                            : 'hover:bg-slate-50 dark:hover:bg-slate-700/50'}`}
                                        onClick={() => setSelectedUser(user)}
                                    >
                                        <td className="py-3">
                                            <div className="text-slate-900 dark:text-slate-100 font-medium">{user.name}</div>
                                            <div className="text-xs text-slate-500 dark:text-slate-400">{user.email}</div>
                                        </td>
                                        <td className="py-3">
                                            <span className={`px-2 py-1 rounded text-xs font-medium ${user.role === 'Admin'
                                                ? 'bg-red-50 dark:bg-red-900/20 text-red-700 dark:text-red-400 border border-red-200 dark:border-red-800'
                                                : user.role === 'Lead'
                                                    ? 'bg-purple-50 dark:bg-purple-900/20 text-purple-700 dark:text-purple-400 border border-purple-200 dark:border-purple-800'
                                                    : 'bg-blue-50 dark:bg-blue-900/20 text-blue-700 dark:text-blue-400 border border-blue-200 dark:border-blue-800'
                                                }`}>
                                                {user.role}
                                            </span>
                                        </td>
                                        <td className="py-3">
                                            <span className={`px-2 py-1 rounded text-xs font-medium ${user.status === 'active'
                                                ? 'bg-green-50 dark:bg-green-900/20 text-green-700 dark:text-green-400 border border-green-200 dark:border-green-800'
                                                : 'bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-400 border border-slate-200 dark:border-slate-600'
                                                }`}>
                                                {user.status}
                                            </span>
                                        </td>
                                        <td className="py-3 text-slate-500 dark:text-slate-400 text-xs">{user.lastAction}</td>
                                        <td className="py-3">
                                            <div className="flex gap-2">
                                                <button
                                                    onClick={(e) => handleViewAuditLog(user, e)}
                                                    className="p-1.5 hover:bg-slate-100 dark:hover:bg-slate-700 rounded text-slate-400 hover:text-slate-600 dark:hover:text-slate-300 transition-colors"
                                                    title="View Audit Log"
                                                >
                                                    <FileText className="w-4 h-4" />
                                                </button>
                                                <button
                                                    className="p-1.5 hover:bg-red-50 dark:hover:bg-red-900/20 rounded text-slate-400 hover:text-red-600 dark:hover:text-red-400 transition-colors"
                                                    title="Disable User"
                                                >
                                                    <UserX className="w-4 h-4" />
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>

                {/* User Details & GDPR - Only shows when user is selected */}
                <div className="space-y-6">
                    {!selectedUser ? (
                        <div className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl p-6 shadow-sm">
                            <div className="text-center py-8">
                                <Users className="w-12 h-12 text-slate-400 mx-auto mb-3" />
                                <p className="text-slate-500 dark:text-slate-400 text-sm">Select a user to view details and manage GDPR access</p>
                            </div>
                        </div>
                    ) : (
                        <>
                            {/* Selected User */}
                            <div className="bg-white dark:bg-slate-800 border border-blue-200 dark:border-blue-800 rounded-xl p-6 shadow-sm animate-in fade-in">
                                <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-4">Selected User</h3>
                                <div className="space-y-3 text-sm">
                                    <div className="flex justify-between">
                                        <span className="text-slate-500 dark:text-slate-400">Name</span>
                                        <span className="text-slate-900 dark:text-slate-100">{selectedUser.name}</span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span className="text-slate-500 dark:text-slate-400">Role</span>
                                        <span className="text-slate-900 dark:text-slate-100">{selectedUser.role}</span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span className="text-slate-500 dark:text-slate-400">Status</span>
                                        <span className="text-slate-900 dark:text-slate-100">{selectedUser.status}</span>
                                    </div>
                                    <div className="pt-3 border-t border-slate-100 dark:border-slate-700 flex gap-2">
                                        <button className="flex-1 px-3 py-2 bg-slate-100 dark:bg-slate-700 hover:bg-slate-200 dark:hover:bg-slate-600 text-slate-700 dark:text-slate-200 rounded-lg text-xs transition-colors">
                                            Edit Role
                                        </button>
                                        <button className="flex-1 px-3 py-2 bg-red-50 dark:bg-red-900/20 hover:bg-red-100 dark:hover:bg-red-900/40 text-red-600 dark:text-red-400 rounded-lg text-xs transition-colors">
                                            {selectedUser.status === 'active' ? 'Disable' : 'Enable'}
                                        </button>
                                    </div>
                                </div>
                            </div>

                            {/* GDPR Compliance */}
                            <div className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl p-6 shadow-sm animate-in fade-in">
                                <h3 className="text-lg font-semibold text-slate-900 dark:text-white flex items-center gap-2 mb-4">
                                    <Globe className="w-5 h-5 text-green-600" />
                                    GDPR Compliance
                                </h3>
                                <div className="space-y-4">
                                    <div className="flex items-center justify-between p-4 bg-slate-50 dark:bg-slate-700/50 rounded-lg border border-slate-200 dark:border-slate-600">
                                        <div>
                                            <div className="text-sm font-medium text-slate-700 dark:text-slate-200">GDPR Region Access</div>
                                            <div className="text-xs text-slate-500 dark:text-slate-400 mt-1">Allow {selectedUser.name} to access GDPR-protected data</div>
                                        </div>
                                        <button
                                            onClick={handleGdprToggleClick}
                                            className={`relative w-12 h-6 rounded-full transition-colors ${selectedUser.gdprAccess ? 'bg-green-600' : 'bg-slate-300 dark:bg-slate-600'}`}
                                        >
                                            <span className={`absolute top-1 left-1 w-4 h-4 bg-white rounded-full transition-transform ${selectedUser.gdprAccess ? 'translate-x-6' : ''}`}></span>
                                        </button>
                                    </div>
                                    <div className="text-xs text-slate-600 dark:text-yellow-300 p-3 bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-lg">
                                        <span className="text-yellow-600 dark:text-yellow-400 font-medium">Note:</span> Enabling GDPR access requires admin approval and is logged for compliance.
                                    </div>
                                </div>
                            </div>
                        </>
                    )}
                </div>
            </div>

            {/* Audit Log Panel */}
            {auditLogUser && (
                <div className="bg-white dark:bg-slate-800 border border-yellow-200 dark:border-yellow-800 rounded-xl p-6 shadow-lg animate-in fade-in slide-in-from-top-4">
                    <div className="flex items-center justify-between mb-4">
                        <h3 className="text-lg font-semibold text-slate-900 dark:text-white flex items-center gap-2">
                            <FileText className="w-5 h-5 text-yellow-500" />
                            Audit Log for {auditLogUser.name}
                        </h3>
                        <button
                            onClick={closeAuditLog}
                            className="p-1.5 hover:bg-slate-100 dark:hover:bg-slate-700 rounded text-slate-400 hover:text-slate-600 dark:hover:text-slate-300 transition-colors"
                        >
                            <X className="w-5 h-5" />
                        </button>
                    </div>

                    {isLoadingLogs ? (
                        <div className="flex items-center justify-center py-8">
                            <Loader2 className="w-6 h-6 text-blue-600 animate-spin" />
                            <span className="ml-2 text-slate-500 dark:text-slate-400">Loading audit logs...</span>
                        </div>
                    ) : (
                        <div className="overflow-x-auto">
                            <table className="w-full text-left text-sm">
                                <thead>
                                    <tr className="border-b border-slate-200 dark:border-slate-700 text-slate-500 dark:text-slate-400">
                                        <th className="pb-3 font-medium w-24">Time</th>
                                        <th className="pb-3 font-medium">Action</th>
                                        <th className="pb-3 font-medium w-28">Type</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-slate-100 dark:divide-slate-700">
                                    {auditLogs.map((log, idx) => (
                                        <tr key={idx} className="hover:bg-slate-50 dark:hover:bg-slate-700/50 transition-colors">
                                            <td className="py-3 text-slate-600 dark:text-slate-400 font-mono text-xs">{log.time}</td>
                                            <td className="py-3 text-slate-900 dark:text-slate-100">{log.action}</td>
                                            <td className="py-3">
                                                <span className={`px-2 py-1 rounded text-xs font-medium ${log.type === 'compensation'
                                                    ? 'bg-green-50 dark:bg-green-900/20 text-green-700 dark:text-green-400 border border-green-200 dark:border-green-800'
                                                    : log.type === 'moderation'
                                                        ? 'bg-red-50 dark:bg-red-900/20 text-red-700 dark:text-red-400 border border-red-200 dark:border-red-800'
                                                        : log.type === 'admin'
                                                            ? 'bg-purple-50 dark:bg-purple-900/20 text-purple-700 dark:text-purple-400 border border-purple-200 dark:border-purple-800'
                                                            : log.type === 'export'
                                                                ? 'bg-yellow-50 dark:bg-yellow-900/20 text-yellow-700 dark:text-yellow-400 border border-yellow-200 dark:border-yellow-800'
                                                                : 'bg-blue-50 dark:bg-blue-900/20 text-blue-700 dark:text-blue-400 border border-blue-200 dark:border-blue-800'
                                                    }`}>
                                                    {log.type}
                                                </span>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                            {auditLogs.length === 0 && (
                                <div className="text-center py-6 text-slate-500 dark:text-slate-400">No audit logs found for this user.</div>
                            )}
                        </div>
                    )}
                </div>
            )}

            {/* GDPR Confirmation Modal */}
            {showGdprConfirm && selectedUser && (
                <div className="fixed inset-0 bg-slate-900/20 dark:bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
                    <div className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl p-6 max-w-md w-full mx-4 shadow-xl animate-in fade-in zoom-in-95">
                        <div className="flex items-center gap-3 mb-4">
                            <div className="w-10 h-10 rounded-full bg-yellow-100 dark:bg-yellow-900/30 flex items-center justify-center">
                                <AlertTriangle className="w-5 h-5 text-yellow-600" />
                            </div>
                            <h3 className="text-lg font-semibold text-slate-900 dark:text-white">Confirm GDPR Access Change</h3>
                        </div>
                        <p className="text-slate-600 dark:text-slate-300 text-sm mb-2">
                            You are about to <span className="font-bold">{selectedUser.gdprAccess ? 'disable' : 'enable'}</span> GDPR Region Access for <span className="font-bold text-blue-600 dark:text-blue-400">{selectedUser.name}</span>.
                        </p>
                        <p className="text-slate-500 dark:text-slate-400 text-sm mb-6">
                            {selectedUser.gdprAccess
                                ? `This will revoke ${selectedUser.name}'s access to GDPR-protected player data.`
                                : `This will grant ${selectedUser.name} access to GDPR-protected player data.`}
                        </p>
                        <div className="bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-lg p-3 mb-6">
                            <p className="text-xs text-yellow-700 dark:text-yellow-400">
                                ⚠️ This action will be logged for compliance purposes.
                            </p>
                        </div>
                        <div className="flex gap-3">
                            <button
                                onClick={cancelGdprToggle}
                                className="flex-1 px-4 py-2 bg-slate-100 dark:bg-slate-700 hover:bg-slate-200 dark:hover:bg-slate-600 text-slate-700 dark:text-slate-200 rounded-lg text-sm font-medium transition-colors"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={confirmGdprToggle}
                                className={`flex-1 px-4 py-2 rounded-lg text-sm font-medium transition-colors ${selectedUser.gdprAccess
                                    ? 'bg-red-600 hover:bg-red-500 text-white'
                                    : 'bg-green-600 hover:bg-green-500 text-white'
                                    }`}
                            >
                                {selectedUser.gdprAccess ? 'Disable Access' : 'Enable Access'}
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default AdminPage;
