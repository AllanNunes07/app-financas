/**
 * Nunes Finance - Gestão Financeira Pessoal (Mobills & Pierre Edition)
 * JavaScript Application Core Logic
 */

// ==========================================================================
// 1. Initial Default State (Mock Data para User 1 e User 2)
// ==========================================================================

const defaultAccountsUser1 = [
    {
        id: "acc-1",
        name: "Nubank Principal",
        institution: "nubank",
        type: "checking",
        balance: 4500.00,
        color: "#820ad1"
    },
    {
        id: "acc-2",
        name: "Banco Inter",
        institution: "inter",
        type: "checking",
        balance: 2350.00,
        color: "#ff7a00"
    },
    {
        id: "acc-3",
        name: "Carteira (Dinheiro)",
        institution: "carteira",
        type: "wallet",
        balance: 350.00,
        color: "#10b981"
    }
];

const defaultCardsUser1 = [
    {
        id: "card-1",
        name: "Nubank",
        brand: "mastercard",
        limit: 8000.00,
        closingDay: 25,
        dueDay: 2,
        style: "purple-dark",
        digits: "8492"
    },
    {
        id: "card-2",
        name: "Inter",
        brand: "mastercard",
        limit: 6000.00,
        closingDay: 10,
        dueDay: 17,
        style: "inter-black",
        digits: "3104"
    }
];

const defaultTransactionsUser1 = [
    {
        id: "tx-1",
        description: "Salário Mensal",
        value: 6500.00,
        type: "income",
        paymentMethod: "account",
        accountId: "acc-1",
        cardId: null,
        category: "salary",
        expenseNature: null,
        date: "2026-07-01",
        invoiceMonth: null,
        installments: { current: 1, total: 1 }
    },
    {
        id: "tx-2",
        description: "Aluguel Apartamento",
        value: 1600.00,
        type: "expense",
        paymentMethod: "account",
        accountId: "acc-1",
        cardId: null,
        category: "housing",
        expenseNature: "fixed",
        date: "2026-07-05",
        invoiceMonth: null,
        installments: { current: 1, total: 1 }
    },
    {
        id: "tx-3",
        description: "Supermercado Carrefour",
        value: 520.40,
        type: "expense",
        paymentMethod: "card",
        accountId: null,
        cardId: "card-1",
        category: "food",
        expenseNature: "variable",
        date: "2026-07-06",
        invoiceMonth: "2026-07",
        installments: { current: 1, total: 1 }
    },
    {
        id: "tx-4",
        description: "Assinatura Netflix",
        value: 55.90,
        type: "expense",
        paymentMethod: "card",
        accountId: null,
        cardId: "card-1",
        category: "services",
        expenseNature: "fixed",
        date: "2026-07-07",
        invoiceMonth: "2026-07",
        installments: { current: 1, total: 1 }
    },
    {
        id: "tx-5",
        description: "Combustível Posto Shell",
        value: 150.00,
        type: "expense",
        paymentMethod: "card",
        accountId: null,
        cardId: "card-2",
        category: "transport",
        expenseNature: "variable",
        date: "2026-07-08",
        invoiceMonth: "2026-07",
        installments: { current: 1, total: 1 }
    },
    {
        id: "tx-6",
        description: "Jantar - Restaurante Japonês",
        value: 240.00,
        type: "expense",
        paymentMethod: "card",
        accountId: null,
        cardId: "card-1",
        category: "food",
        expenseNature: "variable",
        date: "2026-07-09",
        invoiceMonth: "2026-07",
        installments: { current: 1, total: 1 }
    },
    {
        id: "tx-7",
        description: "Conta de Energia (Enel)",
        value: 185.20,
        type: "expense",
        paymentMethod: "account",
        accountId: "acc-2",
        category: "housing",
        expenseNature: "fixed",
        date: "2026-07-10",
        invoiceMonth: null,
        installments: { current: 1, total: 1 }
    },
    {
        id: "tx-8",
        description: "Freelance Desenvolvimento Web",
        value: 1200.00,
        type: "income",
        paymentMethod: "account",
        accountId: "acc-2",
        cardId: null,
        category: "salary",
        expenseNature: null,
        date: "2026-07-11",
        invoiceMonth: null,
        installments: { current: 1, total: 1 }
    }
];

const defaultAccountsUser2 = [
    {
        id: "acc-u2-1",
        name: "Itaú Personalité",
        institution: "itau",
        type: "checking",
        balance: 5200.00,
        color: "#004990"
    },
    {
        id: "acc-u2-2",
        name: "Nubank Invest",
        institution: "nubank",
        type: "investment",
        balance: 12400.00,
        color: "#820ad1"
    }
];

const defaultCardsUser2 = [
    {
        id: "card-u2-1",
        name: "Itaú",
        brand: "mastercard",
        limit: 15000.00,
        closingDay: 15,
        dueDay: 23,
        style: "obsidian-gold",
        digits: "9912"
    }
];

const defaultTransactionsUser2 = [
    {
        id: "tx-u2-1",
        description: "Rendimento de Investimentos",
        value: 2000.00,
        type: "income",
        paymentMethod: "account",
        accountId: "acc-u2-2",
        cardId: null,
        category: "investment",
        expenseNature: null,
        date: "2026-07-02",
        invoiceMonth: null,
        installments: { current: 1, total: 1 }
    },
    {
        id: "tx-u2-2",
        description: "Assinatura Spotify",
        value: 24.90,
        type: "expense",
        paymentMethod: "card",
        accountId: null,
        cardId: "card-u2-1",
        category: "services",
        expenseNature: "fixed",
        date: "2026-07-05",
        invoiceMonth: "2026-07",
        installments: { current: 1, total: 1 }
    }
];

// ==========================================================================
// 2. Global State Variables
// ==========================================================================

let users = [];
let activeUserId = '1';
let accounts = [];
let cards = [];
let transactions = [];
let paidInvoices = [];
let goals = [];

let currentActiveDate = new Date();
let activeFilter = 'all';
let filterAccountCardId = 'all';
let searchQuery = '';
let activeInvoiceTab = 'open'; // 'open' ou 'closed'
let distActiveType = 'expense'; // 'expense' ou 'income'

let balanceChartInstance = null;
let categoryChartInstance = null;
let dashboardCategoryChartInstance = null;
let monthlyBalanceChartInstance = null;

// Privacy and Theme states
let isPrivacyMode = false;
let isLightTheme = true;

// DOM Cache Elements
const totalBalanceEl = document.getElementById('total-balance');
const totalInvoicesDueEl = document.getElementById('total-invoices-due');
const totalIncomeEl = document.getElementById('total-income');
const totalExpenseEl = document.getElementById('total-expense');
const balanceFooterTextEl = document.getElementById('balance-footer-text');
const invoicesFooterTextEl = document.getElementById('invoices-footer-text');
const fixedShareEl = document.getElementById('fixed-share');
const cardShareEl = document.getElementById('card-share');

const currentDateEl = document.getElementById('current-date');
const activeMonthLabelEl = document.getElementById('active-month-label');
const btnPrevMonth = document.getElementById('btn-prev-month');
const btnNextMonth = document.getElementById('btn-next-month');
const btnMonthDropdown = document.getElementById('btn-month-dropdown');
const monthPickerPopover = document.getElementById('month-picker-popover');
const monthSelectorContainer = document.querySelector('.month-selector-container');
const pickerYearTitle = document.getElementById('picker-year-title');
const monthPickerGrid = document.getElementById('month-picker-grid');
const btnPickerPrevYear = document.getElementById('btn-picker-prev-year');
const btnPickerNextYear = document.getElementById('btn-picker-next-year');
const btnPickerCancel = document.getElementById('btn-picker-cancel');
const btnPickerCurrentMonth = document.getElementById('btn-picker-current-month');

let pickerYear = currentActiveDate.getFullYear();
const monthNamesShort = ['JAN', 'FEV', 'MAR', 'ABR', 'MAI', 'JUN', 'JUL', 'AGO', 'SET', 'OUT', 'NOV', 'DEZ'];

const dashboardCardsCarousel = document.getElementById('dashboard-cards-carousel');
const dashboardAccountsGrid = document.getElementById('dashboard-accounts-grid');
const accountsFullListEl = document.getElementById('accounts-full-list');
const cardsFullListEl = document.getElementById('cards-full-list');
const transactionsListEl = document.getElementById('transactions-list');
const emptyStateEl = document.getElementById('empty-state');
const filterAccountCardSelect = document.getElementById('filter-account-card');
const searchInputEl = document.getElementById('search-input');

// Transactions View (Mobills Components)
const btnTransFilterPill = document.getElementById('btn-trans-filter-pill');
const transFilterPillLabel = document.getElementById('trans-filter-pill-label');
const transFilterDropdownWrap = document.querySelector('.trans-filter-dropdown-wrap');
const btnTransNewAction = document.getElementById('btn-trans-new-action');
const transAddBtnText = document.getElementById('trans-add-btn-text');
const transMonthLabel = document.getElementById('trans-month-label');
const transMonthPill = document.getElementById('trans-month-pill');
const btnTransPrevMonth = document.getElementById('btn-trans-prev-month');
const btnTransNextMonth = document.getElementById('btn-trans-next-month');

// Summary Cards Elements in Transactions View
const transTitlePending = document.getElementById('trans-title-pending');
const transTitleRealized = document.getElementById('trans-title-realized');
const transTitleTotal = document.getElementById('trans-title-total');
const transValPending = document.getElementById('trans-val-pending');
const transValRealized = document.getElementById('trans-val-realized');
const transValTotal = document.getElementById('trans-val-total');
const transIconPending = document.getElementById('trans-icon-pending');
const transIconRealized = document.getElementById('trans-icon-realized');
const transIconTotal = document.getElementById('trans-icon-total');

// Modals
const transactionModal = document.getElementById('transaction-modal');
const transactionForm = document.getElementById('transaction-form');
const editTxIdEl = document.getElementById('edit-tx-id');
const modalTitleEl = document.getElementById('modal-title');

const accountModal = document.getElementById('account-modal');
const accountForm = document.getElementById('account-form');
const editAccountIdEl = document.getElementById('edit-account-id');
const accountModalTitleEl = document.getElementById('account-modal-title');

const cardModal = document.getElementById('card-modal');
const cardForm = document.getElementById('card-form');
const editCardIdEl = document.getElementById('edit-card-id');
const cardModalTitleEl = document.getElementById('card-modal-title');

const payInvoiceModal = document.getElementById('pay-invoice-modal');
const payInvoiceForm = document.getElementById('pay-invoice-form');

const transferModal = document.getElementById('transfer-modal');
const transferForm = document.getElementById('transfer-form');

const goalModal = document.getElementById('goal-modal');
const goalForm = document.getElementById('goal-form');

const toastEl = document.getElementById('toast');
const toastMessageEl = document.getElementById('toast-message');

// ==========================================================================
// 3. Application Initialization
// ==========================================================================

window.initializeAppWithFirebase = async function() {
    if (window.appInitialized) return;
    window.appInitialized = true;
    initThemeAndPrivacy();
    setCurrentDateHeader();
    await loadData();
    updateMonthSelectorUI();
    initEventListeners();
    updateDashboard();
};


function initThemeAndPrivacy() {
    // 1. Theme
    const storedTheme = localStorage.getItem('finpurple_theme');
    isLightTheme = storedTheme !== 'dark';
    document.body.classList.toggle('light-theme', isLightTheme);
    updateThemeIcons();

    // 2. Privacy Mode
    isPrivacyMode = localStorage.getItem('finpurple_privacy_mode') === 'true';
    document.body.classList.toggle('privacy-mode', isPrivacyMode);
    updatePrivacyIcons();
}

function updateThemeIcons() {
    const iconMoon = document.getElementById('icon-theme-moon');
    const iconSun = document.getElementById('icon-theme-sun');
    if (isLightTheme) {
        iconMoon.style.display = 'block';
        iconSun.style.display = 'none';
    } else {
        iconMoon.style.display = 'none';
        iconSun.style.display = 'block';
    }
}

function updatePrivacyIcons() {
    const iconOpen = document.getElementById('icon-eye-open');
    const iconClosed = document.getElementById('icon-eye-closed');
    if (isPrivacyMode) {
        iconOpen.style.display = 'none';
        iconClosed.style.display = 'block';
    } else {
        iconOpen.style.display = 'block';
        iconClosed.style.display = 'none';
    }
}

function setCurrentDateHeader() {
    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    const today = new Date();
    let dateStr = today.toLocaleDateString('pt-BR', options);
    dateStr = dateStr.charAt(0).toUpperCase() + dateStr.slice(1);
    currentDateEl.textContent = dateStr;
}

// ==========================================================================
// 4. Data Loading & Persistence
// ==========================================================================

