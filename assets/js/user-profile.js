/*
var name = localStorage.getItem("name");
var surname = "";
var password = "";
var mail = "";
var tel = "";
var id = 0;
var is_user_login = false;
*/
document.addEventListener("DOMContentLoaded", function () {
  // Get the "Profile" link element

  var profileLink = document.getElementById("profile-link");
  var nameprof = document.getElementById("user_name_profile");
  console.log(localStorage.getItem("mail"));
  if (localStorage.getItem("name") !== null && nameprof !== null) {
    nameprof.textContent = localStorage.getItem("name");
    console.log("hello");

    var usermail = document.getElementById("user_Email_profile");
    usermail.value = localStorage.getItem("mail");

    var userphone = document.getElementById("user_Phone_profile");
    userphone.value = localStorage.getItem("phone");

    var userpassword = document.getElementById("user_password_profile");
    userpassword.value = localStorage.getItem("password");
  }

  // Check if the user is logged in
  var isUserLoggedIn = localStorage.getItem("is_user_login") === "true";
  console.log(localStorage.getItem("name"));
  if (!isUserLoggedIn) {
    // Hide the "Profile" link
    profileLink.style.display = "none";
  }
});

function submitLoginForm() {
  var email = document.getElementById("email").value;
  var password = document.getElementById("password").value;

  // Make POST request to API
  fetch("https://dogancanapi-246674fda9a9.herokuapp.com/api/users/verify", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, password }), // Send email and password in the request body
  })
    .then((response) => response.json())
    .then((data) => {
      if (data.success === true) {
        // Save login state to localStorage
        localStorage.setItem("is_user_login", "true");
        localStorage.setItem("name", data.user.name);
        localStorage.setItem("mail", data.user.email);
        localStorage.setItem("phone", data.user.tel);
        localStorage.setItem("password", data.user.password);
        localStorage.setItem("id", data.user.id);
        window.location.href = "index.html";
      } else {
        // Show error message
        alert("Invalid email or password");
      }
    })
    .catch((error) => {
      console.error("Error:", error);
    });
}

function logout() {
  // Clear login state from localStorage
  localStorage.removeItem("is_user_login");
  localStorage.removeItem("name");
  localStorage.removeItem("mail");
  localStorage.removeItem("phone");
  localStorage.removeItem("password");
  localStorage.removeItem("id");
  localStorage.removeItem("sectionTitle");
  window.location.href = "login.html"; // Redirect to the login page or any other page
}

function enableEditing() {
  var phoneInput = document.getElementById("user_Phone_profile");
  phoneInput.removeAttribute("readonly");

  var emailInput = document.getElementById("user_Email_profile");
  emailInput.removeAttribute("readonly");

  var passwordInput = document.getElementById("user_password_profile");
  passwordInput.removeAttribute("readonly");
  document.getElementById("editbtn").style.display = "block"; // "Confirm" butonunu göster

  /*
  if (editbtn.value == "Edit Profile") {
    editbtn.value = "Confirm Edit";
  } else {
    editbtn.value = "Edit Profile";
    phoneInput.setAttribute("readonly", "readonly");
    emailInput.setAttribute("readonly", "readonly");
    passwordInput.setAttribute("readonly", "readonly");
    console.log(localStorage.getItem("id"));
    updateUser(
      localStorage.getItem("id"),
      emailInput.value,
      passwordInput.value,
      phoneInput.value
    );
  }
  */
}
function confirmAction() {
  // Confirm işlemini burada gerçekleştirin
  console.log("Confirmed.");
}

function confirm() {
  var phoneInput = document.getElementById("user_Phone_profile");
  //phoneInput.removeAttribute("readonly");

  var emailInput = document.getElementById("user_Email_profile");
  //emailInput.removeAttribute("readonly");

  var passwordInput = document.getElementById("user_password_profile");
  //passwordInput.removeAttribute("readonly");

  //editbtn.value = "Edit Profile";
  phoneInput.setAttribute("readonly", "readonly");
  emailInput.setAttribute("readonly", "readonly");
  passwordInput.setAttribute("readonly", "readonly");
  console.log(localStorage.getItem("id"));
  updateUser(
    localStorage.getItem("id"),
    emailInput.value,
    passwordInput.value,
    phoneInput.value
  );
}

