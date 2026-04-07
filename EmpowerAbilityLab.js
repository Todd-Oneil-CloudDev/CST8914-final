//Template Function that can be used to run JavaScript on the page
//Note: This can be changed to whatever JavaScript formatting you would like
"use strict";
function knowledgeRunner() {}
function displayPage(path) {
  let template = document.getElementById(`${path}-template`);
  const formattedPath = path.charAt(0).toUpperCase() + path.slice(1);
  document.title = `${formattedPath} - Empower Ability Labs`;
  let main = document.querySelector("main");
  main.innerHTML = "";
  main.appendChild(template.content.cloneNode(true));

  const heading = main.querySelector("h1");
  heading.focus();
  return main;
}

function displayHomePage() {
  const main = displayPage("home");
  const openBtn = main.querySelector("#openModal");
  const closeBtn = main.querySelector("#closeModal");
  const modal = main.querySelector(".home-modal");
  const backdrop = main.querySelector(".modal-backdrop");

  openBtn.addEventListener("click", () => {
    modal.hidden = false;
    backdrop.hidden = false;
    modal.setAttribute("aria-hidden", "false");

    const modalHeading = modal.querySelector("h2");
    if (modalHeading) modalHeading.focus();
  });

  closeBtn.addEventListener("click", () => {
    modal.hidden = true;
    backdrop.hidden = true;
    modal.setAttribute("aria-hidden", "true");

    // return focus to button
    openBtn.focus();
  });
}

page("/home", () => displayHomePage());
page("/services", () => displayPage("services"));
page("/schedule", () => displayPage("schedule"));

// Start on the home page
page("/", () => page.redirect("/home"));
page("/index.html.html", () => page.redirect("/home"));

// Initialize router
page();

class CheckboxSwitch {
  constructor(node) {
    this.switchNode = node;
    this.switchNode.addEventListener("focus", () => this.onFocus(event));
    this.switchNode.addEventListener("blur", () => this.onBlur(event));
  }

  onFocus(event) {
    event.currentTarget.parentNode.classList.add("focus");
  }

  onBlur(event) {
    event.currentTarget.parentNode.classList.remove("focus");
  }
}

// Initialize switches
window.addEventListener("load", function () {
  // Initialize the Switch component on all matching DOM nodes
  Array.from(
    document.querySelectorAll("input[type=checkbox][role^=switch]"),
  ).forEach((element) => new CheckboxSwitch(element));
});

knowledgeRunner();