async function loadData() {
    if (!window.db || !window.firebaseUser) return;
    
    try {
        const docRef = window.db.collection('users_data').doc(window.firebaseUser.uid);
        const doc = await docRef.get();
        
        let savedData = null;
        if (doc.exists) {
            savedData = doc.data();
        } else {
            // First time login - Check if there is data in localStorage to migrate
            const storedUsers = localStorage.getItem('finpurple_users');
            if (storedUsers) {
                savedData = {
                    users: JSON.parse(storedUsers),
                    activeUserId: localStorage.getItem('finpurple_active_user_id') || '1',
                    accounts_user_1: JSON.parse(localStorage.getItem('finpurple_accounts_user_1') || 'null'),
                    cards_user_1: JSON.parse(localStorage.getItem('finpurple_cards_user_1') || 'null'),
                    transactions_user_1: JSON.parse(localStorage.getItem('finpurple_transactions_user_1') || 'null'),
                    invoices_user_1: JSON.parse(localStorage.getItem('finpurple_invoices_user_1') || 'null'),
                    goals_user_1: JSON.parse(localStorage.getItem('finpurple_goals_user_1') || 'null'),
                    accounts_user_2: JSON.parse(localStorage.getItem('finpurple_accounts_user_2') || 'null'),
                    cards_user_2: JSON.parse(localStorage.getItem('finpurple_cards_user_2') || 'null'),
                    transactions_user_2: JSON.parse(localStorage.getItem('finpurple_transactions_user_2') || 'null'),
                    invoices_user_2: JSON.parse(localStorage.getItem('finpurple_invoices_user_2') || 'null'),
                    goals_user_2: JSON.parse(localStorage.getItem('finpurple_goals_user_2') || 'null')
                };
                await docRef.set(savedData);
            }
        }

        if (savedData && savedData.users) {
            users = savedData.users;
            activeUserId = savedData.activeUserId || '1';
            // Atualiza "Usuário 1" para "Allan Nunes" caso ainda esteja com o nome padrão
            if (users[0] && (users[0].name === 'Usuário 1' || !users[0].name)) {
                users[0].name = 'Allan Nunes';
                await saveData('users');
            }
        } else {
            users = [
                { id: '1', name: 'Allan Nunes' },
                { id: '2', name: 'Usuário 2' }
            ];
            activeUserId = '1';
            await saveData('users');
        }

        // Fetch collections based on activeUserId
        const accKey = `accounts_user_${activeUserId}`;
        if (savedData && savedData[accKey]) {
            accounts = savedData[accKey];
        } else {
            accounts = activeUserId === '1' ? [...defaultAccountsUser1] : [...defaultAccountsUser2];
            await saveData('accounts');
        }

        const cardsKey = `cards_user_${activeUserId}`;
        if (savedData && savedData[cardsKey]) {
            cards = savedData[cardsKey];
            cards.forEach(c => {
                if (c.name === "Nubank Ultravioleta") c.name = "Nubank";
                if (c.name === "Inter Mastercard Black") c.name = "Inter";
                if (c.name === "Itaú Mastercard Black") c.name = "Itaú";
            });
        } else {
            cards = activeUserId === '1' ? [...defaultCardsUser1] : [...defaultCardsUser2];
            await saveData('cards');
        }

        const txKey = `transactions_user_${activeUserId}`;
        if (savedData && savedData[txKey]) {
            transactions = savedData[txKey];
            transactions.forEach(t => {
                if (!t.paymentMethod) t.paymentMethod = (t.category === 'card') ? 'card' : 'account';
                if (!t.accountId && t.paymentMethod === 'account' && accounts.length > 0) t.accountId = accounts[0].id;
                if (!t.cardId && t.paymentMethod === 'card' && cards.length > 0) t.cardId = cards[0].id;
                if (t.paymentMethod === 'card' && !t.invoiceMonth) t.invoiceMonth = calculateInvoiceMonth(t.date, t.cardId);
                if (!t.installments) t.installments = { current: 1, total: 1 };
            });
        } else {
            transactions = activeUserId === '1' ? [...defaultTransactionsUser1] : [...defaultTransactionsUser2];
            await saveData('transactions');
        }

        const invKey = `invoices_user_${activeUserId}`;
        if (savedData && savedData[invKey]) {
            paidInvoices = savedData[invKey];
        } else {
            paidInvoices = [];
            await saveData('invoices');
        }

        const goalsKey = `goals_user_${activeUserId}`;
        if (savedData && savedData[goalsKey]) {
            goals = savedData[goalsKey];
        } else {
            if (activeUserId === '1') {
                goals = [
                    { id: 'g1', name: 'Reserva de Emergência', target: 10000, current: 2500 },
                    { id: 'g2', name: 'Viagem de Férias', target: 4000, current: 650 }
                ];
            } else {
                goals = [
                    { id: 'g3', name: 'Notebook Novo', target: 8000, current: 1500 }
                ];
            }
            await saveData('goals');
        }
        
    } catch (e) {
        console.error("Erro ao carregar dados do Firebase", e);
        showToast("Erro ao carregar os dados. Verifique a internet.");
    }
}

async function saveData(type) {
    // 1. Sempre salva localmente primeiro para máxima segurança e persistência instantânea
    try {
        if (!type || type === 'accounts') localStorage.setItem(`finpurple_accounts_user_${activeUserId}`, JSON.stringify(accounts));
        if (!type || type === 'cards') localStorage.setItem(`finpurple_cards_user_${activeUserId}`, JSON.stringify(cards));
        if (!type || type === 'transactions') localStorage.setItem(`finpurple_transactions_user_${activeUserId}`, JSON.stringify(transactions));
        if (!type || type === 'invoices') localStorage.setItem(`finpurple_invoices_user_${activeUserId}`, JSON.stringify(paidInvoices));
        if (!type || type === 'goals') localStorage.setItem(`finpurple_goals_user_${activeUserId}`, JSON.stringify(goals));
        if (type === 'users') {
            localStorage.setItem('finpurple_users', JSON.stringify(users));
            localStorage.setItem('finpurple_active_user_id', activeUserId);
        }
    } catch (err) {
        console.warn("Erro ao salvar no localStorage", err);
    }

    if (!window.db || !window.firebaseUser) return;
    
    try {
        const updateObj = {};
        if (!type || type === 'accounts') {
            updateObj[`accounts_user_${activeUserId}`] = (accounts || []).map(a => ({
                id: String(a.id || ''),
                name: String(a.name || ''),
                institution: String(a.institution || 'carteira'),
                type: String(a.type || 'checking'),
                balance: Number(a.balance) || 0,
                color: String(a.color || '#820ad1')
            }));
        }
        if (!type || type === 'cards') {
            updateObj[`cards_user_${activeUserId}`] = (cards || []).map(c => ({
                id: String(c.id || `card-${Date.now()}`),
                name: String(c.name || 'Cartão'),
                brand: String(c.brand || 'mastercard'),
                digits: String(c.digits || ''),
                limit: Number(c.limit) || 0,
                closingDay: Number(c.closingDay) || 25,
                dueDay: Number(c.dueDay) || 2,
                style: String(c.style || 'purple-dark')
            }));
        }
        if (!type || type === 'transactions') updateObj[`transactions_user_${activeUserId}`] = transactions || [];
        if (!type || type === 'invoices') updateObj[`invoices_user_${activeUserId}`] = paidInvoices || [];
        if (!type || type === 'goals') updateObj[`goals_user_${activeUserId}`] = goals || [];
        if (type === 'users') {
            updateObj.users = (users || []).map(u => ({ id: String(u.id), name: String(u.name) }));
            updateObj.activeUserId = activeUserId;
        }

        // Garante que nenhum valor undefined seja enviado para o Firestore
        const cleanObj = JSON.parse(JSON.stringify(updateObj));
        await window.db.collection('users_data').doc(window.firebaseUser.uid).set(cleanObj, { merge: true });
    } catch (e) {
        console.error("Erro ao salvar dados no Firebase:", e);
        showToast("Erro ao sincronizar na nuvem.");
    }
}

// ==========================================================================
// 5. Calculations & Helpers
// ==========================================================================

function getMonthKey(dateObj) {
    const year = dateObj.getFullYear();
    const month = String(dateObj.getMonth() + 1).padStart(2, '0');
    return `${year}-${month}`;
}

function calculateInvoiceMonth(txDateStr, cardId) {
    if (!txDateStr) return getMonthKey(currentActiveDate);
    const card = cards.find(c => c.id === cardId);
    const closingDay = card ? card.closingDay : 25;

    const parts = txDateStr.split('-');
    const year = parseInt(parts[0], 10);
    const month = parseInt(parts[1], 10) - 1;
    const day = parseInt(parts[2], 10);

    const txDate = new Date(year, month, day);

    if (day >= closingDay) {
        const nextMonthDate = new Date(year, month + 1, 1);
        return getMonthKey(nextMonthDate);
    } else {
        return getMonthKey(txDate);
    }
}

function getCardInvoiceAmount(cardId, monthKey) {
    return transactions
        .filter(t => t.paymentMethod === 'card' && t.cardId === cardId && t.invoiceMonth === monthKey)
        .reduce((sum, t) => sum + t.value, 0);
}

function isInvoicePaid(cardId, monthKey) {
    return paidInvoices.some(inv => inv.cardId === cardId && inv.invoiceMonth === monthKey);
}

function calculateTotalOpenInvoices(monthKey) {
    let total = 0;
    cards.forEach(c => {
        if (!isInvoicePaid(c.id, monthKey)) {
            total += getCardInvoiceAmount(c.id, monthKey);
        }
    });
    return total;
}

function calculateTotalAccountBalance() {
    return accounts.reduce((acc, a) => acc + (a.balance || 0), 0);
}

// ==========================================================================
// 6. Event Listeners Initialization
// ==========================================================================

