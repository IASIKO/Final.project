"use strict";

// HEADER

const joinBtn = document.getElementById("joinBtn");
const formSection = document.getElementById("formSection");
const form = document.getElementById("form");
const closeFormBtn = document.getElementById("closeForm");
const searchIcon = document.getElementById("searchIcon");

joinBtn.addEventListener("click", function (event) {
  event.preventDefault();
  formSection.classList.add("active-form");
});

// BURGER MENU

const burgerMenu = document.getElementById("burgerMenu");
const navUl = document.getElementById("navUl");

burgerMenu.addEventListener("click", function () {
  burgerMenu.classList.toggle("active");
  navUl.classList.toggle("active");
});

document.querySelectorAll(".nav-a").forEach((n) =>
  n.addEventListener("click", function () {
    burgerMenu.classList.remove("active");
    navUl.classList.remove("active");
  })
);

// REGISTRATION FORM

let errorTexts = {};

form.addEventListener("submit", function (event) {
  event.preventDefault();

  let formTrgt = event.target;

  const firstNamVal = document.getElementById("firstName").value;
  const lastNamVal = document.getElementById("lastName").value;
  const passwordValue = document.getElementById("passw").value;
  const repPasswVal = document.getElementById("repPassw").value;
  const agreeVal = document.getElementById("agree").checked;

  // const errorTxt = document.getElementsByClassName(`error_${}`);

  if (firstNamVal.length < 5 && firstNamVal.length > 0) {
    errorTexts.firstName = "The first name must be at least 5 characters.";
    // errorTxt.textContent = errorTexts.firstName;
  } else if (firstNamVal == "") {
    errorTexts.firstName = "The first name field is required";
  }

  if (lastNamVal.length < 5 && lastNamVal.length > 0) {
    errorTexts.lastName = "The last name must be at least 5 characters.";
  } else if (lastNamVal == "") {
    errorTexts.lastName = "The last name field is required";
  }

  if (passwordValue.length < 5 && passwordValue.length > 0) {
    errorTexts.password = "The password field must be at least 5 characters.";
  } else if (passwordValue == "") {
    errorTexts.password = "The password field is required";
  } else if (passwordValue !== repPasswVal) {
    errorTexts.repPassword = "Passwords don't match!";
  }
  // else if (repPasswVal == "") {
  //   errorTexts.repPassword = "The password field is required";
  // }

  console.log(errorTexts);

  let genderStatus = false;

  formTrgt.querySelectorAll("[name = 'gender']").forEach((element) => {
    if (element.checked) {
      genderStatus = true;
    }
  });
  if (!genderStatus) {
    errorTexts.gender = "Gender is required";
  }

  if (!agreeVal) {
    errorTexts.agree = "You should agree first before submitting!";
  }

  // document.querySelectorAll(".error-text").textContent = "";
  formTrgt.querySelectorAll(".error-text").forEach(function (element) {
    element.textContent = "";
  });

  for (let value in errorTexts) {
    const errorTxts = errorTexts[value];
    const errorTxt = document.getElementById(`error_${value}`);
    errorTxt.textContent = errorTxts;
  }

  if (Object.keys(errorTexts).length == 0) {
    formTrgt.submit();
  }

  // console.log(errorTexts);
});

// show/hide

const showHideI = document.getElementById("showHide");
const showHideI1 = document.getElementById("showHide1");

showHideI.addEventListener("click", function () {
  const passw = document.getElementById("passw");

  if (passw.type == "password") {
    passw.setAttribute("type", "text");
    showHideI.classList.add("fa-eye-slash");
  } else {
    passw.setAttribute("type", "password");
    showHideI.classList.remove("fa-eye-slash");
  }
});

showHideI1.addEventListener("click", function () {
  const repPassw = document.getElementById("repPassw");
  if (repPassw.type == "password") {
    repPassw.setAttribute("type", "text");
    showHideI1.classList.add("fa-eye-slash");
  } else {
    repPassw.setAttribute("type", "password");
    showHideI1.classList.remove("fa-eye-slash");
  }
});

// email validation

const email = document.getElementById("email");

email.addEventListener("keydown", function () {
  // params.preventDefault();
  const emailVal = email.value;
  const emailTxt = document.getElementById("text");
  const emailRegex =
    /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

  if (emailVal.match(emailRegex)) {
    emailTxt.textContent = "Your mail is valide!";
    emailTxt.style.color = "Green";
  } else if (emailVal == "") {
    emailTxt.textContent = "Email field is required!";
    emailTxt.style.color = "Red";
  } else {
    emailTxt.textContent = "Your mail is invalide!";
    emailTxt.style.color = "Red";
  }
});

closeFormBtn.addEventListener("click", function () {
  formSection.classList.remove("active-form");
});

// ACORDION

let acc = document.querySelectorAll(".accordion");
const plusMinus = document.querySelectorAll(".plus-minus");
const none = document.querySelectorAll(".none");
let i;

for (i = 0; i < acc.length; i++) {
  acc[i].addEventListener("click", function () {
    this.classList.toggle("active");

    let panel = this.nextElementSibling;
    if (panel.style.display === "block") {
      panel.style.display = "none";
    } else {
      panel.style.display = "block";
    }
  });
}

// acc.forEach((i) => {
//   i.addEventListener("click", function () {
//     plusMinus.forEach((j) => {
//       console.log(j);
//     });
//   });
// });

// SERVICES & TO DO LIST

const addBtns = document.getElementsByClassName("todoBtns");
const todoListDiv = document.getElementById("todoList");

const todoListLocalStorage = localStorage.getItem("todoList");
let todoListItems = todoListLocalStorage
  ? JSON.parse(todoListLocalStorage)
  : [];

for (const item of addBtns) {
  const todoLi = document.createElement("li");
  todoLi.classList.add("todo-li");
  const todoP = document.createElement("p");
  const closeSpan = document.createElement("span");
  const closeIconTD = document.createElement("p");
  closeIconTD.textContent = "X";
  closeSpan.appendChild(closeIconTD);
  item.addEventListener("click", function () {
    if (!todoListItems.find((d) => d === item.textContent)) {
      todoListItems.push(item.textContent);
    }
    todoP.textContent = item.textContent;
    todoLi.appendChild(todoP);
    todoLi.appendChild(closeSpan);
    todoListDiv.appendChild(todoLi);
    localStorage.setItem("todoList", JSON.stringify(todoListItems));
  });
  closeSpan.addEventListener("click", function () {
    todoLi.remove();
    todoListItems = todoListItems.filter((d) => d !== item.textContent);
    localStorage.setItem("todoList", JSON.stringify(todoListItems));
  });
}

todoListItems.forEach((d) => {
  const todoLi = document.createElement("li");
  todoLi.classList.add("todo-li");
  const todoP = document.createElement("p");
  const closeSpan = document.createElement("span");
  const closeIconTD = document.createElement("p");
  closeIconTD.textContent = "X";
  closeSpan.appendChild(closeIconTD);
  todoP.textContent = d;
  todoLi.appendChild(todoP);
  todoLi.appendChild(closeSpan);
  todoListDiv.appendChild(todoLi);

  closeSpan.addEventListener("click", function () {
    todoLi.remove();
    todoListItems = todoListItems.filter((e) => e !== d);
    localStorage.setItem("todoList", JSON.stringify(todoListItems));
  });
});

const removeAllBtn = document.getElementById("removeAll");

removeAllBtn.addEventListener("click", function () {
  todoListDiv.innerHTML = "";
  localStorage.removeItem("todoList");
});
