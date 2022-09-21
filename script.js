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

// SLIDER

const sliderInfo = [
  {
    id: 1,
    imgUrl:
      "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fwww.breakingbad-locations.com%2Fwp-content%2Fuploads%2F2015%2F03%2FBetter.Call_.Saul_.S01E04.1080p.HDTV_.X264-DIMENSION.mkv_001246036.jpg&f=1&nofb=1",
    title: "Head Office, Albuquerque, New Mexico",
    status: "",
  },
  {
    id: 2,
    imgUrl:
      "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fit7g921jf4l4braew42gg5i1-wpengine.netdna-ssl.com%2Fwp-content%2Fuploads%2F2020%2F10%2FInternational_Hamlin_0159_V2_crop-scaled.jpg&f=1&nofb=1",
    title: "Howard G. Hamlin",
    status: "CEO of Hamlin, Hamlin & McGill (HHM)",
  },
  {
    id: 3,
    imgUrl:
      "https://static1.srcdn.com/wordpress/wp-content/uploads/2020/06/Better-Call-Saul-Michael-McKean-as-Chuck-McGill.jpg",
    title: "Charles Lindbergh McGill Jr.",
    status: "Co-founder and named partner of Hamlin, Hamlin & McGill (HHM)",
  },
  {
    id: 4,
    imgUrl:
      "https://auralcrave.com/wp-content/uploads/2022/05/kim-wexler-axe-and-grind-1200x800-1.jpeg",
    title: "Kimberly Wexler",
    status: "Business lawyer and public defender",
  },
];

const sliderSection = document.getElementById("slider");
const sliderDiv = document.getElementById("slider-div");
const dotsBox = document.getElementById("dotsBox");
const leftArrow = document.getElementById("left");
const rightArrow = document.getElementById("right");
const dots = document.getElementsByClassName("dots");

var sliderIndex = 0;

function slider() {
  sliderDiv.innerHTML = "";

  const bgDiv = createBgDiv(sliderInfo[sliderIndex].imgUrl);
  const h1 = createH1(sliderInfo[sliderIndex].title);
  const p = createP(sliderInfo[sliderIndex].status);
  const contentDiv = document.createElement("div");
  contentDiv.classList.add("content-div");

  createDots();

  contentDiv.appendChild(h1);
  contentDiv.appendChild(p);
  sliderDiv.appendChild(bgDiv);
  sliderDiv.appendChild(contentDiv);
  sliderSection.appendChild(sliderDiv);
  sliderSection.appendChild(dotsBox);

  dots[sliderIndex].classList.add("active");
}

slider();

function preloadImage(url, imageLoadedCallback) {
  let image = new Image();
  image.src = url;
  image.onload = imageLoadedCallback;
}

function preloadImages(urls, allImagesLoadedCallback) {
  let imageLoadCount = 0;
  let totalImageCount = urls.length;
  urls.forEach((url) => {
    preloadImage(url, () => {
      imageLoadCount++;
      if (totalImageCount == imageLoadCount) {
        allImagesLoadedCallback();
      }
    });
  });
}

preloadImages(
  sliderInfo.map((i) => i.imgUrl),
  slider
);

function createDots() {
  dotsBox.innerHTML = "";

  sliderInfo.forEach((element) => {
    const dots = document.createElement("div");
    dots.setAttribute("data-id", element.id - 1);
    dots.classList.add("dots");

    dotsBox.appendChild(dots);

    dots.addEventListener("click", function (event) {
      const id = event.target.getAttribute("data-id");
      // console.log(id);

      sliderIndex = id;
      slider();
    });
  });
}

function createBgDiv(param) {
  const BgDivTag = document.createElement("div");
  BgDivTag.style.backgroundImage = `url(${param})`;
  BgDivTag.classList.add("bg-img");

  return BgDivTag;
}

function createH1(param) {
  const h1Tag = document.createElement("h1");
  h1Tag.innerText = param;

  return h1Tag;
}

function createP(param) {
  const pTag = document.createElement("p");
  pTag.innerText = param;

  return pTag;
}

function leftArrowClick() {
  if (sliderIndex == 0) {
    sliderIndex = sliderInfo.length - 1;
    slider();
    return; // ნუ გავიწყდება!!!
  }
  sliderIndex--;
  slider();
}

function rightArrowClick() {
  if (sliderIndex == sliderInfo.length - 1) {
    sliderIndex = 0;
    slider();
    return;
  }
  sliderIndex++;
  slider();
}

leftArrow.addEventListener("click", leftArrowClick);
rightArrow.addEventListener("click", rightArrowClick);

setInterval(rightArrowClick, 3000);

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

// https://reqres.in/api/users?page=2
// https://jsonplaceholder.typicode.com/users

// OUT TEAM

// fetch("https://reqres.in/api/users?page=2")
//   .then((response) => response.json())
//   .then((data) => console.log(data));

const teamContainter = document.getElementById("teamContainer");
const innerTeamContainer = document.getElementById("innerContainer");
const leftArrowTeam = document.getElementById("leftButton");
const rightArrowTeam = document.getElementById("rightButton");

let pageCounter = 1;

function getTeamMembers(pageCounter) {
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
      innerTeamContainer.innerHTML = "";
      // console.log(data);
      data.data.forEach((i) => {
        // console.log(i.avatar);
        const memberBox = document.createElement("div");
        memberBox.classList.add("member-box");
        const innerBox = document.createElement("div");
        innerBox.setAttribute("class", "inner-box");
        const avatar = document.createElement("img");
        avatar.src = i.avatar;
        const fullName = document.createElement("h3");
        fullName.innerText = `${i.first_name} ${i.last_name}`;
        const email = document.createElement("p");
        email.innerText = i.email;

        innerBox.appendChild(avatar);
        innerBox.appendChild(fullName);
        innerBox.appendChild(email);
        memberBox.appendChild(innerBox);
        innerTeamContainer.appendChild(memberBox);
      });
      function rightArrowTeamClick() {
        if (pageCounter == 2) {
          return;
        }
        pageCounter += 1;
        getTeamMembers(pageCounter);
        rightArrowTeam.classList.toggle("arrow-transition");
      }

      function leftArrowTeamClick() {
        if (pageCounter == 1) {
          return;
        }
        pageCounter -= 1;
        getTeamMembers(pageCounter);
      }

      rightArrowTeam.addEventListener("click", rightArrowTeamClick);
      leftArrowTeam.addEventListener("click", leftArrowTeamClick);
    });
}

// console.log(pageCounter);

getTeamMembers(pageCounter);

// SERVICES

// const serviceBtn = document.getElementById("serviceBtn");

// serviceBtn.addEventListener("mouseover", function () {
//   serviceBtn.classList.remove("service-btn");
//   serviceBtn.classList.add("service-btn-overlay");
// });

// LOCALSTORAGE

localStorage.setItem("test", 1);
