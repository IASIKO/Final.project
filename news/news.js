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

// POSTS // GET/POST/DELETE
const postWrapper = document.getElementById("postWrapper");

function createPostStructure(i) {
  const postBox = document.createElement("div");
  postBox.classList.add("post-box");
  const boxContent = document.createElement("div");
  boxContent.classList.add("box-content");
  const idTag = document.createElement("h1");
  idTag.innerText = i.id;
  const titleTag = document.createElement("h2");
  titleTag.innerText = i.title;
  const textTag = document.createElement("p");
  textTag.innerText = i.body;
  const moreBtn = document.createElement("button");
  moreBtn.classList.add("post-btn");
  moreBtn.innerText = "See More!";
  const removeIconSpan = document.createElement("span");
  removeIconSpan.classList.add("remove-span");
  removeIconSpan.innerHTML =
    '<i class="fa-sharp fa-solid fa-trash" data-id="' + i.id + '"></i>';

  const closeIcon = document.createElement("span");
  closeIcon.classList.add("close-box");
  closeIcon.innerHTML = '<i class="fa-solid fa-xmark"></i>';

  boxContent.appendChild(idTag);
  boxContent.appendChild(titleTag);
  const postContent = document.createElement("div");
  postContent.classList.add("post-content");
  postBox.appendChild(postContent);

  postContent.appendChild(boxContent);
  postContent.appendChild(removeIconSpan);
  postContent.appendChild(moreBtn);
  postWrapper.appendChild(postBox);

  const postOverlay = document.createElement("div");
  postOverlay.classList.add("display-none");
  postOverlay.classList.add("post-overlay");
  postBox.appendChild(postOverlay);
  postOverlay.appendChild(textTag);
  postOverlay.appendChild(closeIcon);

  moreBtn.addEventListener("click", function () {
    postOverlay.classList.add("display-block");
    postOverlay.classList.remove("display-none");
    postContent.classList.add("display-none");
    postContent.classList.remove("post-content");
  });

  closeIcon.addEventListener("click", function () {
    postContent.classList.remove("display-none");
    postOverlay.classList.remove("display-block");
    postOverlay.classList.add("display-none");
    postContent.classList.add("post-content");
  });

  removeIconSpan.addEventListener("click", function (e) {
    const id = e.target.getAttribute("data-id");
    fetch("https://jsonplaceholder.typicode.com/posts/" + id, {
      method: "DELETE",
    })
      .then((response) => {
        if (response.status !== 200) {
          throw "error";
        }
        return response.json();
      })
      .then(() => {
        posts = posts.filter((d) => d.id !== parseInt(id));
        renderPosts();
      });
  });
}

let posts;
function createPost() {
  fetch("https://jsonplaceholder.typicode.com/posts", {
    method: "GET",
  })
    .then((response) => {
      if (response.status !== 200) {
        throw "error";
      }
      return response.json();
    })
    .then((data) => {
      posts = data;
      renderPosts();
    });
}

function renderPosts() {
  postWrapper.innerHTML = "";
  posts.forEach((i) => {
    createPostStructure(i);
  });
}

const addIcon = document.getElementById("addIcon");
const addPostContainer = document.getElementById("addPostContainer");
addIcon.addEventListener("click", function (e) {
  addPostContainer.classList.add("display-flex");
  addPostContainer.classList.remove("display-none");
});

const closePostIcon = document.getElementById("close-add-post");
closePostIcon.addEventListener("click", function (e) {
  addPostContainer.classList.remove("display-flex");
  addPostContainer.classList.add("display-none");
});

const addPostForm = document.getElementById("addPost");
addPostForm.addEventListener("submit", function (e) {
  e.preventDefault();
  const title = document.getElementById("title");
  const description = document.getElementById("description");
  const data = {
    id: posts.length + 1,
    title: title.value,
    body: description.value,
  };
  fetch("https://jsonplaceholder.typicode.com/posts", {
    method: "POST",
    body: JSON.stringify(data),
    headers: {
      "content-type": "application/json; charset=utf-8",
    },
  })
    .then((response) => {
      if (response.status !== 201) {
        throw "error";
      }
      return response.json();
    })
    .then(() => {
      posts.push(data);
      renderPosts();
      title.value = "";
      description.value = "";
      addPostContainer.classList.remove("display-flex");
      addPostContainer.classList.add("display-none");
      window.scrollTo(0, document.body.scrollHeight);
    });
});

createPost();

// const mainWraperPosts = document.getElementById("main-block");
// const overlay = document.getElementById("overlay-block");
// const content = document.getElementById("content");
// const closeIcon = document.getElementById("close");
// const addButton = document.getElementById("add");
// const postOverlayAdd = document.getElementById("postOverlay");
// const form = document.getElementById("form");
