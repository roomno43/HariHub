/* ===================== DATA ===================== */
const COLORS = [
  { id: 'pink',   label: 'Pink',   grad: 'linear-gradient(135deg, #FF6B9D 0%, #C44569 100%)',  swatch: '#FF6B9D' },
  { id: 'purple', label: 'Purple', grad: 'linear-gradient(135deg, #A855F7 0%, #6D28D9 100%)',  swatch: '#A855F7' },
  { id: 'orange', label: 'Orange', grad: 'linear-gradient(135deg, #F97316 0%, #DC2626 100%)',  swatch: '#F97316' },
  { id: 'blue',   label: 'Blue',   grad: 'linear-gradient(135deg, #38BDF8 0%, #2563EB 100%)',  swatch: '#38BDF8' },
  { id: 'green',  label: 'Green',  grad: 'linear-gradient(135deg, #34D399 0%, #059669 100%)',  swatch: '#34D399' },
  { id: 'black',  label: 'Dark',   grad: 'linear-gradient(135deg, #4B5563 0%, #111827 100%)',  swatch: '#4B5563' },
  { id: 'rose',   label: 'Rose',   grad: 'linear-gradient(135deg, #FB7185 0%, #E11D48 100%)',  swatch: '#FB7185' },
  { id: 'teal',   label: 'Teal',   grad: 'linear-gradient(135deg, #2DD4BF 0%, #0F766E 100%)',  swatch: '#2DD4BF' },
  { id: 'indigo', label: 'Indigo', grad: 'linear-gradient(135deg, #818CF8 0%, #4338CA 100%)',  swatch: '#818CF8' },
];

const DEMO_POSTS = [
  { id: 1, author: '@QuietPanda_42', text: "I still think about the person I sat next to in freshman chemistry. I never asked for their number and I regret it every single day.", color: 'pink',   likes: 247, comments: 38, shares: 12, time: '2h ago', date: new Date() },
  { id: 2, author: '@SilentWolf_77', text: "Sometimes I pretend to be on an important call while walking across campus just to avoid awkward eye contact with people I kind of know.", color: 'purple', likes: 519, comments: 64, shares: 29, time: '4h ago', date: new Date() },
  { id: 3, author: '@BraveEagle_19', text: "I've been in the Randomous for 6 hours and I haven't opened a single textbook. I just needed somewhere quiet to exist.", color: 'blue',   likes: 891, comments: 102, shares: 55, time: '6h ago', date: (() => { const d = new Date(); d.setDate(d.getDate() - 1); return d; })() },
  { id: 4, author: '@HappyFox_03',   text: "I told my professor I had a 'family emergency' to get an extension. The emergency was that I forgot the assignment existed.", color: 'orange', likes: 1342, comments: 88, shares: 67, time: '1d ago', date: (() => { const d = new Date(); d.setDate(d.getDate() - 1); return d; })() },
  { id: 5, author: '@WiseLion_55',   text: "I graduated last semester and I genuinely miss pulling all-nighters with strangers in the engineering building at 3am. Nothing hit like that.", color: 'green',  likes: 2100, comments: 145, shares: 94, time: '2d ago', date: (() => { const d = new Date(); d.setDate(d.getDate() - 2); return d; })() },
  { id: 6, author: '@QuietPanda_42', text: "Every time someone asks me 'what do you do for fun?' I internally panic because I'm not sure my hobbies are real hobbies.", color: 'teal',   likes: 388, comments: 51, shares: 18, time: '3d ago', date: (() => { const d = new Date(); d.setDate(d.getDate() - 2); return d; })() },
];

const DEMO_COMMENTS = {
  1: [
    { id: 1, user: '@CoolCat_22', text: 'This is so relatable it hurts 💀', time: '1h ago', replies: [
      { id: 11, user: '@QuietPanda_42', text: 'Right?! Still think about it', time: '45m ago', replyTo: '@CoolCat_22' },
    ]},
    { id: 2, user: '@StarDust_99', text: 'Go back and find them!! The chem department isn\'t that big', time: '2h ago', replies: [] },
    { id: 3, user: '@NightOwl_88', text: 'This happened to me in sophomore calc. Never again.', time: '3h ago', replies: [
      { id: 31, user: '@CoolCat_22', text: 'Did you ever reach out?', time: '2h ago', replyTo: '@NightOwl_88' },
    ]},
  ],
  2: [
    { id: 1, user: '@SkyBlue_44', text: 'I do this every single day lmaooo', time: '30m ago', replies: [] },
    { id: 2, user: '@GhostMode_7', text: 'Peak antisocial behavior and I respect it', time: '2h ago', replies: [
      { id: 21, user: '@SilentWolf_77', text: 'Had to survive somehow 😭', time: '1h ago', replyTo: '@GhostMode_7' },
    ]},
  ],
  3: [
    { id: 1, user: '@RandomousGhost', text: 'Randomous is the most valid place to just... be.', time: '1h ago', replies: [] },
    { id: 2, user: '@EngStudent_22', text: 'The 4th floor silence hits different at 11pm', time: '3h ago', replies: [] },
  ],
  4: [
    { id: 1, user: '@SameHat_11', text: 'Family emergency = forgot = valid', time: '20m ago', replies: [] },
  ],
  5: [
    { id: 1, user: '@Nostalgic_05', text: 'Those 3am Randomous sessions built character honestly', time: '5h ago', replies: [] },
    { id: 2, user: '@AlumniVibes', text: 'Graduated 2 years ago and I think about this too', time: '8h ago', replies: [] },
  ],
  6: [
    { id: 1, user: '@SameTbh', text: 'My hobbies are "watching videos" and "lying in bed"', time: '1h ago', replies: [] },
  ],
};

