let url = location.href.split("/")[3];

if (url == "profile.html" && !localStorage.getItem("id")) {
  window.location = "index.html";
} else if (localStorage.getItem("id")) {
  setTimeout(() => {
    profsect.style.display = "flex";
  }, 1000);
}

const changemail = document.querySelector("#changemail");
const changepass = document.querySelector("#changepass");
const passsave = document.querySelector("#passsave");
const emailsave = document.querySelector("#emailsave");
const emailpass = document.querySelector("#emailpass");
const oldpass = document.querySelector("#oldpass");
const username = document.querySelector("#welcomeuser");

const yrupls = document.querySelector("#yrupls");
const cardedit = document.querySelector("#cardedit");
const cedname = document.querySelector("#cedname");
const urlist = document.querySelector("#yourlist");
const profsect = document.querySelector("#profsect");

function usname() {
  const users = getArrayFromFirebase("Users");
  let uid = localStorage.getItem("id");
  const username = document.querySelector("#welcomeuser");

  setTimeout(() => {
    users.forEach((e) => {
      if (uid === e.userid) {
        username.textContent = e.data.name;
        changemail.placeholder = `${e.data.email}`;
      }
    });
  }, 1000);
}
passsave.addEventListener("click", () => {
  pasverify();
});
emailsave.addEventListener("click", () => {
  emailverify();
});

function isuploader() {
  setTimeout(() => {
    const users = getArrayFromFirebase("Users");
    let uid = localStorage.getItem("id");
    let allowed = true;

    users.forEach((e) => {
      if (uid == e.userid) {
        if (e.data.rank.toString() == "guest") {
          urlist.style.display = "none";
        } else {
          urlist.style.display = "block";
        }
      }
    });
  }, 1000);
}

function emailverify() {
  const users = getArrayFromFirebase("Users");
  let uid = localStorage.getItem("id");

  if (changemail.value == "" || emailpass == "") {
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
      title: "<h2>inputs cant be empty</span>",
    });
  } else {
    users.forEach((e) => {
      if (uid === e.userid) {
        if (emailpass.value === e.data.password) {
          changeOnDateOnFirebaseByID("Users", e.userid, {
            name: e.data.name,
            lastname: e.data.lastname,
            email: changemail.value,
            password: e.data.password,
            rank: e.data.rank,
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
            title: "<h2>succesfully changed</span>",
          });
          clear();
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
            title: "<h2>incorrect password</span>",
          });
          clear();
        }
      }
    });
  }
}

function pasverify() {
  const users = getArrayFromFirebase("Users");
  let uid = localStorage.getItem("id");

  if (oldpass.value == "" || changepass == "") {
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
      title: "<h2>inputs cant be empty</span>",
    });
  } else {
    users.forEach((e) => {
      if (uid === e.userid) {
        if (oldpass.value === e.data.password) {
          changeOnDateOnFirebaseByID("Users", e.userid, {
            name: e.data.name,
            lastname: e.data.lastname,
            email: e.data.email,
            password: changepass.value,
            rank: e.data.rank,
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
            title: "<h2>succesfully changed</span>",
          });
          clear();
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
            title: "<h2>incorrect password</span>",
          });
          clear();
        }
      }
    });
  }
}

function clear() {
  oldpass.value = "";
  changepass.value = "";
  changemail.value = "";
  emailpass.value = "";
}

let hotsloaded = 0;

function youruploads() {
  const hotels = getArrayFromFirebase("Hotels");
  let uid = localStorage.getItem("id");
  let numb = 0;
  setTimeout(() => {
    hotels.forEach((e) => {
      if (uid === e.data.user) {
        yrupls.innerHTML += `<div id="${numb}" class="${e.userid} box" data-aos="fade-up">
                  <div class="image">
                    <img src="${e.data.imglink}" alt="Image not found" />
                    <h3><i class="fas fa-map-marker-alt"></i> ${e.data.location}</h3>
                  </div>
                  <div class="content">
                    <div class="price">$${e.data.price} <span>${e.data.oldprice}</span></div>
                    <h1>${e.data.title}</h1>
                    <button class="btn" id="delbtn">
                      <a onclick="hotdel(${numb})"> Delete </a>
                    </button>
                    <button onclick="visibleedit(${numb})" class="btn" id="editbtn">
                    <a> Edit </a>
                  </button>
                    <p>
                    ${e.data.text}
                    </p>
                  </div>
                </div>`;
        numb++;
      }
    });
  }, 1700);
}

function hotdel(numb) {
  const hotels = getArrayFromFirebase("Hotels");
  const arr = document.getElementById(`${numb}`);
  let hid = arr.classList[0];

  hotels.forEach((e) => {
    if (e.userid === hid) {
      removeElementFromFirebase("Hotels", e.userid, true);
    }
  });
  arr.remove();
}

