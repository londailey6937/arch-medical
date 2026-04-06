// GA4 config
window.dataLayer = window.dataLayer || [];
function gtag() {
  dataLayer.push(arguments);
}
gtag("js", new Date());
gtag("config", "G-XXXXXXXXXX");

// Mobile menu toggle
document.getElementById("mobileMenu").addEventListener("click", function () {
  document.querySelector(".nav-links").classList.toggle("nav-open");
});

// Scroll-reveal animation for hero cards
(function () {
  var cards = document.querySelectorAll(".showcase-hero-card");
  var observer = new IntersectionObserver(
    function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add("revealed");
        }
      });
    },
    { threshold: 0.15 },
  );
  cards.forEach(function (card) {
    observer.observe(card);
  });
})();

// Card popup data for all 9 hero cards
var cardPopupData = [
  {
    title: "Dual-Track Dashboard",
    desc: "Technical and regulatory milestones tracked side by side. Your team sees exactly where both tracks stand — and what's blocking FDA clearance.",
    features: [
      {
        icon: "🔬",
        name: "Technical Track",
        detail: "Engineering milestones, V&V testing, design controls",
      },
      {
        icon: "📋",
        name: "Regulatory Track",
        detail: "510(k) submission steps, FDA interactions, compliance gates",
      },
      {
        icon: "🚦",
        name: "Status at a Glance",
        detail: "Red / yellow / green indicators across every milestone",
      },
      {
        icon: "📊",
        name: "Risk Visibility",
        detail: "Open risks surfaced with severity, owner, and mitigation",
      },
      {
        icon: "🎯",
        name: "Gate Reviews",
        detail: "Phase-gate checkpoints with go/no-go criteria",
      },
      {
        icon: "⏱️",
        name: "Project Timeline",
        detail:
          "Full lifecycle from concept through post-market — a mini MDUFA day-badge at the submission milestone links to the radial clock in FDA Comms",
      },
    ],
  },
  {
    title: "Document Control",
    desc: "ISO 13485-aligned document lifecycle management. Every revision, review cycle, and approval is tracked with full audit traceability.",
    features: [
      {
        icon: "📁",
        name: "Design History File",
        detail:
          "Structured DHF with auto-linked design inputs, outputs, verification",
      },
      {
        icon: "🔄",
        name: "Version History",
        detail: "Full revision chain with author, date, and change summary",
      },
      {
        icon: "✅",
        name: "Review & Approval",
        detail: "Scheduled review cycles with sign-off tracking",
      },
      {
        icon: "🔍",
        name: "Audit Trail",
        detail:
          "Immutable record of every document action for FDA inspection readiness",
      },
      {
        icon: "📎",
        name: "Standards Mapping",
        detail:
          "Link documents to IEC 62304, ISO 14971, and consensus standards",
      },
      {
        icon: "📤",
        name: "Export Ready",
        detail: "One-click export for 510(k) submission packages",
      },
    ],
  },
  {
    title: "Message Board",
    desc: "Purpose-driven messaging where every thread tracks a decision, action, or status update — tied directly to project execution.",
    features: [
      {
        icon: "💬",
        name: "Threaded Discussions",
        detail:
          "Organized conversations by topic, phase, or regulatory question",
      },
      {
        icon: "📌",
        name: "Decision Tracking",
        detail: "Pin key decisions with rationale and responsible party",
      },
      {
        icon: "🌐",
        name: "Bilingual Support",
        detail: "EN/中文 interface for cross-border team collaboration",
      },
      {
        icon: "🔔",
        name: "Smart Notifications",
        detail: "Alerts for mentions, due dates, and unresolved action items",
      },
      {
        icon: "🔗",
        name: "Context Links",
        detail: "Attach messages to milestones, documents, or risk items",
      },
      {
        icon: "📋",
        name: "Action Items",
        detail:
          "Convert any message to a tracked action with owner and deadline",
      },
    ],
  },
  {
    title: "Gate System",
    desc: "Phase-gate reviews with criteria checklists — Go/No-Go decisions recorded with stakeholder inputs, conditions, and action items.",
    features: [
      {
        icon: "🚪",
        name: "Phase Gates",
        detail: "Configurable gates from concept through post-market",
      },
      {
        icon: "✅",
        name: "Criteria Checklists",
        detail: "Required deliverables and success criteria per gate",
      },
      {
        icon: "👥",
        name: "Stakeholder Review",
        detail: "Reviewer assignments with sign-off tracking",
      },
      {
        icon: "🚦",
        name: "Go / No-Go / Conditional",
        detail: "Three-state decisions with documented rationale",
      },
      {
        icon: "📝",
        name: "Conditions & Actions",
        detail: "Track post-gate conditions and follow-up tasks",
      },
      {
        icon: "📊",
        name: "Gate History",
        detail: "Full audit trail of every gate decision and revision",
      },
    ],
  },
  {
    title: "Risk Dashboard",
    desc: "ISO 14971 risk matrix with severity, probability, and color-coded risk levels — track mitigations from identification to closure.",
    features: [
      {
        icon: "⚠️",
        name: "Risk Matrix",
        detail:
          "5×5 severity vs. probability grid with color-coded risk levels",
      },
      {
        icon: "📉",
        name: "Mitigation Tracking",
        detail: "Link each risk to mitigation actions with status and owner",
      },
      {
        icon: "🔴",
        name: "Risk Levels",
        detail: "Red / yellow / green classification with threshold alerts",
      },
      {
        icon: "📋",
        name: "ISO 14971 Aligned",
        detail: "Structured risk analysis following international standard",
      },
      {
        icon: "🔄",
        name: "Residual Risk",
        detail: "Track pre- and post-mitigation risk levels",
      },
      {
        icon: "📊",
        name: "Risk Trends",
        detail: "Monitor open vs. closed risks across project lifecycle",
      },
    ],
  },
  {
    title: "FDA Communications Center",
    desc: "Q-Sub cover letter generator, 17-item RTA self-check, MDUFA 90-day radial clock gauge (Day 15 RTA → Day 60 review → Day 90 decision, with clock-pause tracking), SE decision flowchart, plus a mini day-badge on the Timeline tab.",
    features: [
      {
        icon: "📨",
        name: "Q-Sub Generator",
        detail:
          "Auto-generate Pre-Submission cover letters with FDA formatting",
      },
      {
        icon: "✅",
        name: "RTA Self-Check",
        detail:
          "17-item Refuse to Accept checklist cross-referenced with your DHF",
      },
      {
        icon: "⏱️",
        name: "MDUFA 90-Day Clock",
        detail:
          "Radial gauge showing Day X / 90 with green/amber/red arcs + milestone markers at Day 15, 60, 90 — auto-pauses when FDA requests Additional Information",
      },
      {
        icon: "🔀",
        name: "SE Decision Flow",
        detail: "5-point substantial equivalence decision flowchart",
      },
      {
        icon: "📄",
        name: "Letter Templates",
        detail:
          "Pre-Sub, 510(k), RTA response, withdrawal, and amendment templates",
      },
      {
        icon: "🏛️",
        name: "FDA Contacts",
        detail: "Branch-specific contact directory for your device category",
      },
    ],
  },
  {
    title: "Budget Tracking",
    desc: "Planned vs. actual spend by category with automatic variance calculation — toggle between USD and CNY display.",
    features: [
      {
        icon: "💰",
        name: "Category Budgets",
        detail:
          "Regulatory, engineering, testing, legal, and custom categories",
      },
      {
        icon: "📊",
        name: "Variance Analysis",
        detail: "Automatic planned vs. actual calculation with alerts",
      },
      {
        icon: "💱",
        name: "USD / CNY Toggle",
        detail: "Switch between dollar and yuan display with live conversion",
      },
      {
        icon: "📈",
        name: "Burn Rate",
        detail: "Monthly spend tracking with runway projection",
      },
      {
        icon: "🔔",
        name: "Over-Budget Alerts",
        detail: "Visual warnings when categories exceed planned limits",
      },
      {
        icon: "📤",
        name: "Export Reports",
        detail: "Download budget summaries for investor reporting",
      },
    ],
  },
  {
    title: "Audit Trail",
    desc: "21 CFR Part 11 compliant — every change timestamped with user, field, old value, new value, and detail description.",
    features: [
      {
        icon: "🕐",
        name: "Timestamped Changes",
        detail: "Every edit recorded with exact date, time, and user",
      },
      {
        icon: "👤",
        name: "User Attribution",
        detail: "Who made each change, with role and session info",
      },
      {
        icon: "🔄",
        name: "Field-Level Diffs",
        detail: "Old value → new value for every modified field",
      },
      {
        icon: "🔒",
        name: "Immutable Records",
        detail: "Append-only audit log, no edits or deletions",
      },
      {
        icon: "🏛️",
        name: "21 CFR Part 11",
        detail: "Designed for FDA electronic records compliance",
      },
      {
        icon: "🔍",
        name: "Search & Filter",
        detail: "Find changes by user, date range, field, or record type",
      },
    ],
  },
  {
    title: "Actions / DHF / CAPA",
    desc: "Task board, Design History File tracker, Device Master Record tracker, and Corrective & Preventive Action log.",
    features: [
      {
        icon: "📋",
        name: "Action Board",
        detail: "Kanban-style task tracking with owner, priority, and due date",
      },
      {
        icon: "📁",
        name: "Design History File",
        detail:
          "Structured DHF tracker — inputs, outputs, verification, validation",
      },
      {
        icon: "📦",
        name: "Device Master Record",
        detail: "DMR tracking for specifications, procedures, and labels",
      },
      {
        icon: "⚠️",
        name: "CAPA Log",
        detail: "Corrective & Preventive Action log with root cause analysis",
      },
      {
        icon: "🔗",
        name: "Cross-References",
        detail: "Link actions to risks, documents, and gate conditions",
      },
      {
        icon: "📊",
        name: "Status Overview",
        detail: "Dashboard view of open, in-progress, and closed items",
      },
    ],
  },
];