/* ===================== STATE ===================== */
const state = {
  isLoggedIn: false,
  currentUser: null,
  currentPage: 'feed',
  prevPage: 'feed',
  selectedColor: 'pink',
  likedPosts: new Set(),
  posts: [...DEMO_POSTS],
  comments: { ...DEMO_COMMENTS },
  activePostId: null,
  replyingTo: { mobile: null, desktop: null },
  reportTarget: null,
  menuOpen: false,
  selectedDate: new Date(),
};

const GRAD_MAP = {};
COLORS.forEach(c => GRAD_MAP[c.id] = c.grad);

/* ===================== INIT ===================== */
document.addEventListener('DOMContentLoaded', () => {
  buildColorSwatches();
  buildFeed();
  buildHighlights();
  updateDateDisplay();
  updateDateNavButtons();
  buildProfileGrid();

  // Auto-generate username on register page load
  generateUsername();

  // Check saved session
  const saved = localStorage.getItem('utd_session');
  if (saved) {
    try {
      const s = JSON.parse(saved);
      loginUser(s.username, false);
    } catch {}
  }

  // Keyboard enter on auth inputs
  document.getElementById('login-password').addEventListener('keydown', e => {
    if (e.key === 'Enter') document.getElementById('login-btn').click();
  });
  document.getElementById('reg-password').addEventListener('keydown', e => {
    if (e.key === 'Enter') document.getElementById('register-btn').click();
  });
});

/* ===================== AUTH ===================== */
document.getElementById('go-register').onclick = () => {
  generateUsername();
  document.getElementById('flip-card-inner').classList.add('flipped');
};
document.getElementById('go-login').onclick = () => {
  document.getElementById('flip-card-inner').classList.remove('flipped');
};
document.getElementById('guest-browse').onclick = () => {
  document.getElementById('auth-overlay').classList.add('hidden');
};

document.getElementById('login-btn').onclick = () => {
  const email = document.getElementById('login-email').value.trim();
  const pass = document.getElementById('login-password').value.trim();
  if (!email || !pass) { showToast('⚠️ Please fill in all fields'); return; }
  const remember = document.getElementById('remember-me').checked;
  loginUser('@QuietPanda_42', remember);
};

document.getElementById('register-btn').onclick = () => {
  const email = document.getElementById('reg-email').value.trim();
  const pass = document.getElementById('reg-password').value.trim();
  let username = document.getElementById('reg-username').value.trim();
  if (!email || !pass) { showToast('⚠️ Please fill in all fields'); return; }
  if (!username) generateUsername();
  username = document.getElementById('reg-username').value.trim();
  loginUser('@' + username.replace('@', ''), true);
};

document.getElementById('random-username-btn').onclick = generateUsername;

function generateUsername() {
  const adj = ['Quiet','Silent','Happy','Wise','Brave','Swift','Bold','Calm','Keen','Lone'];
  const nouns = ['Panda','Wolf','Lion','Eagle','Fox','Bear','Hawk','Otter','Deer','Lynx'];
  const num = Math.floor(Math.random() * 99) + 1;
  document.getElementById('reg-username').value = `${adj[~~(Math.random()*adj.length)]}${nouns[~~(Math.random()*nouns.length)]}_${num}`;
}

function loginUser(username, remember) {
  state.isLoggedIn = true;
  state.currentUser = username;
  if (remember) localStorage.setItem('utd_session', JSON.stringify({ username }));
  // Update UI
  document.getElementById('auth-overlay').classList.add('hidden');
  document.getElementById('app-root').classList.add('visible');
  const composeFab = document.getElementById('compose-fab');
  if (composeFab) composeFab.classList.remove('hidden');
  const initial = username.replace('@','').charAt(0).toUpperCase();
  document.getElementById('sidebar-avatar').textContent = initial;
  document.getElementById('sidebar-username').textContent = username;
  document.getElementById('drawer-avatar').textContent = initial;
  document.getElementById('drawer-username').textContent = username;
  document.getElementById('prof-avatar').textContent = initial;
  document.getElementById('prof-username').textContent = username;
  showToast('👋 Welcome back, ' + username + '!');
}

