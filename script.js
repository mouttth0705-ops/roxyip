const rows = Array.from(document.querySelectorAll(".table-body .table-row"));
const categoryTabs = Array.from(document.querySelectorAll(".category-tab"));
const purchaseModal = document.getElementById("purchase-modal");
const openPurchaseButtons = Array.from(document.querySelectorAll("[data-open-purchase]"));
const closePurchaseButtons = Array.from(document.querySelectorAll("[data-close-purchase]"));
const tileGroups = Array.from(document.querySelectorAll("[data-tile-group]"));
const quantityValue = document.getElementById("quantity-value");
const summaryQuantity = document.getElementById("summary-quantity");
const quantityButtons = Array.from(document.querySelectorAll("[data-quantity-step]"));
const actionCells = Array.from(document.querySelectorAll(".action-cell"));
const actionToggles = Array.from(document.querySelectorAll("[data-action-toggle]"));
const purchaseSummary = document.querySelector(".purchase-summary");
const rolaPanel = document.getElementById("rola-redirect-panel");

function closeActionMenus() {
  actionCells.forEach((cell) => {
    const toggle = cell.querySelector("[data-action-toggle]");
    const menu = cell.querySelector("[data-action-menu]");

    if (!toggle || !menu) return;

    toggle.setAttribute("aria-expanded", "false");
    menu.hidden = true;
  });
}

function setPurchaseModalOpen(isOpen) {
  if (!purchaseModal) return;

  purchaseModal.hidden = !isOpen;
  document.body.style.overflow = isOpen ? "hidden" : "";
}

function setSupplier(supplier) {
  if (!purchaseSummary || !rolaPanel) return;

  if (supplier === "rola") {
    purchaseSummary.hidden = true;
    rolaPanel.hidden = false;
  } else {
    purchaseSummary.hidden = false;
    rolaPanel.hidden = true;
  }
}

rows.forEach((row) => {
  row.addEventListener("click", () => {
    rows.forEach((item) => item.classList.remove("selected"));
    row.classList.add("selected");
  });
});

categoryTabs.forEach((button) => {
  button.addEventListener("click", () => {
    categoryTabs.forEach((item) => item.classList.remove("active"));
    button.classList.add("active");
  });
});

openPurchaseButtons.forEach((button) => {
  button.addEventListener("click", () => setPurchaseModalOpen(true));
});

closePurchaseButtons.forEach((button) => {
  button.addEventListener("click", () => setPurchaseModalOpen(false));
});

if (purchaseModal) {
  purchaseModal.addEventListener("click", (event) => {
    if (event.target === purchaseModal) {
      setPurchaseModalOpen(false);
    }
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && !purchaseModal.hidden) {
      setPurchaseModalOpen(false);
    }
  });
}

tileGroups.forEach((group) => {
  const buttons = Array.from(group.querySelectorAll("button"));

  buttons.forEach((button) => {
    button.addEventListener("click", () => {
      buttons.forEach((item) => item.classList.remove("active"));
      button.classList.add("active");

      if (button.dataset.supplier) {
        setSupplier(button.dataset.supplier);
      }
    });
  });
});

quantityButtons.forEach((button) => {
  button.addEventListener("click", () => {
    if (!quantityValue || !summaryQuantity) return;

    const step = Number(button.dataset.quantityStep || "0");
    const current = Number(quantityValue.textContent || "1");
    const next = Math.max(1, current + step);

    quantityValue.textContent = String(next);
    summaryQuantity.textContent = String(next);
  });
});

actionCells.forEach((cell) => {
  cell.addEventListener("click", (event) => {
    event.stopPropagation();
  });
});

actionToggles.forEach((button) => {
  button.addEventListener("click", (event) => {
    event.stopPropagation();

    const cell = button.closest(".action-cell");
    const menu = cell?.querySelector("[data-action-menu]");
    const isOpen = button.getAttribute("aria-expanded") === "true";

    closeActionMenus();

    if (!menu || isOpen) return;

    button.setAttribute("aria-expanded", "true");
    menu.hidden = false;
  });
});

document.addEventListener("click", () => {
  closeActionMenus();
});

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape") {
    closeActionMenus();
  }
});

// Table settings dropdown
const settingsToggle = document.querySelector("[data-settings-toggle]");
const settingsMenu = document.querySelector("[data-settings-menu]");

if (settingsToggle && settingsMenu) {
  settingsToggle.addEventListener("click", (event) => {
    event.stopPropagation();
    const isOpen = settingsToggle.getAttribute("aria-expanded") === "true";
    settingsToggle.setAttribute("aria-expanded", String(!isOpen));
    settingsMenu.hidden = isOpen;
  });

  document.addEventListener("click", () => {
    settingsToggle.setAttribute("aria-expanded", "false");
    settingsMenu.hidden = true;
  });

  settingsMenu.addEventListener("click", (event) => {
    event.stopPropagation();
  });
}

const countryCards = Array.from(document.querySelectorAll(".country-card"));
const countrySearch = document.getElementById("country-search");
const countryNoResult = document.getElementById("country-no-result");

countryCards.forEach((card) => {
  card.addEventListener("click", () => {
    countryCards.forEach((c) => c.classList.remove("active"));
    card.classList.add("active");
  });
});

if (countrySearch) {
  countrySearch.addEventListener("input", () => {
    const q = countrySearch.value.trim().toLowerCase();

    countryCards.forEach((card) => {
      const name = (card.dataset.country || "").toLowerCase();
      card.hidden = q !== "" && !name.includes(q);
    });

    const groups = Array.from(document.querySelectorAll("[data-group]"));
    groups.forEach((group) => {
      const visible = Array.from(group.querySelectorAll(".country-card")).some((c) => !c.hidden);
      group.hidden = !visible;
    });

    if (countryNoResult) {
      countryNoResult.hidden = countryCards.some((c) => !c.hidden);
    }
  });
}

// Rola password reveal toggle
const rolaEyeToggle = document.getElementById("rola-eye-toggle");
const rolaPasswordDisplay = document.getElementById("rola-password-display");
const rolaPassword = "Roxy@Rola2024";
let rolaPasswordVisible = false;

if (rolaEyeToggle && rolaPasswordDisplay) {
  rolaEyeToggle.addEventListener("click", () => {
    rolaPasswordVisible = !rolaPasswordVisible;
    rolaPasswordDisplay.textContent = rolaPasswordVisible ? rolaPassword : "••••••••";
    rolaEyeToggle.setAttribute("aria-label", rolaPasswordVisible ? "隐藏密码" : "显示密码");
  });
}

