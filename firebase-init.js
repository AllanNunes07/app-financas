// Configuração do Firebase
const firebaseConfig = {
  apiKey: "AIzaSyBvZ4L10onZZRVab5sRNORuU8l6pRDD0DQ",
  authDomain: "financas-f9044.firebaseapp.com",
  projectId: "financas-f9044",
  storageBucket: "financas-f9044.firebasestorage.app",
  messagingSenderId: "690015644361",
  appId: "1:690015644361:web:9afacba81a5959567dfb18"
};

// Inicializa Firebase
firebase.initializeApp(firebaseConfig);
window.auth = firebase.auth();
window.db = firebase.firestore();

// Habilita persistência offline para operações resilientes
if (window.db && typeof window.db.enablePersistence === 'function') {
    window.db.enablePersistence({ synchronizeTabs: true }).catch((err) => {
        if (err.code === 'failed-precondition') {
            console.warn("Firestore: múltiplas abas abertas simultaneamente.");
        } else if (err.code === 'unimplemented') {
            console.warn("Firestore: este navegador não suporta persistência local.");
        }
    });
}

// Variável global para armazenar o usuário
window.firebaseUser = null;

function getAuthErrorMessage(error) {
    if (!error || !error.code) return "Ocorreu um erro. Verifique sua conexão e tente novamente.";
    switch (error.code) {
        case 'auth/invalid-email':
            return "O formato do e-mail inserido é inválido.";
        case 'auth/user-not-found':
        case 'auth/wrong-password':
        case 'auth/invalid-credential':
            return "E-mail ou senha incorretos.";
        case 'auth/email-already-in-use':
            return "Este e-mail já está em uso. Faça login ou use outro e-mail.";
        case 'auth/weak-password':
            return "A senha deve ter no mínimo 6 caracteres.";
        case 'auth/too-many-requests':
            return "Muitas tentativas malsucedidas. Aguarde alguns minutos.";
        case 'auth/network-request-failed':
            return "Falha de conexão. Verifique sua internet.";
        default:
            return error.message || "Erro de autenticação.";
    }
}