function initEventListeners() {
    // 1. Navigation Desktop
    document.getElementById('nav-dashboard').addEventListener('click', (e) => {
        e.preventDefault();
        switchView('dashboard-view', 'nav-dashboard');
    });
    document.getElementById('nav-accounts-cards').addEventListener('click', (e) => {
        e.preventDefault();
        switchView('accounts-cards-view', 'nav-accounts-cards');
    });
    document.getElementById('nav-transactions').addEventListener('click', (e) => {
        e.preventDefault();
        switchView('transactions-view', 'nav-transactions');
    });
    document.getElementById('nav-categories').addEventListener('click', (e) => {
        e.preventDefault();
        switchView('distribution-view', 'nav-categories');
    });

    // 1.1 Dashboard Overview Metric Cards Click -> Direct Page Navigation
    document.getElementById('card-saldo-link')?.addEventListener('click', () => {
        switchView('accounts-cards-view', 'nav-accounts-cards');
        document.querySelector('.subtab-btn[data-subtab="accounts-tab"]')?.click();
    });

    document.getElementById('card-receitas-link')?.addEventListener('click', () => {
        setTransactionsFilter('income');
        switchView('transactions-view', 'nav-transactions');
    });

    document.getElementById('card-despesas-link')?.addEventListener('click', () => {
        setTransactionsFilter('expense');
        switchView('transactions-view', 'nav-transactions');
    });

    document.getElementById('card-cartao-link')?.addEventListener('click', () => {
        switchView('accounts-cards-view', 'nav-accounts-cards');
        document.querySelector('.subtab-btn[data-subtab="cards-tab"]')?.click();
    });

    // 2. Navigation Mobile Bottom Bar (Images 1 & 3)
    document.getElementById('mob-nav-dashboard').addEventListener('click', () => switchView('dashboard-view', 'nav-dashboard'));
    document.getElementById('mob-nav-transactions').addEventListener('click', () => switchView('transactions-view', 'nav-transactions'));
    document.getElementById('mob-nav-accounts').addEventListener('click', () => switchView('accounts-cards-view', 'nav-accounts-cards'));
    document.getElementById('mob-nav-categories').addEventListener('click', () => switchView('distribution-view', 'nav-categories'));
    document.getElementById('mob-btn-add').addEventListener('click', () => openTransactionModal());
    document.getElementById('btn-sidebar-add').addEventListener('click', () => openTransactionModal());

    // Link "Ver detalhes" in Dashboard Donut Card
    document.getElementById('link-goto-categories').addEventListener('click', (e) => {
        e.preventDefault();
        switchView('distribution-view', 'nav-categories');
    });

    // 3. Privacy Toggle (Eye icon)
    document.getElementById('btn-toggle-privacy').addEventListener('click', () => {
        isPrivacyMode = !isPrivacyMode;
        localStorage.setItem('finpurple_privacy_mode', isPrivacyMode);
        document.body.classList.toggle('privacy-mode', isPrivacyMode);
        updatePrivacyIcons();
        showToast(isPrivacyMode ? 'Modo de privacidade ativado (valores ocultos).' : 'Modo de privacidade desativado.');
    });

    // 4. Theme Toggle (Light / Dark)
    document.getElementById('btn-toggle-theme').addEventListener('click', () => {
        isLightTheme = !isLightTheme;
        localStorage.setItem('finpurple_theme', isLightTheme ? 'light' : 'dark');
        document.body.classList.toggle('light-theme', isLightTheme);
        updateThemeIcons();
        showToast(isLightTheme ? 'Modo Claro ativado.' : 'Modo Escuro ativado.');
        // Re-render charts with updated theme colors
        updateDashboard();
    });

    // 5. Month Selector Buttons & Popover Dropdown (Main Header)
    if (btnPrevMonth) {
        btnPrevMonth.addEventListener('click', (e) => {
            e.stopPropagation();
            currentActiveDate.setMonth(currentActiveDate.getMonth() - 1);
            updateMonthSelectorUI();
            updateDashboard();
        });
    }
    if (btnNextMonth) {
        btnNextMonth.addEventListener('click', (e) => {
            e.stopPropagation();
            currentActiveDate.setMonth(currentActiveDate.getMonth() + 1);
            updateMonthSelectorUI();
            updateDashboard();
        });
    }

    const monthSelectorPill = document.getElementById('month-selector-pill');
    if (monthSelectorPill) {
        monthSelectorPill.addEventListener('click', (e) => {
            e.stopPropagation();
            if (monthPickerPopover && monthPickerPopover.classList.contains('open')) {
                closeMonthPicker();
            } else {
                openMonthPicker();
            }
        });
    }

    if (btnMonthDropdown) {
        btnMonthDropdown.addEventListener('click', (e) => {
            e.stopPropagation();
            if (monthPickerPopover && monthPickerPopover.classList.contains('open')) {
                closeMonthPicker();
            } else {
                openMonthPicker();
            }
        });
    }

    if (btnPickerPrevYear) {
        btnPickerPrevYear.addEventListener('click', (e) => {
            e.stopPropagation();
            pickerYear--;
            renderMonthPickerGrid();
        });
    }

    if (btnPickerNextYear) {
        btnPickerNextYear.addEventListener('click', (e) => {
            e.stopPropagation();
            pickerYear++;
            renderMonthPickerGrid();
        });
    }

    if (btnPickerCancel) {
        btnPickerCancel.addEventListener('click', (e) => {
            e.stopPropagation();
            closeMonthPicker();
        });
    }

    if (btnPickerCurrentMonth) {
        btnPickerCurrentMonth.addEventListener('click', (e) => {
            e.stopPropagation();
            currentActiveDate = new Date();
            updateMonthSelectorUI();
            updateDashboard();
            closeMonthPicker();
        });
    }

    document.addEventListener('click', (e) => {
        if (monthSelectorContainer && !monthSelectorContainer.contains(e.target)) {
            closeMonthPicker();
        }
    });

    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && monthPickerPopover && monthPickerPopover.classList.contains('open')) {
            closeMonthPicker();
        }
    });

    // 6. User Switcher
    document.querySelectorAll('.profile-avatar').forEach(avatar => {
        avatar.addEventListener('click', (e) => {
            const targetId = e.currentTarget.dataset.userId;
            if (targetId === activeUserId) return;
            activeUserId = targetId;
            localStorage.setItem('finpurple_active_user_id', activeUserId);
            loadData();
            updateDashboard();
            showToast(`Perfil alternado para ${users.find(u => u.id === activeUserId).name}`);
        });
    });

    // 7. Header User Profile Dropdown & Modal
    const headerProfileWrap = document.getElementById('header-user-profile-wrap');
    const btnHeaderProfile = document.getElementById('btn-header-profile');
    const profileModal = document.getElementById('profile-modal');
    const profileForm = document.getElementById('profile-form');
    const profileNameInput = document.getElementById('profile-name-input');
    const btnProfileMyAccount = document.getElementById('btn-profile-my-account');
    const btnProfileSettings = document.getElementById('btn-profile-settings');
    const btnProfileInvite = document.getElementById('btn-profile-invite');
    const btnProfileBlog = document.getElementById('btn-profile-blog');
    const btnProfileLogout = document.getElementById('btn-profile-logout');
    const btnCloseProfileModal = document.getElementById('btn-close-profile-modal');
    const btnCancelProfileModal = document.getElementById('btn-cancel-profile-modal');

    if (btnHeaderProfile && headerProfileWrap) {
        btnHeaderProfile.addEventListener('click', (e) => {
            e.stopPropagation();
            headerProfileWrap.classList.toggle('open');
        });

        document.addEventListener('click', (e) => {
            if (!headerProfileWrap.contains(e.target)) {
                headerProfileWrap.classList.remove('open');
            }
        });
    }

    if (btnProfileMyAccount) {
        btnProfileMyAccount.addEventListener('click', () => {
            if (headerProfileWrap) headerProfileWrap.classList.remove('open');
            const currentUser = users.find(u => u.id === activeUserId) || { name: 'Allan Nunes' };
            if (profileNameInput) profileNameInput.value = currentUser.name;
            if (profileModal) profileModal.classList.add('open');
        });
    }

    if (btnCloseProfileModal) {
        btnCloseProfileModal.addEventListener('click', () => {
            if (profileModal) profileModal.classList.remove('open');
        });
    }

    if (btnCancelProfileModal) {
        btnCancelProfileModal.addEventListener('click', () => {
            if (profileModal) profileModal.classList.remove('open');
        });
    }

    if (profileForm) {
        profileForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            const newName = profileNameInput.value.trim();
            if (!newName) return;
            const currentUser = users.find(u => u.id === activeUserId);
            if (currentUser) {
                currentUser.name = newName;
                updateUserProfileUI();
                await saveData('users');
                if (profileModal) profileModal.classList.remove('open');
                showToast(`Perfil atualizado para "${newName}"!`);
            }
        });
    }

    if (btnProfileLogout) {
        btnProfileLogout.addEventListener('click', () => {
            if (window.auth) window.auth.signOut();
        });
    }

    if (btnProfileSettings) {
        btnProfileSettings.addEventListener('click', () => {
            if (headerProfileWrap) headerProfileWrap.classList.remove('open');
            const btnToggleTheme = document.getElementById('btn-toggle-theme');
            if (btnToggleTheme) btnToggleTheme.click();
        });
    }

    if (btnProfileInvite) {
        btnProfileInvite.addEventListener('click', () => {
            if (headerProfileWrap) headerProfileWrap.classList.remove('open');
            if (navigator.clipboard) {
                navigator.clipboard.writeText(window.location.href);
                showToast("Link copiado para a área de transferência!");
            } else {
                showToast("Compartilhe: " + window.location.href);
            }
        });
    }

    if (btnProfileBlog) {
        btnProfileBlog.addEventListener('click', () => {
            if (headerProfileWrap) headerProfileWrap.classList.remove('open');
            showToast("Blog do Nunes Finance em breve!");
        });
    }

    // Fallback sidebar edit
    const btnEditName = document.getElementById('btn-edit-name');
    const btnSaveName = document.getElementById('btn-save-name');
    const editNameInput = document.getElementById('edit-name-input');
    const activeUserNameSpan = document.getElementById('active-user-name');

    if (btnEditName && btnSaveName && editNameInput && activeUserNameSpan) {
        btnEditName.addEventListener('click', startNameEdit);
        activeUserNameSpan.addEventListener('click', startNameEdit);
        btnSaveName.addEventListener('click', saveNameEdit);
        editNameInput.addEventListener('keydown', (e) => {
            if (e.key === 'Enter') saveNameEdit();
            else if (e.key === 'Escape') cancelNameEdit();
        });

        function startNameEdit() {
            const currentUser = users.find(u => u.id === activeUserId);
            editNameInput.value = currentUser.name;
            const editWrapper = document.querySelector('.name-edit-wrapper');
            if (editWrapper) editWrapper.classList.add('editing');
            editNameInput.focus();
            editNameInput.select();
        }
        async function saveNameEdit() {
            const newName = editNameInput.value.trim();
            if (!newName) { cancelNameEdit(); return; }
            const currentUser = users.find(u => u.id === activeUserId);
            currentUser.name = newName;
            cancelNameEdit();
            updateUserProfileUI();
            await saveData('users');
            showToast(`Nome alterado para "${newName}"`);
        }
        function cancelNameEdit() {
            const editWrapper = document.querySelector('.name-edit-wrapper');
            if (editWrapper) editWrapper.classList.remove('editing');
        }
    }

    // 8. Invoice Tabs in Credit Cards Widget (Image 1 Mobile style)
    const tabInvoicesOpen = document.getElementById('tab-invoices-open');
    const tabInvoicesClosed = document.getElementById('tab-invoices-closed');
    tabInvoicesOpen.addEventListener('click', () => {
        tabInvoicesOpen.classList.add('active');
        tabInvoicesClosed.classList.remove('active');
        activeInvoiceTab = 'open';
        renderPierreCards(getMonthKey(currentActiveDate));
    });
    tabInvoicesClosed.addEventListener('click', () => {
        tabInvoicesClosed.classList.add('active');
        tabInvoicesOpen.classList.remove('active');
        activeInvoiceTab = 'closed';
        renderPierreCards(getMonthKey(currentActiveDate));
    });

    // 9. Distribution View Pills (Image 3)
    const pillDistExpenses = document.getElementById('pill-dist-expenses');
    const pillDistIncomes = document.getElementById('pill-dist-incomes');
    pillDistExpenses.addEventListener('click', () => {
        pillDistExpenses.classList.add('active');
        pillDistIncomes.classList.remove('active');
        distActiveType = 'expense';
        document.getElementById('dist-chart-title').textContent = 'Despesas por Categoria';
        renderExpandedCategoryChart();
    });
    pillDistIncomes.addEventListener('click', () => {
        pillDistIncomes.classList.add('active');
        pillDistExpenses.classList.remove('active');
        distActiveType = 'income';
        document.getElementById('dist-chart-title').textContent = 'Receitas por Categoria';
        renderExpandedCategoryChart();
    });

    // 10. Sub-tabs in Contas & Cartões View
    document.querySelectorAll('.subtab-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
            document.querySelectorAll('.subtab-btn').forEach(b => b.classList.remove('active'));
            document.querySelectorAll('.subtab-pane').forEach(p => p.classList.remove('active'));
            e.currentTarget.classList.add('active');
            const targetId = e.currentTarget.dataset.subtab;
            document.getElementById(targetId).classList.add('active');
        });
    });

    // 11. Transaction View Listeners (Mobills Design)
    if (btnTransFilterPill) {
        btnTransFilterPill.addEventListener('click', (e) => {
            e.stopPropagation();
            transFilterDropdownWrap?.classList.toggle('open');
        });
    }

    document.querySelectorAll('.trans-filter-item').forEach(item => {
        item.addEventListener('click', (e) => {
            e.stopPropagation();
            const targetFilter = e.currentTarget.dataset.filter;
            setTransactionsFilter(targetFilter);
            transFilterDropdownWrap?.classList.remove('open');
        });
    });

    document.addEventListener('click', (e) => {
        if (transFilterDropdownWrap && !transFilterDropdownWrap.contains(e.target)) {
            transFilterDropdownWrap.classList.remove('open');
        }
    });

    if (btnTransNewAction) {
        btnTransNewAction.addEventListener('click', () => {
            if (activeFilter === 'expense' || activeFilter === 'account-expense' || activeFilter === 'card-expense') {
                openTransactionModal('expense');
            } else {
                openTransactionModal('income');
            }
        });
    }

    // Month navigation inside Transactions View
    btnTransPrevMonth?.addEventListener('click', (e) => {
        e.stopPropagation();
        currentActiveDate.setMonth(currentActiveDate.getMonth() - 1);
        updateMonthSelectorUI();
        updateDashboard();
    });
    btnTransNextMonth?.addEventListener('click', (e) => {
        e.stopPropagation();
        currentActiveDate.setMonth(currentActiveDate.getMonth() + 1);
        updateMonthSelectorUI();
        updateDashboard();
    });
    transMonthPill?.addEventListener('click', (e) => {
        e.stopPropagation();
        openMonthPicker();
    });

    // Select all transactions checkbox
    const transSelectAll = document.getElementById('trans-select-all');
    if (transSelectAll) {
        transSelectAll.addEventListener('change', (e) => {
            const isChecked = e.target.checked;
            document.querySelectorAll('.tx-check-item').forEach(cb => cb.checked = isChecked);
        });
    }

    // Quick Search Toggle Focus
    document.getElementById('btn-trans-search-toggle')?.addEventListener('click', () => {
        searchInputEl?.focus();
    });

    filterAccountCardSelect?.addEventListener('change', (e) => {
        filterAccountCardId = e.target.value;
        renderTransactionsList();
    });

    searchInputEl?.addEventListener('input', (e) => {
        searchQuery = e.target.value.toLowerCase().trim();
        renderTransactionsList();
    });

    // 12. Modals Trigger Listeners
    document.getElementById('btn-open-modal').addEventListener('click', () => openTransactionModal());
    document.getElementById('btn-close-modal').addEventListener('click', closeTransactionModal);
    document.getElementById('btn-cancel-modal').addEventListener('click', closeTransactionModal);
    transactionModal.addEventListener('click', (e) => { if (e.target === transactionModal) closeTransactionModal(); });

    document.getElementById('btn-open-transfer').addEventListener('click', openTransferModal);
    document.getElementById('btn-new-transfer-tab').addEventListener('click', openTransferModal);
    document.getElementById('btn-close-transfer-modal').addEventListener('click', closeTransferModal);
    document.getElementById('btn-cancel-transfer-modal').addEventListener('click', closeTransferModal);
    transferModal.addEventListener('click', (e) => { if (e.target === transferModal) closeTransferModal(); });

    document.getElementById('btn-dashboard-add-account').addEventListener('click', () => openAccountModal());
    document.getElementById('btn-add-account-tab').addEventListener('click', () => openAccountModal());
    document.getElementById('btn-close-account-modal').addEventListener('click', closeAccountModal);
    document.getElementById('btn-cancel-account-modal').addEventListener('click', closeAccountModal);
    accountModal.addEventListener('click', (e) => { if (e.target === accountModal) closeAccountModal(); });

    document.getElementById('btn-dashboard-add-card').addEventListener('click', () => openCardModal());
    document.getElementById('btn-add-card-tab').addEventListener('click', () => openCardModal());
    document.getElementById('btn-close-card-modal').addEventListener('click', closeCardModal);
    document.getElementById('btn-cancel-card-modal').addEventListener('click', closeCardModal);
    cardModal.addEventListener('click', (e) => { if (e.target === cardModal) closeCardModal(); });

    document.getElementById('btn-close-invoice-modal').addEventListener('click', closePayInvoiceModal);
    document.getElementById('btn-cancel-invoice-modal').addEventListener('click', closePayInvoiceModal);
    payInvoiceModal.addEventListener('click', (e) => { if (e.target === payInvoiceModal) closePayInvoiceModal(); });

    // Forms Submissions
    transactionForm.addEventListener('submit', handleTransactionSubmit);
    accountForm.addEventListener('submit', handleAccountSubmit);
    cardForm.addEventListener('submit', handleCardSubmit);
    payInvoiceForm.addEventListener('submit', handlePayInvoiceSubmit);
    transferForm.addEventListener('submit', handleTransferSubmit);

    document.querySelectorAll('input[name="tx-operation-type"]').forEach(r => r.addEventListener('change', updateTransactionFormVisibility));
    document.querySelectorAll('input[name="payment-method"]').forEach(r => r.addEventListener('change', updateTransactionFormVisibility));

    document.getElementById('account-color-presets').addEventListener('click', (e) => {
        if (e.target.classList.contains('color-circle')) {
            document.querySelectorAll('#account-color-presets .color-circle').forEach(c => c.classList.remove('active'));
            e.target.classList.add('active');
            document.getElementById('account-color-value').value = e.target.dataset.color;
        }
    });

    document.getElementById('card-style-presets').addEventListener('click', (e) => {
        if (e.target.classList.contains('card-preset')) {
            document.querySelectorAll('#card-style-presets .card-preset').forEach(c => c.classList.remove('active'));
            e.target.classList.add('active');
            document.getElementById('card-style-value').value = e.target.dataset.style;
        }
    });

    const cardNameInput = document.getElementById('card-name');
    if (cardNameInput) {
        cardNameInput.addEventListener('input', (e) => {
            const val = e.target.value.toLowerCase();
            let targetStyle = '';
            if (val.includes('nubank') || val.includes('roxinh')) {
                targetStyle = 'purple-dark';
            } else if (val.includes('inter')) {
                targetStyle = 'inter-black';
            }
            if (targetStyle) {
                document.getElementById('card-style-value').value = targetStyle;
                document.querySelectorAll('#card-style-presets .card-preset').forEach(c => {
                    if (c.dataset.style === targetStyle) c.classList.add('active');
                    else c.classList.remove('active');
                });
            }
        });
    }

    document.getElementById('btn-add-goal').addEventListener('click', () => openGoalModal('add'));
    document.getElementById('btn-close-goal-modal').addEventListener('click', closeGoalModal);
    document.getElementById('btn-cancel-goal-modal').addEventListener('click', closeGoalModal);
    goalModal.addEventListener('click', (e) => { if (e.target === goalModal) closeGoalModal(); });
    goalForm.addEventListener('submit', handleGoalFormSubmit);
}

// ==========================================================================
// 7. View & UI Switching
// ==========================================================================

function switchView(viewId, navId) {
    document.querySelectorAll('.nav-item').forEach(item => item.classList.remove('active'));
    const desktopItem = document.getElementById(navId);
    if (desktopItem) desktopItem.classList.add('active');

    // Sync mobile bottom nav
    document.querySelectorAll('.bottom-nav-item').forEach(item => item.classList.remove('active'));
    if (navId === 'nav-dashboard') document.getElementById('mob-nav-dashboard')?.classList.add('active');
    else if (navId === 'nav-accounts-cards') document.getElementById('mob-nav-accounts')?.classList.add('active');
    else if (navId === 'nav-transactions') document.getElementById('mob-nav-transactions')?.classList.add('active');
    else if (navId === 'nav-categories') document.getElementById('mob-nav-categories')?.classList.add('active');

    document.querySelectorAll('.view-container').forEach(view => view.classList.remove('active'));
    document.getElementById(viewId).classList.add('active');

    if (viewId === 'dashboard-view') {
        balanceChartInstance?.resize();
        dashboardCategoryChartInstance?.resize();
        monthlyBalanceChartInstance?.resize();
    } else if (viewId === 'distribution-view') {
        categoryChartInstance?.resize();
        renderExpandedCategoryChart();
    }
}

