<!-- ========== MAIN APP ========== -->
<div class="app-root" id="app-root">

  <!-- DESKTOP SIDEBAR -->
  <aside class="desktop-sidebar">
    <div class="sidebar-logo">UTD <span>Confession</span></div>
    <nav class="sidebar-nav">
      <button class="sidebar-link active" data-page="feed" type="button">
        <i class="fa-solid fa-book-open"></i>
        Confessions
      </button>
      <button class="sidebar-link" data-page="highlights" type="button">
        <i class="fa-solid fa-star"></i>
        Highlights
      </button>
      <button class="sidebar-link" data-page="profile" type="button">
        <i class="fa-solid fa-user"></i>
        Profile
      </button>
      <div class="sidebar-sep"></div>
      <button class="sidebar-link" type="button">
        <i class="fa-solid fa-bookmark"></i>
        Saved
      </button>
      <button class="sidebar-link" type="button">
        <i class="fa-solid fa-heart"></i>
        Donate
      </button>
    </nav>
    <div class="sidebar-sep"></div>
    <div class="sidebar-user">
      <div class="sidebar-user-avatar" id="sidebar-avatar">Q</div>
      <div>
        <div class="sidebar-user-name" id="sidebar-username">@QuietPanda_42</div>
        <div class="sidebar-user-handle" id="sidebar-handle">Tap to view profile</div>
      </div>
    </div>
    <div class="sidebar-sep"></div>
    <button class="sidebar-link danger" type="button">
      <i class="fa-solid fa-right-from-bracket"></i>
      Logout
    </button>
  </aside>

  <!-- MOBILE FRAME -->
  <div class="mobile-frame">

    <!-- MOBILE HEADER -->
    <header class="floating-header" id="mobile-header">
      <div class="header-left">
        <button class="btn-icon hidden" id="btn-back" type="button" aria-label="Back">
          <i class="fa-solid fa-arrow-left"></i>
        </button>
        <button class="btn-icon" id="btn-menu" type="button" aria-label="Menu">
          <i class="fa-solid fa-bars"></i>
        </button>
      </div>
      <h1 class="header-title" id="header-title">Library</h1>
      <div class="header-actions">
        <button class="btn-text pwa-install-btn" id="install-button" type="button">Install</button>
      </div>
    </header>

    <!-- PAGE AREA -->
    <div class="pages-area">
      <div class="page active" id="page-feed"></div>
      <div class="page" id="page-highlights">
        <div style="padding: 70px 16px 100px;">
          <div class="highlights-date-nav">
            <button class="date-nav-btn" id="date-prev-btn" type="button">←</button>
            <div class="date-display" id="date-display">Today</div>
            <button class="date-nav-btn" id="date-next-btn" type="button">→</button>
          </div>
          <div class="highlights-grid" id="highlights-grid"></div>
        </div>
      </div>
      <div class="page" id="page-profile">
        <div class="profile-scroll" id="profile-scroll">
          <div class="profile-hero">
            <div class="profile-avatar-large" id="prof-avatar">Q</div>
            <div class="profile-username-large" id="prof-username">@QuietPanda_42</div>
            <p class="profile-bio-text" id="prof-bio">Just trying to graduate. Engineering '25. 🎓</p>
            <div class="profile-stats">
              <div class="stat-item"><div class="stat-num">24</div><div class="stat-label">Posts</div></div>
              <div class="stat-item"><div class="stat-num">1.2k</div><div class="stat-label">Likes</div></div>
              <div class="stat-item"><div class="stat-num">89</div><div class="stat-label">Comments</div></div>
            </div>
          </div>
          <div>
            <div class="profile-section-title">My Confessions</div>
            <div class="profile-posts-grid" id="profile-grid"></div>
          </div>
        </div>
      </div>
      <div class="page" id="page-comments" style="display: flex; flex-direction: column;">
        <div class="comments-body" id="mobile-comments-body"></div>
        <div class="reply-indicator-wrap hidden" id="mobile-reply-bar">
          <div class="reply-indicator">
            <span id="mobile-reply-text">Replying to @user</span>
            <button type="button">✕</button>
          </div>
        </div>
        <div class="comments-input-bar">
          <textarea class="comment-input-field" id="mobile-comment-input" placeholder="Add a comment…" rows="1"></textarea>
          <button class="comment-send-btn" type="button">
            <i class="fa-solid fa-paper-plane"></i>
          </button>
        </div>
      </div>
    </div>

    <nav class="bottom-nav" id="mobile-nav">
      <button class="nav-btn active" data-page="feed" type="button">
        <i class="fa-solid fa-book-open"></i>
        Library
      </button>
      <button class="nav-btn" data-page="highlights" type="button">
        <i class="fa-solid fa-star"></i>
        Highlights
      </button>
      <button class="nav-btn" data-page="profile" type="button">
        <i class="fa-solid fa-user"></i>
        Profile
      </button>
      <button class="nav-btn create-btn" type="button" aria-label="Create post">
        <i class="fa-solid fa-plus"></i>
        Create
      </button>
    </nav>
  </div>

  <div class="desktop-comments-panel collapsed" id="desktop-comments-panel">
    <div class="dc-header">
      <h3>Comments</h3>
      <button class="dc-close-btn" type="button">
        <i class="fa-solid fa-xmark"></i>
      </button>
    </div>
    <div class="dc-post-preview" id="dc-post-preview"></div>
    <div class="dc-comments-scroll" id="dc-comments-scroll"></div>
    <div class="dc-input-area">
      <div class="dc-reply-bar hidden" id="dc-reply-bar">
        <span id="dc-reply-text">Replying to @user</span>
        <button type="button">✕</button>
      </div>
      <div class="dc-input-row">
        <textarea class="dc-input" id="dc-comment-input" placeholder="Add a comment…" rows="1"></textarea>
        <button class="dc-send" type="button">
          <i class="fa-solid fa-paper-plane"></i>
        </button>
      </div>
    </div>
  </div>
</div>
