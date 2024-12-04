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
            breadcrumb.textContent = label; // Update breadcrumb
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
            tab.querySelector(".close-btn").addEventListener("click", () => {
                tab.remove();
                statusText.textContent = `${label} closed`;
            });
        }
        activateTab(tab, sectionId);
    }

    // Activate a tab
    function activateTab(tab, sectionId) {
        document.querySelectorAll(".tab").forEach((t) => t.classList.remove("active"));
        tab.classList.add("active");
        statusText.textContent = `Viewing ${tab.textContent}`;
    }
});
