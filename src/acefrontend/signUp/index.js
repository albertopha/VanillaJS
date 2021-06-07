// Definitions
const state = {
  "name": {
    "value": "",
    "validate": validateName
  },
  "email": {
    "value": "",
    "validate": validateEmail
  },
  "password": {
    "value": "",
    "validate": validatePassword
  },
  "confirm-password": {
    "value": "",
    "validate": validateConfirm
  }
};

const name = document.querySelector("#name");
const email = document.querySelector("#email");
const password = document.querySelector("#password");
const confirmPw = document.querySelector("#confirm-password");
const signUp = document.querySelector("#sign-up");

const invalidName = document.querySelector("#invalid-name");
const invalidEmail = document.querySelector("#invalid-email");
const invalidPassword = document.querySelector("#invalid-password");
const invalidConfirm = document.querySelector("#invalid-confirm");

// Registering listeners
name.addEventListener("input", handleInput);
email.addEventListener("input", handleInput);
password.addEventListener("input", handleInput);
confirmPw.addEventListener("input", handleInput);
signUp.addEventListener("submit", handleSubmit);

// Handlers
function handleSubmit(evt) {
  if (!evt) return;
  evt.preventDefault();
  validateState();
}

function handleInput(evt) {
  if (!evt || !evt.target) {
    return;
  }
  
  const input = evt.target;
  state[input.id].value = input.value;
}

function validateState() {
  Object.values(state).forEach((info) => {
  	info.validate(info.value);
  });
}

function validateName(nameInput) {
  if (nameInput.length === 0) {
    invalidName.classList.add("active");
  } else {
    invalidName.classList.remove("active");
  }
}

function validateEmail(emailInput) {
  if (emailInput.length > 0 &&
      !emailInput.includes("@")
  ) {
    invalidEmail.classList.add("active");
  } else {
    invalidEmail.classList.remove("active");
  }
}

function validatePassword(pwInput) {
  if (pwInput.length > 0 &&
      pwInput.length < 6) {
    invalidPassword.classList.add("active");
  } else {
    invalidPassword.classList.remove("active");
  }
}

function validateConfirm(pwInput) {
  if (pwInput.length > 0 &&
      pwInput !== state.password.value) {
    invalidConfirm.classList.add("active");
  } else {
    invalidConfirm.classList.remove("active");
  }
}
