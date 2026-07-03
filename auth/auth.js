// ═══════════════════════════════════════════════════════════════
//  Erupify — Auth JS  (login.html + register.html)
//  Handles: signIn, signUp, Google OAuth, session redirect
// ═══════════════════════════════════════════════════════════════

import { supabase } from '../supabase/client.js';

// ── Helper utilities ──────────────────────────────────────────
const $ = (id) => document.getElementById(id);

function showToast(msg, type = 'error') {
  const toast = $('toast');
  const toastMsg = $('toast-msg');
  toast.className = `toast ${type} show`;
  toastMsg.textContent = msg;
  setTimeout(() => toast.classList.remove('show'), 5000);
}

function setLoading(btnId, loading, defaultText) {
  const btn = $(btnId);
  if (!btn) return;
  btn.disabled = loading;
  btn.innerHTML = loading
    ? `<span class="spinner"></span> Please wait…`
    : defaultText;
}

// ── Password toggle ───────────────────────────────────────────
const passToggle = $('pass-toggle');
if (passToggle) {
  passToggle.addEventListener('click', () => {
    const input = $('password');
    const isText = input.type === 'text';
    input.type = isText ? 'password' : 'text';
    $('eye-icon').innerHTML = isText
      ? `<path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path><circle cx="12" cy="12" r="3"></circle>`
      : `<path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94"></path>
         <path d="M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19"></path>
         <line x1="1" y1="1" x2="23" y2="23"></line>`;
  });
}

// ── Password strength meter (register only) ───────────────────
const pwdInput = $('password');
if (pwdInput && $('strength-bar')) {
  pwdInput.addEventListener('input', () => {
    const val = pwdInput.value;
    let score = 0;
    if (val.length >= 8) score++;
    if (/[A-Z]/.test(val)) score++;
    if (/[0-9]/.test(val)) score++;
    if (/[^A-Za-z0-9]/.test(val)) score++;

    const colors = ['#EF4444', '#F97316', '#EAB308', '#22C55E'];
    const labels = ['Weak', 'Fair', 'Good', 'Strong'];

    ['seg1','seg2','seg3','seg4'].forEach((id, i) => {
      const seg = $(id);
      seg.style.background = i < score ? colors[score - 1] : 'var(--border)';
    });

    $('strength-label').textContent = val.length ? `Password strength: ${labels[score - 1] || ''}` : '';
    $('strength-label').style.color = val.length ? colors[score - 1] : '';
  });
}

// ═══════════════════════════════════════════════════════════════
//  AUTO-REDIRECT if already logged in
// ═══════════════════════════════════════════════════════════════
(async () => {
  const { data: { session } } = await supabase.auth.getSession();
  if (session) {
    window.location.href = '../dashboard/index.html';
  }
})();

// ═══════════════════════════════════════════════════════════════
//  LOGIN FORM
// ═══════════════════════════════════════════════════════════════
const loginForm = $('login-form');
if (loginForm) {
  loginForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const email    = $('email').value.trim();
    const password = $('password').value;

    if (!email || !password) {
      showToast('Please fill in all fields.');
      return;
    }

    setLoading('login-btn', true, 'Sign In');

    const { error } = await supabase.auth.signInWithPassword({ email, password });

    if (error) {
      showToast(error.message);
      setLoading('login-btn', false, 'Sign In');
    } else {
      showToast('Login successful! Redirecting…', 'success');
      setTimeout(() => { window.location.href = '../dashboard/index.html'; }, 800);
    }
  });
}

// ═══════════════════════════════════════════════════════════════
//  REGISTER FORM
// ═══════════════════════════════════════════════════════════════
const registerForm = $('register-form');
if (registerForm) {
  registerForm.addEventListener('submit', async (e) => {
    e.preventDefault();

    const businessName = $('business')?.value.trim();
    const email        = $('email').value.trim();
    const password     = $('password').value;
    const termsChecked = $('terms')?.checked;

    // Validation
    if (!businessName || !email || !password) {
      showToast('Please fill in all required fields.');
      return;
    }
    if (password.length < 8) {
      showToast('Password must be at least 8 characters.');
      return;
    }
    if (!termsChecked) {
      showToast('Please accept the Terms of Service to continue.');
      return;
    }

    setLoading('register-btn', true, 'Create Free Account');

    // 1. Sign up user
    const { data, error } = await supabase.auth.signUp({ email, password });

    if (error) {
      showToast(error.message);
      setLoading('register-btn', false, 'Create Free Account');
      return;
    }

    // 2. Create profile row
    if (data.user) {
      const { error: profileError } = await supabase
        .from('profiles')
        .insert({
          id:            data.user.id,
          business_name: businessName,
          plan:          'free',
          theme:         'dark-orange'
        });

      if (profileError) {
        console.error('Profile creation error:', profileError);
      }
    }

    showToast('Account created! Check your email to confirm.', 'success');
    setTimeout(() => { window.location.href = '../dashboard/index.html'; }, 1500);
  });
}

// ═══════════════════════════════════════════════════════════════
//  GOOGLE OAUTH
// ═══════════════════════════════════════════════════════════════
const googleBtn = $('google-btn');
if (googleBtn) {
  googleBtn.addEventListener('click', async () => {
    const { error } = await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: {
        redirectTo: window.location.origin + '/dashboard/index.html'
      }
    });
    if (error) showToast(error.message);
  });
}