function initAuth() {
    const loginOverlay = document.getElementById('login-overlay');
    const appWrapper = document.getElementById('app-content-wrapper');
    const loginForm = document.getElementById('login-form');
    const emailInput = document.getElementById('login-email');
    const passwordInput = document.getElementById('login-password');
    const btnRegister = document.getElementById('btn-register');
    const loginError = document.getElementById('login-error');
    const loginErrorText = document.getElementById('login-error-text');
    const btnLogin = document.getElementById('btn-login');
    const btnLoginText = document.getElementById('btn-login-text');
    const authSubtitle = document.getElementById('auth-subtitle');
    const authPwdHint = document.getElementById('auth-pwd-hint');
    const tabLogin = document.getElementById('tab-login');
    const tabRegister = document.getElementById('tab-register');
    const btnTogglePassword = document.getElementById('btn-toggle-password');
    const iconEyeShow = document.getElementById('icon-eye-show');
    const iconEyeHide = document.getElementById('icon-eye-hide');

    let currentAuthMode = 'login'; // 'login' | 'register'

    function setAuthMode(mode) {
        currentAuthMode = mode;
        if (loginError) loginError.style.display = 'none';

        if (mode === 'login') {
            if (tabLogin) tabLogin.classList.add('active');
            if (tabRegister) tabRegister.classList.remove('active');
            if (authSubtitle) authSubtitle.textContent = "Acesse sua conta para visualizar seu painel financeiro";
            if (btnLoginText) btnLoginText.textContent = "Acessar Plataforma";
            if (authPwdHint) authPwdHint.style.display = 'none';
        } else {
            if (tabRegister) tabRegister.classList.add('active');
            if (tabLogin) tabLogin.classList.remove('active');
            if (authSubtitle) authSubtitle.textContent = "Crie sua conta para começar a gerenciar seus gastos e metas";
            if (btnLoginText) btnLoginText.textContent = "Criar Conta Gratuita";
            if (authPwdHint) authPwdHint.style.display = 'inline';
        }
    }

    if (tabLogin) tabLogin.addEventListener('click', () => setAuthMode('login'));
    if (tabRegister) tabRegister.addEventListener('click', () => setAuthMode('register'));

    // Toggle de visibilidade da senha
    if (btnTogglePassword && passwordInput) {
        btnTogglePassword.addEventListener('click', () => {
            const isPassword = passwordInput.type === 'password';
            passwordInput.type = isPassword ? 'text' : 'password';
            if (iconEyeShow && iconEyeHide) {
                iconEyeShow.style.display = isPassword ? 'none' : 'block';
                iconEyeHide.style.display = isPassword ? 'block' : 'none';
            }
        });
    }

    // Botão de Logout na Sidebar
    const sidebarLogoutBtn = document.createElement('a');
    sidebarLogoutBtn.href = '#';
    sidebarLogoutBtn.className = 'nav-item';
    sidebarLogoutBtn.style.marginTop = 'auto';
    sidebarLogoutBtn.innerHTML = `
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"></path><polyline points="16 17 21 12 16 7"></polyline><line x1="21" y1="12" x2="9" y2="12"></line></svg>
        <span>Sair</span>
    `;
    sidebarLogoutBtn.addEventListener('click', (e) => {
        e.preventDefault();
        window.auth.signOut();
    });
    const navMenu = document.querySelector('.nav-menu');
    if (navMenu && !navMenu.contains(sidebarLogoutBtn)) {
        navMenu.appendChild(sidebarLogoutBtn);
    }

    // Monitora o estado de Autenticação
    window.auth.onAuthStateChanged(async (user) => {
        if (user) {
            // Logado
            window.firebaseUser = user;
            if (loginOverlay) {
                loginOverlay.classList.remove('open');
                loginOverlay.style.display = 'none';
            }
            if (appWrapper) {
                appWrapper.style.display = 'flex';
            }
            
            // Inicia o app.js
            if (window.initializeAppWithFirebase) {
                window.initializeAppWithFirebase();
            } else {
                window.addEventListener('load', () => {
                    if (window.initializeAppWithFirebase && !window.appInitialized) {
                        window.initializeAppWithFirebase();
                    }
                });
            }
        } else {
            // Deslogado
            window.firebaseUser = null;
            if (loginOverlay) {
                loginOverlay.classList.add('open');
                loginOverlay.style.display = 'flex';
            }
            if (appWrapper) {
                appWrapper.style.display = 'none';
            }
        }
    });

    function showAuthError(message) {
        if (loginError) {
            if (loginErrorText) {
                loginErrorText.textContent = message;
            } else {
                loginError.textContent = message;
            }
            loginError.style.display = 'flex';
        }
    }

    // Submissão unificada do formulário
    if (loginForm) {
        loginForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            const email = emailInput.value.trim();
            const password = passwordInput.value.trim();
            if (loginError) loginError.style.display = 'none';

            if (!email) {
                showAuthError("Por favor, digite seu e-mail.");
                emailInput.focus();
                return;
            }

            if (!password || password.length < 6) {
                showAuthError("A senha precisa ter no mínimo 6 caracteres.");
                passwordInput.focus();
                return;
            }

            // Estado de carregamento
            const originalBtnText = btnLoginText ? btnLoginText.textContent : "Entrar";
            if (btnLogin) btnLogin.disabled = true;
            if (btnLoginText) btnLoginText.textContent = currentAuthMode === 'login' ? "Autenticando..." : "Criando conta...";

            try {
                if (currentAuthMode === 'login') {
                    await window.auth.signInWithEmailAndPassword(email, password);
                } else {
                    await window.auth.createUserWithEmailAndPassword(email, password);
                }
            } catch (error) {
                console.error("Auth Error:", error);
                showAuthError(getAuthErrorMessage(error));
            } finally {
                if (btnLogin) btnLogin.disabled = false;
                if (btnLoginText) btnLoginText.textContent = originalBtnText;
            }
        });
    }

    // Fallback para clique em btn-register
    if (btnRegister) {
        btnRegister.addEventListener('click', () => {
            setAuthMode('register');
        });
    }
}

if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initAuth);
} else {
    initAuth();
}
