// ==================== SHARED DATA STORE (localStorage) ====================

const DEFAULT_MENUS = [
  { id: 1, name: 'Нүүр хуудас', url: 'index.html', order: 1 },
  { id: 2, name: 'Бидний тухай', url: '#about', order: 2 },
  { id: 3, name: 'Холбоо барих', url: '#contact', order: 3 },
];

const DEFAULT_NEWS = [
  { id: 1, title: 'Манай шинэ вэбсайт нээлт', type: 'news', content: 'Манай байгууллагын шинэчлэгдсэн вэбсайт амжилттай нээгдлээ.', date: '2025-04-01' },
  { id: 2, title: 'GitHub Pages дотор байршуулах', type: 'project', content: 'Front-end статик сайтаа GitHub Pages-д байршуулах төсөл.', date: '2025-04-10', tags: ['GitHub', 'HTML', 'CSS'] },
];

const DEFAULT_PROFILE = {
  name: 'хархул',
  title: 'Front-end хөгжүүлэгч',
  bio: 'Би веб хөгжүүлэлт болон UI/UX дизайн сонирхдог. Орчин үеийн, хэрэглэгчдэд ээлтэй веб сайт бүтээх дуртай..',
  email: 'hulaajaa@gmail.com',
  github: 'https://github.com/haru1006',
  badge: 'Миний портфолио — 2026',
  photo: 'jojo.jpg',
};

const Store = {
  getMenus() {
    const d = localStorage.getItem('cms_menus');
    return d ? JSON.parse(d) : DEFAULT_MENUS;
  },
  saveMenus(menus) { localStorage.setItem('cms_menus', JSON.stringify(menus)); },

  getNews() {
    const d = localStorage.getItem('cms_news');
    return d ? JSON.parse(d) : DEFAULT_NEWS;
  },
  saveNews(news) { localStorage.setItem('cms_news', JSON.stringify(news)); },

  getMessages() {
    const d = localStorage.getItem('cms_messages');
    return d ? JSON.parse(d) : [];
  },
  saveMessages(msgs) { localStorage.setItem('cms_messages', JSON.stringify(msgs)); },
  addMessage(msg) {
    const msgs = Store.getMessages();
    const id = parseInt(localStorage.getItem('cms_next_msg_id') || '1');
    localStorage.setItem('cms_next_msg_id', id + 1);
    msgs.push({ ...msg, id, date: new Date().toISOString(), read: false });
    Store.saveMessages(msgs);
  },
  markRead(id) {
    const msgs = Store.getMessages().map(m => m.id === id ? { ...m, read: true } : m);
    Store.saveMessages(msgs);
  },
  deleteMessage(id) {
    Store.saveMessages(Store.getMessages().filter(m => m.id !== id));
  },

  getProfile() {
    const d = localStorage.getItem('cms_profile');
    return d ? JSON.parse(d) : DEFAULT_PROFILE;
  },
  saveProfile(p) { localStorage.setItem('cms_profile', JSON.stringify(p)); },

  getNextMenuId() {
    const id = parseInt(localStorage.getItem('cms_next_menu_id') || '4');
    localStorage.setItem('cms_next_menu_id', id + 1);
    return id;
  },
  getNextNewsId() {
    const id = parseInt(localStorage.getItem('cms_next_news_id') || '3');
    localStorage.setItem('cms_next_news_id', id + 1);
    return id;
  },
  isLoggedIn() {
    try {
      if (sessionStorage.getItem('cms_auth') === 'true') return true;
    } catch (e) {}
    try {
      return localStorage.getItem('cms_auth') === 'true';
    } catch (e) { return false; }
  },
  login() {
    try { sessionStorage.setItem('cms_auth', 'true'); } catch (e) {}
    try { localStorage.setItem('cms_auth', 'true'); } catch (e) {}
  },
  logout() {
    try { sessionStorage.removeItem('cms_auth'); } catch (e) {}
    try { localStorage.removeItem('cms_auth'); } catch (e) {}
  }
};

// ==================== TOAST ====================
function showToast(msg) {
  let t = document.getElementById('toast');
  if (!t) {
    t = document.createElement('div');
    t.id = 'toast';
    t.className = 'toast';
    document.body.appendChild(t);
  }
  t.textContent = msg;
  t.classList.add('show');
  setTimeout(() => t.classList.remove('show'), 2800);
}