function logout() {
  state.isLoggedIn = false;
  state.currentUser = null;
  localStorage.removeItem('utd_session');
  document.getElementById('app-root').classList.remove('visible');
  const composeFab = document.getElementById('compose-fab');
  if (composeFab) composeFab.classList.add('hidden');
  document.getElementById('auth-overlay').classList.remove('hidden');
  document.getElementById('flip-card-inner').classList.remove('flipped');
  showToast('👋 Logged out');
}

/* ===================== GUEST PROMPT ===================== */
function requireLogin(msg, action) {
  if (state.isLoggedIn) { action && action(); return true; }
  document.getElementById('guest-prompt-msg').textContent = msg || 'Create a free account to interact with confessions.';
  document.getElementById('guest-prompt-overlay').classList.remove('hidden');
  return false;
}
document.getElementById('guest-signup-btn').onclick = () => {
  document.getElementById('guest-prompt-overlay').classList.add('hidden');
  document.getElementById('auth-overlay').classList.remove('hidden');
  document.getElementById('flip-card-inner').classList.add('flipped');
  generateUsername();
};
document.getElementById('guest-login-btn').onclick = () => {
  document.getElementById('guest-prompt-overlay').classList.add('hidden');
  document.getElementById('auth-overlay').classList.remove('hidden');
  document.getElementById('flip-card-inner').classList.remove('flipped');
};
document.getElementById('guest-dismiss').onclick = () => {
  document.getElementById('guest-prompt-overlay').classList.add('hidden');
};

/* ===================== ROUTING ===================== */
function switchPage(page, triggerEl) {
  state.prevPage = state.currentPage;
  state.currentPage = page;

  if (page !== 'feed' && state.menuOpen) {
    state.menuOpen = false;
    updateMenuButton();
    buildFeed();
  }
  if (page === 'feed' && !state.menuOpen) {
    buildFeed();
  }

  document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));
  document.getElementById('page-' + page).classList.add('active');

  const pageTitles = { feed: 'Randomous', highlights: 'Highlights', profile: 'Profile', comments: 'Confession' };
  const headerTitle = document.getElementById('header-title');
  if (headerTitle) headerTitle.textContent = pageTitles[page] || 'UTD Confession';

  // Bottom nav active
  document.querySelectorAll('.nav-btn, .nav-item, .nav-circle').forEach(b => {
    b.classList.toggle('active', b.dataset.page === page);
  });
  // Sidebar active
  document.querySelectorAll('.sidebar-link').forEach(b => {
    b.classList.toggle('active', b.dataset.page === page);
  });

  // Show/hide compose fab
  const fab = document.getElementById('compose-fab');
  if (fab) {
    if (state.isLoggedIn && page === 'feed') {
      fab.classList.remove('hidden');
    } else {
      fab.classList.add('hidden');
    }
  }

  // Comments-only header state
  const backBtn = document.getElementById('btn-back');
  const menuBtn = document.getElementById('btn-menu');
  const installBtn = document.getElementById('install-button');
  if (backBtn) {
    backBtn.classList.toggle('hidden', page !== 'comments');
  }
  if (menuBtn) {
    menuBtn.classList.toggle('hidden', page === 'comments');
  }
  if (installBtn) {
    installBtn.classList.toggle('hidden', page === 'comments');
  }

  // Hide bottom nav while viewing comments or menu
  const mobileNav = document.getElementById('mobile-nav');
  if (mobileNav) {
    mobileNav.style.display = page === 'comments' || state.menuOpen ? 'none' : 'flex';
  }

  // Hide comments panel on desktop if switching page
  if (page !== 'comments') {
    closeDesktopComments();
  }
}

function goBack() {
  // Restore header for previous page
  const prevPage = state.prevPage || 'feed';
  const pageNames = { feed: 'Randomous', highlights: 'Highlights', profile: 'Profile' };
  document.getElementById('header-title').textContent = pageNames[prevPage] || 'Randomous';
  document.getElementById('btn-back').classList.add('hidden');
  document.getElementById('btn-menu').classList.remove('hidden');
  
  switchPage(state.prevPage || 'feed');
}

/* ===================== FEED ===================== */
function buildFeed() {
  const feed = document.getElementById('page-feed');
  feed.innerHTML = '';
  state.posts.forEach(post => {
    const slot = document.createElement('div');
    slot.className = 'feed-slot';
    slot.style.height = '100dvh';
    slot.innerHTML = buildCardHTML(post);
    feed.appendChild(slot);
  });
}

