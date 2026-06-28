const navToggle = document.querySelector(".nav-toggle");
const siteNav = document.querySelector(".site-nav");
const navLinks = document.querySelectorAll(".site-nav a");
const year = document.querySelector("#year");
const profilePhoto = document.querySelector(".profile-photo");
const comparisonModal = document.querySelector("#comparison-modal");
const comparisonTitle = document.querySelector("#comparison-title");
const comparisonBefore = document.querySelector("#comparison-before");
const comparisonAfter = document.querySelector("#comparison-after");
const comparisonSiteLink = document.querySelector("#comparison-site-link");
const comparisonButtons = document.querySelectorAll(".js-comparison-open");
const modalCloseButtons = document.querySelectorAll("[data-modal-close]");
let lastFocusedElement = null;

if (year) {
  year.textContent = new Date().getFullYear();
}

if (profilePhoto) {
  profilePhoto.addEventListener("error", () => {
    profilePhoto.hidden = true;
  });
}

if (navToggle && siteNav) {
  navToggle.addEventListener("click", () => {
    const isOpen = siteNav.classList.toggle("is-open");
    navToggle.setAttribute("aria-expanded", String(isOpen));
  });
}

navLinks.forEach((link) => {
  link.addEventListener("click", () => {
    siteNav?.classList.remove("is-open");
    navToggle?.setAttribute("aria-expanded", "false");
  });
});

function closeComparisonModal() {
  if (!comparisonModal) {
    return;
  }

  comparisonModal.hidden = true;
  document.body.classList.remove("modal-open");
  lastFocusedElement?.focus();
}

comparisonButtons.forEach((button) => {
  button.addEventListener("click", () => {
    if (!comparisonModal || !comparisonTitle || !comparisonBefore || !comparisonAfter) {
      return;
    }

    lastFocusedElement = button;
    comparisonTitle.textContent = button.dataset.title || "Proyecto";
    comparisonBefore.src = button.dataset.before || "assets/project-before-generic.svg";
    comparisonAfter.src = button.dataset.after || "assets/project-before-generic.svg";
    comparisonBefore.alt = `Imagen del antes de ${comparisonTitle.textContent}`;
    comparisonAfter.alt = `Imagen del después de ${comparisonTitle.textContent}`;
    if (comparisonSiteLink) {
      const siteUrl = button.dataset.url;
      comparisonSiteLink.hidden = !siteUrl;
      comparisonSiteLink.href = siteUrl || "#";
    }
    comparisonModal.hidden = false;
    document.body.classList.add("modal-open");
    comparisonModal.querySelector(".modal-close")?.focus();
  });
});

modalCloseButtons.forEach((button) => {
  button.addEventListener("click", closeComparisonModal);
});

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape" && comparisonModal && !comparisonModal.hidden) {
    closeComparisonModal();
  }
});
