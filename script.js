
//  faq 

document.querySelectorAll('.faq-item').forEach(item => {
  item.addEventListener('click', () => {
    const isActive = item.classList.contains('active');

    // Close others
    document.querySelectorAll('.faq-item').forEach(i => i.classList.remove('active'));

    // Toggle current
    if (!isActive) {
      item.classList.add('active');
    }
  });
});



// testimonial

(function () {
  const slider = document.getElementById("testimonialSlider");
  const prevBtn = document.getElementById("prevBtn");
  const nextBtn = document.getElementById("nextBtn");
  const cards = slider.querySelectorAll(".testimonial-card");
  
  let index = 0;

  // Screen size ke mutabiq jump step define karo
  function getStep() {
    const width = window.innerWidth;
    if (width <= 768) return 1;  // Mobile pe 1 jump
    if (width <= 1024) return 2; // Tablet pe 2 jump
    return 3;                    // Desktop pe 3 jump
  }

  function move() {
    // Current width aur gap calculate karo
    const gap = parseInt(getComputedStyle(slider).gap) || 0;
    const cardWidth = cards[0].offsetWidth + gap;
    
    // Slider ko move karo
    slider.style.transform = `translateX(-${index * cardWidth}px)`;
    
    // Buttons ki functionality aur visual state update karo
    const step = getStep();
    prevBtn.disabled = (index === 0);
    nextBtn.disabled = (index + step >= cards.length);
    
    // UI ke liye opacity change (Optional)
    prevBtn.style.opacity = prevBtn.disabled ? "0.5" : "1";
    nextBtn.style.opacity = nextBtn.disabled ? "0.5" : "1";
  }

  function next() {
    const step = getStep();
    // Agar agla jump limit ke andar hai
    if (index + step < cards.length) {
      index += step;
    } else {
      // Agar last card pe hain toh ruk jao
      index = cards.length - 1;
    }
    move();
  }

  function prev() {
    const step = getStep();
    if (index - step >= 0) {
      index -= step;
    } else {
      index = 0;
    }
    move();
  }

  // Click events
  nextBtn.addEventListener("click", next);
  prevBtn.addEventListener("click", prev);

  // Swipe logic for touch devices
  let startX = 0;
  slider.addEventListener("touchstart", (e) => {
    startX = e.changedTouches[0].screenX;
  }, { passive: true });

  slider.addEventListener("touchend", (e) => {
    const diff = startX - e.changedTouches[0].screenX;
    if (Math.abs(diff) > 50) { // 50px se zyada swipe ho toh move karo
      diff > 0 ? next() : prev();
    }
  }, { passive: true });

  // Window resize hone par slider ko reset kar do taake UI na phate
  window.addEventListener("resize", () => {
    index = 0;
    move();
  });

  // Init
  move();
})();