const navbar = document.getElementById("mainNav");
const yearNow = document.getElementById("yearNow");
const scrollProgress = document.getElementById("scrollProgress");
const sloganRotator = document.getElementById("sloganRotator");
const navCollapse = document.querySelector(".navbar-collapse");
const navLinks = document.querySelectorAll(".nav-link");
const orbOne = document.querySelector(".orb-one");
const orbTwo = document.querySelector(".orb-two");
const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
const FORMSPREE_ENDPOINT_DEFAULT = "https://formspree.io/f/your_form_id";

if (yearNow) {
  yearNow.textContent = new Date().getFullYear();
}

const setNavbarState = () => {
  if (!navbar) return;
  navbar.classList.toggle("scrolled", window.scrollY > 18);
};

const setScrollProgress = () => {
  if (!scrollProgress) return;
  const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
  const ratio = maxScroll > 0 ? (window.scrollY / maxScroll) * 100 : 0;
  scrollProgress.style.width = `${ratio}%`;
};

window.addEventListener("scroll", () => {
  setNavbarState();
  setScrollProgress();
}, { passive: true });

setNavbarState();
setScrollProgress();

const revealElements = document.querySelectorAll(".reveal");
if (!prefersReducedMotion) {
  const revealObserver = new IntersectionObserver(
    (entries, observer) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        const delay = entry.target.dataset.delay;
        if (delay) entry.target.style.transitionDelay = `${delay}s`;
        entry.target.classList.add("active");
        observer.unobserve(entry.target);
      });
    },
    { threshold: 0.16 }
  );
  revealElements.forEach((element) => revealObserver.observe(element));
} else {
  revealElements.forEach((element) => element.classList.add("active"));
}

const premiumSections = document.querySelectorAll(".section-premium");
if (!prefersReducedMotion) {
  const sectionObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        entry.target.classList.toggle("is-inview", entry.isIntersecting);
      });
    },
    {
      threshold: 0.2,
      rootMargin: "-10% 0px -16% 0px"
    }
  );
  premiumSections.forEach((section) => sectionObserver.observe(section));
} else {
  premiumSections.forEach((section) => section.classList.add("is-inview"));
}

const interactiveCards = document.querySelectorAll(
  ".glass-panel, .content-card, .skill-card, .timeline-case-card, .gallery-item, .personal-brand-block, .hire-panel"
);
interactiveCards.forEach((card) => card.classList.add("fx-card"));

if (!prefersReducedMotion) {
  interactiveCards.forEach((card) => {
    card.addEventListener("pointermove", (event) => {
      const rect = card.getBoundingClientRect();
      card.style.setProperty("--mx", `${event.clientX - rect.left}px`);
      card.style.setProperty("--my", `${event.clientY - rect.top}px`);
    });
  });
}

const slogans = [
  "Kh\u00f4ng ng\u1eebng h\u1ecdc h\u1ecfi, kh\u00f4ng ng\u1eebng ph\u00e1t tri\u1ec3n.",
  "X\u00e2y d\u1ef1ng c\u00f4ng ngh\u1ec7 b\u1eb1ng \u0111am m\u00ea v\u00e0 k\u1ef7 lu\u1eadt.",
  "H\u1ecdc t\u1eadp h\u00f4m nay, t\u1ea1o ra gi\u00e1 tr\u1ecb ng\u00e0y mai.",
  "Ph\u00e1t tri\u1ec3n b\u1ea3n th\u00e2n qua t\u1eebng d\u1ef1 \u00e1n v\u00e0 t\u1eebng th\u1eed th\u00e1ch."
];

if (sloganRotator) {
  let sloganIndex = 0;
  setInterval(() => {
    sloganIndex = (sloganIndex + 1) % slogans.length;
    sloganRotator.style.opacity = "0";
    setTimeout(() => {
      sloganRotator.textContent = slogans[sloganIndex];
      sloganRotator.style.opacity = "1";
    }, 180);
  }, 3000);
}

navLinks.forEach((link) => {
  link.addEventListener("click", () => {
    if (navCollapse && navCollapse.classList.contains("show")) {
      new bootstrap.Collapse(navCollapse).hide();
    }
  });
});

const rippleButtons = document.querySelectorAll(".btn-premium, .btn-premium-outline");
rippleButtons.forEach((button) => {
  button.addEventListener("click", (event) => {
    const rect = button.getBoundingClientRect();
    const x = typeof event.clientX === "number" && event.clientX !== 0
      ? event.clientX - rect.left
      : rect.width / 2;
    const y = typeof event.clientY === "number" && event.clientY !== 0
      ? event.clientY - rect.top
      : rect.height / 2;
    const ripple = document.createElement("span");
    ripple.className = "btn-ripple";
    ripple.style.left = `${x}px`;
    ripple.style.top = `${y}px`;
    button.appendChild(ripple);
    window.setTimeout(() => ripple.remove(), 650);
  });
});

