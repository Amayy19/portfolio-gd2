const portfolioEmail = "your.email@example.com";
document.getElementById("year").textContent = new Date().getFullYear();

// Theme Toggle Logic
const themeBtn = document.getElementById("themeToggleBtn");
themeBtn.addEventListener("click", () => {
  document.body.classList.toggle("light-theme");
  const isLight = document.body.classList.contains("light-theme");
  themeBtn.innerHTML = isLight ? '<i class="fa-solid fa-sun"></i>' : '<i class="fa-solid fa-moon"></i>';
});

// Mobile Navbar Navigation
const menuBtn = document.getElementById("menuBtn");
const navLinks = document.getElementById("navLinks");
menuBtn.addEventListener("click", () => {
  const isOpen = navLinks.classList.toggle("open");
  menuBtn.setAttribute("aria-expanded", String(isOpen));
});
document.querySelectorAll(".nav-links a").forEach(link => {
  link.addEventListener("click", () => navLinks.classList.remove("open"));
});

// Reveal Observer
const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add("visible");
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.1 });
document.querySelectorAll(".reveal").forEach(item => observer.observe(item));

// Contact Form Handler
document.getElementById("contactForm").addEventListener("submit", event => {
  event.preventDefault();
  const name = document.getElementById("senderName").value.trim();
  const email = document.getElementById("senderEmail").value.trim();
  const message = document.getElementById("senderMessage").value.trim();
  const subject = encodeURIComponent("Portfolio inquiry from " + name);
  const body = encodeURIComponent("Name: " + name + "\nEmail: " + email + "\n\n" + message);
  window.location.href = `mailto:${portfolioEmail}?subject=${subject}&body=${body}`;
});

// Portfolio Filter Logic
const filterBtns = document.querySelectorAll(".filter-btn");
const projectCards = document.querySelectorAll(".project-card");

filterBtns.forEach(btn => {
  btn.addEventListener("click", () => {
    filterBtns.forEach(b => b.classList.remove("active"));
    btn.classList.add("active");
    const filter = btn.getAttribute("data-filter");

    projectCards.forEach(card => {
      if (filter === "all" || card.getAttribute("data-category") === filter) {
        card.classList.remove("hide");
      } else {
        card.classList.add("hide");
      }
    });
  });
});

// Modal Logic
const modal = document.getElementById("projectModal");
const modalClose = document.getElementById("modalClose");
const modalImg = document.getElementById("modalImg");
const modalTitle = document.getElementById("modalTitle");
const modalDesc = document.getElementById("modalDesc");
const modalGithub = document.getElementById("modalGithub");

document.querySelectorAll(".open-modal-btn").forEach(btn => {
  btn.addEventListener("click", () => {
    modalTitle.textContent = btn.getAttribute("data-title");
    modalDesc.textContent = btn.getAttribute("data-desc");
    modalImg.src = btn.getAttribute("data-img");
    modalGithub.href = btn.getAttribute("data-github") || "#";
    modal.classList.add("active");
  });
});

modalClose.addEventListener("click", () => modal.classList.remove("active"));
modal.addEventListener("click", e => { if (e.target === modal) modal.classList.remove("active"); });

// Interactive CLI Terminal Logic
const tInput = document.getElementById("terminalInput");
const tBody = document.getElementById("terminalBody");

tInput.addEventListener("keydown", e => {
  if (e.key === "Enter") {
    const cmd = tInput.value.trim().toLowerCase();
    tInput.value = "";
    
    let reply = "";
    if (cmd === "help") reply = "Commands: <span class='highlight'>about</span>, <span class='highlight'>skills</span>, <span class='highlight'>projects</span>, <span class='highlight'>clear</span>";
    else if (cmd === "about") reply = "Almar Magno | Computer Science Student @ City College of Calamba.";
    else if (cmd === "skills") reply = "Languages: C++, Java, Python, JS, HTML/CSS. Tools: Git, Cisco Packet Tracer.";
    else if (cmd === "projects") reply = "Projects: Magic Sort, FlexWell, Cisco Topology, Personal Web Pages.";
    else if (cmd === "clear") { tBody.innerHTML = ""; return; }
    else reply = `Command not recognized: '${cmd}'. Type <span class='highlight'>help</span> for available commands.`;

    const line = document.createElement("p");
    line.innerHTML = `<span class='prompt'>almar@cs:~$</span> ${cmd}<br>${reply}`;
    tBody.appendChild(line);
    tBody.scrollTop = tBody.scrollHeight;
  }
});

// Floating Icons Background Canvas
const canvas = document.getElementById("bgCanvas");
const ctx = canvas.getContext("2d");
function resizeCanvas() { canvas.width = window.innerWidth; canvas.height = window.innerHeight; }
resizeCanvas();
window.addEventListener("resize", resizeCanvas);

const icons = ["C++", "Java", "Python", "JS", "HTML", "CSS", "{ }", "</>", "fn()", "#include"];
class FloatingIcon {
  constructor() { this.reset(); }
  reset() {
    this.x = Math.random() * canvas.width;
    this.y = canvas.height + 50;
    this.speed = 0.4 + Math.random() * 0.8;
    this.text = icons[Math.floor(Math.random() * icons.length)];
    this.size = 14 + Math.random() * 10;
    this.opacity = 0.15 + Math.random() * 0.2;
    this.color = Math.random() > 0.5 ? "#9b8cff" : "#59d6c7";
  }
  update() { this.y -= this.speed; if (this.y < -20) this.reset(); }
  draw() {
    ctx.save();
    ctx.font = `600 ${this.size}px "Space Grotesk", sans-serif`;
    ctx.fillStyle = this.color;
    ctx.globalAlpha = this.opacity;
    ctx.fillText(this.text, this.x, this.y);
    ctx.restore();
  }
}
const floatingIconsArray = Array.from({ length: 30 }, () => {
  const icon = new FloatingIcon();
  icon.y = Math.random() * canvas.height;
  return icon;
});
function animate() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  floatingIconsArray.forEach(icon => { icon.update(); icon.draw(); });
  requestAnimationFrame(animate);
}
animate();