function buildCardHTML(post) {
  const liked = state.likedPosts.has(post.id);
  const grad = GRAD_MAP[post.color] || GRAD_MAP['pink'];
  const commentCount = (state.comments[post.id] || []).reduce((a, c) => a + 1 + (c.replies || []).length, 0);
  return `
    <div class="confession-card" style="background: ${grad};" data-post-id="${post.id}">
      <div class="card-meta">
        <span class="card-author">${post.author}</span>
        <span class="card-time">${post.time}</span>
      </div>
      <div class="card-text">${post.text}</div>
      <div class="card-actions">
        <button class="action-btn ${liked ? 'liked' : ''}" onclick="handleLike(${post.id}, this)">
          <i class="fa-solid fa-heart"></i>
          <span class="like-count-${post.id}">${post.likes}</span>
        </button>
        <button class="action-btn" onclick="handleComment(${post.id})">
          <i class="fa-solid fa-comment"></i>
          ${commentCount}
        </button>
        <button class="action-btn" onclick="handleShare(${post.id})">
          <i class="fa-solid fa-share-nodes"></i>
        </button>
        <button class="report-btn-card" onclick="openReportModal('post', ${post.id})">
          <i class="fa-solid fa-flag"></i>
        </button>
      </div>
    </div>`;
}

function handleLike(postId, btn) {
  if (!requireLogin('Create an account to like confessions and show some love! ❤️')) return;
  const post = state.posts.find(p => p.id === postId);
  if (!post) return;
  if (state.likedPosts.has(postId)) {
    state.likedPosts.delete(postId);
    post.likes--;
    btn.classList.remove('liked');
    btn.querySelector('svg').setAttribute('fill', 'none');
  } else {
    state.likedPosts.add(postId);
    post.likes++;
    btn.classList.add('liked');
    btn.querySelector('svg').setAttribute('fill', 'white');
  }
  document.querySelectorAll('.like-count-' + postId).forEach(el => el.textContent = post.likes);
}

function handleComment(postId) {
  if (!requireLogin('Join to read and write comments on confessions. 💬')) return;
  openComments(postId);
}

function handleShare(postId) {
  if (!requireLogin('Create an account to share confessions with friends. 🔗')) return;
  if (navigator.share) {
    navigator.share({ title: 'UTD Confession', text: state.posts.find(p=>p.id===postId)?.text || '', url: window.location.href });
  } else {
    showToast('🔗 Link copied to clipboard!');
  }
}

/* ===================== COMMENTS ===================== */
function openComments(postId) {
  state.activePostId = postId;
  const post = state.posts.find(p => p.id === postId);
  const grad = GRAD_MAP[post.color] || GRAD_MAP['pink'];
  const comments = state.comments[postId] || [];
  const isDesktop = window.innerWidth >= 768;

  // Update header for comments page
  document.getElementById('header-title').textContent = 'Confession';
  document.getElementById('btn-back').classList.remove('hidden');
  document.getElementById('btn-menu').classList.add('hidden');

  if (isDesktop) {
    // Desktop panel
    const panel = document.getElementById('desktop-comments-panel');
    panel.classList.remove('collapsed');

    // Post preview with author and date
    document.getElementById('dc-post-preview').innerHTML = `
      <div class="dc-post-card" style="background: ${grad};">
        <div style="font-size: 12px; opacity: 0.9; margin-bottom: 8px; letter-spacing: 0.01em;">${post.author}</div>
        <div class="dc-post-card-text">${post.text}</div>
        <div style="font-size: 11px; opacity: 0.7; margin-top: 8px;">${post.time}</div>
      </div>`;

    // Comments
    const scroll = document.getElementById('dc-comments-scroll');
    scroll.innerHTML = renderCommentsHTML(comments, 'desktop');
    scroll.scrollTop = 0;
  } else {
    // Mobile full page - new design with post card + instagram comments
    const body = document.getElementById('mobile-comments-body');
    const totalCommentCount = comments.reduce((a,c) => a + 1 + c.replies.length, 0);
    
    body.innerHTML = `
      <div class="confession-page-post-card" style="background: ${grad};">
        <div class="confession-page-post-header">
          <div class="confession-page-post-author">${post.author}</div>
          <div class="confession-page-post-time">${post.time}</div>
        </div>
        <div class="confession-page-post-text">${post.text}</div>
        <div class="confession-page-post-actions">
          <button class="confession-page-action-btn" onclick="handleLike(${postId}, this)" title="Like">
            <i class="fa-solid fa-heart"></i>
            Like
          </button>
          <button class="confession-page-action-btn" onclick="handleShare(${postId})" title="Share">
            <i class="fa-solid fa-share-nodes"></i>
            Share
          </button>
          <button class="confession-page-report-btn" onclick="openReportModal('post', ${postId})" title="Report">
            <i class="fa-solid fa-ellipsis"></i>
          </button>
        </div>
      </div>
      <div class="instagram-comments-section">
        <div class="instagram-comments-header">${totalCommentCount} ${totalCommentCount === 1 ? 'Comment' : 'Comments'}</div>
        <div class="instagram-comments-list" id="mobile-comments-list">
          ${renderInstagramCommentsHTML(comments, 'mobile')}
        </div>
      </div>`;
    switchPage('comments');
  }
}