function updateUser(Id, emailParam, paramPassword, phone) {
  //const requestBody = JSON.stringify({ name, password });
  const userId = Id;
  const userData = {
    email: emailParam,
    password: paramPassword,
    tel: phone,
  };
  // Send the PUT request
  fetch(`https://dogancanapi-246674fda9a9.herokuapp.com/api/users/${userId}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(userData),
  })
    .then((response) => response.json())
    .then((data) => {
      // Handle the response data
      console.log(data);
    })
    .catch((error) => {
      // Handle errors
      console.error("There was a problem with the fetch operation:", error);
    });
}

async function registerbtn() {
  var nameInput = document.getElementById("name");
  var SurnameInput = document.getElementById("surname");
  var emailInput = document.getElementById("email");
  var passwordInput = document.getElementById("password");
  var phoneInput = document.getElementById("phone");
  var passwordagain = document.getElementById("passwordagain");

  const isEmailAvailable = await checkEmail(emailInput.value);
  const isPhoneAvaiable = await CheckPhone(phoneInput.value);

  if (isEmailAvailable && isPhoneAvaiable) {
    if (
      nameInput.value.trim() !== "" &&
      SurnameInput.value.trim() !== "" &&
      emailInput.value.trim() !== "" &&
      passwordInput.value.trim() !== "" &&
      phoneInput.value.trim() !== "" &&
      passwordInput.value === passwordagain.value
    ) {
      const userAdded = await NewaddUser(
        nameInput.value,
        SurnameInput.value,
        emailInput.value,
        passwordInput.value,
        phoneInput.value
      );

      if (userAdded) {
        // Redirect to login page after successful registration
        window.location.href = "login.html";
      } else {
        alert("Failed to add user. Please try again.");
      }
    } else {
      // If any field is empty or password doesn't match, handle the error or missing inputs
      alert("Please fill in all fields and ensure that passwords match.");
    }
  } else {
    alert("***");
  }

  //&& CheckEmail(emailInput.value)  CheckPhone(phoneInput.value)
  /*
  if (CheckEmail(emailInput.value)) {
    console.log("yesss1");
    if (
      nameInput.value.trim() !== "" &&
      SurnameInput.value.trim() !== "" &&
      emailInput.value.trim() !== "" &&
      passwordInput.value.trim() !== "" &&
      phoneInput.value.trim() !== "" &&
      passwordInput.value === passwordagain.value
    ) {
      NewaddUser(
        nameInput.value,
        SurnameInput.value,
        emailInput.value,
        passwordInput.value,
        phoneInput.value
      );
    } else {
      // If any field is empty or password doesn't match, handle the error or missing inputs
      // For example, you can display an error message to the user
      alert("Please fill in all fields and ensure that passwords match11.");
    }
  } else {
    alert("Please fill in all fields and ensure that passwords match22.");
  }
  */
}

function NewaddUser(nameParam, surnameParam, emailParam, paramPassword, phone) {
  const userData = {
    name: nameParam,
    surname: surnameParam,
    email: emailParam,
    password: paramPassword,
    tel: phone,
  };

  // Send the POST request
  return fetch("https://dogancanapi-246674fda9a9.herokuapp.com/api/users/", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(userData),
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      return response.json();
    })
    .then((data) => {
      // Handle the response data
      console.log(data);
      return true; // Indicate success
    })
    .catch((error) => {
      // Handle errors
      console.error("There was a problem with the fetch operation:", error);
      alert(error);
      return false; // Indicate failure
    });
}

async function checkEmail(email) {
  try {
    const response = await fetch(
      "https://dogancanapi-246674fda9a9.herokuapp.com/api/users/",
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    const data = await response.json();
    for (let user of data) {
      if (email === user.email) {
        alert("This email is already in use");
        return false;
      }
    }
    return true;
  } catch (error) {
    console.error("There was a problem with the fetch operation:", error);
    return false; // Assuming you want to return false in case of an error
  }
}

async function CheckPhone(phone) {
  try {
    const response = await fetch(
      "https://dogancanapi-246674fda9a9.herokuapp.com/api/users/",
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    const data = await response.json();
    for (let user of data) {
      if (phone === user.tel) {
        alert("This Phone is already in use");
        return false;
      }
    }
    return true;
  } catch (error) {
    console.error("There was a problem with the fetch operation:", error);
    return false; // Assuming you want to return false in case of an error
  }
}

function fetchAndPopulateOrders() {
  $.ajax({
    url: "https://dogancanapi-246674fda9a9.herokuapp.com/api/orders/",
    method: "GET",
    success: function (data) {
      let myList = [];

      for (let index = 0; index < data.length; index++) {
        if (data[index].user.id == localStorage.getItem("id")) {
          myList.push(data[index]);
        }
      }

      //var orders = data.orders; // Adjust this based on the actual structure of your API response
      var tbody = $("table.table tbody");
      tbody.empty(); // Clear any existing rows

      myList.forEach(function (order) {
        var row = $("<tr></tr>");
        row.append($("<td></td>").text(order.id));
        row.append($("<td></td>").text(order.package.name));
        row.append($("<td></td>").text(order.price));
        row.append($("<td></td>").text(order.startDate));
        row.append($("<td></td>").text(order.endDate));
        row.append($("<td></td>").text(order.isActive));

        tbody.append(row);
      });
    },
    error: function (error) {
      console.error("Error fetching orders:", error);
    },
  });
}
/*
$(document).ready(function () {
  fetchAndPopulateOrders();
});

let sepetList = [];
if (document.getElementById(".save-button") !== null) {
  document.getElementById("save-button").addEventListener("click", function () {
    var titleText = document.getElementById("section-title").textContent;
    sepetList.push(titleText);
    localStorage.setItem("sectionTitle", JSON.stringify(sepetList));
    console.log(localStorage.getItem("sectionTitle"));
  });
}

let sepetList = [];
if (document.getElementById("save-button") !== null) {
  document.querySelectorAll(".save-button").forEach((button) => {
    button.addEventListener("click", function () {
      var titleId = this.getAttribute("data-title-id");
      var titleText = document.getElementById(titleId).textContent;
      var sepetList = JSON.parse(localStorage.getItem("sectionTitle")) || []; // Retrieve sepetList from localStorage or initialize as an empty array if it doesn't exist
      sepetList.push(titleText);
      localStorage.setItem("sectionTitle", JSON.stringify(sepetList));
      console.log(localStorage.getItem("sectionTitle"));
    });
  });
}
*/
let sepetList = [];
function getH2Text(button) {
  // Traverse up the DOM from the button to the parent div with class "section"
  if (document.getElementById("save-button") !== null) {
    var sectionDiv = button.closest(".section");
    // Find the h2 element within the parent div
    var h2 = sectionDiv.querySelector("h2");
    // Get the text content of the h2 element
    var h2Text = h2.textContent.trim();
    // Display the text content
    var sepetList = JSON.parse(localStorage.getItem("sectionTitle")) || []; // Retrieve sepetList from localStorage or initialize as an empty array if it doesn't exist
    sepetList.push(h2Text);
    localStorage.setItem("sectionTitle", JSON.stringify(sepetList));
    alert("Adding " + h2Text + " package to cart");
  }
}

function fetchAndPopulatePackages() {
  $.ajax({
    url: "https://dogancanapi-246674fda9a9.herokuapp.com/api/packages/",
    method: "GET",
    success: function (data) {
      let myList = [];
      let locallist = JSON.parse(localStorage.getItem("sectionTitle"));
      console.log(locallist[0]);
      for (let index = 0; index < locallist.length; index++) {
        var packagename = locallist[index];
        for (let index = 0; index < data.length; index++) {
          if (data[index].name == packagename) {
            myList.push(data[index]);
          }
        }
      }

      //var orders = data.orders; // Adjust this based on the actual structure of your API response
      var tbody = $("table.table tbody");
      tbody.empty(); // Clear any existing rows

      myList.forEach(function (package) {
        var row = $("<tr></tr>");
        row.append($("<td></td>").text(package.id));
        row.append($("<td></td>").text(package.name));
        row.append($("<td></td>").text(getCurrentDate()));
        row.append($("<td></td>").text(getDateOneMonthLater()));
        row.append($("<td></td>").text(package.price));

        tbody.append(row);
      });
    },
    error: function (error) {
      console.error("Error fetching orders:", error);
    },
  });
}
function makePkageList() {
  return fetch("https://dogancanapi-246674fda9a9.herokuapp.com/api/packages/", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((response) => response.json())
    .then((data) => {
      let myList = [];
      let locallist = JSON.parse(localStorage.getItem("sectionTitle"));
      for (let index = 0; index < locallist.length; index++) {
        var packagename = locallist[index];
        for (let index = 0; index < data.length; index++) {
          if (data[index].name == packagename) {
            myList.push(data[index]);
          }
        }
      }
      return myList; // Return myList from the promise chain
    })
    .catch((error) => {
      console.error("Error:", error);
      throw error; // Rethrow the error to be caught elsewhere if needed
    });
}
function makeOrder(
  namep,
  categoryp,
  pricep,
  startDatep,
  endDatep,
  isinSalep,
  isActivep,
  saleValuep,
  useridp,
  packageidp
) {
  const userData = {
    name: namep,
    category: categoryp,
    price: pricep,
    startDate: startDatep,
    endDate: endDatep,
    isinSale: isinSalep,
    isActive: isActivep,
    saleValue: saleValuep,
    user: { id: useridp }, // Corrected assignment
    package: { id: packageidp }, // Corrected assignment
  };

  return userData;
}

function getCurrentDate() {
  const date = new Date();
  return date.toISOString().split("T")[0]; // Returns date in YYYY-MM-DD format
}

function getDateOneMonthLater() {
  const date = new Date();
  date.setMonth(date.getMonth() + 1);
  return date.toISOString(); // Returns date in ISO format
}

function fetchNewOrder(UserData) {
  const userId = localStorage.getItem("id");
  if (!userId) {
    console.error("User ID not found in localStorage");
    alert("User ID not found. Please log in.");
    return Promise.reject("User ID not found");
  }

  const userData = {
    name: UserData.name,
    category: UserData.category,
    price: UserData.price,
    startDate: getCurrentDate(), // Ensure this matches the expected format
    endDate: getDateOneMonthLater(), // Ensure this matches the expected format
    isinSale: true,
    isActive: true,
    saleValue: 10,
    user: { id: Number(userId) }, // Ensure this is a number
    package: { id: Number(UserData.id) }, // Ensure this is a number
  };

  console.log("Sending userData:", JSON.stringify(userData)); // Debugging: log the userData

  return fetch("https://dogancanapi-246674fda9a9.herokuapp.com/api/orders/", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(userData),
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error("Network response was not ok: " + response.statusText);
      }
      return response.json();
    })
    .then((data) => {
      console.log("Order created:", data); // Debugging: log the response data
      return true; // Indicate success
    })
    .catch((error) => {
      console.error("There was a problem with the fetch operation:", error); // Debugging: log the error
      alert("Failed to create order: " + error.message);
      return false; // Indicate failure
    });
}

function NewOrder() {
  let packageList = [];
  makePkageList()
    .then((myList) => {
      packageList = myList;
      console.log(packageList);
      var userData;
      for (let index = 0; index < packageList.length; index++) {
        userData = packageList[index];
        console.log(userData.name);
      }
      console.log(userData);

      fetchNewOrder(userData).then((success) => {
        if (success) {
          console.log("Order created successfully");
        } else {
          console.log("Failed to create order");
        }
      });
    })
    .catch((error) => {
      // Handle errors here
      console.error(error);
    });
  alert("Your order has been received successfully.");

  //console.log(packageList);

  //let myList = JSON.parse(localStorage.getItem("sectionTitle"));

  // Send the POST request
}

function getCurrentDate() {
  const now = new Date();
  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, "0"); // Months are zero-based
  const day = String(now.getDate()).padStart(2, "0");

  return `${year}-${month}-${day}`;
}

function getDateOneMonthLater() {
  const now = new Date();
  const nextMonth = new Date(
    now.getFullYear(),
    now.getMonth() + 1,
    now.getDate()
  );

  const year = nextMonth.getFullYear();
  const month = String(nextMonth.getMonth() + 1).padStart(2, "0"); // Months are zero-based
  const day = String(nextMonth.getDate()).padStart(2, "0");

  return `${year}-${month}-${day}`;
}

//----------------------------- SHOP PAGE-------------------------
let selectedProducts = [];
const maxProducts = 4;

function selectProduct(productName) {
  if (selectedProducts.length < maxProducts) {
    selectedProducts.push(productName);
    updateSquares();
  } else {
    alert("You can only select 4 products.");
  }
}

function updateSquares() {
  for (let i = 1; i <= maxProducts; i++) {
    const square = document.getElementById(`square${i}`);
    square.textContent = selectedProducts[i - 1] || "";
  }
}

function getRandomFourDigitNumber() {
  return Math.floor(1000 + Math.random() * 9000);
}

function confirmPackage() {
  if (selectedProducts.length === maxProducts) {
    var packagenamee =
      "CustomPack " +
      localStorage.getItem("name") +
      "" +
      getRandomFourDigitNumber();

    createPackage(packagenamee, 100, "Custom");

    var sepetList = JSON.parse(localStorage.getItem("sectionTitle")) || [];
    sepetList.push(packagenamee);
    localStorage.setItem("sectionTitle", JSON.stringify(sepetList));

    alert(`Package confirmed with products: ${selectedProducts.join(", ")}`);
    // You can add more actions here, such as sending the data to a server
  } else {
    alert("Please select 4 products to confirm the package.");
  }
}

async function createPackage(packageNAME, price, category) {
  const url = "https://dogancanapi-246674fda9a9.herokuapp.com/api/packages";
  const data = {
    name: packageNAME,
    category: category,
    price: price,
  };

  try {
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const responseData = await response.json();
    console.log("Package created successfully:", responseData);
  } catch (error) {
    console.error("Error creating package:", error);
  }
}

//console.log(getCurrentDate()); // Output: "2024-05-19" (for example)

console.log(sepetList);
console.log(localStorage.getItem("sectionTitle"));
console.log(localStorage.getItem("is_user_login"));
console.log(localStorage.getItem("id"));
