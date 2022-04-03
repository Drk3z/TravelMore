const reglogswi = document.getElementById("regLog");
const reglogbtn = document.getElementById("regLogLabel");
const authbtn = document.getElementById("authBtn");
const remember = document.getElementById("remember");
const allHot = document.getElementById("allHot");

let reg = false;

reglogbtn.addEventListener("click", () => {
  if (reg == false) {
    registerSwitch();
  } else {
    loginSwitch();
  }
});

function registerSwitch() {
  reglogswi.innerHTML = `<div class="inputBox">
    <span>name</span>
    <input type="text" id="regUsername" placeholder="enter your username" />
  </div>

  <div class="inputBox">
  <span>last name</span>
  <input type="text" id="regLastname" placeholder="enter your lastname" />
</div>

  <div class="inputBox">
    <span>email</span>
    <input type="text" id="regEmail" placeholder="enter your email" />
  </div>

  <div class="inputBox">
    <span>password</span>
    <input type="password" id="regPassword" placeholder="enter your password" />
  </div>`;
  authbtn.textContent = "Register";
  reglogbtn.textContent = "Login";
  reg = true;
}

function loginSwitch() {
  reglogswi.innerHTML = `<div class="inputBox">
  <span>email</span>
  <input type="text" id="loginEmail" placeholder="enter your email" />
</div>

<div class="inputBox">
  <span>password</span>
  <input type="password" id="loginPassword" placeholder="enter your password" />
</div>
</div>`;
  authbtn.textContent = "Login";
  reglogbtn.textContent = "Register";
  reg = false;
}
let clicked = false;
authbtn.addEventListener("click", () => {
  clicked = true;
  if (reg == true) {
    const users = getArrayFromFirebase("Users");
    let regPass = document.getElementById("regPassword").value;
    let regEmail = document.getElementById("regEmail").value;
    let regUser = document.getElementById("regUsername").value;
    let regLastname = document.getElementById("regLastname").value;
    let taken = false;

    users.forEach((e) => {
      if (e.data.email === regEmail) {
        console.log(e);
        taken = true;
        return;
      }
    });
    if (taken == true) {
      alert("this email is already taken");
    } else {
      if (regPass.length > 3 && regEmail.length > 3) {
        addElementInFirebase("Users", {
          name: regUser,
          lastname: regLastname,
          email: regEmail,
          password: regPass,
          rank: "guest",
        });
        users.forEach((e) => {
          if (regEmail == e.data.email) {
            localStorage.setItem("id", e.userid);
          }
        });

        clicked = false;

        logcheck();

        reglogswi.innerHTML = `<div id="loadinggif"><img src="./images/Dual Ring-1.5s-200px.gif"></div>`;
        remember.style.display = "none";
        authbtn.style.display = "none";

        const Toast = Swal.mixin({
          toast: true,
          position: "bottom-end",
          showConfirmButton: false,
          color: "var(--text-color-1)",
          timer: 3000,
          timerProgressBar: true,
          didOpen: (toast) => {
            toast.addEventListener("mouseenter", Swal.stopTimer);
            toast.addEventListener("mouseleave", Swal.resumeTimer);
          },
        });

        Toast.fire({
          icon: "success",
          title: "<h2>successfully Registered</span>",
        });
      } else {
        const Toast = Swal.mixin({
          toast: true,
          position: "bottom-end",
          showConfirmButton: false,
          color: "var(--text-color-1)",
          timer: 3000,
          timerProgressBar: true,
          didOpen: (toast) => {
            toast.addEventListener("mouseenter", Swal.stopTimer);
            toast.addEventListener("mouseleave", Swal.resumeTimer);
          },
        });

        Toast.fire({
          icon: "error",
          title: "<h2>Minimum 4 letters each!</span>",
        });
      }
    }
  } else {
    loginnn();
    autolog = 0;
  }
});

let count = 0;