function renderCommentsHTML(comments, ctx) {
  if (!comments.length) return '<p style="color: var(--gray-400); font-size: 14px; padding: 20px 0; text-align: center;">No comments yet. Be the first!</p>';
  
  // Flatten comments and replies into a single array for grid display
  const allComments = [];
  comments.forEach(c => {
    allComments.push({ ...c, isReply: false });
    c.replies.forEach(r => {
      allComments.push({ ...r, isReply: true });
    });
  });
  
  return allComments.map(item => `
    <div class="comment-item${item.isReply ? ' reply' : ''}">
      <div class="comment-user">${item.user}</div>
      <div class="comment-text">${item.isReply ? `<span class="comment-mention">${item.replyTo}</span> ` : ''}${item.text}</div>
      <div class="comment-time">${item.time}</div>
    </div>`).join('');
}

function renderInstagramCommentsHTML(comments, ctx) {
  if (!comments.length) return '<p style="color: var(--gray-400); font-size: 14px; padding: 20px; text-align: center;">No comments yet. Be the first!</p>';
  
  return comments.map(c => `
    <div class="instagram-comment">
      <div class="instagram-comment-header">
        <span class="instagram-comment-user">${c.user}</span>
      </div>
      <div class="instagram-comment-text">${c.text}</div>
      <div class="instagram-comment-footer">
        <span class="instagram-comment-time">${c.time}</span>
        <button class="instagram-comment-reply-btn" onclick="startReply('${c.user}', '${ctx}')">Reply</button>
      </div>
      ${c.replies && c.replies.length > 0 ? `
        <div class="instagram-replies">
          ${c.replies.map(r => `
            <div class="instagram-reply">
              <div class="instagram-reply-content">
                <span class="instagram-reply-user">${r.user}</span>
                <div class="instagram-reply-text"><strong>${c.user}</strong> ${r.text}</div>
                <div class="instagram-reply-footer">
                  <span class="instagram-reply-time">${r.time}</span>
                  <button class="instagram-reply-btn" onclick="startReply('${r.user}', '${ctx}')">Reply</button>
                </div>
              </div>
            </div>
          `).join('')}
        </div>
      ` : ''}
    </div>
  `).join('');
}

function startReply(username, ctx) {
  state.replyingTo[ctx] = username;
  if (ctx === 'mobile') {
    document.getElementById('mobile-reply-bar').classList.remove('hidden');
    document.getElementById('mobile-reply-text').textContent = `Replying to ${username}`;
    document.getElementById('mobile-comment-input').focus();
    document.getElementById('mobile-comment-input').placeholder = `Reply to ${username}…`;
  } else {
    document.getElementById('dc-reply-bar').classList.remove('hidden');
    document.getElementById('dc-reply-text').textContent = `Replying to ${username}`;
    document.getElementById('dc-comment-input').focus();
    document.getElementById('dc-comment-input').placeholder = `Reply to ${username}…`;
  }
}

function clearReply(ctx) {
  state.replyingTo[ctx] = null;
  if (ctx === 'mobile') {
    document.getElementById('mobile-reply-bar').classList.add('hidden');
    document.getElementById('mobile-comment-input').placeholder = 'Add a comment…';
  } else {
    document.getElementById('dc-reply-bar').classList.add('hidden');
    document.getElementById('dc-comment-input').placeholder = 'Add a comment…';
  }
}

function sendComment(ctx) {
  const inputId = ctx === 'mobile' ? 'mobile-comment-input' : 'dc-comment-input';
  const input = document.getElementById(inputId);
  const text = input.value.trim();
  if (!text) return;

  const postId = state.activePostId;
  if (!state.comments[postId]) state.comments[postId] = [];

  const replyTo = state.replyingTo[ctx];
  const newComment = {
    id: Date.now(),
    user: state.currentUser,
    text,
    time: 'just now',
    replyTo,
    replies: []
  };

  if (replyTo) {
    // Add as reply to first matching comment
    const parent = state.comments[postId].find(c => c.user === replyTo) || state.comments[postId][state.comments[postId].length - 1];
    if (parent) { parent.replies.push({ ...newComment, replyTo }); }
    else state.comments[postId].push(newComment);
  } else {
    state.comments[postId].push(newComment);
  }

  input.value = '';
  input.style.height = 'auto';
  clearReply(ctx);

  // Re-render
  const comments = state.comments[postId];
  if (ctx === 'mobile') {
    const list = document.getElementById('mobile-comments-list');
    if (list) list.innerHTML = renderInstagramCommentsHTML(comments, 'mobile');
  } else {
    const scroll = document.getElementById('dc-comments-scroll');
    if (scroll) {
      scroll.innerHTML = renderCommentsHTML(comments, 'desktop');
      scroll.scrollTop = scroll.scrollHeight;
    }
  }
  showToast('💬 Comment posted!');
}

