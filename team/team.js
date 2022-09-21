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

// TEAM LIST

const teamUl = document.getElementById("teamUl");

let counter = 1;

function teamList(pageCounter) {
  fetch(`https://reqres.in/api/users?page= + ${pageCounter}`, {
    method: "GET",
  })
    .then((response) => {
      if (response.status !== 200) {
        throw "error";
      }
      return response.json();
    })
    .then((data) => {
      // console.log(data);
      data.data.forEach((i) => {
        const memberLi = document.createElement("li");
        memberLi.classList.add("member-li");
        memberLi.setAttribute("id", "memberLi");
        const memberID = document.createElement("h1");
        memberID.textContent = i.id;
        memberID.classList.add("member-id");
        const memberImg = document.createElement("img");
        memberImg.src = i.avatar;
        memberImg.classList.add("member-img");
        const memberName = document.createElement("h3");
        memberName.textContent = `${i.first_name} ${i.last_name}`;
        memberName.classList.add("member-name");
        const memberMail = document.createElement("h4");
        memberMail.textContent = i.email;
        memberMail.classList.add("member-mail");
        const memberStatus = document.createElement("h4");
        memberStatus.textContent = "Active";
        memberStatus.classList.add("member-status");

        memberLi.appendChild(memberID);
        memberLi.appendChild(memberImg);
        memberLi.appendChild(memberName);
        memberLi.appendChild(memberMail);
        memberLi.appendChild(memberStatus);
        teamUl.appendChild(memberLi);

        // const loadBtn = document.createElement("button");
        // loadBtn.textContent = "Load More!";
        // loadBtn.classList.add("load-btn");
        // teamDiv.appendChild(loadBtn);

        // loadBtn.addEventListener("click", function () {
        //   counter++;
        //   teamList();
        // });

        const searchInput = document.getElementById("searchInput");

        searchInput.addEventListener("keyup", function () {
          // console.log(event);
          const filter = searchInput.value.toUpperCase();
          const ul = document.getElementById("teamUl");
          const li = ul.getElementsByTagName("li");
          for (let i = 0; i < li.length; i++) {
            if (memberName) {
              const txtValue = memberName.textContent || memberName.innerText;
              if (txtValue.toUpperCase().indexOf(filter) > -1) {
                memberLi.style.display = "";
              } else {
                memberLi.style.display = "none";
              }
            }
          }
          console.log();
        });
      });
    });
}

teamList(counter);
