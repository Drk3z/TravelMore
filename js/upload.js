function urlcheck(allowed) {
  let url = location.href.split("/")[3];

  if (url == "upload.html" && allowed == false) {
    window.location.href = "index.html";
  } else {
    uplsec.style.display = "flex";
  }
}
const title = document.querySelector("#title");
const text = document.querySelector("#text");
const displayArea = document.querySelector("#display");
const addBtn = document.querySelector("#addBtn");
const imageUploadInput = document.querySelector("#imageUpload");
const price = document.querySelector("#price");
const oldprice = document.querySelector("#oldprice");
const loc = document.querySelector("#location");
const uplsec = document.querySelector("#uplsec");

count = 0;
let logic = false;

let tiTle = "";
let texT = "";
let pricE = "";
let oldPrice = "";
let loC = "";
let imgDone = "";

addBtn.addEventListener("click", () => {
  display(
    title.value,
    text.value,
    count,
    imageUploadInput,
    price.value,
    oldprice.value,
    loc.value
  );
  count++;
});

function ismanager() {
  setTimeout(() => {
    const users = getArrayFromFirebase("Users");
    let uid = localStorage.getItem("id");
    let allowed = true;

    users.forEach((e) => {
      if (uid == e.userid) {
        if (e.data.rank.toString() == "guest") {
          allowed = false;
        } else {
          allowed = true;
        }
      } else if (!uid) {
        allowed = false;
      }
    });
    urlcheck(allowed);
  }, 1500);
}

imageUploadInput.addEventListener("click", () => {
  logic = true;
});

function display(title, text, id, imageInput, price, oldprice, loc) {
  if (isValidInput(title, text, price, oldprice, loc)) {
    displayArea.innerHTML = `<div id="${id}" class="box" data-aos="fade-up">
    <div class="image">
      <img src="" alt="Image not found" id="img${id}" />
      <h3><i class="fas fa-map-marker-alt"></i> ${loc}</h3>
    </div>
    <div class="content">
      <div class="price"><div>$${price} <span>${oldprice}</span></div><button onclick="hot2base()" class="btn btn-success" id="confupl">Confirm</button></div>
      <h1>${title}</h1>
      <h1>By: You</h1>
      <p>
        ${text}
      </p>
    </div>
  </div>`;
    tiTle = title;
    texT = text;
    pricE = price;
    oldPrice = oldprice;
    loC = loc;
    imageToString(imageInput, id);
    clear();
  }
}

function isValidInput(title, text, price, oldprice, loc) {
  if (
    title == "" ||
    text == "" ||
    price == "" ||
    oldprice == "" ||
    price != parseInt(price) ||
    oldprice != parseInt(oldprice) ||
    loc == ""
  ) {
    if (price != "" || oldprice != "") {
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
        title: "<h2>price cant contain letters</span>",
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
        title: "<h2>Fill all inputs</span>",
      });
    }
    return false;
  } else return true;
}

function imageToString(imageInput, id) {
  const image = document.querySelector(`#img${id}`);
  if (logic) {
    try {
      let reader = new FileReader();
      reader.readAsDataURL(imageInput.files[0]);
      reader.onload = function () {
        let imgLink = reader.result;
        image.src = imgLink;
        imgDone = imgLink;
      };
    } catch (err) {
      if (
        err ==
        "TypeError: Failed to execute 'readAsDataURL' on 'FileReader': parameter 1 is not of type 'Blob'."
      ) {
        image.src = "https://bitsofco.de/content/images/2018/12/broken-1.png";
      }
    }
  } else {
    image.src = "https://bitsofco.de/content/images/2018/12/broken-1.png";
  }
}

function clear() {
  title.value = "";
  text.value = "";
  price.value = "";
  oldprice.value = "";
  loc.value = "";
  logic = false;
}

function hot2base() {
  if (
    texT == "" ||
    tiTle == "" ||
    pricE == "" ||
    oldPrice == "" ||
    loC == "" ||
    imgDone == ""
  ) {
    Swal.fire({
      icon: "error",
      title: "Fill out the inputs!",
    });
  } else {
    addElementInFirebase("Hotels", {
      title: tiTle,
      text: texT,
      price: pricE,
      oldprice: oldPrice,
      location: loC,
      imglink: imgDone,
      user: localStorage.getItem("id"),
    });
    displayArea.innerHTML = "";
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
      title: "<h2>successfully uploaded</span>",
    });
  }
}
