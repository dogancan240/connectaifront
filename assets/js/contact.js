function showAlert(event) {
  event.preventDefault();
  alert("Thanks for your feedback");

  // Formu temizle
  var form = document.getElementById("contact-form");
  form.reset();
}

window.onload = function () {
  document.getElementById("form-submit").addEventListener("click", showAlert);
};