function updateMonthSelectorUI() {
    const activeYear = currentActiveDate.getFullYear();
    const currentYear = new Date().getFullYear();
    const monthName = currentActiveDate.toLocaleDateString('pt-BR', { month: 'long' });
    
    // Mostra "setembro" (conforme imagem) se for o ano corrente, ou "setembro 2025" se for outro ano
    const label = activeYear === currentYear ? monthName.toLowerCase() : `${monthName.toLowerCase()} ${activeYear}`;
    activeMonthLabelEl.textContent = label;

    const options = { month: 'long', year: 'numeric' };
    let fullLabel = currentActiveDate.toLocaleDateString('pt-BR', options);
    fullLabel = fullLabel.charAt(0).toUpperCase() + fullLabel.slice(1);
    const balancePeriodLabel = document.getElementById('balance-period-label');
    if (balancePeriodLabel) balancePeriodLabel.textContent = fullLabel;

    if (transMonthLabel) {
        transMonthLabel.textContent = fullLabel;
    }

    if (monthPickerPopover && monthPickerPopover.classList.contains('open')) {
        pickerYear = activeYear;
        renderMonthPickerGrid();
    }
}

function setTransactionsFilter(filterType) {
    activeFilter = filterType;
    
    const filterConfig = {
        'income': {
            label: 'Receitas',
            pillClass: 'filter-income',
            btnAddText: 'NOVA RECEITA',
            btnAddClass: 'btn-income-mode',
            pendingTitle: 'Receitas pendentes',
            realizedTitle: 'Receitas recebidas',
            totalTitle: 'Total'
        },
        'expense': {
            label: 'Despesas',
            pillClass: 'filter-expense',
            btnAddText: 'NOVA DESPESA',
            btnAddClass: 'btn-expense-mode',
            pendingTitle: 'Despesas pendentes',
            realizedTitle: 'Despesas pagas',
            totalTitle: 'Total'
        },
        'all': {
            label: 'Todas as Transações',
            pillClass: 'filter-all',
            btnAddText: 'NOVO LANÇAMENTO',
            btnAddClass: 'btn-all-mode',
            pendingTitle: 'Total Receitas',
            realizedTitle: 'Total Despesas',
            totalTitle: 'Saldo do Período'
        },
        'transfer': {
            label: 'Transferências',
            pillClass: 'filter-transfer',
            btnAddText: 'NOVA TRANSFERÊNCIA',
            btnAddClass: 'btn-all-mode',
            pendingTitle: 'Total Transferido',
            realizedTitle: 'Operações Realizadas',
            totalTitle: 'Total'
        },
        'account-expense': {
            label: 'Despesas (Conta)',
            pillClass: 'filter-account-expense',
            btnAddText: 'NOVA DESPESA',
            btnAddClass: 'btn-expense-mode',
            pendingTitle: 'Despesas Conta',
            realizedTitle: 'Pagas em Conta',
            totalTitle: 'Total Conta'
        },
        'card-expense': {
            label: 'Cartão de Crédito',
            pillClass: 'filter-card-expense',
            btnAddText: 'DESPESA CARTÃO',
            btnAddClass: 'btn-expense-mode',
            pendingTitle: 'Faturas Abertas',
            realizedTitle: 'Faturas Pagas',
            totalTitle: 'Total Faturas'
        }
    };

    const cfg = filterConfig[filterType] || filterConfig['all'];

    if (transFilterPillLabel) transFilterPillLabel.textContent = cfg.label;
    if (btnTransFilterPill) {
        btnTransFilterPill.className = `btn-trans-filter-pill ${cfg.pillClass}`;
    }
    if (transAddBtnText) transAddBtnText.textContent = cfg.btnAddText;
    if (btnTransNewAction) {
        btnTransNewAction.className = `btn-trans-action-add ${cfg.btnAddClass}`;
    }

    if (transTitlePending) transTitlePending.textContent = cfg.pendingTitle;
    if (transTitleRealized) transTitleRealized.textContent = cfg.realizedTitle;
    if (transTitleTotal) transTitleTotal.textContent = cfg.totalTitle;

    renderTransactionsList();
}

function openMonthPicker() {
    pickerYear = currentActiveDate.getFullYear();
    renderMonthPickerGrid();
    if (monthPickerPopover) monthPickerPopover.classList.add('open');
    if (monthSelectorContainer) monthSelectorContainer.classList.add('open');
}

function closeMonthPicker() {
    if (monthPickerPopover) monthPickerPopover.classList.remove('open');
    if (monthSelectorContainer) monthSelectorContainer.classList.remove('open');
}

function renderMonthPickerGrid() {
    if (!pickerYearTitle || !monthPickerGrid) return;
    pickerYearTitle.textContent = pickerYear;
    monthPickerGrid.innerHTML = '';

    const activeYear = currentActiveDate.getFullYear();
    const activeMonth = currentActiveDate.getMonth();

    monthNamesShort.forEach((name, index) => {
        const cell = document.createElement('div');
        cell.className = 'month-picker-cell';
        if (pickerYear === activeYear && index === activeMonth) {
            cell.classList.add('active');
        }
        cell.textContent = name;
        cell.addEventListener('click', (e) => {
            e.stopPropagation();
            currentActiveDate = new Date(pickerYear, index, 1);
            updateMonthSelectorUI();
            updateDashboard();
            closeMonthPicker();
        });
        monthPickerGrid.appendChild(cell);
    });
}

function updateUserProfileUI() {
    const currentUser = users.find(u => u.id === activeUserId) || { name: 'Allan Nunes' };
    const initial = (currentUser.name || 'A').trim().charAt(0).toUpperCase();

    // 1. Header User Profile (Image 2 Mobills Style)
    const headerUserName = document.getElementById('header-user-name');
    const headerAvatarLetter = document.getElementById('header-avatar-letter');
    if (headerUserName) headerUserName.textContent = currentUser.name;
    if (headerAvatarLetter) headerAvatarLetter.textContent = initial;

    // 2. Profile Modal Elements
    const modalProfileTitle = document.getElementById('modal-profile-title');
    const modalProfileEmail = document.getElementById('modal-profile-email');
    const modalAvatarLetter = document.getElementById('modal-avatar-letter');
    if (modalProfileTitle) modalProfileTitle.textContent = currentUser.name;
    if (modalAvatarLetter) modalAvatarLetter.textContent = initial;
    if (modalProfileEmail) {
        modalProfileEmail.textContent = (window.firebaseUser && window.firebaseUser.email) ? window.firebaseUser.email : 'allannunesb17@hotmail.com';
    }

    // 3. Legacy sidebar fallback
    const activeUserNameSpan = document.getElementById('active-user-name');
    if (activeUserNameSpan) activeUserNameSpan.textContent = currentUser.name;

    const user1 = users.find(u => u.id === '1');
    const user2 = users.find(u => u.id === '2');
    const avatar1 = document.getElementById('avatar-user-1');
    const avatar2 = document.getElementById('avatar-user-2');
    if (avatar1 && user1) {
        avatar1.textContent = getInitials(user1.name);
        avatar1.title = user1.name;
    }
    if (avatar2 && user2) {
        avatar2.textContent = getInitials(user2.name);
        avatar2.title = user2.name;
    }

    document.querySelectorAll('.profile-avatar').forEach(avatar => {
        if (avatar.dataset.userId === activeUserId) avatar.classList.add('active');
        else avatar.classList.remove('active');
    });
}

function getInitials(name) {
    if (!name) return 'U';
    const parts = name.trim().split(/\s+/);
    if (parts.length >= 2) return (parts[0][0] + parts[1][0]).toUpperCase();
    return name.substring(0, 2).toUpperCase();
}

function showToast(message) {
    toastMessageEl.textContent = message;
    toastEl.classList.add('show');
    setTimeout(() => toastEl.classList.remove('show'), 3200);
}

function formatCurrency(value) {
    return (value || 0).toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
}

// ==========================================================================
// 8. Dashboard Update & Render Logic
// ==========================================================================

function updateDashboard() {
    updateUserProfileUI();
    populateSelectDropdowns();

    const activeYear = currentActiveDate.getFullYear();
    const activeMonth = currentActiveDate.getMonth();
    const activeMonthKey = getMonthKey(currentActiveDate);

    // 1. Total Contas
    const totalAccountBalance = calculateTotalAccountBalance();

    // 2. Faturas a Vencer no Mês
    const totalOpenInvoices = calculateTotalOpenInvoices(activeMonthKey);

    // 3. Cofrinho
    let totalSavedInGoals = 0;
    goals.forEach(g => totalSavedInGoals += g.current);

    // 4. Saldo Disponível Líquido
    const liquidAvailableBalance = totalAccountBalance - totalOpenInvoices - totalSavedInGoals;

    // Atualiza Metric Cards (Image 1 & Image 2)
    totalBalanceEl.textContent = `R$ ${formatCurrency(liquidAvailableBalance)}`;
    totalInvoicesDueEl.textContent = `R$ ${formatCurrency(totalOpenInvoices)}`;

    balanceFooterTextEl.innerHTML = `Total: R$ ${formatCurrency(totalAccountBalance)} | Poupado: R$ ${formatCurrency(totalSavedInGoals)}`;
    invoicesFooterTextEl.textContent = `${cards.length} cartões gerenciados`;

    // 5. Receitas e Despesas do Mês Ativo
    let monthlyIncome = 0;
    let monthlyExpense = 0;
    let monthlyAccountExpense = 0;
    let monthlyCardExpense = 0;

    transactions.forEach(t => {
        const tDate = new Date(t.date + 'T00:00:00');
        const isCurrentMonth = tDate.getFullYear() === activeYear && tDate.getMonth() === activeMonth;

        if (t.type === 'income' && isCurrentMonth) {
            monthlyIncome += t.value;
        } else if (t.type === 'expense') {
            if (t.paymentMethod === 'card') {
                if (t.invoiceMonth === activeMonthKey) {
                    monthlyExpense += t.value;
                    monthlyCardExpense += t.value;
                }
            } else {
                if (isCurrentMonth) {
                    monthlyExpense += t.value;
                    monthlyAccountExpense += t.value;
                }
            }
        }
    });

    totalIncomeEl.textContent = `R$ ${formatCurrency(monthlyIncome)}`;
    totalExpenseEl.textContent = `R$ ${formatCurrency(monthlyExpense)}`;
    fixedShareEl.textContent = `R$ ${formatCurrency(monthlyAccountExpense)}`;
    cardShareEl.textContent = `R$ ${formatCurrency(monthlyCardExpense)}`;

    // Render Components
    renderPierreCards(activeMonthKey);
    renderMobillsAccounts();
    renderSavingsGoals();
    renderTransactionsList();

    // Render Charts
    renderDashboardCategoryDonutChart(activeMonthKey);
    renderMonthlyBalanceBarChart(monthlyIncome, monthlyExpense);
    renderFinancialEvolutionChart();
}

// Renderiza cartões virtuais Pierre (com filtro por abas Faturas abertas / Faturas fechadas)
function renderPierreCards(monthKey) {
    dashboardCardsCarousel.innerHTML = '';
    cardsFullListEl.innerHTML = '';

    if (cards.length === 0) {
        const emptyMsg = `<p class="text-muted" style="font-size:13px; padding: 20px;">Nenhum cartão cadastrado. Clique em "+ Novo Cartão" para adicionar.</p>`;
        dashboardCardsCarousel.innerHTML = emptyMsg;
        cardsFullListEl.innerHTML = emptyMsg;
        return;
    }

    let filteredCards = [...cards];
    if (activeInvoiceTab === 'open') {
        // Mostra cartões com fatura aberta ou não paga
        filteredCards = cards.filter(c => !isInvoicePaid(c.id, monthKey));
    } else {
        // Mostra cartões com fatura já paga
        filteredCards = cards.filter(c => isInvoicePaid(c.id, monthKey));
    }

    if (filteredCards.length === 0) {
        const emptyTabMsg = `<p class="text-muted" style="font-size:12px; padding: 20px;">Nenhum cartão nesta categoria no mês atual.</p>`;
        dashboardCardsCarousel.innerHTML = emptyTabMsg;
    } else {
        filteredCards.forEach(card => {
            const invoiceAmount = getCardInvoiceAmount(card.id, monthKey);
            const isPaid = isInvoicePaid(card.id, monthKey);
            const availableLimit = Math.max(card.limit - invoiceAmount, 0);
            const limitPct = Math.min(((invoiceAmount / card.limit) * 100), 100).toFixed(0);

            const cardElement = createPierreCardElement(card, invoiceAmount, isPaid, limitPct, availableLimit, monthKey);
            dashboardCardsCarousel.appendChild(cardElement);
        });
    }

    // Na view completa de Contas & Cartões, mostra sempre todos os cartões
    cards.forEach(card => {
        const invoiceAmount = getCardInvoiceAmount(card.id, monthKey);
        const isPaid = isInvoicePaid(card.id, monthKey);
        const availableLimit = Math.max(card.limit - invoiceAmount, 0);
        const limitPct = Math.min(((invoiceAmount / card.limit) * 100), 100).toFixed(0);

        const fullCardElement = createPierreCardElement(card, invoiceAmount, isPaid, limitPct, availableLimit, monthKey, true);
        cardsFullListEl.appendChild(fullCardElement);
    });
}

function getCardBankName(card) {
    if (!card || !card.name) return 'Cartão';
    const raw = card.name.trim();
    if (/^nubank\b/i.test(raw)) return 'Nubank';
    if (/^(banco\s+)?inter\b/i.test(raw)) return 'Inter';
    if (/^ita[úu]\b/i.test(raw)) return 'Itaú';
    if (/^c6(\s+bank)?\b/i.test(raw)) return 'C6 Bank';
    if (/^bradesco\b/i.test(raw)) return 'Bradesco';
    if (/^santander\b/i.test(raw)) return 'Santander';
    
    // Remove qualquer menção explícita de bandeira no nome do banco
    let cleaned = raw.replace(/\b(mastercard|visa|elo|amex|american express)\b/gi, '').trim();
    cleaned = cleaned.replace(/\s{2,}/g, ' ');
    return cleaned || raw;
}

