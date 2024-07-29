async function getData(url) {
    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error(`Response status: ${response.status}`);
        }
        const data = await response.json();
        return data;
    } catch (error) {
        console.error(error.message);
        return null;
    }
}

async function processData() {
    const url = "travel_recommendation_api.json"; // Update with your actual URL
    const data = await getData(url);
    if (data) {
        console.log(data);
    }
    return data;
}

document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('searchForm');

    form.addEventListener('submit', async (event) => {
        event.preventDefault();

        let searchText = document.getElementById('searchInput').value.toLowerCase();
        const travelData = await processData();

        console.log('Search Input:', searchText);
        if (travelData) {
            let found = false;
            if (searchText === "beaches" || searchText === "temples" || searchText === "countries") {
                found = true;
                modalPopupCategory(travelData[searchText], searchText);
            } else {
                // Search specific item in each category
                for (const key in travelData) {
                    if (travelData.hasOwnProperty(key)) {
                        const categoryData = travelData[key];
                        if (Array.isArray(categoryData)) {
                            const result = categoryData.find(item => item.name.toLowerCase() === searchText);
                            if (result) {
                                found = true;
                                if (key === "countries") {
                                    modalPopupCountries(result);
                                } else {
                                    modalPopup(result);
                                }
                                break;
                            }
                        }
                    }
                }
            }
            if (!found) {
                modalPopup({ name: 'No results found', description: '', imageUrl: '' });
            }
        } else {
            console.log('Failed to fetch data');
        }
    });
});

function modalPopupCategory(data, category) {
    const modal = document.getElementById("myModal");
    const span = document.getElementsByClassName("close")[0];

    const modalBody = document.getElementById("modalBody");
    modalBody.innerHTML = "";

    if (Array.isArray(data)) {
        data.forEach(item => {
            const nameElement = document.createElement('h2');
            nameElement.textContent = item.name;
            modalBody.appendChild(nameElement);

            const imgElement = document.createElement('img');
            imgElement.src = item.imageUrl;
            imgElement.alt = item.name;
            imgElement.style.width = '200px'; // Adjust width as needed
            imgElement.style.marginRight = '10px'; // Space between images
            modalBody.appendChild(imgElement);

            const descriptionElement = document.createElement('p');
            descriptionElement.textContent = item.description;
            modalBody.appendChild(descriptionElement);
        });
    } else {
        const nameElement = document.createElement('h2');
        nameElement.textContent = data.name;
        modalBody.appendChild(nameElement);

        const imgElement = document.createElement('img');
        imgElement.src = data.imageUrl;
        imgElement.alt = data.name;
        imgElement.style.width = '200px'; // Adjust width as needed
        imgElement.style.marginRight = '10px'; // Space between images
        modalBody.appendChild(imgElement);

        const descriptionElement = document.createElement('p');
        descriptionElement.textContent = data.description;
        modalBody.appendChild(descriptionElement);
    }

    modal.style.display = "block";

    span.onclick = function () {
        modal.style.display = "none";
    }

    window.onclick = function (event) {
        if (event.target == modal) {
            modal.style.display = "none";
        }
    }
}

function modalPopupCountries(country) {
    const modal = document.getElementById("myModal");
    const span = document.getElementsByClassName("close")[0];

    const modalBody = document.getElementById("modalBody");
    modalBody.innerHTML = "";

    const countryNameElement = document.createElement('h2');
    countryNameElement.textContent = country.name;
    modalBody.appendChild(countryNameElement);

    country.cities.forEach(city => {
        const cityNameElement = document.createElement('h3');
        cityNameElement.textContent = city.name;
        modalBody.appendChild(cityNameElement);

        const imgElement = document.createElement('img');
        imgElement.src = city.imageUrl;
        imgElement.alt = city.name;
        imgElement.style.width = '200px'; // Adjust width as needed
        imgElement.style.marginRight = '10px'; // Space between images
        modalBody.appendChild(imgElement);

        const descriptionElement = document.createElement('p');
        descriptionElement.textContent = city.description;
        modalBody.appendChild(descriptionElement);
    });

    modal.style.display = "block";

    span.onclick = function () {
        modal.style.display = "none";
    }

    window.onclick = function (event) {
        if (event.target == modal) {
            modal.style.display = "none";
        }
    }
}

function modalPopup(data) {
    const modal = document.getElementById("myModal");
    const span = document.getElementsByClassName("close")[0];

    const modalBody = document.getElementById("modalBody");
    modalBody.innerHTML = "";

    const nameElement = document.createElement('h2');
    nameElement.textContent = data.name;
    modalBody.appendChild(nameElement);

    const imgElement = document.createElement('img');
    imgElement.src = data.imageUrl;
    imgElement.alt = data.name;
    imgElement.style.width = '200px'; // Adjust width as needed
    imgElement.style.marginRight = '10px'; // Space between images
    modalBody.appendChild(imgElement);

    const descriptionElement = document.createElement('p');
    descriptionElement.textContent = data.description;
    modalBody.appendChild(descriptionElement);

    modal.style.display = "block";

    span.onclick = function () {
        modal.style.display = "none";
    }

    window.onclick = function (event) {
        if (event.target == modal) {
            modal.style.display = "none";
        }
    }
}
