const menuToggle = document.getElementById("menuToggle");
const sidebar = document.getElementById("sidebar");
const closeSidebar = document.getElementById("closeSidebar");
const overlay = document.getElementById("overlay");

menuToggle.addEventListener("click", () => {
  sidebar.classList.add("active");
  overlay.classList.add("active");
});

closeSidebar.addEventListener("click", () => {
  sidebar.classList.remove("active");
  overlay.classList.remove("active");
});

overlay.addEventListener("click", () => {
  sidebar.classList.remove("active");
  overlay.classList.remove("active");
});

// Close sidebar when clicking on a link (for mobile)
const sidebarLinks = document.querySelectorAll(".sidebar-links a");
sidebarLinks.forEach((link) => {
  link.addEventListener("click", () => {
    sidebar.classList.remove("active");
    overlay.classList.remove("active");
  });
});

document.addEventListener("DOMContentLoaded", function () {
  const mainImage = document.getElementById("main-product-image");
  const thumbnails = document.querySelectorAll(".thumbnail");

  thumbnails.forEach((thumbnail) => {
    thumbnail.addEventListener("click", function () {
      const imgSrc = this.querySelector("img").src;
      mainImage.src = imgSrc;

      thumbnails.forEach((thumb) => thumb.classList.remove("active"));
      this.classList.add("active");
    });
  });

  const imageContainer = document.querySelector(".image-container");
  const zoomOverlay = document.querySelector(".zoom-overlay");
  const zoomImage = document.querySelector(".zoom-image");
  const closeBtn = document.querySelector(".close-btn");

  //   imageContainers.forEach(container => {
  imageContainer.addEventListener("click", function () {
    //   const imageUrl = this.getAttribute('data-image');
    console.log("zooming in");
    const imageUrl = this.firstElementChild.src;
    zoomImage.src = imageUrl;
    zoomImage.style.cursor = "zoom-in";
    zoomOverlay.classList.add("active");
  });

  closeBtn.addEventListener("click", function () {
    zoomOverlay.classList.remove("active");
  });

  zoomOverlay.addEventListener("click", function (e) {
    if (e.target === zoomOverlay) {
      zoomOverlay.classList.remove("active");
    }
  });

  zoomOverlay.addEventListener("mousemove", function (e) {
    const container = this.querySelector(".zoom-image-container");
    const img = this.querySelector(".zoom-image");

    const containerRect = container.getBoundingClientRect();
    const imgRect = img.getBoundingClientRect();

    const x = (e.clientX - containerRect.left) / containerRect.width;
    const y = (e.clientY - containerRect.top) / containerRect.height;

    const scaleX = imgRect.width / containerRect.width;
    const scaleY = imgRect.height / containerRect.height;

    const maxTranslateX = (scaleX - 1) * 50;
    const maxTranslateY = (scaleY - 1) * 50;

    const translateX = -maxTranslateX * x;
    const translateY = -maxTranslateY * y;

    img.style.transform = `scale(1.5) translate(${translateX}%, ${translateY}%)`;
  });

  zoomOverlay.addEventListener("mouseleave", function () {
    zoomImage.style.transform = "scale(1) translate(0, 0)";
  });

  const sizeChartBtn = document.getElementById("size-chart-btn");
  const sizeChartModal = document.getElementById("size-chart-modal");
  const closeModalBtns = document.querySelectorAll(".close-modal");

  sizeChartBtn.addEventListener("click", function () {
    sizeChartModal.classList.add("active");
  });

  closeModalBtns.forEach((btn) => {
    btn.addEventListener("click", function () {
      sizeChartModal.classList.remove("active");
      compareColorsModal.classList.remove("active");
    });
  });

  window.addEventListener("click", function (e) {
    if (e.target === sizeChartModal) {
      sizeChartModal.classList.remove("active");
    }
    if (e.target === compareColorsModal) {
      compareColorsModal.classList.remove("active");
    }
  });

  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape") {
      sizeChartModal.classList.remove("active");
      compareColorsModal.classList.remove("active");
    }
  });

  const compareColorsBtn = document.getElementById("compare-colors-btn");
  const compareColorsModal = document.getElementById("compare-colors-modal");
  const compareColorSwatches = document.querySelectorAll(
    ".compare-color-swatch"
  );

  compareColorsBtn.addEventListener("click", function () {
    compareColorsModal.classList.add("active");
  });

  compareColorSwatches.forEach((swatch) => {
    swatch.addEventListener("click", function () {
      this.classList.toggle("selected");
    });
  });
  const colorOptions = document.querySelectorAll(".color-option");
  const selectedColorText = document.getElementById("selected-color");

  colorOptions.forEach((option) => {
    option.addEventListener("click", function () {
      const color = this.getAttribute("data-color");

      colorOptions.forEach((opt) => opt.classList.remove("active"));
      this.classList.add("active");

      selectedColorText.textContent = color;

      localStorage.setItem("selectedColor", color);
    });
  });

  const sizeOptions = document.querySelectorAll(".size-option");
  const selectedSizeText = document.getElementById("selected-size");

  sizeOptions.forEach((option) => {
    option.addEventListener("click", function () {
      const size = this.textContent;

      sizeOptions.forEach((opt) => opt.classList.remove("active"));
      this.classList.add("active");

      selectedSizeText.textContent = size;

      localStorage.setItem("selectedSize", size);
    });
  });

  const minusBtn = document.querySelector(".quantity-btn.minus");
  const plusBtn = document.querySelector(".quantity-btn.plus");
  const quantityInput = document.querySelector(".quantity-input");

  minusBtn.addEventListener("click", function () {
    let value = parseInt(quantityInput.value);
    if (value > 1) {
      quantityInput.value = value - 1;
    }
  });

  plusBtn.addEventListener("click", function () {
    let value = parseInt(quantityInput.value);
    quantityInput.value = value + 1;
  });

  const tabs = document.querySelectorAll(".tab");
  const tabContents = document.querySelectorAll(".tab-content");

  tabs.forEach((tab) => {
    tab.addEventListener("click", function () {
      const tabId = this.getAttribute("data-tab");

      tabs.forEach((t) => t.classList.remove("active"));
      this.classList.add("active");

      tabContents.forEach((content) => {
        content.classList.remove("active");
        if (content.id === tabId) {
          content.classList.add("active");
        }
      });
    });
  });

  const savedColor = localStorage.getItem("selectedColor");
  const savedSize = localStorage.getItem("selectedSize");

  if (savedColor) {
    colorOptions.forEach((option) => {
      if (option.getAttribute("data-color") === savedColor) {
        option.classList.add("active");
        selectedColorText.textContent = savedColor;
      }
    });
  }

  if (savedSize) {
    sizeOptions.forEach((option) => {
      if (option.textContent === savedSize) {
        option.classList.add("active");
        selectedSizeText.textContent = savedSize;
      }
    });
  }
});