function getCardBrandIcon(brand) {
    const b = (brand || 'mastercard').toLowerCase();
    if (b === 'visa') {
        return `<svg class="card-brand-icon" width="28" height="18" viewBox="0 0 36 14" fill="#ffffff" style="filter: drop-shadow(0 1px 2px rgba(0,0,0,0.3));">
            <text x="0" y="12" font-family="'Outfit', sans-serif" font-weight="900" font-style="italic" font-size="14" fill="#ffffff" letter-spacing="1">VISA</text>
        </svg>`;
    } else if (b === 'elo') {
        return `<svg class="card-brand-icon" width="26" height="18" viewBox="0 0 32 18" fill="none" style="filter: drop-shadow(0 1px 2px rgba(0,0,0,0.3));">
            <circle cx="6" cy="9" r="5" fill="#EF4444"/>
            <circle cx="16" cy="9" r="5" fill="#F59E0B"/>
            <circle cx="26" cy="9" r="5" fill="#3B82F6"/>
        </svg>`;
    } else if (b === 'amex') {
        return `<svg class="card-brand-icon" width="28" height="18" viewBox="0 0 36 14" fill="#ffffff" style="filter: drop-shadow(0 1px 2px rgba(0,0,0,0.3));">
            <text x="0" y="11" font-family="'Outfit', sans-serif" font-weight="900" font-size="12" fill="#ffffff" letter-spacing="0.5">AMEX</text>
        </svg>`;
    } else {
        // Mastercard (Default) - Dois círculos sobrepostos vermelho e amarelo/laranja
        return `<svg class="card-brand-icon" width="26" height="18" viewBox="0 0 32 20" fill="none" style="filter: drop-shadow(0 1px 2px rgba(0,0,0,0.3));">
            <circle cx="10" cy="10" r="9" fill="#EB001B"/>
            <circle cx="22" cy="10" r="9" fill="#F79E1B"/>
            <path d="M16 3.65a8.96 8.96 0 0 1 0 12.7 8.96 8.96 0 0 1 0-12.7z" fill="#FF5F00"/>
        </svg>`;
    }
}

function createPierreCardElement(card, invoiceAmount, isPaid, limitPct, availableLimit, monthKey, isFullView = false) {
    const cardDiv = document.createElement('div');
    cardDiv.className = `pierre-card style-${card.style || 'purple-dark'}`;

    const invoiceStatusLabel = isPaid 
        ? `<span class="badge badge-income" style="font-size:10px;">Fatura Paga</span>` 
        : (invoiceAmount > 0 
            ? `<span class="badge badge-card" style="font-size:10px;">Fatura Aberta</span>` 
            : `<span class="badge badge-account" style="font-size:10px;">Sem Gastos</span>`);

    const bankName = getCardBankName(card);
    const brandIcon = getCardBrandIcon(card.brand);

    cardDiv.innerHTML = `
        <div class="card-top-row">
            <div class="card-bank-info">
                <div class="card-brand-icon-wrapper">
                    ${brandIcon}
                </div>
                <span class="card-bank-name">${bankName}</span>
            </div>
            <div class="card-top-actions">
                <button class="btn-card-kebab" onclick="openCardModal('${card.id}')" title="Editar Cartão">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                        <circle cx="12" cy="5" r="2"></circle>
                        <circle cx="12" cy="12" r="2"></circle>
                        <circle cx="12" cy="19" r="2"></circle>
                    </svg>
                </button>
            </div>
        </div>

        <div class="card-mid-row">
            ${invoiceStatusLabel}
        </div>

        <div class="card-bottom-row">
            <div class="card-invoice-info">
                <div class="invoice-val-group">
                    <span class="invoice-label">Fatura Atual:</span>
                    <span class="invoice-value">R$ ${formatCurrency(invoiceAmount)}</span>
                </div>
                <div class="card-dates">
                    <span>Fecha: <strong>${card.closingDay}</strong></span> | 
                    <span>Vence: <strong>${card.dueDay}</strong></span>
                </div>
            </div>

            <div class="limit-track">
                <div class="limit-fill" style="width: ${limitPct}%;"></div>
            </div>
            <div class="limit-labels">
                <span>Usado: ${limitPct}%</span>
                <span>Disp: R$ ${formatCurrency(availableLimit)}</span>
            </div>

            <div class="card-quick-actions">
                ${!isPaid && invoiceAmount > 0 ? `
                    <button class="btn-card-action btn-card-pay" onclick="openPayInvoiceModal('${card.id}')">
                        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="20 6 9 17 4 12"></polyline></svg>
                        Pagar Fatura
                    </button>
                ` : ''}
                <button class="btn-card-action btn-card-edit" onclick="openCardModal('${card.id}')">
                    Editar
                </button>
            </div>
        </div>
    `;

    return cardDiv;
}

// Renderiza Contas Bancárias Mobills
function renderMobillsAccounts() {
    dashboardAccountsGrid.innerHTML = '';
    accountsFullListEl.innerHTML = '';

    if (accounts.length === 0) {
        const emptyMsg = `<p class="text-muted" style="font-size:13px; padding: 20px;">Nenhuma conta cadastrada.</p>`;
        dashboardAccountsGrid.innerHTML = emptyMsg;
        accountsFullListEl.innerHTML = emptyMsg;
        return;
    }

    accounts.forEach(acc => {
        const accItem = document.createElement('div');
        accItem.className = 'account-item-card';

        const typeLabels = {
            checking: 'Conta Corrente',
            savings: 'Poupança',
            wallet: 'Carteira / Dinheiro',
            investment: 'Investimentos'
        };

        accItem.innerHTML = `
            <div class="acc-left-group">
                <div class="acc-bank-icon" style="background-color: ${acc.color || '#820ad1'};">
                    ${getBankInitials(acc.institution, acc.name)}
                </div>
                <div class="acc-info">
                    <span class="acc-name">${acc.name}</span>
                    <span class="acc-type-pill">${typeLabels[acc.type] || 'Conta'}</span>
                </div>
            </div>
            <div class="acc-right-group">
                <span class="acc-balance-val">R$ ${formatCurrency(acc.balance)}</span>
                <div class="acc-actions">
                    <button class="btn-acc-action" title="Editar conta" onclick="openAccountModal('${acc.id}')">
                        <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path><path d="M18.5 2.5a2.121 2.121 0 1 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path></svg>
                    </button>
                </div>
            </div>
        `;
        dashboardAccountsGrid.appendChild(accItem);

        // Expanded item
        const fullItem = accItem.cloneNode(true);
        const actionsDiv = fullItem.querySelector('.acc-actions');
        const deleteBtn = document.createElement('button');
        deleteBtn.className = 'btn-acc-action delete';
        deleteBtn.title = 'Excluir conta';
        deleteBtn.innerHTML = `<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="3 6 5 6 21 6"></polyline><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path></svg>`;
        deleteBtn.onclick = () => deleteAccount(acc.id);
        actionsDiv.appendChild(deleteBtn);
        accountsFullListEl.appendChild(fullItem);
    });
}

function getBankInitials(institution, name) {
    if (institution === 'nubank') return 'Nu';
    if (institution === 'inter') return 'IN';
    if (institution === 'itau') return 'IT';
    if (institution === 'bradesco') return 'BD';
    if (institution === 'santander') return 'ST';
    if (institution === 'caixa') return 'CX';
    if (institution === 'carteira') return '💵';
    return (name || 'BK').substring(0, 2).toUpperCase();
}

function populateSelectDropdowns() {
    const txAccountSelect = document.getElementById('tx-account-select');
    txAccountSelect.innerHTML = '';
    accounts.forEach(a => {
        txAccountSelect.innerHTML += `<option value="${a.id}">${a.name} (R$ ${formatCurrency(a.balance)})</option>`;
    });

    const txCardSelect = document.getElementById('tx-card-select');
    txCardSelect.innerHTML = '';
    cards.forEach(c => {
        txCardSelect.innerHTML += `<option value="${c.id}">${getCardBankName(c)}${c.digits ? ` (Final ${c.digits})` : ''}</option>`;
    });

    const transferFromSelect = document.getElementById('transfer-from-select');
    const transferToSelect = document.getElementById('transfer-to-select');
    const txTransferFrom = document.getElementById('tx-transfer-from');
    const txTransferTo = document.getElementById('tx-transfer-to');

    [transferFromSelect, txTransferFrom].forEach(select => {
        if (!select) return;
        select.innerHTML = '';
        accounts.forEach(a => select.innerHTML += `<option value="${a.id}">${a.name} (R$ ${formatCurrency(a.balance)})</option>`);
    });

    [transferToSelect, txTransferTo].forEach(select => {
        if (!select) return;
        select.innerHTML = '';
        accounts.forEach(a => select.innerHTML += `<option value="${a.id}">${a.name} (R$ ${formatCurrency(a.balance)})</option>`);
        if (select.options.length > 1) select.selectedIndex = 1;
    });

    const payInvoiceAccount = document.getElementById('pay-invoice-account');
    payInvoiceAccount.innerHTML = '';
    accounts.forEach(a => {
        payInvoiceAccount.innerHTML += `<option value="${a.id}">${a.name} (Saldo: R$ ${formatCurrency(a.balance)})</option>`;
    });

    filterAccountCardSelect.innerHTML = `<option value="all">Todas as Contas & Cartões</option>`;
    if (accounts.length > 0) {
        filterAccountCardSelect.innerHTML += `<optgroup label="Contas Bancárias">`;
        accounts.forEach(a => filterAccountCardSelect.innerHTML += `<option value="acc:${a.id}">Conta: ${a.name}</option>`);
        filterAccountCardSelect.innerHTML += `</optgroup>`;
    }
    if (cards.length > 0) {
        filterAccountCardSelect.innerHTML += `<optgroup label="Cartões de Crédito">`;
        cards.forEach(c => filterAccountCardSelect.innerHTML += `<option value="card:${c.id}">Cartão: ${c.name}</option>`);
        filterAccountCardSelect.innerHTML += `</optgroup>`;
    }
}

// ==========================================================================
// 9. Donut Chart with Center Total & Balanço Mensal Bar Chart (Image 1)
// ==========================================================================

function renderDashboardCategoryDonutChart(activeMonthKey) {
    const canvas = document.getElementById('dashboardCategoryChart');
    if (!canvas) return;
    const ctx = canvas.getContext('2d');

    const activeYear = currentActiveDate.getFullYear();
    const activeMonth = currentActiveDate.getMonth();

    const categoryTotals = {};
    let totalExpense = 0;

    transactions.forEach(t => {
        if (t.type !== 'expense') return;

        let inPeriod = false;
        if (t.paymentMethod === 'card') {
            inPeriod = (t.invoiceMonth === activeMonthKey);
        } else {
            const tDate = new Date(t.date + 'T00:00:00');
            inPeriod = (tDate.getFullYear() === activeYear && tDate.getMonth() === activeMonth);
        }

        if (inPeriod) {
            const cat = t.category || 'others';
            categoryTotals[cat] = (categoryTotals[cat] || 0) + t.value;
            totalExpense += t.value;
        }
    });

    // Update central total overlay
    document.getElementById('donut-center-amount').textContent = `R$ ${formatCurrency(totalExpense)}`;

    const categoryColors = {
        food: '#ec4899',
        housing: '#f59e0b',
        transport: '#3b82f6',
        entertainment: '#a855f7',
        health: '#ef4444',
        education: '#10b981',
        services: '#8b5cf6',
        salary: '#06b6d4',
        investment: '#84cc16',
        others: '#64748b'
    };

    const labels = Object.keys(categoryTotals).map(cat => getCategoryLabel(cat));
    const dataValues = Object.keys(categoryTotals).map(cat => categoryTotals[cat]);
    const backgroundColors = Object.keys(categoryTotals).map(cat => categoryColors[cat] || '#8b5cf6');

    if (dashboardCategoryChartInstance) dashboardCategoryChartInstance.destroy();

    const legendEl = document.getElementById('dashboard-donut-legend');
    legendEl.innerHTML = '';

    if (totalExpense > 0) {
        dashboardCategoryChartInstance = new Chart(ctx, {
            type: 'doughnut',
            data: {
                labels,
                datasets: [{
                    data: dataValues,
                    backgroundColor: backgroundColors,
                    borderColor: isLightTheme ? '#ffffff' : '#12131b',
                    borderWidth: 2,
                    hoverOffset: 4
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: { legend: { display: false } },
                cutout: '72%'
            }
        });

        Object.keys(categoryTotals).slice(0, 5).forEach(cat => {
            const val = categoryTotals[cat];
            const item = document.createElement('div');
            item.className = 'mini-legend-item';
            item.innerHTML = `
                <div class="mini-legend-label">
                    <span class="mini-color-dot" style="background-color: ${categoryColors[cat] || '#8b5cf6'};"></span>
                    <span>${getCategoryLabel(cat)}</span>
                </div>
                <span class="mini-legend-val">R$ ${formatCurrency(val)}</span>
            `;
            legendEl.appendChild(item);
        });
    } else {
        legendEl.innerHTML = '<p class="text-muted" style="font-size: 11px;">Sem despesas no mês.</p>';
    }
}

// Balanço Mensal Bar Chart (Green = Receitas, Red = Despesas, Purple = Saldo Líquido)
function renderMonthlyBalanceBarChart(income, expense) {
    const canvas = document.getElementById('monthlyBalanceChart');
    if (!canvas) return;
    const ctx = canvas.getContext('2d');

    if (monthlyBalanceChartInstance) monthlyBalanceChartInstance.destroy();

    const net = income - expense;

    monthlyBalanceChartInstance = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: ['Receitas', 'Despesas', 'Saldo'],
            datasets: [{
                data: [income, expense, net],
                backgroundColor: [
                    '#10b981',
                    '#ef4444',
                    net >= 0 ? '#8b5cf6' : '#f97316'
                ],
                borderRadius: 8,
                barPercentage: 0.55
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: { display: false },
                tooltip: {
                    callbacks: {
                        label: function (context) {
                            return `R$ ${formatCurrency(context.raw)}`;
                        }
                    }
                }
            },
            scales: {
                y: {
                    grid: { color: isLightTheme ? 'rgba(0,0,0,0.05)' : 'rgba(255,255,255,0.05)' },
                    ticks: {
                        color: isLightTheme ? '#64748b' : '#9ca3af',
                        callback: function (val) { return 'R$ ' + formatCurrency(val); }
                    }
                },
                x: {
                    grid: { display: false },
                    ticks: { color: isLightTheme ? '#64748b' : '#9ca3af', font: { weight: '600' } }
                }
            }
        }
    });
}