const orbitMotion = (xPercent, yPercent) => {
  if (orbOne) orbOne.style.transform = `translate3d(${xPercent * -8}px, ${yPercent * -10}px, 0)`;
  if (orbTwo) orbTwo.style.transform = `translate3d(${xPercent * 10}px, ${yPercent * 6}px, 0)`;
};

if (!prefersReducedMotion) {
  window.addEventListener("mousemove", (event) => {
    const x = (event.clientX / window.innerWidth - 0.5) * 2;
    const y = (event.clientY / window.innerHeight - 0.5) * 2;
    orbitMotion(x, y);
  });

  window.addEventListener("scroll", () => {
    const ratio = window.scrollY / Math.max(1, document.body.scrollHeight - window.innerHeight);
    orbitMotion(ratio - 0.5, ratio * 0.7 - 0.35);
  }, { passive: true });

  const magnetButtons = document.querySelectorAll(".magnet-btn");
  magnetButtons.forEach((button) => {
    button.addEventListener("mousemove", (event) => {
      const rect = button.getBoundingClientRect();
      const x = event.clientX - rect.left - rect.width / 2;
      const y = event.clientY - rect.top - rect.height / 2;
      button.style.transform = `translate(${x * 0.08}px, ${y * 0.14 - 2}px)`;
    });

    button.addEventListener("mouseleave", () => {
      button.style.transform = "translate(0, 0)";
    });
  });
}

const setFormStatus = (statusElement, message, type = "") => {
  if (!statusElement) return;
  statusElement.textContent = message;
  statusElement.classList.remove("is-success", "is-error");
  if (type === "success") statusElement.classList.add("is-success");
  if (type === "error") statusElement.classList.add("is-error");
};

const forms = document.querySelectorAll(".js-formspree-form");
forms.forEach((form) => {
  const statusElement = form.querySelector(".form-status");
  const submitButton = form.querySelector(".form-submit-btn");
  const initialButtonLabel = submitButton ? submitButton.textContent.trim() : "";

  form.addEventListener("submit", async (event) => {
    event.preventDefault();
    form.classList.add("was-validated");

    if (!form.checkValidity()) {
      setFormStatus(statusElement, "Vui l\u00f2ng ho\u00e0n thi\u1ec7n \u0111\u1ea7y \u0111\u1ee7 th\u00f4ng tin b\u1eaft bu\u1ed9c.", "error");
      return;
    }

    let endpoint = (form.dataset.formspreeEndpoint || "").trim();
    if (!endpoint || endpoint.includes("your_form_id")) {
      endpoint = FORMSPREE_ENDPOINT_DEFAULT;
    }
    if (!endpoint || endpoint.includes("your_form_id")) {
      setFormStatus(
        statusElement,
        "Bi\u1ec3u m\u1eabu ch\u01b0a k\u00edch ho\u1ea1t: h\u00e3y thay `your_form_id` b\u1eb1ng endpoint Formspree th\u1eadt c\u1ee7a b\u1ea1n.",
        "error"
      );
      return;
    }

    const formData = new FormData(form);
    if (formData.get("_gotcha")) return;

    formData.append("_subject", "L\u1eddi m\u1eddi tuy\u1ec3n d\u1ee5ng t\u1eeb portfolio Tr\u1ea7n Gia B\u1ea3o");
    formData.append("_language", "vi");
    formData.append("nguon_truy_cap", window.location.href);

    if (submitButton) {
      submitButton.disabled = true;
      submitButton.textContent = "\u0110ang g\u1eedi...";
    }
    setFormStatus(statusElement, "\u0110ang g\u1eedi th\u00f4ng tin, vui l\u00f2ng \u0111\u1ee3i...");

    try {
      const response = await fetch(endpoint, {
        method: "POST",
        body: formData,
        headers: { Accept: "application/json" }
      });

      if (!response.ok) {
        throw new Error("Gửi biểu mẫu không thành công.");
      }

      form.reset();
      form.classList.remove("was-validated");
      setFormStatus(statusElement, "G\u1eedi th\u00e0nh c\u00f4ng. M\u00ecnh s\u1ebd ph\u1ea3n h\u1ed3i s\u1edbm nh\u1ea5t c\u00f3 th\u1ec3.", "success");
    } catch (error) {
      setFormStatus(
        statusElement,
        "Kh\u00f4ng th\u1ec3 g\u1eedi bi\u1ec3u m\u1eabu l\u00fac n\u00e0y. Vui l\u00f2ng th\u1eed l\u1ea1i ho\u1eb7c g\u1eedi qua email.",
        "error"
      );
    } finally {
      if (submitButton) {
        submitButton.disabled = false;
        submitButton.textContent = initialButtonLabel || "G\u1eedi";
      }
    }
  });
});

