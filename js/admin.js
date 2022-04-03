let url = location.href.split("/")[3];

function isadmin() {
  const users = getArrayFromFirebase("Users");
  let uid = localStorage.getItem("id");

  setTimeout(() => {
    users.forEach((e) => {
      if (e.userid === uid) {
        if (
          (url == "admin.html" && e.data.rank.toString() == "guest") ||
          (url == "admin.html" && e.data.rank.toString() == "manager")
        ) {
          window.location.href = "index.html";
        } else {
          secuser.style.display = "block";
          wholeadm.style.display = "block";
        }
      } else if (!uid) {
        window.location.href = "index.html";
      }
    });
  }, 2000);
}

function iscreator() {
  const users = getArrayFromFirebase("Users");
  let uid = localStorage.getItem("id");

  setTimeout(() => {
    users.forEach((e) => {
      if (e.userid === uid) {
        if (e.data.rank == "creator") {
          secadmin.style.display = "block";
          admnav.style.display = "block";
          userchangeinput.placeholder =
            "Supported: guest, manager, admin, creator";
        } else {
          secadmin.style.display = "none";
          admnav.style.display = "none";
        }
      }
    });
  }, 2000);
}

const userbody = document.querySelector("#userbody");
const adminbody = document.querySelector("#adminbody");
const secadmin = document.querySelector("#secadmin1");
const admnav = document.querySelector("#admnav");
const secuser = document.querySelector("#secadmin");
const aushotels = document.querySelector("#aushotels");
const wholeadm = document.querySelector("#wholeadm");

const adminchangerank = document.querySelector("#adminchangerank");
const userchangerank = document.querySelector("#userchangerank");
const userchangeinput = document.querySelector("#userchangeinput");
const adminchangeinput = document.querySelector("#adminchangeinput");

const admmsgs = document.getElementById("admmsgs");

function getallusers() {
  const users = getArrayFromFirebase("Users");
  let userdelid = 0;

  setTimeout(() => {
    users.forEach((e) => {
      if (
        e.data.rank.toString() == "guest" ||
        e.data.rank.toString() == "manager"
      ) {
        userbody.innerHTML += `
        <tr id="deluser${userdelid}" class="${e.userid}">
          <td>${e.userid}</td>
          <td>${e.data.name}</td>
          <td>${e.data.lastname}</td>
          <td>${e.data.email}</td>
          <td><b>${e.data.rank}</b></td>
          <td><button class="btn" onclick="deleteuser(${userdelid})" id="adminuserdel">Delete</button></td>
          <td><button onclick="userrankedit(${userdelid})" id="adminuseredit" class="btn">Edit</button></td>
        </tr>`;
        userdelid++;
      }
    });
  }, 2000);
}

function userrankedit(usereditid) {
  userchangerank.style.display = "flex";
  adminchangerank.style.display = "none";
  let uedtb = document.getElementById(`deluser${usereditid}`).classList[0];
  localStorage.removeItem("usereditid");
  localStorage.setItem("usereditid", uedtb);
}

function canceluseredit() {
  userchangerank.style.display = "none";
  localStorage.removeItem("usereditid");
}

function deleteuser(usdid) {
  const users = getArrayFromFirebase("Users");
  let deluser = document.getElementById(`deluser${usdid}`);

  users.forEach((e) => {
    if (e.userid === deluser.classList[0]) {
      removeElementFromFirebase("Users", e.userid, true);
      deluser.remove();
    }
  });
}

function getalladmins() {
  const users = getArrayFromFirebase("Users");
  let admindelid = 0;

  setTimeout(() => {
    users.forEach((e) => {
      if (e.data.rank.toString() == "admin") {
        adminbody.innerHTML += `
          <tr id="deladmin${admindelid}" class="${e.userid}">
            <td>${e.userid}</td>
            <td>${e.data.name}</td>
            <td>${e.data.lastname}</td>
            <td>${e.data.email}</td>
            <td><b>${e.data.rank}</b></td>
            <td><button class="btn" onclick="deleteadmin(${admindelid})" id="adminuserdel">Delete</button></td>
            <td><button onclick="adminrankedit(${admindelid})" id="adminuseredit" class="btn">Edit</button></td>
          </tr>`;
        admindelid++;
      }
    });
  }, 2000);
}

function adminrankedit(admindelid) {
  adminchangerank.style.display = "flex";
  userchangerank.style.display = "none";
  let admdtb = document.getElementById(`deladmin${admindelid}`).classList[0];
  localStorage.removeItem("usereditid");
  localStorage.setItem("usereditid", admdtb);
}

function canceladminedit() {
  adminchangerank.style.display = "none";
  localStorage.removeItem("usereditid");
}

function deleteadmin(usdid) {
  const users = getArrayFromFirebase("Users");
  let deluser = document.getElementById(`deladmin${usdid}`);

  users.forEach((e) => {
    if (e.userid === deluser.classList[0]) {
      removeElementFromFirebase("Users", e.userid, true);
      deluser.remove();
    }
  });
}

let amdhonu = "";
let uplbycountadm = 0;

function adminahs() {
  const hotels = getArrayFromFirebase("Hotels");

  setTimeout(() => {
    hotels.forEach((e) => {
      amdhonu = e.data.user;
      aushotels.innerHTML += `
          <div id="divadm${uplbycountadm}" class="${e.userid} box" data-aos="fade-up">
        <div class="image">
          <img src="${e.data.imglink}" alt="Image not found" />
          <h3><i class="fas fa-map-marker-alt"></i>${e.data.location}</h3>
        </div>
        <div class="content">
          <div class="price"><div>$${e.data.price} <span>${e.data.oldprice}</span></div><button onclick="deleteadm(${uplbycountadm})" class="btn">
          <a>Delete</a>
        </button></div>
          <h1>${e.data.title}</h1>
          <h1>By <span id="uploadedbyadm${uplbycountadm}"></span></h1>
          <p>
          ${e.data.text}
          </p>
        </div>
      </div>`;
      checkuplbyadm();
      uplbycountadm++;
    });
  }, 2000);
}