function visibleedit(numb) {
  localStorage.removeItem("editing");
  localStorage.removeItem("curid");
  const hotels = getArrayFromFirebase("Hotels");
  const arr = document.getElementById(`${numb}`);
  let hid = arr.classList[0];
  localStorage.setItem("editing", hid);
  localStorage.setItem("curid", numb);
  cardedit.style.display = "flex";
  profsect.style.display = "none";

  hotels.forEach((e) => {
    if (e.userid === hid) {
      cedname.textContent = `${e.data.title}`;
    }
  });
}

let editlogic = false;

function finishedit() {
  const edittitle = document.getElementById("edittitle");
  const edittext = document.getElementById("edittext");
  const editimageUpload = document.getElementById("editimageUpload");
  const editprice = document.getElementById("editprice");
  const editoldprice = document.getElementById("editoldprice");
  const editlocation = document.getElementById("editlocation");

  const hotels = getArrayFromFirebase("Hotels");
  let editing = localStorage.getItem("editing");
  let curid = localStorage.getItem("curid");

  let editedTitle = "";
  let editedText = "";
  let editedImage = "";
  let editedPrice = "";
  let editedOldprice = "";
  let editedLocation = "";

  editimageUpload.addEventListener("click", () => {
    editlogic = true;
  });

  hotels.forEach((e) => {
    if (e.userid === editing) {
      if (edittitle.value == "") {
        editedTitle = e.data.title;
      } else {
        editedTitle = edittitle.value;
      }
      if (edittext.value == "") {
        editedText = e.data.text;
      } else {
        editedText = edittext.value;
      }
      if (editimageUpload.value == "") {
        editedImage = e.data.imglink;
      } else {
        if (editlogic) {
          try {
            let reader = new FileReader();
            reader.readAsDataURL(imageInput.files[0]);
            reader.onload = function () {
              editedImage = reader.result;
            };
          } catch (err) {
            if (
              err ==
              "TypeError: Failed to execute 'readAsDataURL' on 'FileReader': parameter 1 is not of type 'Blob'."
            ) {
              image.src =
                "https://bitsofco.de/content/images/2018/12/broken-1.png";
            }
          }
        }
      }
      if (editprice.value == "") {
        editedPrice = e.data.price;
      } else {
        editedPrice = editprice.value;
      }
      if (editoldprice.value == "") {
        editedOldprice = e.data.oldprice;
      } else {
        editedOldprice = editoldprice.value;
      }
      if (editlocation.value == "") {
        editedLocation = e.data.location;
      } else {
        editedLocation = editlocation.value;
      }
      if (
        edittitle.value == "" &&
        edittext.value == "" &&
        editimageUpload.value == "" &&
        editprice.value == "" &&
        editoldprice.value == "" &&
        editlocation.value == ""
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
          title: "<h2>Nothing has changed</span>",
        });
        clearedit();
      } else {
        changeOnDateOnFirebaseByID("Hotels", editing, {
          title: editedTitle,
          text: editedText,
          price: editedPrice,
          oldprice: editedOldprice,
          imglink: editedImage,
          location: editedLocation,
          user: e.data.user,
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
          title: "<h2>Succesfully changed</span>",
        });
        document.getElementById(`${curid}`).remove();
        yrupls.innerHTML += `<div id="${curid}" class="${e.userid} box" data-aos="fade-up">
        <div class="image">
          <img src="${editedImage}" alt="Image not found" />
          <h3><i class="fas fa-map-marker-alt"></i> ${editedLocation}</h3>
        </div>
        <div class="content">
          <div class="price">$${editedPrice} <span>${editedOldprice}</span></div>
          <h1>${editedTitle}</h1>
          <button class="btn" id="delbtn">
            <a onclick="hotdel(${curid})"> Delete </a>
          </button>
          <button onclick="visibleedit(${curid})" class="btn" id="editbtn">
          <a> Edit </a>
        </button>
          <p>
          ${editedText}
          </p>
        </div>
      </div>`;
        clearedit();
        console.log(editedText.length);
      }
    }
  });
}

function hideedit() {
  cardedit.style.display = "none";
  profsect.style.display = "flex";
  localStorage.removeItem("editing");
  localStorage.removeItem("curid");
}

function clearedit() {
  edittitle.value = "";
  edittext.value = "";
  editimageUpload.value = "";
  editprice.value = "";
  editoldprice.value = "";
  editlocation.value = "";
  cardedit.style.display = "none";
  profsect.style.display = "flex";
}
