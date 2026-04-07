const rows = Array.from(document.querySelectorAll(".table-body .table-row"));
const categoryTabs = Array.from(document.querySelectorAll(".category-tab"));
const purchaseModal = document.getElementById("purchase-modal");
const openPurchaseButtons = Array.from(document.querySelectorAll("[data-open-purchase]"));
const closePurchaseButtons = Array.from(document.querySelectorAll("[data-close-purchase]"));
const tileGroups = Array.from(document.querySelectorAll("[data-tile-group]"));
const quantityValue = document.getElementById("quantity-value");
const summaryQuantity = document.getElementById("summary-quantity");
const quantityButtons = Array.from(document.querySelectorAll("[data-quantity-step]"));

function setPurchaseModalOpen(isOpen) {
  if (!purchaseModal) return;

  purchaseModal.hidden = !isOpen;
  document.body.style.overflow = isOpen ? "hidden" : "";
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