function checkuplbyadm() {
  const users = getArrayFromFirebase("Users");
  let fullname = "";

  users.forEach((e) => {
    const bytext = document.getElementById(`uploadedbyadm${uplbycountadm}`);
    if (e.userid === amdhonu) {
      fullname = `${e.data.name + " " + e.data.lastname}`;
      bytext.textContent = `${fullname}`;
    }
  });
}

function deleteadm(numb) {
  const hotels = getArrayFromFirebase("Hotels");
  const arr = document.getElementById(`divadm${numb}`);
  let hid = arr.classList[0];

  hotels.forEach((e) => {
    if (e.userid === hid) {
      removeElementFromFirebase("Hotels", e.userid, true);
    }
  });
  arr.remove();
}

function saveuseredit() {
  const users = getArrayFromFirebase("Users");
  let uid = localStorage.getItem("id");
  let ranktosave = "";

  users.forEach((e) => {
    if (uid === e.userid) {
      if (e.data.rank == "creator") {
        if (userchangeinput.value.toLowerCase() == "guest") {
          ranktosave = "guest";
          findusertochangebyid(ranktosave);
        } else if (userchangeinput.value.toLowerCase() == "manager") {
          ranktosave = "manager";
          findusertochangebyid(ranktosave);
        } else if (userchangeinput.value.toLowerCase() == "admin") {
          ranktosave = "admin";
          findusertochangebyid(ranktosave);
        } else if (userchangeinput.value.toLowerCase() == "creator") {
          ranktosave = "creator";
          findusertochangebyid(ranktosave);
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
            title: "<h2>invalid rank</span>",
          });

          adminchangeinput.value = "";
          userchangeinput.value = "";
        }
      } else if (e.data.rank.toString() == "admin") {
        if (userchangeinput.value.toLowerCase() == "guest") {
          ranktosave = "guest";
          findusertochangebyid(ranktosave);
        } else if (userchangeinput.value.toLowerCase() == "manager") {
          ranktosave = "manager";
          findusertochangebyid(ranktosave);
        } else if (userchangeinput.value.toLowerCase() == "admin") {
          ranktosave = "admin";
          findusertochangebyid(ranktosave);
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
            title: "<h2>invalid rank</span>",
          });

          adminchangeinput.value = "";
          userchangeinput.value = "";
        }
      }
    }
  });
}

function findusertochangebyid(ranktosave) {
  const users = getArrayFromFirebase("Users");
  let editinguser = localStorage.getItem("usereditid");
  let refreshusertable = localStorage.getItem("refreshusertable");

  users.forEach((e) => {
    if (e.userid === editinguser) {
      changeOnDateOnFirebaseByID("Users", editinguser, {
        name: e.data.name,
        lastname: e.data.lastname,
        email: e.data.email,
        password: e.data.password,
        rank: ranktosave,
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
        title: "<h2>successfully changed</span>",
      });
    }
  });

  adminchangeinput.value = "";
  userchangeinput.value = "";
  adminbody.innerHTML = "";
  userbody.innerHTML = "";
  getalladmins();
  getallusers();
  adminchangerank.style.display = "none";
  userchangerank.style.display = "none";
}

function saveadminedit() {
  const users = getArrayFromFirebase("Users");
  let uid = localStorage.getItem("id");
  let ranktosave = "";

  users.forEach((e) => {
    if (uid === e.userid) {
      if (e.data.rank == "creator") {
        if (adminchangeinput.value.toLowerCase() == "guest") {
          ranktosave = "guest";
          findusertochangebyid(ranktosave);
        } else if (adminchangeinput.value.toLowerCase() == "manager") {
          ranktosave = "manager";
          findusertochangebyid(ranktosave);
        } else if (adminchangeinput.value.toLowerCase() == "admin") {
          ranktosave = "admin";
          findusertochangebyid(ranktosave);
        } else if (adminchangeinput.value.toLowerCase() == "creator") {
          ranktosave = "creator";
          findusertochangebyid(ranktosave);
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
            title: "<h2>invalid rank</span>",
          });

          adminchangeinput.value = "";
          userchangeinput.value = "";
        }
      } else {
        window.location.href = "index.html";
      }
    }
  });
}

function pagemessages() {
  const msgs = getArrayFromFirebase("Messages");
  let msgid = 0;

  setTimeout(() => {
    msgs.forEach((e) => {
      admmsgs.innerHTML += `
      <div id="${msgid}" class="${e.userid} msgdiv">
          <div>
            <span><b>subject: </b>${e.data.subject}</span>
          </div>
          <div>
            <span><b>Name: </b>${e.data.name}</span>
          </div>
          <div>
          <span><b>Email: </b>${e.data.email}</span>
        </div>
          <div>
            <span><b>Number: </b>${e.data.number}</span>
          </div>
          <div>
          <span><b>User: </b>${e.data.user}</span>
        </div>
          <div>
            <span><b>Text: </b>${e.data.text}</span>
          </div>
          <div>
            <button class="btn" onclick="delmsg(${msgid})">Delete</button>
          </div>
        </div>`;
      msgid++;
    });
  }, 2000);
}

function delmsg(msgid) {
  const msgs = getArrayFromFirebase("Messages");
  let gotel = document.getElementById(msgid);

  msgs.forEach((e) => {
    if (e.userid == gotel.classList[0]) {
      removeElementFromFirebase("Messages", gotel.classList[0], true);
      gotel.remove();
    }
  });
}