function closeDesktopComments() {
  document.getElementById('desktop-comments-panel').classList.add('collapsed');
}

/* ===================== COMPOSE ===================== */
function openCompose() {
  document.getElementById('compose-sheet').classList.remove('hidden');
}

function handleComposeOutsideClick(e) {
  if (e.target === document.getElementById('compose-sheet')) {
    document.getElementById('compose-sheet').classList.add('hidden');
  }
}

function onComposeInput() {
  const text = document.getElementById('compose-textarea').value;
  const count = document.getElementById('char-count');
  count.textContent = text.length;
  count.style.color = text.length > 360 ? '#EF4444' : 'var(--gray-400)';

  const preview = document.getElementById('compose-preview-text');
  if (text.trim()) {
    preview.innerHTML = text;
    preview.style.color = 'white';
    preview.classList.remove('compose-preview-placeholder');
  } else {
    preview.innerHTML = '<span class="compose-preview-placeholder">Your confession will appear here…</span>';
  }

  document.getElementById('compose-submit-btn').disabled = !text.trim();
}

function buildColorSwatches() {
  const container = document.getElementById('color-swatches');
  COLORS.forEach(c => {
    const sw = document.createElement('div');
    sw.className = 'color-swatch' + (c.id === state.selectedColor ? ' selected' : '');
    sw.style.background = c.grad;
    sw.title = c.label;
    sw.onclick = () => {
      state.selectedColor = c.id;
      document.querySelectorAll('.color-swatch').forEach(s => s.classList.remove('selected'));
      sw.classList.add('selected');
      document.getElementById('compose-preview').style.background = c.grad;
    };
    container.appendChild(sw);
  });
}

function submitPost() {
  const text = document.getElementById('compose-textarea').value.trim();
  if (!text) return;
  const newPost = {
    id: Date.now(),
    author: state.currentUser,
    text,
    color: state.selectedColor,
    likes: 0,
    comments: 0,
    shares: 0,
    time: 'just now',
    date: new Date(),
  };
  state.posts.unshift(newPost);
  state.comments[newPost.id] = [];
  buildFeed();
  document.getElementById('compose-sheet').classList.add('hidden');
  document.getElementById('compose-textarea').value = '';
  document.getElementById('compose-preview-text').innerHTML = '<span class="compose-preview-placeholder">Your confession will appear here…</span>';
  document.getElementById('char-count').textContent = '0';
  document.getElementById('compose-submit-btn').disabled = true;
  showToast('✨ Confession posted!');
}

/* ===================== HIGHLIGHTS ===================== */
function updateDateDisplay() {
  const today = new Date();
  const selectedDate = state.selectedDate;
  const dateDisplay = document.getElementById('date-display');
  
  if (selectedDate.toDateString() === today.toDateString()) {
    dateDisplay.textContent = 'Today';
  } else {
    const options = { month: 'short', day: 'numeric' };
    dateDisplay.textContent = selectedDate.toLocaleDateString('en-US', options);
  }
}

function updateDateNavButtons() {
  const today = new Date();
  const isToday = state.selectedDate.toDateString() === today.toDateString();
  const nextBtn = document.getElementById('date-next-btn');
  
  if (isToday) {
    nextBtn.disabled = true;
    nextBtn.style.opacity = '0.5';
    nextBtn.style.cursor = 'not-allowed';
  } else {
    nextBtn.disabled = false;
    nextBtn.style.opacity = '1';
    nextBtn.style.cursor = 'pointer';
  }
}

function changeDateDay(days) {
  const today = new Date();
  const newDate = new Date(state.selectedDate);
  newDate.setDate(newDate.getDate() + days);
  
  // Prevent selecting future dates
  if (newDate > today) {
    return;
  }
  
  state.selectedDate = newDate;
  updateDateDisplay();
  buildHighlights();
  updateDateNavButtons();
}

function openDatePicker() {
  document.getElementById('date-picker-modal').classList.remove('hidden');
  renderCalendar();
}

function closeDatePicker() {
  document.getElementById('date-picker-modal').classList.add('hidden');
}

function closeDatePickerIfBackdrop(event) {
  if (event.target.id === 'date-picker-modal') {
    closeDatePicker();
  }
}

