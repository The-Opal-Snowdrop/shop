// Play videos on hover, pause on mouse leave
document.querySelectorAll("video").forEach((video) => {
  video.addEventListener("mouseenter", () => video.play());
  video.addEventListener("mouseleave", () => video.pause());
});

// Handle contact form submission using AJAX
const form = document.getElementById("contactForm");
const successMsg = document.getElementById("formSuccess");

if (form && successMsg) {
  form.addEventListener("submit", function (e) {
    e.preventDefault();

    const formData = new FormData(form);

    fetch(form.action, {
      method: "POST",
      body: formData,
      headers: {
        Accept: "application/json",
      },
    })
      .then((response) => {
        if (response.ok) {
          form.reset();
          successMsg.style.display = "block";
          window.scrollTo({
            top: form.offsetTop,
            behavior: "smooth",
          });
        } else {
          alert("Something went wrong. Please try again.");
        }
      })
      .catch((error) => {
        console.error("Form submission error:", error);
        alert("There was a problem submitting your message.");
      });
  });
}
