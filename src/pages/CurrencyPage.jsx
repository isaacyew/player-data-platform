import React, { useState } from 'react';
import { Coins, Heart, Zap, Ticket, Crown, Gift, X, ChevronDown, Search, Filter, ChevronLeft, ChevronRight, History, Battery, Leaf, Home as HomeIcon } from 'lucide-react';
import { useGame } from '../context/GameContext';

const CurrencyPage = () => {
    const { selectedGame, getGameInfo } = useGame();
    const [showCompensation, setShowCompensation] = useState(false);
    const [compensationType, setCompensationType] = useState('');
    const [compensationAmount, setCompensationAmount] = useState('');
    const [ticketId, setTicketId] = useState('');
    const [grantReason, setGrantReason] = useState('');
    const [dropdownOpen, setDropdownOpen] = useState(false);

    // Log state
    const [searchQuery, setSearchQuery] = useState('');
    const [filterColumn, setFilterColumn] = useState('all');
    const [showFilterDropdown, setShowFilterDropdown] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const entriesPerPage = 10;

    // SOLI specific items for compensation
    const soliCompensationOptions = [
        { value: 'coins', label: 'Coins' },
        { value: 'lives', label: 'Lives' },
        { value: 'joker_prelevel', label: 'Pre-Level Booster: Joker' },
        { value: 'tnt_prelevel', label: 'Pre-Level Booster: TNT' },
        { value: 'wild_prelevel', label: 'Pre-Level Booster: Wild' },
        { value: 'cards5', label: 'In-Game Booster: +5 Cards' },
        { value: 'undo', label: 'In-Game Booster: Undo' },
        { value: 'joker_ingame', label: 'In-Game Booster: Joker' },
        { value: 'shuffle', label: 'In-Game Booster: Shuffle' },
        { value: 'bullseye', label: 'In-Game Booster: Bullseye' },
        { value: 'tnt_ingame', label: 'In-Game Booster: TNT' },
        { value: 'skip_tickets', label: 'Skip-it Tickets' },
    ];

    // SOHO specific items for compensation
    const sohoCompensationOptions = [
        { value: 'coins', label: 'Coins' },
        { value: 'energy', label: 'Energy' },
        { value: 'clear3', label: 'Pre-Level Booster: Clear 3' },
        { value: 'jokers3', label: 'Pre-Level Booster: 3 Jokers' },
        { value: 'see3', label: 'Pre-Level Booster: See 3' },
        { value: 'undo', label: 'In-Game Booster: Undo' },
        { value: 'joker_ingame', label: 'In-Game Booster: Joker' },
        { value: 'wrecking_ball', label: 'In-Game Booster: Wrecking Ball' },
        { value: 'extra_cards', label: 'In-Game Booster: Extra Cards' },
    ];

    // SOFA specific items for compensation
    const sofaCompensationOptions = [
        { value: 'coins', label: 'Coins' },
        { value: 'free_entry', label: 'Free Level Entry' },
        { value: 'joker', label: 'In-Game Booster: Joker' },
        { value: 'undo', label: 'In-Game Booster: Undo' },
        { value: 'five_extra', label: 'In-Game Booster: Five Extra Cards' },
    ];

    const getCompensationOptions = () => {
        switch (selectedGame) {
            case 'soho': return sohoCompensationOptions;
            case 'sofa': return sofaCompensationOptions;
            default: return soliCompensationOptions;
        }
    };
    const compensationOptions = getCompensationOptions();

    // SOLI inventory data
    const soliInventory = {
        coins: 54200,
        lives: 5,
        maxLives: 5,
        preLevelBoosters: {
            joker: 12,
            tnt: 8,
            wild: 5
        },
        inGameBoosters: {
            cards5: 15,
            undo: 22,
            joker: 10,
            shuffle: 7,
            bullseye: 4,
            tnt: 9
        },
        skipTickets: 3,
        premiumPass: { active: true, expiresIn: '12 days' }
    };

    // SOHO inventory data
    const sohoInventory = {
        coins: 38500,
        energy: 30,
        maxEnergy: 30,
        preLevelBoosters: {
            clear3: 8,
            jokers3: 5,
            see3: 12
        },
        inGameBoosters: {
            undo: 18,
            joker: 7,
            wreckingBall: 4,
            extraCards: 11
        },
        seasonPass: { active: true, expiresIn: '8 days' }
    };

    // SOFA inventory data
    const sofaInventory = {
        coins: 42300,
        freeLevelEntry: 8,
        inGameBoosters: {
            joker: 14,
            undo: 19,
            fiveExtraCards: 7
        },
        farmItems: [
            { name: 'Tomatoes Plant', quantity: 20, icon: '🍅' },
            { name: 'House Stage 1', quantity: 1, icon: '🏠' },
            { name: 'Padi', quantity: 10, icon: '🌾' },
            { name: 'Grass Pad', quantity: 30, icon: '🌿' },
            { name: 'BBQ Stove', quantity: 1, icon: '🔥' },
            { name: 'Outdoor Chair', quantity: 1, icon: '🪑' },
        ]
    };

    // Generate SOLI mock currency/inventory log
    const generateSOLILog = () => {
        const actions = [
            { item: 'Coins', change: '+500', reason: 'Level 142 Completion', source: 'Gameplay' },
            { item: 'Lives', change: '-1', reason: 'Level 143 Started', source: 'Gameplay' },
            { item: 'Pre-Level Joker', change: '-1', reason: 'Used in Level 143', source: 'Gameplay' },
            { item: 'Coins', change: '+1000', reason: 'Daily Bonus Claimed', source: 'Reward' },
            { item: 'Skip-it Tickets', change: '+1', reason: 'Premium Pass Reward', source: 'Pass' },
            { item: 'In-Game Undo', change: '-1', reason: 'Used in Level 142', source: 'Gameplay' },
            { item: 'Coins', change: '-2500', reason: 'Purchased Extra Moves', source: 'Purchase' },
            { item: 'Lives', change: '+5', reason: 'Full Heart Refill', source: 'Time' },
            { item: 'In-Game +5 Cards', change: '+3', reason: 'Compensation Granted', source: 'Support' },
            { item: 'Pre-Level TNT', change: '+2', reason: 'Event Reward', source: 'Event' },
        ];

        const log = [];
        for (let i = 0; i < 50; i++) {
            const action = actions[i % actions.length];
            const day = 25 - (i % 25);
            const month = 12 - Math.floor(i / 25);
            log.push({
                id: i + 1,
                timestamp: `2023-${month.toString().padStart(2, '0')}-${day.toString().padStart(2, '0')} ${(14 - (i % 12)).toString().padStart(2, '0')}:${(30 + (i % 30)).toString().padStart(2, '0')}`,
                item: action.item,
                change: action.change,
                reason: action.reason,
                source: action.source
            });
        }
        return log;
    };

    // Generate SOHO mock currency/inventory log
    const generateSOHOLog = () => {
        const actions = [
            { item: 'Coins', change: '+800', reason: 'Level 85 Completion', source: 'Gameplay' },
            { item: 'Energy', change: '-1', reason: 'Level 86 Started', source: 'Gameplay' },
            { item: 'Pre-Level Clear 3', change: '-1', reason: 'Used in Level 86', source: 'Gameplay' },
            { item: 'Coins', change: '+500', reason: 'Daily Bonus Claimed', source: 'Reward' },
            { item: 'In-Game Wrecking Ball', change: '+1', reason: 'Season Pass Reward', source: 'Pass' },
            { item: 'In-Game Undo', change: '-1', reason: 'Used in Level 85', source: 'Gameplay' },
            { item: 'Coins', change: '-1500', reason: 'Decoration Purchase', source: 'Purchase' },
            { item: 'Energy', change: '+30', reason: 'Full Energy Refill', source: 'Time' },
            { item: 'In-Game Extra Cards', change: '+2', reason: 'Compensation Granted', source: 'Support' },
            { item: 'Pre-Level 3 Jokers', change: '+1', reason: 'Event Reward', source: 'Event' },
        ];

        const log = [];
        for (let i = 0; i < 50; i++) {
            const action = actions[i % actions.length];
            const day = 25 - (i % 25);
            const month = 12 - Math.floor(i / 25);
            log.push({
                id: i + 1,
                timestamp: `2023-${month.toString().padStart(2, '0')}-${day.toString().padStart(2, '0')} ${(14 - (i % 12)).toString().padStart(2, '0')}:${(30 + (i % 30)).toString().padStart(2, '0')}`,
                item: action.item,
                change: action.change,
                reason: action.reason,
                source: action.source
            });
        }
        return log;
    };

    // Generate SOFA mock currency/inventory log including harvest crops
    const generateSOFALog = () => {
        const actions = [
            { item: 'Coins', change: '+350', reason: 'Level 98 Completion', source: 'Gameplay' },
            { item: 'Coins', change: '+120', reason: 'Harvested Tomatoes x12', source: 'Harvest' },
            { item: 'Free Level Entry', change: '-1', reason: 'Used for Level 99', source: 'Gameplay' },
            { item: 'In-Game Joker', change: '-1', reason: 'Used in Level 98', source: 'Gameplay' },
            { item: 'Coins', change: '+80', reason: 'Harvested Padi x8', source: 'Harvest' },
            { item: 'Coins', change: '+400', reason: 'Daily Bonus Claimed', source: 'Reward' },
            { item: 'In-Game Undo', change: '-1', reason: 'Used in Level 97', source: 'Gameplay' },
            { item: 'Coins', change: '+200', reason: 'Harvested Tomatoes x20', source: 'Harvest' },
            { item: 'Tomatoes Plant', change: '+5', reason: 'Purchased from Shop', source: 'Purchase' },
            { item: 'In-Game Five Extra Cards', change: '+2', reason: 'Compensation Granted', source: 'Support' },
        ];

        const log = [];
        for (let i = 0; i < 50; i++) {
            const action = actions[i % actions.length];
            const day = 25 - (i % 25);
            const month = 12 - Math.floor(i / 25);
            log.push({
                id: i + 1,
                timestamp: `2023-${month.toString().padStart(2, '0')}-${day.toString().padStart(2, '0')} ${(14 - (i % 12)).toString().padStart(2, '0')}:${(30 + (i % 30)).toString().padStart(2, '0')}`,
                item: action.item,
                change: action.change,
                reason: action.reason,
                source: action.source
            });
        }
        return log;
    };

    const getInventoryLog = () => {
        switch (selectedGame) {
            case 'soho': return generateSOHOLog();
            case 'sofa': return generateSOFALog();
            default: return generateSOLILog();
        }
    };
    const inventoryLog = getInventoryLog();

    const filterOptions = [
        { value: 'all', label: 'All Columns' },
        { value: 'item', label: 'Item' },
        { value: 'change', label: 'Change' },
        { value: 'reason', label: 'Reason' },
        { value: 'source', label: 'Source' },
    ];

    // Filter log
    const filteredLog = inventoryLog.filter(entry => {
        if (searchQuery === '') return true;
        const query = searchQuery.toLowerCase();

        if (filterColumn === 'all') {
            return entry.timestamp.toLowerCase().includes(query) ||
                entry.item.toLowerCase().includes(query) ||
                entry.change.toLowerCase().includes(query) ||
                entry.reason.toLowerCase().includes(query) ||
                entry.source.toLowerCase().includes(query);
        }

        return entry[filterColumn]?.toString().toLowerCase().includes(query);
    });

    // Pagination
    const totalPages = Math.ceil(filteredLog.length / entriesPerPage);
    const startIndex = (currentPage - 1) * entriesPerPage;
    const paginatedLog = filteredLog.slice(startIndex, startIndex + entriesPerPage);

    const goToPage = (page) => {
        if (page >= 1 && page <= totalPages) {
            setCurrentPage(page);
        }
    };

    const handleSearchChange = (e) => {
        setSearchQuery(e.target.value);
        setCurrentPage(1);
    };

    const isFormValid = compensationType && compensationAmount && ticketId && grantReason;

    const handleGrant = () => {
        if (isFormValid) {
            const selectedOption = compensationOptions.find(o => o.value === compensationType);
            alert(`Successfully granted ${compensationAmount} ${selectedOption?.label}. Action logged.`);
            handleCancel();
        }
    };

    const handleCancel = () => {
        setShowCompensation(false);
        setCompensationType('');
        setCompensationAmount('');
        setTicketId('');
        setGrantReason('');
        setDropdownOpen(false);
    };

    // Render SOLI Currency & Inventory
    const renderSOLIInventory = () => (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Left Column - Main Currency */}
            <div className="space-y-4">
                {/* Coins & Lives Row */}
                <div className="grid grid-cols-2 gap-4">
                    <div className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl p-4 shadow-sm transition-colors">
                        <div className="flex items-center gap-3 mb-2">
                            <div className="w-10 h-10 rounded-full bg-yellow-50 dark:bg-yellow-500/10 flex items-center justify-center">
                                <Coins className="w-5 h-5 text-yellow-600 dark:text-yellow-400" />
                            </div>
                            <div>
                                <div className="text-xs text-slate-500 dark:text-slate-400">Coins</div>
                                <div className="text-2xl font-bold text-slate-900 dark:text-slate-100">{soliInventory.coins.toLocaleString()}</div>
                            </div>
                        </div>
                    </div>

                    <div className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl p-4 shadow-sm transition-colors">
                        <div className="flex items-center gap-3 mb-2">
                            <div className="w-10 h-10 rounded-full bg-red-50 dark:bg-red-500/10 flex items-center justify-center">
                                <Heart className="w-5 h-5 text-red-600 dark:text-red-400" />
                            </div>
                            <div>
                                <div className="text-xs text-slate-500 dark:text-slate-400">Lives</div>
                                <div className="text-2xl font-bold text-slate-900 dark:text-slate-100">{soliInventory.lives}/{soliInventory.maxLives}</div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Pre-Level Boosters */}
                <div className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl p-4 shadow-sm transition-colors">
                    <h3 className="text-sm font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-3">Pre-Level Boosters</h3>
                    <div className="grid grid-cols-3 gap-3">
                        <div className="bg-slate-50 dark:bg-slate-900 rounded-lg p-3 text-center border border-slate-200 dark:border-slate-700 transition-colors">
                            <div className="text-2xl font-bold text-purple-600 dark:text-purple-400">{soliInventory.preLevelBoosters.joker}</div>
                            <div className="text-xs text-slate-500 dark:text-slate-400">Joker</div>
                        </div>
                        <div className="bg-slate-50 dark:bg-slate-900 rounded-lg p-3 text-center border border-slate-200 dark:border-slate-700 transition-colors">
                            <div className="text-2xl font-bold text-orange-600 dark:text-orange-400">{soliInventory.preLevelBoosters.tnt}</div>
                            <div className="text-xs text-slate-500 dark:text-slate-400">TNT</div>
                        </div>
                        <div className="bg-slate-50 dark:bg-slate-900 rounded-lg p-3 text-center border border-slate-200 dark:border-slate-700 transition-colors">
                            <div className="text-2xl font-bold text-green-600 dark:text-green-400">{soliInventory.preLevelBoosters.wild}</div>
                            <div className="text-xs text-slate-500 dark:text-slate-400">Wild</div>
                        </div>
                    </div>
                </div>

                {/* Skip-it Tickets & Premium Pass */}
                <div className="grid grid-cols-2 gap-4">
                    <div className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl p-4 shadow-sm transition-colors">
                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-full bg-blue-50 dark:bg-blue-500/10 flex items-center justify-center">
                                <Ticket className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                            </div>
                            <div>
                                <div className="text-xs text-slate-500 dark:text-slate-400">Skip-it Tickets</div>
                                <div className="text-2xl font-bold text-slate-900 dark:text-slate-100">{soliInventory.skipTickets}</div>
                            </div>
                        </div>
                    </div>

                    <div className={`bg-white dark:bg-slate-800 border rounded-xl p-4 shadow-sm transition-colors ${soliInventory.premiumPass.active ? 'border-amber-200 dark:border-amber-500/30' : 'border-slate-200 dark:border-slate-700'}`}>
                        <div className="flex items-center gap-3">
                            <div className={`w-10 h-10 rounded-full flex items-center justify-center ${soliInventory.premiumPass.active ? 'bg-amber-50 dark:bg-amber-500/10' : 'bg-slate-100 dark:bg-slate-700'}`}>
                                <Crown className={`w-5 h-5 ${soliInventory.premiumPass.active ? 'text-amber-600 dark:text-amber-400' : 'text-slate-400 dark:text-slate-500'}`} />
                            </div>
                            <div>
                                <div className="text-xs text-slate-500 dark:text-slate-400">Premium Pass</div>
                                {soliInventory.premiumPass.active ? (
                                    <div className="text-sm font-bold text-amber-600 dark:text-amber-400">Active ({soliInventory.premiumPass.expiresIn})</div>
                                ) : (
                                    <div className="text-sm font-bold text-slate-500 dark:text-slate-400">Inactive</div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Right Column - In-Game Boosters */}
            <div className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl p-4 shadow-sm transition-colors">
                <h3 className="text-sm font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-3 flex items-center gap-2">
                    <Zap className="w-4 h-4 text-yellow-600 dark:text-yellow-400" />
                    In-Game Boosters
                </h3>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                    <div className="bg-slate-50 dark:bg-slate-900 rounded-lg p-3 text-center border border-slate-200 dark:border-slate-700 transition-colors">
                        <div className="text-2xl font-bold text-cyan-600 dark:text-cyan-400">{soliInventory.inGameBoosters.cards5}</div>
                        <div className="text-xs text-slate-500 dark:text-slate-400">+5 Cards</div>
                    </div>
                    <div className="bg-slate-50 dark:bg-slate-900 rounded-lg p-3 text-center border border-slate-200 dark:border-slate-700 transition-colors">
                        <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">{soliInventory.inGameBoosters.undo}</div>
                        <div className="text-xs text-slate-500 dark:text-slate-400">Undo</div>
                    </div>
                    <div className="bg-slate-50 dark:bg-slate-900 rounded-lg p-3 text-center border border-slate-200 dark:border-slate-700 transition-colors">
                        <div className="text-2xl font-bold text-purple-600 dark:text-purple-400">{soliInventory.inGameBoosters.joker}</div>
                        <div className="text-xs text-slate-500 dark:text-slate-400">Joker</div>
                    </div>
                    <div className="bg-slate-50 dark:bg-slate-900 rounded-lg p-3 text-center border border-slate-200 dark:border-slate-700 transition-colors">
                        <div className="text-2xl font-bold text-pink-600 dark:text-pink-400">{soliInventory.inGameBoosters.shuffle}</div>
                        <div className="text-xs text-slate-500 dark:text-slate-400">Shuffle</div>
                    </div>
                    <div className="bg-slate-50 dark:bg-slate-900 rounded-lg p-3 text-center border border-slate-200 dark:border-slate-700 transition-colors">
                        <div className="text-2xl font-bold text-red-600 dark:text-red-400">{soliInventory.inGameBoosters.bullseye}</div>
                        <div className="text-xs text-slate-500 dark:text-slate-400">Bullseye</div>
                    </div>
                    <div className="bg-slate-50 dark:bg-slate-900 rounded-lg p-3 text-center border border-slate-200 dark:border-slate-700 transition-colors">
                        <div className="text-2xl font-bold text-orange-600 dark:text-orange-400">{soliInventory.inGameBoosters.tnt}</div>
                        <div className="text-xs text-slate-500 dark:text-slate-400">TNT</div>
                    </div>
                </div>
            </div>
        </div>
    );

    // Render SOHO Currency & Inventory
    const renderSOHOInventory = () => (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Left Column - Main Currency */}
            <div className="space-y-4">
                {/* Coins & Energy Row */}
                <div className="grid grid-cols-2 gap-4">
                    <div className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl p-4 shadow-sm transition-colors">
                        <div className="flex items-center gap-3 mb-2">
                            <div className="w-10 h-10 rounded-full bg-yellow-50 dark:bg-yellow-500/10 flex items-center justify-center">
                                <Coins className="w-5 h-5 text-yellow-600 dark:text-yellow-400" />
                            </div>
                            <div>
                                <div className="text-xs text-slate-500 dark:text-slate-400">Coins</div>
                                <div className="text-2xl font-bold text-slate-900 dark:text-slate-100">{sohoInventory.coins.toLocaleString()}</div>
                            </div>
                        </div>
                    </div>

                    <div className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl p-4 shadow-sm transition-colors">
                        <div className="flex items-center gap-3 mb-2">
                            <div className="w-10 h-10 rounded-full bg-green-50 dark:bg-green-500/10 flex items-center justify-center">
                                <Battery className="w-5 h-5 text-green-600 dark:text-green-400" />
                            </div>
                            <div>
                                <div className="text-xs text-slate-500 dark:text-slate-400">Energy</div>
                                <div className="text-2xl font-bold text-slate-900 dark:text-slate-100">{sohoInventory.energy}/{sohoInventory.maxEnergy}</div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Pre-Level Boosters */}
                <div className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl p-4 shadow-sm transition-colors">
                    <h3 className="text-sm font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-3">Pre-Level Boosters</h3>
                    <div className="grid grid-cols-3 gap-3">
                        <div className="bg-slate-50 dark:bg-slate-900 rounded-lg p-3 text-center border border-slate-200 dark:border-slate-700 transition-colors">
                            <div className="text-2xl font-bold text-cyan-600 dark:text-cyan-400">{sohoInventory.preLevelBoosters.clear3}</div>
                            <div className="text-xs text-slate-500 dark:text-slate-400">Clear 3</div>
                        </div>
                        <div className="bg-slate-50 dark:bg-slate-900 rounded-lg p-3 text-center border border-slate-200 dark:border-slate-700 transition-colors">
                            <div className="text-2xl font-bold text-purple-600 dark:text-purple-400">{sohoInventory.preLevelBoosters.jokers3}</div>
                            <div className="text-xs text-slate-500 dark:text-slate-400">3 Jokers</div>
                        </div>
                        <div className="bg-slate-50 dark:bg-slate-900 rounded-lg p-3 text-center border border-slate-200 dark:border-slate-700 transition-colors">
                            <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">{sohoInventory.preLevelBoosters.see3}</div>
                            <div className="text-xs text-slate-500 dark:text-slate-400">See 3</div>
                        </div>
                    </div>
                </div>

                {/* Season Pass */}
                <div className={`bg-white dark:bg-slate-800 border rounded-xl p-4 shadow-sm transition-colors ${sohoInventory.seasonPass.active ? 'border-emerald-200 dark:border-emerald-500/30' : 'border-slate-200 dark:border-slate-700'}`}>
                    <div className="flex items-center gap-3">
                        <div className={`w-10 h-10 rounded-full flex items-center justify-center ${sohoInventory.seasonPass.active ? 'bg-emerald-50 dark:bg-emerald-500/10' : 'bg-slate-100 dark:bg-slate-700'}`}>
                            <Crown className={`w-5 h-5 ${sohoInventory.seasonPass.active ? 'text-emerald-600 dark:text-emerald-400' : 'text-slate-400 dark:text-slate-500'}`} />
                        </div>
                        <div>
                            <div className="text-xs text-slate-500 dark:text-slate-400">Season Pass</div>
                            {sohoInventory.seasonPass.active ? (
                                <div className="text-sm font-bold text-emerald-600 dark:text-emerald-400">Active ({sohoInventory.seasonPass.expiresIn})</div>
                            ) : (
                                <div className="text-sm font-bold text-slate-500 dark:text-slate-400">Inactive</div>
                            )}
                        </div>
                    </div>
                </div>
            </div>

            {/* Right Column - In-Game Boosters */}
            <div className="bg-white dark:bg-slate-800 border border-slate-200 rounded-xl p-4 dark:border-slate-700 shadow-sm transition-colors">
                <h3 className="text-sm font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-3 flex items-center gap-2">
                    <Zap className="w-4 h-4 text-yellow-600 dark:text-yellow-400" />
                    In-Game Boosters
                </h3>
                <div className="grid grid-cols-2 gap-3">
                    <div className="bg-slate-50 dark:bg-slate-900 rounded-lg p-4 text-center border border-slate-200 dark:border-slate-700 transition-colors">
                        <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">{sohoInventory.inGameBoosters.undo}</div>
                        <div className="text-xs text-slate-500 dark:text-slate-400">Undo</div>
                    </div>
                    <div className="bg-slate-50 dark:bg-slate-900 rounded-lg p-4 text-center border border-slate-200 dark:border-slate-700 transition-colors">
                        <div className="text-2xl font-bold text-purple-600 dark:text-purple-400">{sohoInventory.inGameBoosters.joker}</div>
                        <div className="text-xs text-slate-500 dark:text-slate-400">Joker</div>
                    </div>
                    <div className="bg-slate-50 dark:bg-slate-900 rounded-lg p-4 text-center border border-slate-200 dark:border-slate-700 transition-colors">
                        <div className="text-2xl font-bold text-orange-600 dark:text-orange-400">{sohoInventory.inGameBoosters.wreckingBall}</div>
                        <div className="text-xs text-slate-500 dark:text-slate-400">Wrecking Ball</div>
                    </div>
                    <div className="bg-slate-50 dark:bg-slate-900 rounded-lg p-4 text-center border border-slate-200 dark:border-slate-700 transition-colors">
                        <div className="text-2xl font-bold text-cyan-600 dark:text-cyan-400">{sohoInventory.inGameBoosters.extraCards}</div>
                        <div className="text-xs text-slate-500 dark:text-slate-400">Extra Cards</div>
                    </div>
                </div>
            </div>
        </div>
    );

    // Render SOFA Currency & Inventory
    const renderSOFAInventory = () => (
        <div className="space-y-6">
            {/* Main Currency Row */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {/* Coins */}
                <div className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl p-4 shadow-sm transition-colors">
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-yellow-50 dark:bg-yellow-500/10 flex items-center justify-center">
                            <Coins className="w-5 h-5 text-yellow-600 dark:text-yellow-400" />
                        </div>
                        <div>
                            <div className="text-xs text-slate-500 dark:text-slate-400">Coins</div>
                            <div className="text-2xl font-bold text-slate-900 dark:text-slate-100">{sofaInventory.coins.toLocaleString()}</div>
                        </div>
                    </div>
                </div>

                {/* Free Level Entry */}
                <div className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl p-4 shadow-sm transition-colors">
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-green-50 dark:bg-green-500/10 flex items-center justify-center">
                            <Ticket className="w-5 h-5 text-green-600 dark:text-green-400" />
                        </div>
                        <div>
                            <div className="text-xs text-slate-500 dark:text-slate-400">Free Level Entry</div>
                            <div className="text-2xl font-bold text-slate-900 dark:text-slate-100">{sofaInventory.freeLevelEntry}</div>
                        </div>
                    </div>
                </div>

                {/* In-Game Boosters Summary */}
                <div className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl p-4 shadow-sm transition-colors">
                    <h3 className="text-sm font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-3 flex items-center gap-2">
                        <Zap className="w-4 h-4 text-yellow-600 dark:text-yellow-400" />
                        In-Game Boosters
                    </h3>
                    <div className="grid grid-cols-3 gap-2">
                        <div className="bg-slate-50 dark:bg-slate-900 rounded-lg p-2 text-center border border-slate-200 dark:border-slate-700 transition-colors">
                            <div className="text-xl font-bold text-purple-600 dark:text-purple-400">{sofaInventory.inGameBoosters.joker}</div>
                            <div className="text-xs text-slate-500 dark:text-slate-400">Joker</div>
                        </div>
                        <div className="bg-slate-50 dark:bg-slate-900 rounded-lg p-2 text-center border border-slate-200 dark:border-slate-700 transition-colors">
                            <div className="text-xl font-bold text-blue-600 dark:text-blue-400">{sofaInventory.inGameBoosters.undo}</div>
                            <div className="text-xs text-slate-500 dark:text-slate-400">Undo</div>
                        </div>
                        <div className="bg-slate-50 dark:bg-slate-900 rounded-lg p-2 text-center border border-slate-200 dark:border-slate-700 transition-colors">
                            <div className="text-xl font-bold text-cyan-600 dark:text-cyan-400">{sofaInventory.inGameBoosters.fiveExtraCards}</div>
                            <div className="text-xs text-slate-500 dark:text-slate-400">+5 Cards</div>
                        </div>
                    </div>
                </div>
            </div>

            {/* My Farm Items */}
            <div className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl p-6 shadow-sm transition-colors">
                <h3 className="text-lg font-semibold text-slate-900 dark:text-slate-100 mb-4 flex items-center gap-2">
                    <Leaf className="w-5 h-5 text-green-600 dark:text-green-400" />
                    My Farm Items
                </h3>
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
                    {sofaInventory.farmItems.map((item, index) => (
                        <div key={index} className="bg-slate-50 dark:bg-slate-900 rounded-lg p-4 text-center border border-slate-200 dark:border-slate-700 transition-colors">
                            <div className="text-3xl mb-2">{item.icon}</div>
                            <div className="text-lg font-bold text-slate-900 dark:text-slate-100">x{item.quantity}</div>
                            <div className="text-xs text-slate-500 dark:text-slate-400 truncate">{item.name}</div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );

    // Render placeholder for other games
    const renderOtherGameInventory = () => (
        <div className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl p-12 shadow-sm text-center transition-colors">
            <Coins className="w-16 h-16 text-slate-400 dark:text-slate-500 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-slate-700 dark:text-slate-300 mb-2">Currency & Inventory Coming Soon</h3>
            <p className="text-slate-500 dark:text-slate-400">Currency & Inventory for {getGameInfo().name} is not yet configured.</p>
        </div>
    );

    // Render Log Section (shared between games)
    const renderLogSection = () => (
        <div className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl p-6 shadow-sm transition-colors">
            <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-slate-900 dark:text-slate-100 flex items-center gap-2">
                    <History className="w-5 h-5 text-slate-500 dark:text-slate-400" />
                    Currency & Inventory Log
                </h3>
                <div className="text-xs text-slate-500 dark:text-slate-400">
                    Showing {filteredLog.length > 0 ? startIndex + 1 : 0}-{Math.min(startIndex + entriesPerPage, filteredLog.length)} of {filteredLog.length} entries
                </div>
            </div>

            {/* Search and Filter Bar */}
            <div className="flex items-center gap-4 mb-4">
                <div className="relative flex-1 max-w-md">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                    <input
                        type="text"
                        value={searchQuery}
                        onChange={handleSearchChange}
                        placeholder="Search log..."
                        className="w-full bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg pl-10 pr-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 text-slate-900 dark:text-slate-200 placeholder-slate-400 dark:placeholder-slate-500 transition-colors"
                    />
                </div>
                <div className="relative">
                    <button
                        onClick={() => setShowFilterDropdown(!showFilterDropdown)}
                        className="flex items-center gap-2 px-3 py-2 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
                    >
                        <Filter className="w-4 h-4" />
                        <span className="text-sm">{filterOptions.find(f => f.value === filterColumn)?.label}</span>
                        <ChevronDown className={`w-4 h-4 transition-transform ${showFilterDropdown ? 'rotate-180' : ''}`} />
                    </button>
                    {showFilterDropdown && (
                        <div className="absolute right-0 mt-1 w-44 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg shadow-xl z-50 overflow-hidden text-slate-600 dark:text-slate-300">
                            {filterOptions.map(option => (
                                <button
                                    key={option.value}
                                    onClick={() => {
                                        setFilterColumn(option.value);
                                        setShowFilterDropdown(false);
                                        setCurrentPage(1);
                                    }}
                                    className={`w-full px-4 py-2 text-left text-sm hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors ${filterColumn === option.value ? 'bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400' : 'text-slate-600 dark:text-slate-300'
                                        }`}
                                >
                                    {option.label}
                                </button>
                            ))}
                        </div>
                    )}
                </div>
            </div>

            <div className="overflow-x-auto rounded-lg border border-slate-200 dark:border-slate-700">
                <table className="w-full text-left text-sm">
                    <thead className="bg-slate-50 dark:bg-slate-900/50">
                        <tr className="border-b border-slate-200 dark:border-slate-700 text-slate-500 dark:text-slate-400">
                            <th className="px-4 py-3 font-medium">Timestamp</th>
                            <th className="px-4 py-3 font-medium">Item</th>
                            <th className="px-4 py-3 font-medium">Change</th>
                            <th className="px-4 py-3 font-medium">Reason</th>
                            <th className="px-4 py-3 font-medium">Source</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100 dark:divide-slate-700/50">
                        {paginatedLog.map((entry) => (
                            <tr key={entry.id} className="hover:bg-slate-50 dark:hover:bg-slate-700/20 transition-colors">
                                <td className="px-4 py-3 text-slate-500 dark:text-slate-400 text-xs font-mono">{entry.timestamp}</td>
                                <td className="px-4 py-3 text-slate-900 dark:text-slate-200">{entry.item}</td>
                                <td className={`px-4 py-3 font-bold ${entry.change.startsWith('+') ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'}`}>
                                    {entry.change}
                                </td>
                                <td className="px-4 py-3 text-slate-500 dark:text-slate-400">{entry.reason}</td>
                                <td className="px-4 py-3">
                                    <span className={`px-2 py-0.5 text-xs rounded border ${entry.source === 'Gameplay' ? 'bg-blue-50 dark:bg-blue-500/10 text-blue-600 dark:text-blue-400 border-blue-200 dark:border-blue-500/20' :
                                        entry.source === 'Reward' ? 'bg-green-50 dark:bg-green-500/10 text-green-600 dark:text-green-400 border-green-200 dark:border-green-500/20' :
                                            entry.source === 'Support' ? 'bg-purple-50 dark:bg-purple-500/10 text-purple-600 dark:text-purple-400 border-purple-200 dark:border-purple-500/20' :
                                                entry.source === 'Purchase' ? 'bg-yellow-50 dark:bg-yellow-500/10 text-yellow-600 dark:text-yellow-400 border-yellow-200 dark:border-yellow-500/20' :
                                                    entry.source === 'Pass' ? 'bg-amber-50 dark:bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-200 dark:border-amber-500/20' :
                                                        entry.source === 'Event' ? 'bg-pink-50 dark:bg-pink-500/10 text-pink-600 dark:text-pink-400 border-pink-200 dark:border-pink-500/20' :
                                                            entry.source === 'Harvest' ? 'bg-lime-50 dark:bg-lime-500/10 text-lime-600 dark:text-lime-400 border-lime-200 dark:border-lime-500/20' :
                                                                'bg-slate-50 dark:bg-slate-500/10 text-slate-600 dark:text-slate-400 border-slate-200 dark:border-slate-500/20'
                                        }`}>
                                        {entry.source}
                                    </span>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                {paginatedLog.length === 0 && (
                    <div className="text-center py-8 text-slate-500 dark:text-slate-400">
                        No log entries match your search criteria
                    </div>
                )}
            </div>

            {/* Pagination */}
            {totalPages > 1 && (
                <div className="flex items-center justify-between mt-4 pt-4 border-t border-slate-200 dark:border-slate-700">
                    <button
                        onClick={() => goToPage(currentPage - 1)}
                        disabled={currentPage === 1}
                        className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-colors ${currentPage === 1
                            ? 'bg-slate-100 dark:bg-slate-800 text-slate-400 dark:text-slate-600 cursor-not-allowed'
                            : 'bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-700'
                            }`}
                    >
                        <ChevronLeft className="w-4 h-4" />
                        Previous
                    </button>

                    <div className="flex items-center gap-2">
                        {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                            <button
                                key={page}
                                onClick={() => goToPage(page)}
                                className={`w-8 h-8 rounded-lg text-sm font-medium transition-colors ${page === currentPage
                                    ? 'bg-blue-600 text-white'
                                    : 'bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-700'
                                    }`}
                            >
                                {page}
                            </button>
                        ))}
                    </div>

                    <button
                        onClick={() => goToPage(currentPage + 1)}
                        disabled={currentPage === totalPages}
                        className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-colors ${currentPage === totalPages
                            ? 'bg-slate-100 dark:bg-slate-800 text-slate-400 dark:text-slate-600 cursor-not-allowed'
                            : 'bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-700'
                            }`}
                    >
                        Next
                        <ChevronRight className="w-4 h-4" />
                    </button>
                </div>
            )}
        </div>
    );

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <h1 className="text-2xl font-bold text-slate-900 dark:text-slate-100 flex items-center gap-3">
                    <Coins className="w-8 h-8 text-yellow-500" />
                    Currency & Inventory ({selectedGame})
                </h1>
                <div className="flex items-center gap-4">
                    <button
                        onClick={() => setShowCompensation(true)}
                        className="px-4 py-2 bg-blue-600 hover:bg-blue-500 text-white rounded-lg font-medium transition-colors flex items-center gap-2 shadow-lg shadow-blue-500/20"
                    >
                        <Gift className="w-4 h-4" />
                        Compensation
                    </button>
                </div>
            </div>

            {/* Currency & Items Grid - Game Specific */}
            {selectedGame === 'soli' && renderSOLIInventory()}
            {selectedGame === 'soho' && renderSOHOInventory()}
            {selectedGame === 'sofa' && renderSOFAInventory()}
            {(selectedGame !== 'soli' && selectedGame !== 'soho' && selectedGame !== 'sofa') && renderOtherGameInventory()}

            {/* Currency & Inventory Log - Show for configured games */}
            {(selectedGame === 'soli' || selectedGame === 'soho' || selectedGame === 'sofa') && renderLogSection()}

            {/* Compensation Modal */}
            {showCompensation && (
                <div className="fixed inset-0 bg-slate-900/50 backdrop-blur-sm flex items-center justify-center z-50">
                    <div className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl p-6 max-w-md w-full mx-4 animate-in fade-in zoom-in-95 my-auto overflow-y-auto max-h-[90vh] shadow-xl">
                        <div className="flex items-center justify-between mb-6">
                            <h3 className="text-lg font-semibold text-slate-900 dark:text-slate-100 flex items-center gap-2">
                                <Gift className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                                Grant Compensation
                            </h3>
                            <button
                                onClick={handleCancel}
                                className="p-1.5 hover:bg-slate-100 dark:hover:bg-slate-700 rounded text-slate-400 hover:text-slate-600 dark:hover:text-slate-300 transition-colors"
                            >
                                <X className="w-5 h-5" />
                            </button>
                        </div>

                        {/* Compensation Type Dropdown */}
                        <div className="mb-4">
                            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                                Compensation Type <span className="text-red-600 dark:text-red-400">*</span>
                            </label>
                            <div className="relative">
                                <button
                                    type="button"
                                    onClick={() => setDropdownOpen(!dropdownOpen)}
                                    className="w-full bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg px-4 py-3 text-left text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 text-slate-900 dark:text-slate-100 flex items-center justify-between transition-colors"
                                >
                                    <span className={compensationType ? 'text-slate-900 dark:text-slate-100' : 'text-slate-500 dark:text-slate-400'}>
                                        {compensationType
                                            ? compensationOptions.find(o => o.value === compensationType)?.label
                                            : 'Select compensation type...'}
                                    </span>
                                    <ChevronDown className={`w-4 h-4 text-slate-400 transition-transform ${dropdownOpen ? 'rotate-180' : ''}`} />
                                </button>

                                {dropdownOpen && (
                                    <div className="absolute top-full left-0 right-0 mt-1 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg shadow-xl z-50 max-h-60 overflow-y-auto">
                                        {compensationOptions.map(option => (
                                            <button
                                                key={option.value}
                                                type="button"
                                                onClick={() => {
                                                    setCompensationType(option.value);
                                                    setDropdownOpen(false);
                                                }}
                                                className="w-full px-4 py-2 text-left text-sm text-slate-700 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors"
                                            >
                                                {option.label}
                                            </button>
                                        ))}
                                    </div>
                                )}
                            </div>
                        </div>

                        {/* Amount */}
                        <div className="mb-4">
                            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                                Amount <span className="text-red-600 dark:text-red-400">*</span>
                            </label>
                            <input
                                type="number"
                                value={compensationAmount}
                                onChange={(e) => setCompensationAmount(e.target.value)}
                                placeholder="Enter amount"
                                className="w-full bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 text-slate-900 dark:text-slate-100 placeholder-slate-400 dark:placeholder-slate-500 transition-colors"
                            />
                        </div>

                        {/* Ticket ID */}
                        <div className="mb-4">
                            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                                Ticket ID <span className="text-red-600 dark:text-red-400">*</span>
                            </label>
                            <input
                                type="text"
                                value={ticketId}
                                onChange={(e) => setTicketId(e.target.value)}
                                placeholder="e.g. #123456"
                                className="w-full bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 text-slate-900 dark:text-slate-100 placeholder-slate-400 dark:placeholder-slate-500 transition-colors"
                            />
                        </div>

                        {/* Reason */}
                        <div className="mb-6">
                            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                                Action Reason <span className="text-red-600 dark:text-red-400">*</span>
                            </label>
                            <textarea
                                value={grantReason}
                                onChange={(e) => setGrantReason(e.target.value)}
                                placeholder="Reason for granting compensation..."
                                rows="3"
                                className="w-full bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 text-slate-900 dark:text-slate-100 placeholder-slate-400 dark:placeholder-slate-500 resize-none transition-colors"
                            />
                        </div>

                        <div className="flex gap-3">
                            <button
                                onClick={handleCancel}
                                className="flex-1 px-4 py-2 bg-slate-100 dark:bg-slate-700 hover:bg-slate-200 dark:hover:bg-slate-600 text-slate-700 dark:text-slate-200 rounded-lg font-medium transition-colors"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={handleGrant}
                                disabled={!isFormValid}
                                className={`flex-1 px-4 py-2 rounded-lg font-medium transition-colors ${isFormValid
                                    ? 'bg-blue-600 hover:bg-blue-500 text-white shadow-lg shadow-blue-500/25'
                                    : 'bg-slate-100 dark:bg-slate-700 text-slate-400 dark:text-slate-500 cursor-not-allowed'
                                    }`}
                            >
                                Grant Items
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default CurrencyPage;
