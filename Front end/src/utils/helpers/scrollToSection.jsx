export const scrollToSection = (sectionId) => {
  const element = document.getElementById(sectionId);
  if (element) {
    window.scrollTo({
      top: element.getBoundingClientRect().top + window.scrollY - 100,
      behavior: "smooth",
    });
  }
};
