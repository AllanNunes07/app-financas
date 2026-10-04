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

// Variável global para armazenar o usuário
window.firebaseUser = null;

document.addEventListener('DOMContentLoaded', () => {
    const loginOverlay = document.getElementById('login-overlay');
    const appWrapper = document.getElementById('app-content-wrapper');
    const loginForm = document.getElementById('login-form');
    const emailInput = document.getElementById('login-email');
    const passwordInput = document.getElementById('login-password');
    const btnRegister = document.getElementById('btn-register');
    const loginError = document.getElementById('login-error');

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
    if (navMenu) {
        navMenu.appendChild(sidebarLogoutBtn);
    }

    // Monitora o estado de Autenticação
    window.auth.onAuthStateChanged(async (user) => {
        if (user) {
            // Logado
            window.firebaseUser = user;
            loginOverlay.style.display = 'none';
            appWrapper.style.display = 'flex';
            
            // Inicia o app.js
            if (window.initializeAppWithFirebase) {
                window.initializeAppWithFirebase();
            }
        } else {
            // Deslogado
            window.firebaseUser = null;
            loginOverlay.style.display = 'flex';
            appWrapper.style.display = 'none';
        }
    });

    // Submissão do form: Login
    loginForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const email = emailInput.value.trim();
        const password = passwordInput.value.trim();
        loginError.style.display = 'none';

        window.auth.signInWithEmailAndPassword(email, password)
            .catch(error => {
                console.error("Login Error:", error);
                loginError.textContent = "E-mail ou senha incorretos.";
                loginError.style.display = 'block';
            });
    });

    // Cadastro
    btnRegister.addEventListener('click', () => {
        const email = emailInput.value.trim();
        const password = passwordInput.value.trim();
        loginError.style.display = 'none';

        if (!email || password.length < 6) {
            loginError.textContent = "Preencha o e-mail e uma senha de no mínimo 6 caracteres para criar a conta.";
            loginError.style.display = 'block';
            return;
        }

        window.auth.createUserWithEmailAndPassword(email, password)
            .catch(error => {
                console.error("Register Error:", error);
                if (error.code === 'auth/email-already-in-use') {
                    loginError.textContent = "Este e-mail já está em uso.";
                } else {
                    loginError.textContent = "Erro ao criar conta: " + error.message;
                }
                loginError.style.display = 'block';
            });
    });
});
