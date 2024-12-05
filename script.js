document.addEventListener("DOMContentLoaded", () => {
  const fileList = document.querySelectorAll("#file-list li");
  const tabsContainer = document.getElementById("tabs");
  const themeToggle = document.getElementById("theme-toggle");
  const statusText = document.getElementById("status-bar-text");

  // Activate homepage by default
  const homeSection = document.getElementById("home");
  homeSection.classList.remove("hidden");
  statusText.textContent = "Viewing home.html";

  // Create a default tab for the homepage
  const defaultTab = document.createElement("div");
  defaultTab.classList.add("tab", "active");
  defaultTab.setAttribute("data-section", "home");
  defaultTab.innerHTML = `home.html<span class="close-btn">×</span>`;
  tabsContainer.appendChild(defaultTab);

  // Handle file clicks
  fileList.forEach((file) => {
    file.addEventListener("click", () => {
      const sectionId = file.getAttribute("data-section");
      const label = file.textContent.trim();
      statusText.textContent = `Opened ${label}`;
      createTab(sectionId, label);
    });
  });

  // Create a new tab or activate an existing one
  function createTab(sectionId, label) {
    let tab = document.querySelector(`.tab[data-section="${sectionId}"]`);
    if (!tab) {
      tab = document.createElement("div");
      tab.classList.add("tab");
      tab.setAttribute("data-section", sectionId);
      tab.innerHTML = `${label}<span class="close-btn">×</span>`;
      tabsContainer.appendChild(tab);

      // Add event listener to the tab for switching
      tab.addEventListener("click", (e) => {
        if (!e.target.classList.contains("close-btn")) {
          activateTab(tab, sectionId);
        }
      });

      // Add close button functionality
      tab.querySelector(".close-btn").addEventListener("click", (e) => {
        e.stopPropagation();
        tab.remove();
        statusText.textContent = `${label} closed`;

        // Activate the last remaining tab if any
        const remainingTabs = document.querySelectorAll(".tab");
        if (remainingTabs.length > 0) {
          const lastTab = remainingTabs[remainingTabs.length - 1];
          const lastSectionId = lastTab.getAttribute("data-section");
          activateTab(lastTab, lastSectionId);
        }
      });
    }
    activateTab(tab, sectionId);
  }

  // Activate a tab
  function activateTab(tab, sectionId) {
    document
      .querySelectorAll(".tab")
      .forEach((t) => t.classList.remove("active"));
    tab.classList.add("active");
    statusText.textContent = `Viewing ${tab.textContent}`;
    document
      .querySelectorAll(".content-section")
      .forEach((section) => section.classList.add("hidden"));
    document.getElementById(sectionId).classList.remove("hidden");
  }

  const form = document.querySelector("form");

  form.addEventListener("submit", (event) => {
    event.preventDefault(); // Prevent default form submission behavior

    const formData = new FormData(form);
    const formObject = {};

    // Check for empty fields and gather data
    let hasEmptyField = false;

    formData.forEach((value, key) => {
      if (!value.trim()) {
        hasEmptyField = true;
      }
      formObject[key] = value;
    });

    if (hasEmptyField) {
      alert("Please fill in all required fields before submitting the form.");
      return;
    }

    console.log("Form Data Submitted:", formObject);
    alert("Form submitted successfully!");
  });
});
