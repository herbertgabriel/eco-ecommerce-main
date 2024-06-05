function showPopup(message, isAdd) {
  var popup = document.getElementById("cartPopup");
  popup.textContent = message;

  if (isAdd) {
    popup.classList.add("cartadd");
    popup.classList.remove("cartremove");
  } else {
    popup.classList.add("cartremove");
    popup.classList.remove("cartadd");
  }

  popup.classList.add("show");
  setTimeout(function () {
    popup.classList.remove("show");
  }, 3000);
}
