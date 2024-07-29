/*

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
    const url = "travel_recommendation_api.json";
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

        let searchText = document.getElementById('searchInput').value;
        searchText = searchText.toLowerCase();

        const travelData = await processData();

        console.log('Search Input:', searchText);
        if (travelData) {
            let found = false;
            for (const key in travelData) {
                if (travelData.hasOwnProperty(key)) {
                    if (key.toLowerCase() === searchText) {
                        found = true;
                        modalPopup(travelData[key]);
                        break;
                    }
                }
            }
            if (!found) {
                modalPopup(['No results found']);
            }
        } else {
            console.log('Failed to fetch data');
        }
    });
});

function modalPopup(data) {
    // Get the modal
    const modal = document.getElementById("myModal");

    // Get the <span> element that closes the modal
    const span = document.getElementsByClassName("close")[0];

    // Display the data in the modal
    const modalBody = document.getElementById("modalBody");
    modalBody.innerHTML = ""; // Clear any previous content

    if (Array.isArray(data)) {
        data.forEach(item => {
            const p = document.createElement('p');
            if (typeof item === 'object') {
                p.textContent = JSON.stringify(item, null, 2);
            } else {
                p.textContent = item;
            }
            modalBody.appendChild(p);
        });
    } else {
        const p = document.createElement('p');
        if (typeof data === 'object') {
            p.textContent = JSON.stringify(data, null, 2);
        } else {
            p.textContent = data;
        }
        modalBody.appendChild(p);
    }

    // Show the modal
    modal.style.display = "block";

    // When the user clicks on <span> (x), close the modal
    span.onclick = function () {
        modal.style.display = "none";
    }

    // When the user clicks anywhere outside of the modal, close it
    window.onclick = function (event) {
        if (event.target == modal) {
            modal.style.display = "none";
        }
    }
}
 */

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
    const url = "travel_recommendation_api.json";
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

        let searchText = document.getElementById('searchInput').value;
        searchText = searchText.toLowerCase();

        const travelData = await processData();

        console.log('Search Input:', searchText);
        if (travelData) {
            let found = false;
            for (const key in travelData) {
                if (travelData.hasOwnProperty(key)) {
                    if (key.toLowerCase() === searchText) {
                        found = true;
                        if (searchText === "countries") {
                            modalPopupCountries(travelData[key]);
                        } else {
                            modalPopup(travelData[key]);
                        }
                        break;
                    }
                }
            }
            if (!found) {
                modalPopup([{ name: 'No results found', description: '', imageUrl: '' }]);
            }
        } else {
            console.log('Failed to fetch data');
        }
    });
});

function modalPopupCountries(data) {
    const modal = document.getElementById("myModal");
    const span = document.getElementsByClassName("close")[0];

    const modalBody = document.getElementById("modalBody");
    modalBody.innerHTML = "";

    if (Array.isArray(data)) {
        data.forEach(country => {
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
                modalBody.appendChild(imgElement);

                const descriptionElement = document.createElement('p');
                descriptionElement.textContent = city.description;
                modalBody.appendChild(descriptionElement);
            });
        });
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

function modalPopup(data) {
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