function renderCalendar() {
  const container = document.getElementById('calendar-container');
  const today = new Date();
  const year = today.getFullYear();
  const month = today.getMonth();
  
  const firstDay = new Date(year, month, 1);
  const lastDay = new Date(year, month + 1, 0);
  const daysInMonth = lastDay.getDate();
  const startingDayOfWeek = firstDay.getDay();
  
  const monthYear = today.toLocaleDateString('en-US', { month: 'long', year: 'numeric' });
  
  let html = `<div style="margin-bottom: 16px;"><div style="font-weight: 600; text-align: center; margin-bottom: 12px; color: var(--gray-700);">${monthYear}</div>`;
  
  // Days of week header
  html += '<div style="display: grid; grid-template-columns: repeat(7, 1fr); gap: 4px; margin-bottom: 8px;">';
  ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].forEach(day => {
    html += `<div style="text-align: center; font-size: 12px; font-weight: 600; color: var(--gray-500);">${day}</div>`;
  });
  html += '</div>';
  
  // Calendar grid
  html += '<div style="display: grid; grid-template-columns: repeat(7, 1fr); gap: 4px;">';
  
  // Empty cells before month starts
  for (let i = 0; i < startingDayOfWeek; i++) {
    html += '<div></div>';
  }
  
  // Days of month
  for (let day = 1; day <= daysInMonth; day++) {
    const date = new Date(year, month, day);
    const isSelected = date.toDateString() === state.selectedDate.toDateString();
    const isToday = date.toDateString() === today.toDateString();
    const isFuture = date > today;
    
    const bgColor = isSelected ? 'var(--blue)' : isToday ? 'var(--gray-100)' : 'var(--white)';
    const textColor = isSelected ? 'white' : isFuture ? 'var(--gray-300)' : 'var(--gray-900)';
    const border = isToday ? '2px solid var(--blue)' : '1px solid var(--gray-200)';
    const cursor = isFuture ? 'not-allowed' : 'pointer';
    const onClick = isFuture ? '' : `onclick="selectDate(${day})"`;
    
    html += `<button style="padding: 8px; border: ${border}; background: ${bgColor}; color: ${textColor}; border-radius: 8px; font-weight: 600; cursor: ${cursor}; font-size: 13px; transition: all 0.15s; opacity: ${isFuture ? 0.5 : 1};" ${onClick}>${day}</button>`;
  }
  
  html += '</div></div>';
  container.innerHTML = html;
}

function selectDate(day) {
  const today = new Date();
  state.selectedDate = new Date(today.getFullYear(), today.getMonth(), day);
  updateDateDisplay();
  buildHighlights();
  updateDateNavButtons();
  closeDatePicker();
}

function buildHighlights() {
  const grid = document.getElementById('highlights-grid');
  
  // Filter posts by selected date
  const postsForDate = state.posts.filter(post => {
    return post.date && post.date.toDateString() === state.selectedDate.toDateString();
  });
  
  // Sort by likes and take top 6
  const sorted = postsForDate.sort((a, b) => b.likes - a.likes).slice(0, 6);
  
  if (sorted.length === 0) {
    grid.innerHTML = '<div style="grid-column: 1/-1; text-align: center; padding: 40px 20px; color: var(--gray-400);"><div style="font-size: 32px; margin-bottom: 8px;">📭</div><div style="font-size: 14px;">No highlights for this date</div></div>';
    return;
  }
  
  grid.innerHTML = sorted.map((post, i) => {
    const grad = GRAD_MAP[post.color] || GRAD_MAP['pink'];
    return `
      <div class="highlight-card" style="background: ${grad};" onclick="handleComment(${post.id})">
        <div class="highlight-rank">#${i+1} 🔥</div>
        <div class="highlight-text">${post.text}</div>
        <div class="highlight-stats">❤️ ${post.likes} · 💬 ${(state.comments[post.id]||[]).length}</div>
      </div>`;
  }).join('');
}

/* ===================== PROFILE ===================== */
function buildProfileGrid() {
  const grid = document.getElementById('profile-grid');
  const myPosts = state.posts.slice(0, 9);
  grid.innerHTML = myPosts.map(p => {
    const grad = GRAD_MAP[p.color] || GRAD_MAP['pink'];
    return `<div class="highlight-card" style="background: ${grad};" onclick="handleComment(${p.id})">
      <div class="highlight-text">${p.text}</div>
      <div class="highlight-stats">❤️ ${p.likes} · 💬 ${(state.comments[p.id]||[]).length}</div>
    </div>`;
  }).join('');
}

/* ===================== REPORT ===================== */
function openReportModal(type, id) {
  state.reportTarget = { type, id };
  document.getElementById('report-modal-title').textContent = type === 'account' ? '🚩 Report Account' : '🚩 Report Post';
  document.getElementById('report-modal').classList.remove('hidden');
}

