const fetchData = () => {
    fetch('https://openapi.programming-hero.com/api/ai/tools')
        .then((res) => res.json())
        .then((data) => {
            showData(data.data.tools.slice(0, 6));
            seeMoreButton(data.data.tools);
        })
    toggleSpinner(true);
};

const showData = (data) => {
    const dataArea = document.getElementById('data-area');
    dataArea.innerHTML = '';

    data.forEach((singleData) => {
        dataArea.innerHTML += `
        <div class="col">
          <div class="card h-100">
            <img src="${singleData.image}" class="card-img-top" alt="...">
            <div class="card-body">
              <div>
                <h5 class="card-title">Features</h5>
                <ol>
                  <li>${singleData.features[0]}</li>
                  <li>${singleData.features[1]}</li>
                  <li>${singleData.features[2]}</li>
                </ol>
              </div>
              <hr>
              <div class="d-flex justify-content-between align-items-center">
                <div>
                  <h5 class="card-title">${singleData.name}</h5>
                  <div>
                    <p><i class="bi bi-calendar4-week"></i> <span id="date-time">${singleData.published_in}</span></p>
                  </div>
                </div>
                <div>
                  <button type="button" class="details-btn" data-bs-toggle="modal" data-bs-target="#exampleModal">
                    <i class="bi bi-arrow-right text-danger"></i>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      `;
    });
    toggleSpinner(false);
};

const seeMoreButton = (data) => {
    const seeMoreBtn = document.getElementById('see-more');

    seeMoreBtn.addEventListener('click', () => {
        showData(data);
        seeMoreBtn.style.display = 'none';
    });
};

const toggleSpinner = (isLoading) => {
    const loaderSection = document.getElementById('loader');
    if (isLoading) {
        loaderSection.classList.remove('d-none');
    } else {
        loaderSection.classList.add('d-none');
    }
};

fetchData();