// Expanded Category Chart for Distribution View (Image 3)
function renderExpandedCategoryChart() {
    const canvas = document.getElementById('categoryChart');
    if (!canvas) return;
    const ctx = canvas.getContext('2d');

    const activeMonthKey = getMonthKey(currentActiveDate);
    const activeYear = currentActiveDate.getFullYear();
    const activeMonth = currentActiveDate.getMonth();

    const categoryTotals = {};
    let grandTotal = 0;

    transactions.forEach(t => {
        if (t.type !== distActiveType) return;

        let inPeriod = false;
        if (t.paymentMethod === 'card') {
            inPeriod = (t.invoiceMonth === activeMonthKey);
        } else {
            const tDate = new Date(t.date + 'T00:00:00');
            inPeriod = (tDate.getFullYear() === activeYear && tDate.getMonth() === activeMonth);
        }

        if (inPeriod) {
            const cat = t.category || 'others';
            categoryTotals[cat] = (categoryTotals[cat] || 0) + t.value;
            grandTotal += t.value;
        }
    });

    document.getElementById('donut-center-amount-exp').textContent = `R$ ${formatCurrency(grandTotal)}`;

    const categoryColors = {
        food: '#ec4899',
        housing: '#f59e0b',
        transport: '#3b82f6',
        entertainment: '#a855f7',
        health: '#ef4444',
        education: '#10b981',
        services: '#8b5cf6',
        salary: '#06b6d4',
        investment: '#84cc16',
        others: '#64748b'
    };

    const labels = Object.keys(categoryTotals).map(cat => getCategoryLabel(cat));
    const dataValues = Object.keys(categoryTotals).map(cat => categoryTotals[cat]);
    const backgroundColors = Object.keys(categoryTotals).map(cat => categoryColors[cat] || '#8b5cf6');

    if (categoryChartInstance) categoryChartInstance.destroy();

    const legendContainer = document.getElementById('donut-legend');
    legendContainer.innerHTML = '';

    if (grandTotal > 0) {
        categoryChartInstance = new Chart(ctx, {
            type: 'doughnut',
            data: {
                labels,
                datasets: [{
                    data: dataValues,
                    backgroundColor: backgroundColors,
                    borderColor: isLightTheme ? '#ffffff' : '#12131b',
                    borderWidth: 3,
                    hoverOffset: 6
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: { legend: { display: false } },
                cutout: '72%'
            }
        });

        Object.keys(categoryTotals).forEach(cat => {
            const val = categoryTotals[cat];
            const pct = ((val / grandTotal) * 100).toFixed(1);
            const item = document.createElement('div');
            item.className = 'legend-item-card';
            item.innerHTML = `
                <div class="legend-item-left">
                    <div class="category-round-icon" style="background-color: ${categoryColors[cat] || '#8b5cf6'};">
                        ${getCategoryEmoji(cat)}
                    </div>
                    <div class="category-name-wrap">
                        <span class="cat-label">${getCategoryLabel(cat)}</span>
                        <span class="cat-pct">${pct}% do total</span>
                    </div>
                </div>
                <span class="cat-val">R$ ${formatCurrency(val)}</span>
            `;
            legendContainer.appendChild(item);
        });
    } else {
        legendContainer.innerHTML = '<p class="text-center text-muted" style="font-size: 13px; margin-top:20px;">Nenhum registro para detalhar neste mês.</p>';
    }
}

// Financial Evolution Line Chart
function renderFinancialEvolutionChart() {
    const canvas = document.getElementById('balanceChart');
    if (!canvas) return;
    const ctx = canvas.getContext('2d');

    const activeYear = currentActiveDate.getFullYear();
    const activeMonth = currentActiveDate.getMonth();

    const chronoTransactions = [...transactions]
        .filter(t => {
            const tDate = new Date(t.date + 'T00:00:00');
            return tDate.getFullYear() === activeYear && tDate.getMonth() === activeMonth;
        })
        .sort((a, b) => new Date(a.date) - new Date(b.date));

    const dateGroups = {};
    chronoTransactions.forEach(t => {
        if (!dateGroups[t.date]) dateGroups[t.date] = 0;
        if (t.type === 'income') dateGroups[t.date] += t.value;
        else if (t.type === 'expense') dateGroups[t.date] -= t.value;
    });

    const sortedDates = Object.keys(dateGroups).sort((a, b) => new Date(a) - new Date(b));
    const labels = [];
    const balanceTimeline = [];
    let runningNet = 0;

    if (sortedDates.length === 0) {
        labels.push('Sem lançamentos');
        balanceTimeline.push(0);
    } else {
        sortedDates.forEach(dateStr => {
            runningNet += dateGroups[dateStr];
            balanceTimeline.push(runningNet);
            const parts = dateStr.split('-');
            labels.push(`${parts[2]}/${parts[1]}`);
        });
    }

    const gradient = ctx.createLinearGradient(0, 0, 0, 240);
    gradient.addColorStop(0, 'rgba(139, 92, 246, 0.35)');
    gradient.addColorStop(1, 'rgba(139, 92, 246, 0.0)');

    if (balanceChartInstance) balanceChartInstance.destroy();

    balanceChartInstance = new Chart(ctx, {
        type: 'line',
        data: {
            labels,
            datasets: [{
                label: 'Fluxo Líquido (R$)',
                data: balanceTimeline,
                borderColor: '#8b5cf6',
                borderWidth: 3,
                backgroundColor: gradient,
                fill: true,
                tension: 0.4,
                pointBackgroundColor: '#8b5cf6',
                pointBorderColor: '#ffffff',
                pointRadius: 4
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: { legend: { display: false } },
            scales: {
                y: {
                    grid: { color: isLightTheme ? 'rgba(0,0,0,0.05)' : 'rgba(255,255,255,0.05)' },
                    ticks: { color: isLightTheme ? '#64748b' : '#9ca3af' }
                },
                x: {
                    grid: { display: false },
                    ticks: { color: isLightTheme ? '#64748b' : '#9ca3af' }
                }
            }
        }
    });
}

// ==========================================================================
// 10. Transactions List (Mobills Style)
// ==========================================================================

function renderTransactionsList() {
    if (!transactionsListEl) return;
    transactionsListEl.innerHTML = '';

    const activeYear = currentActiveDate.getFullYear();
    const activeMonth = currentActiveDate.getMonth();
    const activeMonthKey = getMonthKey(currentActiveDate);

    const sortedList = [...transactions].sort((a, b) => new Date(b.date) - new Date(a.date));

    // Base filtered by month
    const monthTransactions = sortedList.filter(t => {
        if (t.paymentMethod === 'card') {
            return t.invoiceMonth === activeMonthKey;
        } else {
            const tDate = new Date(t.date + 'T00:00:00');
            return tDate.getFullYear() === activeYear && tDate.getMonth() === activeMonth;
        }
    });

    // 1. Calculate Monthly Totals for 3 Top Summary Cards
    const monthIncomes = monthTransactions.filter(t => t.type === 'income').reduce((s, t) => s + t.value, 0);
    const monthAccExpenses = monthTransactions.filter(t => t.type === 'expense' && t.paymentMethod === 'account').reduce((s, t) => s + t.value, 0);
    const monthCardExpenses = monthTransactions.filter(t => t.paymentMethod === 'card').reduce((s, t) => s + t.value, 0);
    const monthTotalExpenses = monthAccExpenses + monthCardExpenses;
    const openInvoicesTotal = calculateTotalOpenInvoices(activeMonthKey);
    const paidCardExpenses = monthCardExpenses - openInvoicesTotal;
    const transfersList = monthTransactions.filter(t => t.type === 'transfer');
    const transfersTotal = transfersList.reduce((s, t) => s + t.value, 0);

    // Update Summary Cards based on activeFilter
    if (transValPending && transValRealized && transValTotal) {
        if (activeFilter === 'income') {
            transValPending.textContent = `R$ 0,00`;
            transValRealized.textContent = `R$ ${formatCurrency(monthIncomes)}`;
            transValTotal.textContent = `R$ ${formatCurrency(monthIncomes)}`;
            if (transIconPending) transIconPending.className = 'trans-sum-icon-circle circle-green';
            if (transIconRealized) transIconRealized.className = 'trans-sum-icon-circle circle-green';
            if (transIconTotal) transIconTotal.className = 'trans-sum-icon-circle circle-green';
        } else if (activeFilter === 'expense') {
            transValPending.textContent = `R$ ${formatCurrency(openInvoicesTotal)}`;
            transValRealized.textContent = `R$ ${formatCurrency(monthAccExpenses + Math.max(0, paidCardExpenses))}`;
            transValTotal.textContent = `R$ ${formatCurrency(monthTotalExpenses)}`;
            if (transIconPending) transIconPending.className = 'trans-sum-icon-circle circle-red';
            if (transIconRealized) transIconRealized.className = 'trans-sum-icon-circle circle-red';
            if (transIconTotal) transIconTotal.className = 'trans-sum-icon-circle circle-red';
        } else if (activeFilter === 'card-expense') {
            transValPending.textContent = `R$ ${formatCurrency(openInvoicesTotal)}`;
            transValRealized.textContent = `R$ ${formatCurrency(Math.max(0, paidCardExpenses))}`;
            transValTotal.textContent = `R$ ${formatCurrency(monthCardExpenses)}`;
            if (transIconPending) transIconPending.className = 'trans-sum-icon-circle circle-teal';
            if (transIconRealized) transIconRealized.className = 'trans-sum-icon-circle circle-teal';
            if (transIconTotal) transIconTotal.className = 'trans-sum-icon-circle circle-teal';
        } else if (activeFilter === 'account-expense') {
            transValPending.textContent = `R$ 0,00`;
            transValRealized.textContent = `R$ ${formatCurrency(monthAccExpenses)}`;
            transValTotal.textContent = `R$ ${formatCurrency(monthAccExpenses)}`;
            if (transIconPending) transIconPending.className = 'trans-sum-icon-circle circle-red';
            if (transIconRealized) transIconRealized.className = 'trans-sum-icon-circle circle-red';
            if (transIconTotal) transIconTotal.className = 'trans-sum-icon-circle circle-red';
        } else if (activeFilter === 'transfer') {
            transValPending.textContent = `R$ ${formatCurrency(transfersTotal)}`;
            transValRealized.textContent = `${transfersList.length} registros`;
            transValTotal.textContent = `R$ ${formatCurrency(transfersTotal)}`;
            if (transIconPending) transIconPending.className = 'trans-sum-icon-circle circle-blue';
            if (transIconRealized) transIconRealized.className = 'trans-sum-icon-circle circle-blue';
            if (transIconTotal) transIconTotal.className = 'trans-sum-icon-circle circle-blue';
        } else {
            // 'all'
            transValPending.textContent = `R$ ${formatCurrency(monthIncomes)}`;
            transValRealized.textContent = `R$ ${formatCurrency(monthTotalExpenses)}`;
            const netBalance = monthIncomes - monthTotalExpenses;
            transValTotal.textContent = `${netBalance < 0 ? '-' : ''}R$ ${formatCurrency(Math.abs(netBalance))}`;
            if (transIconPending) transIconPending.className = 'trans-sum-icon-circle circle-green';
            if (transIconRealized) transIconRealized.className = 'trans-sum-icon-circle circle-red';
            if (transIconTotal) transIconTotal.className = 'trans-sum-icon-circle circle-blue';
        }
    }

    // 2. Filter list by Category / Type Filter
    let filtered = monthTransactions.filter(t => {
        if (activeFilter === 'all') return true;
        if (activeFilter === 'income') return t.type === 'income';
        if (activeFilter === 'expense') return t.type === 'expense' || t.paymentMethod === 'card';
        if (activeFilter === 'account-expense') return t.type === 'expense' && t.paymentMethod === 'account';
        if (activeFilter === 'card-expense') return t.paymentMethod === 'card';
        if (activeFilter === 'transfer') return t.type === 'transfer';
        return true;
    });

    if (filterAccountCardId !== 'all') {
        const [filterType, filterId] = filterAccountCardId.split(':');
        filtered = filtered.filter(t => {
            if (filterType === 'acc') {
                return (t.accountId === filterId) || (t.type === 'transfer' && (t.fromAccountId === filterId || t.toAccountId === filterId));
            } else if (filterType === 'card') {
                return t.cardId === filterId;
            }
            return true;
        });
    }

    if (searchQuery) {
        filtered = filtered.filter(t => t.description.toLowerCase().includes(searchQuery));
    }

    if (filtered.length === 0) {
        if (emptyStateEl) emptyStateEl.style.display = 'flex';
        const table = document.querySelector('.transactions-table');
        if (table) table.style.display = 'none';
        return;
    }

    if (emptyStateEl) emptyStateEl.style.display = 'none';
    const table = document.querySelector('.transactions-table');
    if (table) table.style.display = 'table';

    filtered.forEach(t => {
        const row = document.createElement('tr');
        const dateObj = new Date(t.date + 'T00:00:00');
        const formattedDate = dateObj.toLocaleDateString('pt-BR');

        let methodBadge = '';
        if (t.type === 'transfer') {
            const fromAcc = accounts.find(a => a.id === t.fromAccountId);
            const toAcc = accounts.find(a => a.id === t.toAccountId);
            methodBadge = `<span class="badge badge-transfer">${fromAcc ? fromAcc.name : 'Origem'} ➔ ${toAcc ? toAcc.name : 'Destino'}</span>`;
        } else if (t.paymentMethod === 'card') {
            const card = cards.find(c => c.id === t.cardId);
            const instBadge = t.installments && t.installments.total > 1 ? ` (${t.installments.current}/${t.installments.total})` : '';
            methodBadge = `<span class="badge badge-card">💳 ${card ? getCardBankName(card) : 'Cartão'}${instBadge}</span>`;
        } else {
            const acc = accounts.find(a => a.id === t.accountId);
            methodBadge = `<span class="badge badge-account">🏦 ${acc ? acc.name : 'Conta'}</span>`;
        }

        let valClass = 'text-red';
        let valPrefix = '-';
        let situationClass = 'paid';
        let situationTitle = 'Pago';

        if (t.type === 'income') {
            valClass = 'text-green';
            valPrefix = '+';
            situationClass = 'received';
            situationTitle = 'Recebido';
        } else if (t.type === 'transfer') {
            valClass = 'text-purple';
            valPrefix = '⇄';
            situationClass = 'paid';
            situationTitle = 'Transferido';
        } else if (t.paymentMethod === 'card') {
            const isPaid = isInvoicePaid(t.cardId, t.invoiceMonth);
            situationClass = isPaid ? 'paid' : 'pending';
            situationTitle = isPaid ? 'Fatura Paga' : 'Fatura Aberta';
        }

        row.innerHTML = `
            <td class="th-check"><input type="checkbox" class="tx-check-item" data-id="${t.id}"></td>
            <td class="text-center"><span class="trans-situation-dot ${situationClass}" title="${situationTitle}"></span></td>
            <td class="trans-date">${formattedDate}</td>
            <td class="trans-desc">
                <div class="trans-desc-wrapper">
                    <span>${getCategoryEmoji(t.category)}</span>
                    <span class="font-semibold">${t.description}</span>
                </div>
            </td>
            <td><span class="badge badge-account">${getCategoryLabel(t.category)}</span></td>
            <td>${methodBadge}</td>
            <td class="text-right font-semibold ${valClass}">
                ${valPrefix} R$ ${formatCurrency(t.value)}
            </td>
            <td class="text-center">
                <button class="btn-edit" title="Editar" onclick="editTransaction('${t.id}')">
                    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path><path d="M18.5 2.5a2.121 2.121 0 1 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path></svg>
                </button>
                <button class="btn-delete" title="Excluir" onclick="deleteTransaction('${t.id}')">
                    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="3 6 5 6 21 6"></polyline><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path></svg>
                </button>
            </td>
        `;
        transactionsListEl.appendChild(row);
    });
}

function getCategoryEmoji(category) {
    const emojis = {
        food: '🍽️', housing: '🏠', transport: '🚗', entertainment: '🎉',
        health: '💊', education: '📚', services: '⚡', salary: '💼',
        investment: '📈', transfer: '⇄', others: '📦'
    };
    return emojis[category] || '📦';
}

function getCategoryLabel(category) {
    const labels = {
        food: 'Alimentação', housing: 'Moradia', transport: 'Transporte',
        entertainment: 'Lazer', health: 'Saúde', education: 'Educação',
        services: 'Serviços', salary: 'Salário', investment: 'Investimentos',
        transfer: 'Transferência', others: 'Diversos'
    };
    return labels[category] || 'Outros';
}

// ==========================================================================
// 11. Transaction Modal & CRUD
// ==========================================================================

function updateTransactionFormVisibility() {
    const type = document.querySelector('input[name="tx-operation-type"]:checked').value;
    const paymentMethod = document.querySelector('input[name="payment-method"]:checked').value;

    const paymentMethodGroup = document.getElementById('payment-method-group');
    const accountSelectGroup = document.getElementById('account-select-group');
    const cardSelectGroup = document.getElementById('card-select-group');
    const transferAccountsGroup = document.getElementById('transfer-accounts-group');
    const installmentsGroup = document.getElementById('installments-group');
    const accountSelectLabel = document.getElementById('account-select-label');
    const expenseNatureGroup = document.getElementById('expense-nature-group');

    if (type === 'income') {
        paymentMethodGroup.style.display = 'none';
        accountSelectGroup.style.display = 'block';
        cardSelectGroup.style.display = 'none';
        transferAccountsGroup.style.display = 'none';
        installmentsGroup.style.display = 'none';
        accountSelectLabel.textContent = 'Conta de Destino (Onde entra o valor)';
        expenseNatureGroup.style.display = 'none';
    } else if (type === 'expense') {
        paymentMethodGroup.style.display = 'block';
        transferAccountsGroup.style.display = 'none';
        expenseNatureGroup.style.display = 'block';

        if (paymentMethod === 'card') {
            accountSelectGroup.style.display = 'none';
            cardSelectGroup.style.display = 'block';
            installmentsGroup.style.display = 'block';
        } else {
            accountSelectGroup.style.display = 'block';
            cardSelectGroup.style.display = 'none';
            installmentsGroup.style.display = 'none';
            accountSelectLabel.textContent = 'Conta de Débito (De onde sai o valor)';
        }
    } else if (type === 'transfer') {
        paymentMethodGroup.style.display = 'none';
        accountSelectGroup.style.display = 'none';
        cardSelectGroup.style.display = 'none';
        transferAccountsGroup.style.display = 'grid';
        installmentsGroup.style.display = 'none';
        expenseNatureGroup.style.display = 'none';
    }
}

function openTransactionModal(preferredType = null) {
    transactionModal.classList.add('open');
    document.getElementById('date').value = new Date().toISOString().split('T')[0];
    
    if (preferredType === 'income') {
        document.getElementById('type-income').checked = true;
    } else if (preferredType === 'expense') {
        document.getElementById('type-expense').checked = true;
    }

    updateTransactionFormVisibility();
    document.getElementById('desc').focus();
}

function closeTransactionModal() {
    transactionModal.classList.remove('open');
    transactionForm.reset();
    editTxIdEl.value = '';
    modalTitleEl.textContent = 'Novo Lançamento';
    document.getElementById('type-income').checked = true;
    document.getElementById('method-account').checked = true;
    updateTransactionFormVisibility();
}

function handleTransactionSubmit(e) {
    e.preventDefault();

    const desc = document.getElementById('desc').value.trim();
    const val = parseFloat(document.getElementById('val').value);
    const date = document.getElementById('date').value;
    const type = document.querySelector('input[name="tx-operation-type"]:checked').value;
    const editId = editTxIdEl.value;

    if (!desc || isNaN(val) || val <= 0 || !date) {
        showToast('Preencha os campos obrigatórios corretamente.');
        return;
    }

    let paymentMethod = 'account';
    let accountId = null;
    let cardId = null;
    let fromAccountId = null;
    let toAccountId = null;
    let category = document.getElementById('category').value;
    let expenseNature = document.getElementById('expense-nature').value;
    let installmentsCount = 1;
    let invoiceMonth = null;

    if (type === 'income') {
        accountId = document.getElementById('tx-account-select').value;
    } else if (type === 'expense') {
        paymentMethod = document.querySelector('input[name="payment-method"]:checked').value;
        if (paymentMethod === 'card') {
            cardId = document.getElementById('tx-card-select').value;
            installmentsCount = parseInt(document.getElementById('tx-installments').value, 10) || 1;
            invoiceMonth = calculateInvoiceMonth(date, cardId);
        } else {
            accountId = document.getElementById('tx-account-select').value;
        }
    } else if (type === 'transfer') {
        fromAccountId = document.getElementById('tx-transfer-from').value;
        toAccountId = document.getElementById('tx-transfer-to').value;
        category = 'transfer';

        if (fromAccountId === toAccountId) {
            showToast('As contas de origem e destino devem ser diferentes.');
            return;
        }
    }

    if (editId) {
        const index = transactions.findIndex(t => t.id === editId);
        if (index !== -1) {
            const oldTx = transactions[index];
            revertAccountBalanceEffect(oldTx);

            oldTx.description = desc;
            oldTx.value = val;
            oldTx.date = date;
            oldTx.type = type;
            oldTx.paymentMethod = paymentMethod;
            oldTx.accountId = accountId;
            oldTx.cardId = cardId;
            oldTx.fromAccountId = fromAccountId;
            oldTx.toAccountId = toAccountId;
            oldTx.category = category;
            oldTx.expenseNature = expenseNature;
            oldTx.invoiceMonth = paymentMethod === 'card' ? invoiceMonth : null;

            applyAccountBalanceEffect(oldTx);

            saveData('transactions');
            saveData('accounts');
            closeTransactionModal();
            updateDashboard();
            showToast(`"${desc}" atualizado com sucesso!`);
        }
    } else {
        if (type === 'expense' && paymentMethod === 'card' && installmentsCount > 1) {
            const installmentVal = parseFloat((val / installmentsCount).toFixed(2));
            const baseDate = new Date(date + 'T00:00:00');

            for (let i = 1; i <= installmentsCount; i++) {
                const instDate = new Date(baseDate.getFullYear(), baseDate.getMonth() + (i - 1), baseDate.getDate());
                const instDateStr = instDate.toISOString().split('T')[0];
                const instInvoiceMonth = calculateInvoiceMonth(instDateStr, cardId);

                const newTx = {
                    id: `${Date.now()}_${i}`,
                    description: `${desc} (${i}/${installmentsCount})`,
                    value: installmentVal,
                    type: 'expense',
                    paymentMethod: 'card',
                    accountId: null,
                    cardId: cardId,
                    category: category,
                    expenseNature: expenseNature,
                    date: instDateStr,
                    invoiceMonth: instInvoiceMonth,
                    installments: { current: i, total: installmentsCount }
                };
                transactions.push(newTx);
            }
        } else {
            const newTx = {
                id: Date.now().toString(),
                description: desc,
                value: val,
                type: type,
                paymentMethod: paymentMethod,
                accountId: accountId,
                cardId: cardId,
                fromAccountId: fromAccountId,
                toAccountId: toAccountId,
                category: category,
                expenseNature: expenseNature,
                date: date,
                invoiceMonth: invoiceMonth,
                installments: { current: 1, total: 1 }
            };
            applyAccountBalanceEffect(newTx);
            transactions.push(newTx);
        }

        saveData('transactions');
        saveData('accounts');
        closeTransactionModal();
        updateDashboard();
        showToast(`"${desc}" lançado com sucesso!`);
    }
}

function applyAccountBalanceEffect(tx) {
    if (tx.type === 'income' && tx.accountId) {
        const acc = accounts.find(a => a.id === tx.accountId);
        if (acc) acc.balance += tx.value;
    } else if (tx.type === 'expense' && tx.paymentMethod === 'account' && tx.accountId) {
        const acc = accounts.find(a => a.id === tx.accountId);
        if (acc) acc.balance -= tx.value;
    } else if (tx.type === 'transfer' && tx.fromAccountId && tx.toAccountId) {
        const from = accounts.find(a => a.id === tx.fromAccountId);
        const to = accounts.find(a => a.id === tx.toAccountId);
        if (from) from.balance -= tx.value;
        if (to) to.balance += tx.value;
    }
}

function revertAccountBalanceEffect(tx) {
    if (tx.type === 'income' && tx.accountId) {
        const acc = accounts.find(a => a.id === tx.accountId);
        if (acc) acc.balance -= tx.value;
    } else if (tx.type === 'expense' && tx.paymentMethod === 'account' && tx.accountId) {
        const acc = accounts.find(a => a.id === tx.accountId);
        if (acc) acc.balance += tx.value;
    } else if (tx.type === 'transfer' && tx.fromAccountId && tx.toAccountId) {
        const from = accounts.find(a => a.id === tx.fromAccountId);
        const to = accounts.find(a => a.id === tx.toAccountId);
        if (from) from.balance += tx.value;
        if (to) to.balance -= tx.value;
    }
}

function editTransaction(id) {
    const tx = transactions.find(t => t.id === id);
    if (!tx) return;

    editTxIdEl.value = tx.id;
    modalTitleEl.textContent = 'Editar Lançamento';

    document.getElementById('desc').value = tx.description;
    document.getElementById('val').value = tx.value;
    document.getElementById('date').value = tx.date;

    if (tx.type === 'income') {
        document.getElementById('type-income').checked = true;
        if (tx.accountId) document.getElementById('tx-account-select').value = tx.accountId;
    } else if (tx.type === 'expense') {
        document.getElementById('type-expense').checked = true;
        if (tx.paymentMethod === 'card') {
            document.getElementById('method-card').checked = true;
            if (tx.cardId) document.getElementById('tx-card-select').value = tx.cardId;
        } else {
            document.getElementById('method-account').checked = true;
            if (tx.accountId) document.getElementById('tx-account-select').value = tx.accountId;
        }
        if (tx.expenseNature) document.getElementById('expense-nature').value = tx.expenseNature;
    } else if (tx.type === 'transfer') {
        document.getElementById('type-transfer').checked = true;
        if (tx.fromAccountId) document.getElementById('tx-transfer-from').value = tx.fromAccountId;
        if (tx.toAccountId) document.getElementById('tx-transfer-to').value = tx.toAccountId;
    }

    if (tx.category) document.getElementById('category').value = tx.category;

    updateTransactionFormVisibility();
    transactionModal.classList.add('open');
}

function deleteTransaction(id) {
    const index = transactions.findIndex(t => t.id === id);
    if (index !== -1) {
        const tx = transactions[index];
        revertAccountBalanceEffect(tx);
        const desc = tx.description;
        transactions.splice(index, 1);
        saveData('transactions');
        saveData('accounts');
        updateDashboard();
        showToast(`"${desc}" excluído com sucesso.`);
    }
}

// ==========================================================================
// 12. Account & Card Modals
// ==========================================================================

function openAccountModal(id = '') {
    accountModal.classList.add('open');
    editAccountIdEl.value = id;

    if (id) {
        const acc = accounts.find(a => a.id === id);
        if (!acc) return;
        accountModalTitleEl.textContent = `Editar Conta "${acc.name}"`;
        document.getElementById('account-name').value = acc.name;
        document.getElementById('account-institution').value = acc.institution || 'nubank';
        document.getElementById('account-type').value = acc.type || 'checking';
        document.getElementById('account-balance').value = acc.balance;
        document.getElementById('account-color-value').value = acc.color || '#820ad1';

        document.querySelectorAll('#account-color-presets .color-circle').forEach(c => {
            if (c.dataset.color === acc.color) c.classList.add('active');
            else c.classList.remove('active');
        });
    } else {
        accountModalTitleEl.textContent = 'Nova Conta Bancária';
        accountForm.reset();
        editAccountIdEl.value = '';
        document.getElementById('account-color-value').value = '#820ad1';
        document.querySelectorAll('#account-color-presets .color-circle').forEach((c, i) => {
            if (i === 0) c.classList.add('active');
            else c.classList.remove('active');
        });
    }
}

function closeAccountModal() {
    accountModal.classList.remove('open');
    accountForm.reset();
    editAccountIdEl.value = '';
}

function handleAccountSubmit(e) {
    e.preventDefault();

    const name = document.getElementById('account-name').value.trim();
    const institution = document.getElementById('account-institution').value;
    const type = document.getElementById('account-type').value;
    const balance = parseFloat(document.getElementById('account-balance').value);
    const color = document.getElementById('account-color-value').value;
    const editId = editAccountIdEl.value;

    if (!name || isNaN(balance)) {
        showToast('Preencha os campos corretamente.');
        return;
    }

    if (editId) {
        const acc = accounts.find(a => a.id === editId);
        if (acc) {
            acc.name = name;
            acc.institution = institution;
            acc.type = type;
            acc.balance = balance;
            acc.color = color;
            showToast(`Conta "${name}" atualizada!`);
        }
    } else {
        const newAcc = { id: `acc-${Date.now()}`, name, institution, type, balance, color };
        accounts.push(newAcc);
        showToast(`Conta "${name}" criada com sucesso!`);
    }

    saveData('accounts');
    closeAccountModal();
    updateDashboard();
}

function deleteAccount(id) {
    const acc = accounts.find(a => a.id === id);
    if (!acc) return;
    if (confirm(`Deseja realmente excluir a conta "${acc.name}"?`)) {
        accounts = accounts.filter(a => a.id !== id);
        saveData('accounts');
        updateDashboard();
        showToast(`Conta "${acc.name}" removida.`);
    }
}

function openCardModal(id = '') {
    cardModal.classList.add('open');
    editCardIdEl.value = id;

    const btnDeleteCard = document.getElementById('btn-delete-card-modal');
    if (btnDeleteCard) {
        btnDeleteCard.style.display = id ? 'block' : 'none';
        btnDeleteCard.onclick = async () => {
            const card = cards.find(c => c.id === id);
            if (!card) return;
            if (confirm(`Deseja realmente excluir o cartão "${card.name}"?`)) {
                cards = cards.filter(c => c.id !== id);
                await saveData('cards');
                closeCardModal();
                updateDashboard();
                showToast(`Cartão "${card.name}" excluído.`);
            }
        };
    }

    if (id) {
        const card = cards.find(c => c.id === id);
        if (!card) return;
        cardModalTitleEl.textContent = `Editar Cartão "${card.name}"`;
        document.getElementById('card-name').value = card.name || '';
        document.getElementById('card-brand').value = card.brand || 'mastercard';
        document.getElementById('card-digits').value = card.digits || '';
        document.getElementById('card-limit').value = card.limit || '';
        document.getElementById('card-closing-day').value = card.closingDay || 25;
        document.getElementById('card-due-day').value = card.dueDay || 2;
        document.getElementById('card-style-value').value = card.style || 'purple-dark';

        document.querySelectorAll('#card-style-presets .card-preset').forEach(c => {
            if (c.dataset.style === card.style) c.classList.add('active');
            else c.classList.remove('active');
        });
    } else {
        cardModalTitleEl.textContent = 'Novo Cartão de Crédito';
        cardForm.reset();
        editCardIdEl.value = '';
        document.getElementById('card-style-value').value = 'purple-dark';
        document.querySelectorAll('#card-style-presets .card-preset').forEach((c, i) => {
            if (i === 0) c.classList.add('active');
            else c.classList.remove('active');
        });
    }
}

function closeCardModal() {
    cardModal.classList.remove('open');
    cardForm.reset();
    editCardIdEl.value = '';
}

async function handleCardSubmit(e) {
    e.preventDefault();

    const name = document.getElementById('card-name').value.trim();
    const brand = document.getElementById('card-brand').value || 'mastercard';
    const digits = document.getElementById('card-digits').value.trim();
    const limit = parseFloat(document.getElementById('card-limit').value);
    const closingDay = parseInt(document.getElementById('card-closing-day').value, 10);
    const dueDay = parseInt(document.getElementById('card-due-day').value, 10);
    const styleInput = document.getElementById('card-style-value');
    const style = (styleInput && styleInput.value && styleInput.value !== 'undefined') ? styleInput.value : 'purple-dark';
    const editId = editCardIdEl.value;

    if (!name || isNaN(limit) || limit <= 0 || isNaN(closingDay) || isNaN(dueDay)) {
        showToast('Preencha os campos obrigatórios corretamente.');
        return;
    }

    if (editId) {
        const card = cards.find(c => c.id === editId);
        if (card) {
            card.name = name;
            card.brand = brand;
            card.digits = digits;
            card.limit = limit;
            card.closingDay = closingDay;
            card.dueDay = dueDay;
            card.style = style;
            showToast(`Cartão "${name}" atualizado!`);
        }
    } else {
        const newCard = {
            id: `card-${Date.now()}`,
            name,
            brand,
            digits: digits || '',
            limit,
            closingDay,
            dueDay,
            style
        };
        cards.push(newCard);
        showToast(`Cartão "${name}" criado com sucesso!`);
    }

    await saveData('cards');
    closeCardModal();
    updateDashboard();
}

// ==========================================================================
// 13. Pay Invoice & Transfer Modals
// ==========================================================================

function openPayInvoiceModal(cardId) {
    const card = cards.find(c => c.id === cardId);
    if (!card) return;

    const activeMonthKey = getMonthKey(currentActiveDate);
    const invoiceAmount = getCardInvoiceAmount(cardId, activeMonthKey);

    document.getElementById('pay-invoice-card-id').value = cardId;
    document.getElementById('pay-invoice-card-name').textContent = getCardBankName(card);
    document.getElementById('pay-invoice-period').textContent = `Fatura ${activeMonthLabelEl.textContent}`;
    document.getElementById('pay-invoice-amount').textContent = `R$ ${formatCurrency(invoiceAmount)}`;
    document.getElementById('pay-invoice-value').value = invoiceAmount.toFixed(2);
    document.getElementById('pay-invoice-date').value = new Date().toISOString().split('T')[0];

    payInvoiceModal.classList.add('open');
}

function closePayInvoiceModal() {
    payInvoiceModal.classList.remove('open');
    payInvoiceForm.reset();
}

function handlePayInvoiceSubmit(e) {
    e.preventDefault();

    const cardId = document.getElementById('pay-invoice-card-id').value;
    const accountId = document.getElementById('pay-invoice-account').value;
    const value = parseFloat(document.getElementById('pay-invoice-value').value);
    const date = document.getElementById('pay-invoice-date').value;
    const activeMonthKey = getMonthKey(currentActiveDate);

    const card = cards.find(c => c.id === cardId);
    const account = accounts.find(a => a.id === accountId);

    if (!card || !account || isNaN(value) || value <= 0) {
        showToast('Dados inválidos para o pagamento.');
        return;
    }

    if (account.balance < value) {
        showToast(`Saldo insuficiente na conta "${account.name}".`);
        return;
    }

    account.balance -= value;

    paidInvoices.push({
        cardId,
        invoiceMonth: activeMonthKey,
        paidDate: date,
        accountId,
        amount: value
    });

    const payTx = {
        id: `tx-pay-${Date.now()}`,
        description: `Pagamento Fatura ${card.name}`,
        value: value,
        type: 'expense',
        paymentMethod: 'account',
        accountId: accountId,
        cardId: null,
        category: 'services',
        expenseNature: 'fixed',
        date: date,
        invoiceMonth: null,
        installments: { current: 1, total: 1 }
    };
    transactions.push(payTx);

    saveData('accounts');
    saveData('invoices');
    saveData('transactions');

    closePayInvoiceModal();
    updateDashboard();
    showToast(`Fatura do cartão "${card.name}" paga com sucesso!`);
}

function openTransferModal() {
    transferModal.classList.add('open');
    document.getElementById('transfer-date').value = new Date().toISOString().split('T')[0];
    document.getElementById('transfer-amount').focus();
}

function closeTransferModal() {
    transferModal.classList.remove('open');
    transferForm.reset();
}

function handleTransferSubmit(e) {
    e.preventDefault();

    const fromId = document.getElementById('transfer-from-select').value;
    const toId = document.getElementById('transfer-to-select').value;
    const amount = parseFloat(document.getElementById('transfer-amount').value);
    const date = document.getElementById('transfer-date').value;
    const desc = document.getElementById('transfer-desc').value.trim() || 'Transferência entre contas';

    if (fromId === toId) {
        showToast('Selecione contas de origem e destino diferentes.');
        return;
    }

    const fromAcc = accounts.find(a => a.id === fromId);
    const toAcc = accounts.find(a => a.id === toId);

    if (!fromAcc || !toAcc || isNaN(amount) || amount <= 0) {
        showToast('Preencha os campos corretamente.');
        return;
    }

    if (fromAcc.balance < amount) {
        showToast(`Saldo insuficiente na conta "${fromAcc.name}".`);
        return;
    }

    fromAcc.balance -= amount;
    toAcc.balance += amount;

    const newTx = {
        id: `tx-trans-${Date.now()}`,
        description: desc,
        value: amount,
        type: 'transfer',
        paymentMethod: 'account',
        accountId: null,
        cardId: null,
        fromAccountId: fromId,
        toAccountId: toId,
        category: 'transfer',
        expenseNature: null,
        date: date,
        invoiceMonth: null,
        installments: { current: 1, total: 1 }
    };
    transactions.push(newTx);

    saveData('accounts');
    saveData('transactions');

    closeTransferModal();
    updateDashboard();
    showToast(`Transferência de R$ ${formatCurrency(amount)} realizada!`);
}

// ==========================================================================
// 14. Goals (Cofrinho) & Project Guidelines
// ==========================================================================

function renderSavingsGoals() {
    const goalsListEl = document.getElementById('goals-list');
    goalsListEl.innerHTML = '';

    if (goals.length === 0) {
        goalsListEl.innerHTML = '<p class="text-center text-muted" style="font-size: 13px; margin-top:20px;">Nenhuma meta ativa.</p>';
        return;
    }

    goals.forEach(g => {
        const pct = Math.min(((g.current / g.target) * 100), 100).toFixed(0);
        const goalItem = document.createElement('div');
        goalItem.className = 'goal-item';
        goalItem.innerHTML = `
            <div class="goal-info-row">
                <span class="goal-title">${g.name}</span>
                <span class="goal-values">R$ ${formatCurrency(g.current)} / R$ ${formatCurrency(g.target)}</span>
            </div>
            <div class="goal-bar-bg">
                <div class="goal-bar-fill" style="width: ${pct}%;"></div>
            </div>
            <div class="goal-actions">
                <button class="btn-goal-act deposit" onclick="openGoalModal('deposit', '${g.id}')">Depositar</button>
                <button class="btn-goal-act withdraw" onclick="openGoalModal('withdraw', '${g.id}')">Retirar</button>
                <button class="btn-goal-act edit" onclick="openGoalModal('edit', '${g.id}')">Editar</button>
                <button class="btn-goal-act delete" onclick="openGoalModal('delete', '${g.id}')">Excluir</button>
            </div>
        `;
        goalsListEl.appendChild(goalItem);
    });
}

function openGoalModal(action, id = '') {
    goalModal.classList.add('open');
    document.getElementById('goal-id-input').value = id;
    document.getElementById('goal-action-input').value = action;

    const goalAddFields = document.getElementById('goal-add-fields');
    const goalValueFields = document.getElementById('goal-value-fields');
    const goalDeleteWarning = document.getElementById('goal-delete-warning');
    const goalNameInput = document.getElementById('goal-name');
    const goalTargetInput = document.getElementById('goal-target');
    const goalValueInput = document.getElementById('goal-value');
    const goalModalTitleEl = document.getElementById('goal-modal-title');
    const goalValueLabel = document.getElementById('goal-value-label');

    goalAddFields.style.display = 'none';
    goalValueFields.style.display = 'none';
    goalDeleteWarning.style.display = 'none';

    goalNameInput.required = false;
    goalTargetInput.required = false;
    goalValueInput.required = false;

    if (action === 'add') {
        goalModalTitleEl.textContent = 'Nova Meta de Poupança';
        goalAddFields.style.display = 'block';
        goalNameInput.required = true;
        goalTargetInput.required = true;
        goalNameInput.value = '';
        goalTargetInput.value = '';
        goalNameInput.focus();
    } else {
        const goal = goals.find(g => g.id === id);
        if (!goal) return;

        if (action === 'deposit') {
            goalModalTitleEl.textContent = `Depositar em "${goal.name}"`;
            goalValueLabel.textContent = 'Valor para Depositar (R$)';
            goalValueFields.style.display = 'block';
            goalValueInput.required = true;
            goalValueInput.value = '';
            goalValueInput.focus();
        } else if (action === 'withdraw') {
            goalModalTitleEl.textContent = `Retirar de "${goal.name}"`;
            goalValueLabel.textContent = 'Valor para Retirar (R$)';
            goalValueFields.style.display = 'block';
            goalValueInput.required = true;
            goalValueInput.value = '';
            goalValueInput.focus();
        } else if (action === 'edit') {
            goalModalTitleEl.textContent = `Editar Meta "${goal.name}"`;
            goalAddFields.style.display = 'block';
            goalNameInput.required = true;
            goalTargetInput.required = true;
            goalNameInput.value = goal.name;
            goalTargetInput.value = goal.target;
            goalNameInput.focus();
        } else if (action === 'delete') {
            goalModalTitleEl.textContent = 'Excluir Meta';
            document.getElementById('delete-goal-name').textContent = goal.name;
            goalDeleteWarning.style.display = 'block';
        }
    }
}

function closeGoalModal() {
    goalModal.classList.remove('open');
    goalForm.reset();
}

function handleGoalFormSubmit(e) {
    e.preventDefault();

    const action = document.getElementById('goal-action-input').value;
    const id = document.getElementById('goal-id-input').value;
    const goalNameInput = document.getElementById('goal-name');
    const goalTargetInput = document.getElementById('goal-target');
    const goalValueInput = document.getElementById('goal-value');

    if (action === 'add') {
        const name = goalNameInput.value.trim();
        const target = parseFloat(goalTargetInput.value);
        if (!name || isNaN(target) || target <= 0) {
            showToast('Preencha os campos da meta corretamente.');
            return;
        }
        const newGoal = { id: Date.now().toString(), name, target, current: 0 };
        goals.push(newGoal);
        saveData('goals');
        showToast(`Meta "${name}" criada com sucesso!`);
    } else {
        const goal = goals.find(g => g.id === id);
        if (!goal) return;

        if (action === 'edit') {
            const name = goalNameInput.value.trim();
            const target = parseFloat(goalTargetInput.value);
            if (!name || isNaN(target) || target <= 0) {
                showToast('Preencha os campos da meta corretamente.');
                return;
            }
            goal.name = name;
            goal.target = target;
            saveData('goals');
            showToast(`Meta "${name}" atualizada com sucesso!`);
        } else if (action === 'deposit') {
            const val = parseFloat(goalValueInput.value);
            if (isNaN(val) || val <= 0) {
                showToast('Insira um valor válido.');
                return;
            }

            const activeMonthKey = getMonthKey(currentActiveDate);
            const totalAccountBalance = calculateTotalAccountBalance();
            const totalOpenInvoices = calculateTotalOpenInvoices(activeMonthKey);
            let totalSavedInGoals = 0;
            goals.forEach(g => totalSavedInGoals += g.current);

            const availableBalance = totalAccountBalance - totalOpenInvoices - totalSavedInGoals;

            if (availableBalance < val) {
                showToast('Saldo disponível insuficiente para guardar este valor.');
                return;
            }

            goal.current += val;
            saveData('goals');
            showToast(`R$ ${formatCurrency(val)} depositados em "${goal.name}"`);
        } else if (action === 'withdraw') {
            const val = parseFloat(goalValueInput.value);
            if (isNaN(val) || val <= 0) {
                showToast('Insira um valor válido.');
                return;
            }
            if (goal.current < val) {
                showToast('Saldo insuficiente nesta meta para retirar este valor.');
                return;
            }
            goal.current -= val;
            saveData('goals');
            showToast(`R$ ${formatCurrency(val)} retirados de "${goal.name}"`);
        } else if (action === 'delete') {
            goals = goals.filter(g => g.id !== id);
            saveData('goals');
            showToast(`Meta "${goal.name}" excluída.`);
        }
    }

    closeGoalModal();
    updateDashboard();
}

// Inicializa caso o Firebase já tenha autenticado antes do carregamento completo do app.js
if (window.firebaseUser && !window.appInitialized && typeof window.initializeAppWithFirebase === 'function') {
    window.initializeAppWithFirebase();
}
