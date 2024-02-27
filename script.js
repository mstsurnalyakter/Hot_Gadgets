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


    // clear phone container card before adding new cars
        phoneContainer.textContent = "";

  phones.forEach((phone) => {
    console.log(phone);

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
        phoneContainer.appendChild(phoneCard)
  });
};


const handleSearch = () =>{
    const searchField = document.getElementById("search-field");
    const searchText = searchField.value;

    loadPhone(searchText);
    console.log(searchText);
}

// loadPhone();