function closeReportModal() {
  document.getElementById('report-modal').classList.add('hidden');
  state.reportTarget = null;
}

function submitReport(reason) {
  closeReportModal();
  showToast('🚩 Report submitted. We\'ll review it.');
  // In production: send to DB
}

/* ===================== MENU DRAWER ===================== */
function renderMenuCard() {
  return `
    <div class="feed-slot" style="height: 100dvh; display: flex; align-items: center; justify-content: center; padding: 16px;">
      <div class="menu-card">
        <div class="menu-card-header">
          <div>
            <div class="menu-card-title">Menu</div>
            <div class="menu-card-subtitle">Navigate the app from this card</div>
          </div>
        </div>
        <div class="menu-card-body">
          <button class="menu-card-item" onclick="selectMenuPage('feed')">
            <span>Confessions</span>
            <i class="fa-solid fa-book-open"></i>
          </button>
          <button class="menu-card-item" onclick="selectMenuPage('highlights')">
            <span>Highlights</span>
            <i class="fa-solid fa-star"></i>
          </button>
          <button class="menu-card-item" onclick="selectMenuPage('profile')">
            <span>Profile</span>
            <i class="fa-solid fa-user"></i>
          </button>
          <div class="menu-card-divider"></div>
          <button class="menu-card-item" onclick="selectMenuPage('saved')">
            <span>Saved</span>
            <i class="fa-solid fa-bookmark"></i>
          </button>
          <button class="menu-card-item" onclick="selectMenuPage('donate')">
            <span>Donate</span>
            <i class="fa-solid fa-heart"></i>
          </button>
          <button class="menu-card-item menu-card-item-danger" onclick="selectMenuPage('logout')">
            <span>Logout</span>
            <i class="fa-solid fa-right-from-bracket"></i>
          </button>
        </div>
      </div>
    </div>    
  `;
}

function updateMenuButton() {
  const menuBtn = document.getElementById('btn-menu');
  if (!menuBtn) return;
  menuBtn.innerHTML = state.menuOpen ? '<i class="fa-solid fa-xmark"></i>' : '<i class="fa-solid fa-bars"></i>';
  menuBtn.setAttribute('aria-label', state.menuOpen ? 'Close menu' : 'Menu');
}

function selectMenuPage(page) {
  state.menuOpen = false;
  updateMenuButton();
  buildFeed();

  if (page === 'saved') {
    showToast('📌 Saved coming soon');
    return;
  }
  if (page === 'donate') {
    showToast('❤️ Donate coming soon');
    return;
  }
  if (page === 'logout') {
    logout();
    return;
  }

  switchPage(page);
}

function toggleMenu() {
  state.menuOpen = !state.menuOpen;
  updateMenuButton();

  const feed = document.getElementById('page-feed');
  const mobileNav = document.getElementById('mobile-nav');
  if (mobileNav) {
    mobileNav.style.display = state.menuOpen ? 'none' : 'flex';
  }
  if (!feed) return;

  if (state.menuOpen) {
    if (state.currentPage !== 'feed') {
      switchPage('feed');
    }
    feed.innerHTML = renderMenuCard();
  } else {
    buildFeed();
  }
}

/* ===================== TOAST ===================== */
function showToast(msg, duration = 2800) {
  const container = document.getElementById('toast-container');
  const toast = document.createElement('div');
  toast.className = 'toast';
  toast.textContent = msg;
  container.appendChild(toast);
  setTimeout(() => {
    toast.style.opacity = '0';
    toast.style.transition = 'opacity 0.3s';
    setTimeout(() => toast.remove(), 320);
  }, duration);
}

/* ===================== UTILITIES ===================== */
function autoResize(el) {
  el.style.height = 'auto';
  el.style.height = Math.min(el.scrollHeight, 90) + 'px';
}

// Responsive: rebuild feed slot heights on resize
let resizeTimer;
window.addEventListener('resize', () => {
  clearTimeout(resizeTimer);
  resizeTimer = setTimeout(() => {
    document.querySelectorAll('.feed-slot').forEach(s => {
      s.style.height = window.innerHeight + 'px';
    });
  }, 150);
});

// Show app immediately (guest mode)
document.getElementById('app-root').classList.add('visible');
document.getElementById('auth-overlay').classList.add('hidden');

// Rebuild highlights when switching to that tab
document.querySelectorAll('[data-page="highlights"]').forEach(btn => {
  btn.addEventListener('click', () => {
    buildHighlights();
    updateDateDisplay();
    updateDateNavButtons();
  });
});
document.querySelectorAll('[data-page="profile"]').forEach(btn => {
  btn.addEventListener('click', buildProfileGrid);
});