function loginnn() {
  const users = getArrayFromFirebase("Users");
  let loginPass = document.getElementById("loginPassword").value;
  let loginEmail = document.getElementById("loginEmail").value;
  let valid = false;

  users.forEach((e) => {
    if (e.data.email === loginEmail && e.data.password === loginPass) {
      valid = true;
      localStorage.setItem("id", e.userid);
      return;
    }
  });

  if (valid == false) {
    const Toast = Swal.mixin({
      toast: true,
      position: "bottom-end",
      showConfirmButton: false,
      color: "var(--text-color-1)",
      timer: 3000,
      timerProgressBar: true,
      didOpen: (toast) => {
        toast.addEventListener("mouseenter", Swal.stopTimer);
        toast.addEventListener("mouseleave", Swal.resumeTimer);
      },
    });

    Toast.fire({
      icon: "error",
      title: "<h2>Account doesnt exist</span>",
    });
  } else {
    logcheck();
    reglogswi.innerHTML = `<div id="loadinggif"><img src="./images/Dual Ring-1.5s-200px.gif"></div>`;
    remember.style.display = "none";
    authbtn.style.display = "none";
  }
}

let email = "";
let name = "";
let lastname = "";
let password = "";

if (localStorage.getItem("id")) {
  reglogswi.innerHTML = `<div id="loadinggif"><img src="./images/Dual Ring-1.5s-200px.gif"></div>`;
  remember.style.display = "none";
  authbtn.style.display = "none";
}

function logcheck() {
  const users = getArrayFromFirebase("Users");
  let uid = localStorage.getItem("id");

  setTimeout(() => {
    users.forEach((e) => {
      if (e.userid === uid) {
        email = e.data.email;
        name = e.data.name;
        lastname = e.data.lastname;
        password = e.data.password;
        accnavb();
      }
    });
  }, 1900);
}

function accnavb() {
  reglogswi.innerHTML = `<nav id="accSet">
<a class="accA" href="./profile.html"><i id="edIcon" class="fas fa-user"></i>${name} ${lastname}</a>
<a id="adminbtn"class="accA" href="./admin.html">Admin page</a>
<a id="uploadbtn"class="accA" href="./upload.html">Upload</a>
      <span onclick="logout()" class="accA" href="">Log out</span>
    </nav>`;
  remember.style.display = "none";
  authbtn.style.display = "none";
  accescheck();
  if (clicked == true) {
    const Toast = Swal.mixin({
      toast: true,
      position: "bottom-end",
      showConfirmButton: false,
      color: "var(--text-color-1)",
      timer: 3000,
      timerProgressBar: true,
      didOpen: (toast) => {
        toast.addEventListener("mouseenter", Swal.stopTimer);
        toast.addEventListener("mouseleave", Swal.resumeTimer);
      },
    });

    Toast.fire({
      icon: "success",
      title: "<h2>successfully Signed in</span>",
    });
    clicked = false;
  }
}

function accescheck() {
  let uploadbtn = document.getElementById("uploadbtn");
  let adminbtn = document.getElementById("adminbtn");
  const users = getArrayFromFirebase("Users");
  let uid = localStorage.getItem("id");

  users.forEach((e) => {
    if (uid == e.userid) {
      if (e.data.rank.toString() == "guest") {
        uploadbtn.style.display = "none";
      } else {
        uploadbtn.style.display = "inline-block";
      }
    }
  });
  users.forEach((e) => {
    if (uid == e.userid) {
      if (
        e.data.rank.toString() == "guest" ||
        e.data.rank.toString() == "manager"
      ) {
        adminbtn.style.display = "none";
      } else {
        adminbtn.style.display = "inline-block";
      }
    }
  });
}

function logout() {
  localStorage.removeItem("id");
  registerSwitch();
  remember.style.display = "flex";
  authbtn.style.display = "inline-block";
  let url = location.href.split("/")[3];
  if (url != "index.html" || url != "book.html") {
    window.location.href = "index.html";
  }
}
let uplbycount = 0;
let hotonu = "";

function pushHotels() {
  const hotels = getArrayFromFirebase("Hotels");

  setTimeout(() => {
    hotels.forEach((e) => {
      hotonu = e.data.user;
      allHot.innerHTML += `
        <div class="${e.userid} box lookfor" id="book${uplbycount}" data-aos="fade-up">
      <div class="image">
        <img src="${e.data.imglink}" alt="Image not found" />
        <h3><i class="fas fa-map-marker-alt"></i> ${e.data.location}</h3>
      </div>
      <div class="content">
        <div class="price"><div>$${e.data.price} <span>${e.data.oldprice}</span></div><button onclick="findhotelid(${uplbycount})" src="./book.html" class="btn">
        <a href="book.html"> Book now </a>
      </button></div>
        <h1>${e.data.title}</h1>
        <h1>By <span id="uploadedby${uplbycount}"></span></h1>
        <p>
        ${e.data.text}
        </p>
      </div>
    </div>`;
      checkuplby();
      uplbycount++;
    });
  }, 2200);
}

