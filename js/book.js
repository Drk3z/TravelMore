const bookimage = document.querySelector("#bookimage");
const booktitle = document.querySelector("#booktitle");
const booktext = document.querySelector("#booktext");
const bookprice = document.querySelector("#bookprice");
const booklocation = document.querySelector("#booklocation");
const bookby = document.querySelector("#bookby");

function getbookstuff() {
  const hotels = getArrayFromFirebase("Hotels");
  const users = getArrayFromFirebase("Users");
  let bookid = localStorage.getItem("bookid");
  let bkbyid = "";

  setTimeout(() => {
    hotels.forEach((e) => {
      if (e.userid === bookid) {
        bkbyid = e.data.user;
        bookimage.src = e.data.imglink;
        booktitle.textContent = e.data.title;
        booktext.textContent = e.data.text;
        bookprice.innerHTML = `$${e.data.price} <span>${e.data.oldprice}</span>`;
        booklocation.innerHTML = `<i class="fas fa-map-marker-alt"></i> ${e.data.location}`;
      }
    });
    users.forEach((e) => {
      if (e.userid === bkbyid) {
        bookby.textContent = `${"By " + e.data.name + " " + e.data.lastname}`;
      }
    });
  }, 1800);
}
