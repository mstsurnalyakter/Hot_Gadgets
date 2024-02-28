const errorContainer = document.getElementById("error-container");
const loadPhones = async (searchText = "iphone", isShowAll) => {
  const res = await fetch(
    `https://openapi.programming-hero.com/api/phones?search=${searchText}`
  );
  const data = await res.json();
  const phones = data.data;
  if (phones.length === 0) {
    errorContainer.classList.remove("hidden");
  } else {
    errorContainer.classList.add("hidden");
  }

  displayPhone(phones, isShowAll);
};

const displayPhone = (phones, isShowAll) => {
  const cardContainer = document.getElementById("card-container");
  const showAllBtnContainer = document.getElementById("show-all-btn-container");

  cardContainer.textContent = "";

  if (phones.length > 12 && !isShowAll) {
    showAllBtnContainer.classList.remove("hidden");
  } else {
    showAllBtnContainer.classList.add("hidden");
  }

  if (!isShowAll) {
    phones = phones.slice(0, 12);
  }

  phones.forEach((phone) => {
    const card = document.createElement("div");
    card.classList = `card bg-base-100 shadow-xl p-6`;

    card.innerHTML = `
        <figure class="bg-slate-100 py-5"><img src="${phone.image}" alt="Shoes" /></figure>
        <div class="card-body text-center">
          <h2 class="text-[#403F3F] text-2xl font-bold">${phone.phone_name}</h2>
          <p>If a dog chews shoes whose shoes does he choose?</p>
          <div class="card-actions justify-center">
            <button onclick="handleShowDetails('${phone.slug}')" class="btn bg-[#0D6EFD] hover:bg-[#0D6EFD] text-white">Show Details</button>
          </div>
        </div>

        `;
    cardContainer.appendChild(card);
  });
  toggleLoadingSpinner(false);
};

const handleShowDetails = async (id) => {
  const res = await fetch(
    `https://openapi.programming-hero.com/api/phone/${id}`
  );
  const data = await res.json();
  const phone = data.data;
  showPhoneDetails(phone);
};

const showPhoneDetails = (phone) => {
  const showDetailsContainer = document.getElementById(
    "show-details-container"
  );

  showDetailsContainer.innerHTML = `
        <figure class="bg-slate-100">
            <img
                src="${phone.image}"
                alt="${phone.image}"
            />
            </figure>
            <div class="card-body">
            <h2 class="card-title">${phone?.name}</h2>
            <p class="text-sm"> <span class="font-bold">Storage:</span> ${
              phone?.mainFeatures?.storage
            }</p>
            <p class="text-sm"> <span class="font-bold">Display Size:</span> ${
              phone?.mainFeatures?.displaySize
            }</p>
            <p class="text-sm"> <span class="font-bold">Chipset:</span> ${
              phone?.mainFeatures?.chipSet
            }</p>
              <p class="text-sm"> <span class="font-bold">Memory:</span> ${
                phone?.mainFeatures?.memory
              }</p>
              <p class="text-sm"> <span class="font-bold">Slug:</span> ${
                phone?.slug
              }</p>
              <p class="text-sm"> <span class="font-bold">Release data :</span> ${
                phone?.releaseDate
              }</p>
              <p class="text-sm"> <span class="font-bold">Brand:</span> ${
                phone?.brand
              }</p>
                <p class="text-sm"> <span class="font-bold">GPS:</span> ${
                  phone?.others?.GPS || "No GPS Available"
                }</p>


            </div>

    `;

  show_details_modal.showModal();
};

const handleSearch = (isShowAll) => {
  toggleLoadingSpinner(true);
  const searchField = document.getElementById("search-field");
  const searchText = searchField.value || "iphone";
  loadPhones(searchText, isShowAll);
};

const toggleLoadingSpinner = (isLoading) => {
  const loaderContainer = document.getElementById("loader-container");
  if (isLoading) {
    loaderContainer.classList.remove("hidden");
  } else {
    loaderContainer.classList.add("hidden");
  }
};

const handleShowAll = () => {
  handleSearch(true);
};

loadPhones();
