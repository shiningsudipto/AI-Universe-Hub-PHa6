const fetchData = () => {
  fetch('https://openapi.programming-hero.com/api/ai/tools')
    .then((res) => res.json())
    .then((data) => {
      showData(data.data.tools.slice(0, 6));
      seeMoreButton(data.data.tools);
    })
  toggleSpinner(true);
};
// Card
const showData = (data) => {
  const dataArea = document.getElementById('data-area');
  dataArea.innerHTML = '';

  data.forEach((singleData) => {
    // console.log(singleData);
    dataArea.innerHTML += `
        <div class="col single-card">
          <div class="card h-100">
            <img src="${singleData.image}" class="card-img-top" alt="...">
            <div class="card-body">
              <div>
                <h5 class="card-title">Features</h5>
                <ol> ${singleData.features.map(feature => `<li>${feature}</li>`).join('')}
                </ol>
              </div>
              <hr>
              <div class="d-flex justify-content-between align-items-center">
                <div>
                  <h5 class="card-title">${singleData.name}</h5>
                  <div>
                    <p><i class="bi bi-calendar4-week"></i> <span class="date-time">${singleData.published_in}</span></p>
                  </div>
                </div>
                <div>
                  <button onclick="loadDataDetails(${singleData.id})" type="button" class="details-btn" data-bs-toggle="modal" data-bs-target="#exampleModal">
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
// Getting id and calling modal to display details
const loadDataDetails = dataId => {
  // console.log(dataId);
  if (dataId >= 10) {
    const url = `https://openapi.programming-hero.com/api/ai/tool/${dataId}`;
    fetch(url)
      .then(res => res.json())
      .then(data => displayDetails(data.data))
  } else {
    const url = `https://openapi.programming-hero.com/api/ai/tool/0${dataId}`;
    fetch(url)
      .then(res => res.json())
      .then(data => displayDetails(data.data))
  }
}
// Modal
const displayDetails = details => {
  console.log(details);
  const modalBody = document.getElementById('modal-body');
  modalBody.innerHTML = `
 <div class="row px-5 pb-5">
 <div class="col-md-6 bg-danger-subtle border border-danger-subtle rounded-2">
     <h5>${details.description}</h5>
     <div class="d-flex justify-content-around">
     ${details.pricing.map(price => `<p class="bg-white m-1 p-2 rounded">${price.price === '0' && 'free' ? 'Free of Cost' : price.price}/${price.plan}</p>`).join('')}
     </div>
     <div class="d-flex justify-content-between">
         <div>
             <h5>Features</h5>
             <ul id="features-data">
             ${Object.entries(details.features)
      .map(([key, value]) => `<li>${value.feature_name}</li>`)
      .join('')}
             </ul>
         </div>
         <div>
             <h5>Integrations</h5>
             <ul>
               ${details.integrations.map(feature => `<li>${feature}</li>`).join('')}
             </ul>
         </div>
     </div>
 </div>
 <div class="col-md-6">
     <div class="card p-3">
         <img id="modal-img" class="img-fluid rounded rounded-2" src="${details.image_link[0]}" alt="">
         <div>
             <h5>${details.input_output_examples[0].input}</h5>
             <p>${details.input_output_examples[0].output}</p>
         </div>
     </div>
 </div>
</div>
 `
};

// working with Date

function sortCards() {
  const cards = Array.from(document.querySelectorAll('.single-card'));
  const parent = document.querySelector('.cards-container');
  const dateFormatOptions = { year: 'numeric', month: 'long', day: 'numeric' };
  cards.sort((cardA, cardB) => {
    const dateAElement = cardA.querySelector('.date-time');
    const dateBElement = cardB.querySelector('.date-time');
    if (!dateAElement || !dateBElement) {
      return 0;
    }
    const dateA = new Date(dateAElement.textContent);
    const dateB = new Date(dateBElement.textContent);
    return dateA.getTime() - dateB.getTime();
  });
  cards.forEach((card) => {
    parent.appendChild(card);
  });
  cards.forEach((card) => {
    const dateElement = card.querySelector('.date-time');
    const date = new Date(dateElement.textContent);
    dateElement.textContent = date.toLocaleDateString('en-US', dateFormatOptions);
  });
}

const sortButton = document.querySelector('#sort-data');
sortButton.addEventListener('click', sortCards);



// See More
const seeMoreButton = (data) => {
  const seeMoreBtn = document.getElementById('see-more');
  seeMoreBtn.addEventListener('click', () => {
    showData(data);
    seeMoreBtn.style.display = 'none';
  });
};
// Loader
const toggleSpinner = (isLoading) => {
  const loaderSection = document.getElementById('loader');
  if (isLoading) {
    loaderSection.classList.remove('d-none');
  } else {
    loaderSection.classList.add('d-none');
  }
};

fetchData();





{/* <p>${details.pricing[0].price === '0' || 'free' ? 'Free of cost' : details.pricing[0].price}<br>${details.pricing[0].plan}</p>
<p>${details.pricing[1].price === '0' || 'free' ? 'Free of cost' : details.pricing[1].price}<br>${details.pricing[1].plan}</p>
<p>${details.pricing[2].price === '0' || 'free' ? 'Free of cost' : details.pricing[2].price}<br>${details.pricing[2].plan}</p> */}