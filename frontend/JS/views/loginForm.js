import { sendLoginRequest } from "../models/apiClient";
import { validateForm } from "../services/validation";

export default class LoginForm {
  constructor(root) {
    this.root = root;
    this.formElement = document.createElement("form");
    this.root.appendChild(this.formElement);
    this.setupForm();
    this.formElement.addEventListener("submit", event => this.handleSubmit(event));
  }

  setupForm() {
      this.formElement.innerHTML = `
          <input type="text" id="username" placeholder="Username">
          <input type="password" id="password" placeholder="Password">
          <button type="submit">Login</button>
          <div class="error-message hidden"></div>
      `;
      this.errorMsgElement = this.formElement.querySelector(".error-message");
  }

  handleSubmit(event) {
      event.preventDefault();
      const username = this.formElement.querySelector("#username").value.trim();
      const password = this.formElement.querySelector("#password").value;

      const errors = validateForm(username, password);
      if (errors.length > 0) {
          this.displayErrors(errors);
          return;
      }

      console.log("POST", username, password);

      return;
      sendLoginRequest({ username, password })
        .then(response => console.log("Login successful!", response))
        .catch(error => this.displayErrors([error.message]));
  }

  displayErrors(errors) {
      this.errorMsgElement.innerHTML = errors.join("<br>");
      this.errorMsgElement.classList.remove("hidden");
  }
}