document.addEventListener("DOMContentLoaded", () => {
  const fileList = document.querySelectorAll("#file-list li");
  const tabsContainer = document.getElementById("tabs");
  const breadcrumb = document.getElementById("breadcrumb-path");
  const themeToggle = document.getElementById("theme-toggle");
  const statusText = document.getElementById("status-bar-text");

  // Theme toggle functionality
  let isDarkTheme = true;
  themeToggle.addEventListener("click", () => {
    isDarkTheme = !isDarkTheme;
    document.body.style.backgroundColor = isDarkTheme ? "#1E1E1E" : "#FFFFFF";
    themeToggle.textContent = isDarkTheme ? "🌙" : "☀️";
  });

  // Handle file clicks
  fileList.forEach((file) => {
    file.addEventListener("click", () => {
      const sectionId = file.getAttribute("data-section");
      const label = file.textContent.trim();
      breadcrumb.textContent = label; 
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
        } else {
          breadcrumb.textContent = ""; // Clear breadcrumb if no tabs remain
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
    breadcrumb.textContent = tab.textContent.trim(); 
    document
      .querySelectorAll(".content-section")
      .forEach((section) => section.classList.add("hidden"));
    document.getElementById(sectionId).classList.remove("hidden");
  }
});
