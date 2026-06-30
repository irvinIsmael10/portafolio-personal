const navToggle = document.querySelector(".nav-toggle");
const siteNav = document.querySelector(".site-nav");
const navLinks = document.querySelectorAll(".site-nav a");
const year = document.querySelector("#year");
const profilePhoto = document.querySelector(".profile-photo");
const comparisonModal = document.querySelector("#comparison-modal");
const comparisonTitle = document.querySelector("#comparison-title");
const comparisonSections = document.querySelector("#comparison-sections");
const comparisonSiteLink = document.querySelector("#comparison-site-link");
const comparisonButtons = document.querySelectorAll(".js-comparison-open");
const modalCloseButtons = document.querySelectorAll("[data-modal-close]");
let lastFocusedElement = null;

const comparisonSets = {
  sinnen: [
    {
      title: "Inicio",
      before: {
        desktop: "assets/sinnen-before-inicio-desktop.png",
        mobile: "assets/sinnen-before-inicio-mobile.png",
      },
      after: {
        desktop: "assets/sinnen-after-inicio-desktop.png",
        mobile: "assets/sinnen-after-inicio-mobile.png",
      },
    },
    {
      title: "Proyectos",
      before: {
        desktop: "assets/sinnen-before-proyectos-desktop.png",
        mobile: "assets/sinnen-before-proyectos-mobile.png",
      },
      after: {
        desktop: "assets/sinnen-after-proyectos-desktop.png",
        mobile: "assets/sinnen-after-proyectos-mobile.png",
      },
    },
    {
      title: "Empresa",
      before: {
        desktop: "assets/sinnen-before-empresa-desktop.png",
        mobile: "assets/sinnen-before-empresa-mobile.png",
      },
      after: {
        desktop: "assets/sinnen-after-empresa-desktop.png",
        mobile: "assets/sinnen-after-empresa-mobile.png",
      },
    },
    {
      title: "Contacto",
      before: {
        desktop: "assets/sinnen-before-contacto-desktop.png",
        mobile: "assets/sinnen-before-contacto-mobile.png",
      },
      after: {
        desktop: "assets/sinnen-after-contacto-desktop.png",
        mobile: "assets/sinnen-after-contacto-mobile.png",
      },
    },
  ],
};

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

function createComparisonImage(src, alt) {
  const image = document.createElement("img");
  image.src = src;
  image.alt = alt;
  image.loading = "lazy";
  return image;
}

function createComparisonShot(label, src, alt, modifier) {
  const wrapper = document.createElement("div");
  wrapper.className = `comparison-shot ${modifier}`;

  const labelElement = document.createElement("span");
  labelElement.textContent = label;

  wrapper.append(labelElement, createComparisonImage(src, alt));
  return wrapper;
}

function createComparisonPanel(label, images, title, projectTitle) {
  const panel = document.createElement("figure");
  panel.className = "comparison-panel";

  const caption = document.createElement("figcaption");
  caption.textContent = label;

  const shots = document.createElement("div");
  shots.className = "comparison-shots";
  shots.append(
    createComparisonShot(
      "Escritorio",
      images.desktop,
      `${label} de ${projectTitle}, ${title}, en escritorio`,
      "comparison-shot-desktop"
    ),
    createComparisonShot(
      "Celular",
      images.mobile || images.desktop,
      `${label} de ${projectTitle}, ${title}, en celular`,
      "comparison-shot-mobile"
    )
  );

  panel.append(caption, shots);
  return panel;
}

function renderComparisonSections(sections, projectTitle) {
  if (!comparisonSections) {
    return;
  }

  comparisonSections.replaceChildren();

  sections.forEach((section) => {
    const sectionElement = document.createElement("section");
    sectionElement.className = "comparison-section";
    sectionElement.setAttribute("aria-label", `Comparacion de ${section.title}`);

    const sectionTitle = document.createElement("h3");
    sectionTitle.textContent = section.title;

    const grid = document.createElement("div");
    grid.className = "comparison-grid";
    grid.append(
      createComparisonPanel("Antes", section.before, section.title, projectTitle),
      createComparisonPanel("Después", section.after, section.title, projectTitle)
    );

    sectionElement.append(sectionTitle, grid);
    comparisonSections.append(sectionElement);
  });
}

comparisonButtons.forEach((button) => {
  button.addEventListener("click", () => {
    if (!comparisonModal || !comparisonTitle || !comparisonSections) {
      return;
    }

    lastFocusedElement = button;
    comparisonTitle.textContent = button.dataset.title || "Proyecto";
    const customSections = comparisonSets[button.dataset.comparisonSet];
    const fallbackBeforeDesktop = button.dataset.before || "assets/project-before-generic.svg";
    const fallbackAfterDesktop = button.dataset.after || "assets/project-before-generic.svg";
    const sections =
      customSections ||
      [
        {
          title: "Vista principal",
          before: {
            desktop: fallbackBeforeDesktop,
            mobile: button.dataset.beforeMobile || fallbackBeforeDesktop,
          },
          after: {
            desktop: fallbackAfterDesktop,
            mobile: button.dataset.afterMobile || fallbackAfterDesktop,
          },
        },
      ];
    renderComparisonSections(sections, comparisonTitle.textContent);

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