// Wire card popups
(function () {
  var modal = document.getElementById("cardModal");
  var modalTitle = document.getElementById("cardModalTitle");
  var modalImg = document.getElementById("cardModalImg");
  var modalDesc = document.getElementById("cardModalDesc");
  var modalFeatures = document.getElementById("cardModalFeatures");

  document.querySelectorAll(".showcase-hero-card").forEach(function (card, i) {
    card.addEventListener("click", function () {
      var data = cardPopupData[i];
      if (!data) return;
      modalTitle.textContent = data.title;
      modalImg.src = card.querySelector("img").src;
      modalImg.alt = data.title;
      modalDesc.textContent = data.desc;
      modalFeatures.innerHTML = data.features
        .map(function (f) {
          return (
            '<div class="card-modal-feature">' +
            '<span class="card-modal-feature-icon">' +
            f.icon +
            "</span>" +
            '<div class="card-modal-feature-text"><strong>' +
            f.name +
            "</strong>" +
            "<span>" +
            f.detail +
            "</span></div></div>"
          );
        })
        .join("");
      modal.classList.add("active");
    });
  });

  document
    .getElementById("cardModalClose")
    .addEventListener("click", function () {
      modal.classList.remove("active");
    });
  modal.addEventListener("click", function (e) {
    if (e.target === modal) modal.classList.remove("active");
  });
})();

