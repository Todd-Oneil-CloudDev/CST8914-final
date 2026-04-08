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

function displaySchedulePage() {
  const main = displayPage("schedule");
  const submitBtn = main.querySelector("submit-btn");

  submitBtn.addEventListener("click", () => {
    const nameField = document.getElementById("name-input");
    const phoneField = document.getElementById("phone-input");
    const emailField = document.getElementById("email-input");
    var errFlag = false;
    const nameErr = "Business Name cannot be blank"

    if (nameField === ""){

    }

  })
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



// Schedule a call page
// provided by aria patterns
class Checkbox {
  constructor(domNode) {
    this.domNode = domNode;
    this.domNode.tabIndex = 0;

    if (!this.domNode.getAttribute('aria-checked')) {
      this.domNode.setAttribute('aria-checked', 'false');
    }

    this.domNode.addEventListener('keydown', this.onKeydown.bind(this));
    this.domNode.addEventListener('keyup', this.onKeyup.bind(this));
    this.domNode.addEventListener('click', this.onClick.bind(this));
  }

  toggleCheckbox() {
    if (this.domNode.getAttribute('aria-checked') === 'true') {
      this.domNode.setAttribute('aria-checked', 'false');
    } else {
      this.domNode.setAttribute('aria-checked', 'true');
    }
  }
  /* EVENT HANDLERS */

  // Make sure to prevent page scrolling on space down
  onKeydown(event) {
    if (event.key === ' ') {
      event.preventDefault();
    }
  }

  onKeyup(event) {
    var flag = false;

    switch (event.key) {
      case ' ':
        this.toggleCheckbox();
        flag = true;
        break;

      default:
        break;
    }

    if (flag) {
      event.stopPropagation();
    }
  }

  onClick() {
    this.toggleCheckbox();
  }
}
// Initialize checkboxes
window.addEventListener('load', function () {
  let checkboxes = document.querySelectorAll('.checkboxes [role="checkbox"]');
  for (let i = 0; i < checkboxes.length; i++) {
    new Checkbox(checkboxes[i]);
  }

  // observer suggestion from copilot to modify base W3 JS code
  const inviteSpeaker = document.getElementById("speaker");
  const extraSection = document.getElementById("speaker-extra");
  const xtraSectionContent = document.getElementById("event-descr");

  const observer = new MutationObserver(() => {
    const isChecked = inviteSpeaker.getAttribute("aria-checked") === "true";
    extraSection.style.display = isChecked ? "block" : "none";
    
    if(!isChecked) {
      xtraSectionContent.value = "";
    }
  });

  observer.observe(inviteSpeaker, {
    attributes: true,
    attributeFilter: ["aria-checked"]
  });

});

knowledgeRunner();
