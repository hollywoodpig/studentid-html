const typeTargets = document.querySelectorAll("[data-type]");
const typeButtons = document.querySelectorAll("[data-type-open]");

typeButtons.forEach((button) => {
  button.addEventListener("click", (e) => {
    e.preventDefault();

    const buttonType = button.getAttribute("data-type-open");

    typeTargets.forEach((target) => {
      target.removeAttribute("data-visible");

      const targetType = target.getAttribute("data-type");

      if (buttonType === targetType) target.setAttribute("data-visible", true);
    });
  });
});