function checkuplby() {
  const users = getArrayFromFirebase("Users");
  let fullname = "";

  users.forEach((e) => {
    const bytext = document.getElementById(`uploadedby${uplbycount}`);
    if (e.userid === hotonu) {
      fullname = `${e.data.name + " " + e.data.lastname}`;
      bytext.textContent = `${fullname}`;
    }
  });
}

function findhotelid(num) {
  let bookdiv = document.getElementById(`book${num}`);
  let bookid = bookdiv.classList[0];
  localStorage.removeItem("bookid");
  localStorage.setItem("bookid", bookid);
}

function contactsub() {
  if (localStorage.getItem("id")) {
    const contactname = document.getElementById("contactname").value;
    const contactemail = document.getElementById("contactemail").value;
    const contactnumber = document.getElementById("contactnumber").value;
    const contactsubject = document.getElementById("contactsubject").value;
    const contactmsg = document.getElementById("contactmsg").value;

    if (
      contactemail == "" ||
      contactemail == " " ||
      contactname == "" ||
      contactname == " " ||
      contactnumber == "" ||
      contactnumber == " " ||
      contactsubject == "" ||
      contactsubject == " " ||
      contactmsg == "" ||
      contactmsg == " "
    ) {
      const Toast = Swal.mixin({
        toast: true,
        position: "bottom-end",
        showConfirmButton: false,
        color: "var(--text-color-1)",
        timer: 3000,
        timerProgressBar: true,
        didOpen: (toast) => {
          toast.addEventListener("mouseenter", Swal.stopTimer);
          toast.addEventListener("mouseleave", Swal.resumeTimer);
        },
      });

      Toast.fire({
        icon: "error",
        title: "<h2>Fill all inputs!</span>",
      });
    } else {
      if (contactemail.includes("mail") && contactemail.includes("@")) {
        addElementInFirebase("Messages", {
          subject: contactsubject,
          name: contactname,
          email: contactemail,
          number: contactnumber,
          text: contactmsg,
          user: localStorage.getItem("id"),
        });
        const Toast = Swal.mixin({
          toast: true,
          position: "bottom-end",
          showConfirmButton: false,
          color: "var(--text-color-1)",
          timer: 3000,
          timerProgressBar: true,
          didOpen: (toast) => {
            toast.addEventListener("mouseenter", Swal.stopTimer);
            toast.addEventListener("mouseleave", Swal.resumeTimer);
          },
        });

        Toast.fire({
          icon: "success",
          title: "<h2>Successfully sent!</span>",
        });
        document.getElementById("contactname").value = "";
        document.getElementById("contactemail").value = "";
        document.getElementById("contactnumber").value = "";
        document.getElementById("contactsubject").value = "";
        document.getElementById("contactmsg").value = "";
      } else {
        const Toast = Swal.mixin({
          toast: true,
          position: "bottom-end",
          showConfirmButton: false,
          color: "var(--text-color-1)",
          timer: 3000,
          timerProgressBar: true,
          didOpen: (toast) => {
            toast.addEventListener("mouseenter", Swal.stopTimer);
            toast.addEventListener("mouseleave", Swal.resumeTimer);
          },
        });

        Toast.fire({
          icon: "error",
          title: "<h2>Enter valid email!</span>",
        });
      }
    }
  } else {
    const Toast = Swal.mixin({
      toast: true,
      position: "bottom-end",
      showConfirmButton: false,
      color: "var(--text-color-1)",
      timer: 3000,
      timerProgressBar: true,
      didOpen: (toast) => {
        toast.addEventListener("mouseenter", Swal.stopTimer);
        toast.addEventListener("mouseleave", Swal.resumeTimer);
      },
    });

    Toast.fire({
      icon: "error",
      title: "<h2>Must authorize first!</span>",
    });
  }
}
