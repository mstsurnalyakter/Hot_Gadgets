const showAllPhoneButton = document.getElementById("show-all-container");
const spinnerContainer = document.getElementById("spinner-container");

const loadPhone = async (searchText) => {
  const res = await fetch(
    `https://openapi.programming-hero.com/api/phones?search=${searchText}`
  );

  const data = await res.json();
  const phones = data.data;

  displayPhones(phones);
};

const displayPhones = (phones) => {
  const phoneContainer = document.getElementById("phone-container");

  phoneContainer.classList.add("bg-gray-100");

  // clear phone container card before adding new cars
  phoneContainer.textContent = "";

  // display show all button if there more than 12 phonse
  if (phones.length > 12) {
    showAllPhoneButton.classList.remove("hidden");
  } else {
    showAllPhoneButton.classList.add("hidden");
  }

  // display only first 12 phone
  phones = phones.slice(0, 12);

  phones.forEach((phone) => {
    // console.log(phone);

    // 2 create a div
    const phoneCard = document.createElement("div");
    phoneCard.classList = `card bg-base-100 shadow-xl p-2`;

    // 3: set innerHTML
    phoneCard.innerHTML = `
        <figure class="bg-slate-100">
            <img
                src="${phone.image}"
                alt="${phone.image}" class="p-3"
            />
            </figure>
            <div class="card-body">
            <h2 class="card-title">${phone.phone_name}</h2>
            <p>If a dog chews shoes whose shoes does he choose?</p>
            <div class="card-actions justify-end">
                <button class="btn btn-primary">Buy Now</button>
            </div>
            </div>
        `;

    // 4: appendChild
    phoneContainer.appendChild(phoneCard);
  });

  //hide loading spinner
  toggleLoadingSpinner(false)
};

const handleSearch = () => {
    toggleLoadingSpinner(true);
  const searchField = document.getElementById("search-field");
  const searchText = searchField.value;

  loadPhone(searchText);
  searchField.value = "";
  console.log(searchText);
};

// const handleSearch2 = () => {
//     toggleLoadingSpinner();
//   const searchField = document.getElementById("search-field2");
//   const searchText = searchField.value;
//   loadPhone(searchText);


//   searchField.value = "";
// };


const toggleLoadingSpinner = (isLoading) =>{
    if (isLoading) {

        spinnerContainer.classList.remove("hidden");
    }else{
        spinnerContainer.classList.add("hidden");

    }
}


// loadPhone();