// Lightbox for screenshot thumbnails (bottom grid only)
(function () {
  var lb = document.getElementById("showcaseLightbox");
  var lbImg = document.getElementById("lightboxImg");
  document.querySelectorAll(".showcase-thumb img").forEach(function (img) {
    img.style.cursor = "pointer";
    img.addEventListener("click", function () {
      lbImg.src = this.src;
      lbImg.alt = this.alt;
      lb.classList.add("active");
    });
  });
  document
    .getElementById("lightboxClose")
    .addEventListener("click", function () {
      lb.classList.remove("active");
    });
  lb.addEventListener("click", function (e) {
    if (e.target === lb) lb.classList.remove("active");
  });
})();

// 510(k) Lifecycle Tour Carousel
(function () {
  var slides = document.querySelectorAll(".tour-slide");
  var dots = document.querySelectorAll(".tour-dot");
  var prevBtn = document.getElementById("tourPrev");
  var nextBtn = document.getElementById("tourNext");
  if (!slides.length || !prevBtn || !nextBtn) return;

  var current = 0;
  var total = slides.length;
  var autoTimer = null;

  function goTo(idx) {
    slides[current].classList.remove("active");
    dots[current].classList.remove("active");
    current = (idx + total) % total;
    slides[current].classList.add("active");
    dots[current].classList.add("active");
  }

  function startAuto() {
    stopAuto();
    autoTimer = setInterval(function () {
      goTo(current + 1);
    }, 6000);
  }

  function stopAuto() {
    if (autoTimer) clearInterval(autoTimer);
    autoTimer = null;
  }

  prevBtn.addEventListener("click", function () {
    goTo(current - 1);
    stopAuto();
    startAuto();
  });

  nextBtn.addEventListener("click", function () {
    goTo(current + 1);
    stopAuto();
    startAuto();
  });

  dots.forEach(function (dot) {
    dot.addEventListener("click", function () {
      goTo(parseInt(this.dataset.step, 10));
      stopAuto();
      startAuto();
    });
  });

  // Keyboard nav when carousel is in viewport
  document.addEventListener("keydown", function (e) {
    var rect = document.getElementById("lifecycleTour").getBoundingClientRect();
    if (rect.top > window.innerHeight || rect.bottom < 0) return;
    if (e.key === "ArrowLeft") {
      goTo(current - 1);
      stopAuto();
      startAuto();
    }
    if (e.key === "ArrowRight") {
      goTo(current + 1);
      stopAuto();
      startAuto();
    }
  });

  // Start auto-advance when carousel scrolls into view
  var tourEl = document.getElementById("lifecycleTour");
  var observer = new IntersectionObserver(
    function (entries) {
      if (entries[0].isIntersecting) startAuto();
      else stopAuto();
    },
    { threshold: 0.3 },
  );
  observer.observe(tourEl);
})();
