/* ===============================
   GLOBAL SETTINGS + FADE SYSTEM
   =============================== */
* {
  box-sizing: border-box;
  scroll-behavior: smooth;
}

body {
  margin: 0;
  font-family: Arial, sans-serif;
  background: #0b0f1a;
  color: #eaeaea;
  overflow-x: hidden;
  opacity: 0;
  transition: opacity 0.3s ease;
}

body.loaded {
  opacity: 1;
}

body.fade-out {
  opacity: 0;
}

#starCanvas {
  position: fixed;
  inset: 0;
  z-index: -1;
}

/* ===============================
   SIDE MENU (LEFT SLIDING)
   =============================== */
.side-menu {
  position: fixed;
  top: 50px;
  left: 0;
  width: 50px;           /* sidebar width stays fixed */
  height: calc(100% - 50px);
  background: #111;
  color: #fff;
  overflow: hidden;
  z-index: 1000;
  display: flex;
  flex-direction: column;
}

/* Always visible label */
.side-menu .menu-label {
  display: block;
  padding: 10px;
  cursor: pointer;
}

/* Menu links hidden by default (slide in) */
.side-menu .menu-content {
  display: flex;
  flex-direction: column;
  transform: translateX(-100%); /* slide left outside of view */
  transition: transform 0.3s ease;
}

/* Slide in when menu is expanded */
.side-menu.expanded .menu-content {
  transform: translateX(0);
}

/* Links style */
.side-menu .menu-content a {
  display: flex;
  align-items: center;
  color: #fff;
  text-decoration: none;
  padding: 8px 10px;
  transition: background 0.2s;
}

.side-menu .menu-content a:hover,
.side-menu .menu-content a.active {
  background: #222;
}

.side-menu .menu-content .icon {
  margin-right: 8px;
}

/* ===============================
   MAIN CONTENT
   =============================== */
.main-content {
  margin-left: 50px; /* leave space for sidebar */
  padding: 20px;
}
