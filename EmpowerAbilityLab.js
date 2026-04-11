//Template Function that can be used to run JavaScript on the page
//Note: This can be changed to whatever JavaScript formatting you would like
"use strict";
function knowledgeRunner() { }
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

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && !modal.hidden) {
      closeBtn.click();
    }
  });
}

function displaySchedulePage() {
  const main = displayPage("schedule");
  const submitBtn = main.querySelector("#submit-btn");


  // observer suggestion from copilot to modify base W3 JS code
  const inviteSpeaker = document.getElementById("speaker");
  const extraSection = document.getElementById("speaker-extra");
  const xtraSectionContent = document.getElementById("event-descr");


  function updateSpeakerSection() {
    const isChecked = inviteSpeaker.checked;
    extraSection.hidden = !isChecked;

    if (!isChecked) {
      xtraSectionContent.value = "";
    }
  }

  inviteSpeaker.addEventListener("change", updateSpeakerSection);
  updateSpeakerSection();

  submitBtn.addEventListener("click", (e) => {
    e.preventDefault();

    const nameField = document.getElementById("name-input");
    const phoneField = document.getElementById("phone-input");
    const emailField = document.getElementById("email-input");
    const nameErr = "Business name cannot be blank"
    const phoneErr = "Phone number must be 10 digits long";
    const emailErr = "Email field cannot be blank";
    var errs = [];
    let msgList;

    if (nameField.value.length === 0) {
      errs.push(nameErr + ":" + nameField.id.toString())
    } else {
      console.log("name error not found, good to go.")
    }
    if (phoneField.value.length >= 1 && phoneField.value.length < 10) {
      errs.push(phoneErr + ":" + phoneField.id.toString())
    } else {
      console.log("phone error not found. good to go.")
    }

    if (emailField.value.length === 0) {
      errs.push(emailErr + ":" + emailField.id.toString())
    } else {
      console.log("email error not found. good to go")
    }

    // get form section
    var form = document.getElementById("form-section");
    document.getElementById("message")?.remove();

    if (errs.length === 0) {
      msgList = document.createElement("p");
      msgList.innerHTML = "Thank you, we'll be in touch soon!";
      msgList.setAttribute("id", "message");
      msgList.setAttribute("aria-live", "polite");

      form.prepend(msgList);
    } else {
      msgList = document.createElement("ul");
      msgList.setAttribute("id", "message");
      msgList.setAttribute("aria-live", "polite");
      msgList.tabIndex = "-1";

      for (let index = 0; index < errs.length; index++) {
        var li = document.createElement("li");
        li.setAttribute("id", "li" + index.toString())
        var anchor = document.createElement("a");

        var values = errs[index].split(":");
        var message = values[0];
        var tag = values[1];

        anchor.innerHTML = message;
        anchor.setAttribute("href", "#");
        anchor.setAttribute("data-target", tag);
        anchor.setAttribute("class", "error-link");

        anchor.addEventListener("click", (e) => {
          if (e.target.classList.contains("error-link")) {
            e.preventDefault();

            const id = e.target.dataset.target;
            const field = document.getElementById(id);

            if (field) {
              field.focus();
              if (field.type === "text") {
                field.setSelectionRange(field.value.length, field.value.length);
              }
            }
          }
        });

        li.appendChild(anchor);
        msgList.appendChild(li);
      }
      form.prepend(msgList);
      msgList.focus();
    }

  });
}

page("/home", () => displayHomePage());
page("/services", () => displayPage("services"));
page("/schedule", () => displaySchedulePage());

// Start on the home page
page("/", () => page.redirect("/home"));
page("/index.html", () => page.redirect("/home"));

// Initialize router
page();



// Schedule a call page

/* Checkbox Switch JS provided by WAI-ARIA patterns start */
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
/* Checkbox Switch JS provided by WAI-ARIA patterns end */



knowledgeRunner();
