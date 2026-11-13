(() => {
  "use strict";

  const body = document.body;
  const menuButton = document.getElementById("menu-toggle");
  const navigation = document.getElementById("navlinks");

  // Mobile navigation
  function closeMenu() {
    navigation.classList.remove("open");
    menuButton.setAttribute("aria-expanded", "false");
    menuButton.setAttribute("aria-label", "Open navigation menu");
    menuButton.textContent = "☰";
    body.classList.remove("menu-open");
  }

  menuButton.addEventListener("click", () => {
    const isOpening = !navigation.classList.contains("open");

    navigation.classList.toggle("open", isOpening);
    menuButton.setAttribute("aria-expanded", String(isOpening));
    menuButton.setAttribute(
      "aria-label",
      isOpening ? "Close navigation menu" : "Open navigation menu"
    );
    menuButton.textContent = isOpening ? "×" : "☰";
    body.classList.toggle("menu-open", isOpening);
  });

  navigation.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", closeMenu);
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") closeMenu();
  });

  // Course selection shortcuts
  document.querySelectorAll("[data-select-course]").forEach((link) => {
    link.addEventListener("click", () => {
      const courseSelect = document.getElementById("course");
      const level = link.getAttribute("data-select-course");
      const fee = {
        A1: "35,000",
        A2: "40,000",
        B1: "50,000",
      }[level];

      if (courseSelect && fee) {
        courseSelect.value = `${level}  -  PKR ${fee}`;
      }
    });
  });

  // Admissions form validation and WhatsApp enquiry
  const admissionForm = document.getElementById("admission-form");
  const fields = {
    name: document.getElementById("full-name"),
    phone: document.getElementById("phone"),
    course: document.getElementById("course"),
  };

  function isValidPhone(value) {
    const digits = value.replace(/\D/g, "");
    return digits.length >= 10 && digits.length <= 15;
  }

  admissionForm.addEventListener("submit", (event) => {
    event.preventDefault();

    let isFormValid = true;

    Object.entries(fields).forEach(([key, input]) => {
      const wrapper = document.getElementById(`field-${key}`);
      const isValid =
        key === "name"
          ? input.value.trim().length >= 2
          : key === "phone"
            ? isValidPhone(input.value)
            : Boolean(input.value);

      wrapper.classList.toggle("invalid", !isValid);
      if (!isValid) isFormValid = false;
    });

    const emailInput = document.getElementById("email");
    const emailWrapper = document.getElementById("field-email");
    const isEmailValid = !emailInput.value || emailInput.checkValidity();

    emailWrapper.classList.toggle("invalid", !isEmailValid);
    if (!isEmailValid) isFormValid = false;

    if (!isFormValid) {
      const firstInvalidField = admissionForm.querySelector(
        ".field.invalid input, .field.invalid select"
      );
      firstInvalidField?.focus();
      return;
    }

    const formData = new FormData(admissionForm);
    const messageLines = [
      "Assalamualaikum Jan Law German Language Center,",
      "I would like to enquire about admission.",
      "",
      `Full name: ${formData.get("name").trim()}`,
      `Phone number: ${formData.get("phone").trim()}`,
      `Email: ${formData.get("email") || "Not provided"}`,
      `Course: ${formData.get("course")}`,
      `Current German knowledge: ${formData.get("knowledge")}`,
      `Preferred contact: ${formData.get("contact")}`,
      `Additional message: ${formData.get("message").trim() || "None"}`,
      "",
      "Please share the admission details and next steps.",
    ];

    const whatsappUrl =
      "https://wa.me/923189150911?text=" +
      encodeURIComponent(messageLines.join("\n"));

    document.getElementById("form-success").classList.add("show");
    window.open(whatsappUrl, "_blank", "noopener,noreferrer");
  });

  Object.entries(fields).forEach(([key, input]) => {
    input.addEventListener("input", () => {
      document.getElementById(`field-${key}`).classList.remove("invalid");
    });
  });

  document.getElementById("email").addEventListener("input", () => {
    document.getElementById("field-email").classList.remove("invalid");
  });

  // Load the original transparent logo asset
  fetch("assets/jan-law-original-logo.b64")
    .then((response) => {
      if (!response.ok) throw new Error("Logo asset unavailable");
      return response.text();
    })
    .then((encodedLogo) => {
      const logoSource = "data:image/png;base64," + encodedLogo.trim();

      document.querySelectorAll("#brand-logo, .footer-logo").forEach((logo) => {
        logo.src = logoSource;
        logo.style.visibility = "visible";
      });
    })
    .catch(() => {
      document.querySelectorAll("#brand-logo, .footer-logo").forEach((logo) => {
        logo.style.display = "none";
      });
    });

  // Reveal content as it enters the viewport
  document.documentElement.classList.add("js-ready");

  const prefersReducedMotion = window.matchMedia(
    "(prefers-reduced-motion: reduce)"
  ).matches;

  if ("IntersectionObserver" in window && !prefersReducedMotion) {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.08 }
    );

    document.querySelectorAll(".reveal").forEach((element) => {
      observer.observe(element);
    });
  } else {
    document.querySelectorAll(".reveal").forEach((element) => {
      element.classList.add("visible");
    });
  }
})();
