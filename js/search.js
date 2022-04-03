const indexsearchbox = document.querySelector("#indexsearchbox");
const indexsearchboxform = document.querySelector("#indexsearchboxform");
const wheretoinp = document.querySelector("#wheretoinp");

indexsearchboxform.addEventListener("click", () => {
  allHot.scrollIntoView();
  wheretoinp.value = "";

  const hotels = getArrayFromFirebase("Hotels");

  hotels.forEach((e) => {
    let foundel = document.getElementsByClassName(`${e.userid}`)[0];
    foundel.style.display = "block";
  });
});

indexsearchbox.addEventListener("keydown", () => {
  searchhotel();
});

function searchhotel() {
  const hotels = getArrayFromFirebase("Hotels");

  setTimeout(() => {
    let inpval = indexsearchbox.value;
    console.log(inpval);
    if (inpval != "" || inpval != " ") {
      hotels.forEach((e) => {
        if (
          e.data.title.toLowerCase().includes(inpval.toLowerCase()) ||
          e.data.location.toLowerCase().includes(inpval.toLowerCase())
        ) {
          let foundel = document.getElementsByClassName(`${e.userid}`)[0];
          foundel.style.display = "block";
        } else {
          let foundel = document.getElementsByClassName(`${e.userid}`)[0];
          foundel.style.display = "none";
        }
      });
    }
  }, 10);
}

wheretoinp.addEventListener("click", () => {
  indexsearchbox.value = "";

  const hotels = getArrayFromFirebase("Hotels");

  hotels.forEach((e) => {
    let foundel = document.getElementsByClassName(`${e.userid}`)[0];
    foundel.style.display = "block";
  });
});

wheretoinp.addEventListener("keydown", () => {
  wheretosearch();
});

function wheretosearch() {
  const hotels = getArrayFromFirebase("Hotels");

  setTimeout(() => {
    let inpval = wheretoinp.value;
    console.log(inpval);
    if (inpval != "" || inpval != " ") {
      hotels.forEach((e) => {
        if (e.data.location.toLowerCase().includes(inpval.toLowerCase())) {
          let foundel = document.getElementsByClassName(`${e.userid}`)[0];
          foundel.style.display = "block";
        } else {
          let foundel = document.getElementsByClassName(`${e.userid}`)[0];
          foundel.style.display = "none";
        }
      });
    }
  }, 10);
}
