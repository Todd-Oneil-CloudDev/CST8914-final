"use strict";

function updateActiveNav(path) {
  const navLinks = document.querySelectorAll(".navbar-nav .nav-link");

  navLinks.forEach((link) => {
    const linkPath = link.getAttribute("href");
    const isActive = linkPath === path || (path === "/" && linkPath === "/home");

    link.classList.toggle("active", isActive);

    if (isActive) {
      link.setAttribute("aria-current", "page");
    } else {
      link.removeAttribute("aria-current");
    }
  });
}

function knowledgeRunner() { }

function displayPage(path) {
  let template = document.getElementById(`${path}-template`);
  const formattedPath = path.charAt(0).toUpperCase() + path.slice(1);
  document.title = `${formattedPath} - Empower Ability Labs`;

  // 🔥 FIX: highlight active menu
  updateActiveNav(`/${path}`);

  let main = document.querySelector("main");
  main.innerHTML = "";
  main.appendChild(template.content.cloneNode(true));

  const heading = main.querySelector("h1");
  if (heading) heading.focus();

  return main;
}

// ROUTES
page("/home", () => displayPage("home"));
page("/services", () => displayPage("services"));
page("/schedule", () => displayPage("schedule"));

// DEFAULT
page("/", () => page.redirect("/home"));
page("/index.html", () => page.redirect("/home"));

page();