const timelineTrack = document.querySelector("[data-timeline]");
const timelinePrev = document.querySelector("[data-timeline-prev]");
const timelineNext = document.querySelector("[data-timeline-next]");
const timelineProgress = document.querySelector("[data-timeline-progress]");

if (timelineTrack) {
  const updateTimelineNavState = () => {
    const maxScroll = timelineTrack.scrollWidth - timelineTrack.clientWidth;
    const atStart = timelineTrack.scrollLeft <= 2;
    const atEnd = timelineTrack.scrollLeft >= maxScroll - 2;
    if (timelinePrev) timelinePrev.classList.toggle("is-disabled", atStart);
    if (timelineNext) timelineNext.classList.toggle("is-disabled", atEnd);
  };

  const updateTimelineProgress = () => {
    if (!timelineProgress) return;
    const maxScroll = timelineTrack.scrollWidth - timelineTrack.clientWidth;
    const ratio = maxScroll > 0 ? (timelineTrack.scrollLeft / maxScroll) * 100 : 0;
    timelineProgress.style.width = `${ratio}%`;
    updateTimelineNavState();
  };

  const scrollByStep = () => Math.max(280, Math.round(timelineTrack.clientWidth * 0.65));

  timelineTrack.addEventListener("scroll", updateTimelineProgress);
  window.addEventListener("resize", updateTimelineProgress);
  updateTimelineProgress();

  if (timelinePrev) {
    timelinePrev.addEventListener("click", () => {
      timelineTrack.scrollBy({ left: -scrollByStep(), behavior: "smooth" });
    });
  }

  if (timelineNext) {
    timelineNext.addEventListener("click", () => {
      timelineTrack.scrollBy({ left: scrollByStep(), behavior: "smooth" });
    });
  }
}

const expandableTimelineLists = document.querySelectorAll("[data-expandable-list]");
expandableTimelineLists.forEach((list) => {
  const items = Array.from(list.querySelectorAll("li"));
  const initialVisible = Math.max(1, parseInt(list.dataset.expandableInitial || "4", 10));
  const toggleButton = list.parentElement?.querySelector("[data-expandable-toggle]");

  if (!toggleButton) return;
  if (items.length <= initialVisible) {
    toggleButton.hidden = true;
    return;
  }

  const setExpandedState = (isExpanded) => {
    items.forEach((item, index) => {
      const shouldHide = !isExpanded && index >= initialVisible;
      item.classList.toggle("is-hidden", shouldHide);
    });

    toggleButton.setAttribute("aria-expanded", String(isExpanded));
    toggleButton.textContent = isExpanded
      ? "Thu gọn timeline"
      : "Xem thêm thành tích";
  };

  setExpandedState(false);

  toggleButton.addEventListener("click", () => {
    const expanded = toggleButton.getAttribute("aria-expanded") === "true";
    setExpandedState(!expanded);
  });
});

const galleryItems = document.querySelectorAll("[data-gallery-item]");
const lightbox = document.getElementById("galleryLightbox");
const lightboxImage = document.getElementById("galleryLightboxImage");
const lightboxCaption = document.getElementById("galleryLightboxCaption");
const lightboxClose = document.querySelector("[data-gallery-close]");

const closeLightbox = () => {
  if (!lightbox) return;
  lightbox.classList.remove("is-open");
  lightbox.setAttribute("aria-hidden", "true");
  document.body.classList.remove("no-scroll");
};

if (galleryItems.length && lightbox && lightboxImage && lightboxCaption) {
  galleryItems.forEach((item) => {
    item.addEventListener("click", () => {
      const fullSrc = item.getAttribute("data-full");
      const caption = item.getAttribute("data-caption") || "";
      if (!fullSrc) return;
      lightboxImage.src = fullSrc;
      lightboxCaption.textContent = caption;
      lightbox.classList.add("is-open");
      lightbox.setAttribute("aria-hidden", "false");
      document.body.classList.add("no-scroll");
    });
  });

  if (lightboxClose) {
    lightboxClose.addEventListener("click", closeLightbox);
  }

  lightbox.addEventListener("click", (event) => {
    if (event.target === lightbox) closeLightbox();
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") closeLightbox();
  });
}


