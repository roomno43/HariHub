<!-- ========== AUTH OVERLAY ========== -->
<div class="overlay" id="auth-overlay">
  <div class="flip-wrap">
    <div class="flip-card-inner" id="flip-card-inner">
      <!-- LOGIN -->
      <div class="auth-face front">
        <div class="auth-logo">UTD Confession</div>
        <h2>Welcome back 👋</h2>
        <p class="sub">Log in to share and explore confessions.</p>
        <input type="email" class="auth-input" id="login-email" placeholder="Email address">
        <input type="password" class="auth-input" id="login-password" placeholder="Password">
        <div class="remember-row">
          <input type="checkbox" id="remember-me">
          <label for="remember-me">Remember me</label>
        </div>
        <button class="auth-btn" id="login-btn">Log In</button>
        <p class="auth-switch">No account? <span id="go-register">Create one</span></p>
        <p class="auth-switch auth-link" id="guest-browse">Browse without account →</p>
      </div>
      <!-- REGISTER -->
      <div class="auth-face back">
        <div class="auth-logo">UTD Confession</div>
        <h2>Create account ✨</h2>
        <p class="sub">Join anonymously. Your data stays private.</p>
        <input type="email" class="auth-input" id="reg-email" placeholder="Email address">
        <input type="password" class="auth-input" id="reg-password" placeholder="Create password">
        <div class="username-row">
          <input type="text" class="auth-input" id="reg-username" placeholder="Username">
          <button class="random-btn" id="random-username-btn" type="button">🎲 Random</button>
        </div>
        <p class="username-hint">Leave blank to auto-generate an anonymous username</p>
        <button class="auth-btn" id="register-btn">Create Account</button>
        <p class="auth-switch">Already have one? <span id="go-login">Log in</span></p>
      </div>
    </div>
  </div>
</div>
