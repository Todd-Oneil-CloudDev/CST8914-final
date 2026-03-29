//Template Function that can be used to run JavaScript on the page
//Note: This can be changed to whatever JavaScript formatting you would like
'use strict';
function knowledgeRunner(){

}

class CheckboxSwitch {
  constructor(node) {
    this.switchNode = node;
    this.switchNode.addEventListener('focus', () => this.onFocus(event));
    this.switchNode.addEventListener('blur', () => this.onBlur(event));
  }

  onFocus(event) {
    event.currentTarget.parentNode.classList.add('focus');
  }

  onBlur(event) {
    event.currentTarget.parentNode.classList.remove('focus');
  }
}

// Initialize switches
window.addEventListener('load', function () {
  // Initialize the Switch component on all matching DOM nodes
  Array.from(
    document.querySelectorAll('input[type=checkbox][role^=switch]')
  ).forEach((element) => new CheckboxSwitch(element));
});





knowledgeRunner()