const card = document.querySelector(".card");
const cardNumber = document.querySelector(".card-number");
const cardHolder = document.querySelector(".card-name");
const cardValidity = document.querySelector(".card-validity");
const cardCvv = document.querySelector(".card-cvv");
const inputElement = document.querySelectorAll("input");

const dummy = {
  number: "0000 0000 0000 0000",
  name: "Name Surname",
  validity: "00/00",
  cvv: "000",
};
inputElement.forEach((elem) => {
  elem.addEventListener("input", () => {
    if (elem.value.trim() === "") {
      const key = elem.getAttribute("id");
      console.log(key);
      const className = "card-" + key;
      document.querySelector(`.${className}`).innerText = dummy[key];
    }
  });
});

function UpdateAccountNumber(input) {
  let inputValue = input.value.replace(/\D/g, "");
  let formattedValue = "";
  for (let i = 0; i < inputValue.length; i++) {
    if (i > 0 && i % 4 === 0) {
      formattedValue += "\u00A0";
    }
    formattedValue += inputValue[i];
  }
  input.value = formattedValue;
  cardNumber.innerText = formattedValue;
}

function updateCardHolder(input) {
  let inputValue = input.value.replace(/[^A-Z a-z]/g, "");
  input.value = inputValue;
  cardHolder.innerText = inputValue;
}

function confirmOrder() {
  alert("Your order has been received successfully.");
}

function updateValidity(input) {
  let inputValue = input.value.replace(/\D/g, "");
  let formattedValue = "";

  for (let i = 0; i < inputValue.length; i++) {
    const digit = parseInt(inputValue[i], 10);

    if (
      (i === 0 && digit > 1) ||
      (i === 1 && digit > 2 && parseInt(inputValue[0]) != 0)
    ) {
      break;
    }

    if (i === 2) {
      formattedValue += "/";
    }
    formattedValue += digit;
  }
  input.value = formattedValue;
  cardValidity.innerText = formattedValue;
}

function updateCardCvv(input) {
  let inputValue = input.value.replace(/\D/g, "");
  input.value = inputValue;
  cardCvv.innerText = inputValue;
}

document.querySelector("#cvv").addEventListener("focus", () => {
  card.classList.add("flipped");
});
document.querySelector("#cvv").addEventListener("blur", () => {
  card.classList.remove("flipped");
});
