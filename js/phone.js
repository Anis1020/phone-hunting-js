console.log("js is connected");

const loadAllPhone = async (inputFieldText = "13", isShowAll) => {
  const res = await fetch(
    `https://openapi.programming-hero.com/api/phones?search=${inputFieldText}`
  );
  const data = await res.json();
  displayAllPhone(data.data, isShowAll);
};

const displayAllPhone = (phones, isShowAll) => {
  let phoneContainer = document.getElementById("phone_container");
  phoneContainer.innerHTML = "";
  let showAllPhone = document.getElementById("show_button");

  if (phones.length > 8 && !isShowAll) {
    showAllPhone.classList.remove("hidden");
  } else {
    showAllPhone.classList.add("hidden");
  }
  // console.log(isShowAll);
  if (!isShowAll) {
    phones = phones.slice(0, 8);
  }

  phones.forEach((phone) => {
    console.log(phone);
    let phoneDiv = document.createElement("div");
    phoneDiv.classList = `card bg-base-100 shadow-xl`;
    phoneDiv.innerHTML = `
    
          <figure class="px-10 pt-10">
            <img
              src="${phone.image}"
              alt="Shoes"
              class="rounded-xl"
            />
          </figure>
          <div class="card-body items-center text-center">
            <h2 class="card-title">Phone ${phone.brand}</h2>
            <p>Phone Name: ${phone.phone_name}</p>
            <div class="card-actions">
              <button onclick="handleShowDetails('${phone.slug}');show_modal.showModal()" class="btn btn-primary">Show Details</button>
            </div>
          </div>
        
    `;
    phoneContainer.appendChild(phoneDiv);
  });
  spinner(false);
};

// handel show details
const handleShowDetails = async (id) => {
  // console.log("show details is clicked", id);
  const res = await fetch(
    `https://openapi.programming-hero.com/api/phone/${id}`
  );
  const data = await res.json();

  const phone = data.data;
  showDetailsModal(phone);
};

// show detail in modal
const showDetailsModal = (phone) => {
  console.log(phone);
  const phoneDetailContainer = document.getElementById("single_phone_details");
  phoneDetailContainer.innerHTML = `
  <img src="${phone.image}" alt="Shoes" class="rounded-xl m-auto"/>
  <h1>Brand: ${phone.brand} </h1>
  <h2>Name: ${phone.name} </h2>
  <h2>Display Size: ${phone.mainFeatures?.displaySize} </h2>
  <h2>Publish Date: ${phone.releaseDate} </h2>
  `;
  // open modal
  show_modal.showModal();
};

// search result button
const searchPhoneBtn = (isShowAll) => {
  spinner(true);
  let inputField = document.getElementById("search-field");
  console.log(inputField.value);
  loadAllPhone(inputField.value, isShowAll);
};

// spinner
const spinner = (isLoading) => {
  const loader = document.getElementById("loading");
  if (isLoading) {
    loader.classList.remove("hidden");
  } else {
    loader.classList.add("hidden");
  }
};

// show all button
const handleShowAll = () => {
  searchPhoneBtn(true);
  console.log("show all button click");
};

loadAllPhone();
