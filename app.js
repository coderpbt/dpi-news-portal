// get catagory data
const loadCatagotyData = async () => {
  const url = `https://openapi.programming-hero.com/api/news/categories`;
  try {
    const res = await fetch(url);
    const data = await res.json();
    displayCatagoryData(data.data.news_category)
  } catch (error) {
    console.log(error)
  }
  
}

// Display catagory data
const displayCatagoryData = (catagory) => {
  const prantUi = document.getElementById('prantUi')
  
   catagory.forEach(catagoryItem => {
    const {category_id, category_name} = catagoryItem
    const li = document.createElement('li');
    li.classList.add('nav-item');
    li.classList.add('px-4');
    li.innerHTML = `
     <a onclick="loadCatagotyDataID('${category_id}')" class="nav-link" href="#">${category_name}</a>
    `;
    prantUi.appendChild(li);
    getLoading(true);
   });
   
}

// load catagory data
const loadCatagotyDataID = async(id) => {
  const url = `https://openapi.programming-hero.com/api/news/category/${id}`;
  try {
    const res = await fetch(url);
    const data = await res.json();
    displayProductGallery(data.data);
  } catch (error) {
    console.log(error)
  }
}
loadCatagotyDataID('08');

// Display catagory data full data
const displayProductGallery = categoryID => {
  const cardContainer = document.getElementById('cardContainer');
  cardContainer.innerHTML = '';
    
  const productFoundItem = document.getElementById('productFoundItem');
  productFoundItem.innerText = categoryID.length;

  //data shorting
  categoryID.sort((a, b) => {
    let fa = a.total_view,
        fb = b.total_view;

    if (fa > fb) {
        return -1;
    }
    if (fa < fb) {
        return 1;
    }
    return 0;
});
 
categoryID.forEach(cardItem => {
    const div = document.createElement('div');
    div.innerHTML = `
    <div class="card mb-3" style="max-width: 100%;">
    <div class="row g-0">
      <div class="col-md-3 news-img">
        <img src="${cardItem.thumbnail_url}" class="img-fluid rounded-start" alt="...">
      </div>
      <div class="col-md-9">
        <div class="card-body">
          <h5 class="card-title">${cardItem.title ? cardItem.title : 'Not Found <i class="fa-regular fa-face-sad-tear"></i>'}</h5>
          <p class="card-text pb-4 pt-2"> ${cardItem.details.slice(0, 450)} ...</p>
          <div class="author-detalis d-flex justify-content-between align-items-center">
            <div class="d-flex">
            <div class="round-img">
            <img src="${cardItem.author.img}" class="img-fluid rounded-start" alt="Author">
           </div>
          
           <div class="authorName">
            <h5 class="card-text"><small class="text-muted">${cardItem.author.name ? cardItem.author.name : 'Not Found <i class="fa-regular fa-face-sad-tear"></i>'}</small></h5>
            <p class="card-text"><small class="text-muted">${cardItem.author.published_date ? cardItem.author.published_date : 'Not Found <i class="fa-regular fa-face-sad-tear"></i>'}</small></p>
           </div>
            </div>
            <div class="views">
             <i class="fa-regular fa-eye"></i>
             <span>${cardItem.total_view ? cardItem.total_view : 'Not Found <i class="fa-regular fa-face-sad-tear"></i>'}</span>
            </div>
            <div class="ratting">
             <i class="fa-solid fa-star-half-stroke"></i>
             <i class="fa-regular fa-star"></i>
             <i class="fa-regular fa-star"></i>
             <i class="fa-regular fa-star"></i>
             <i class="fa-regular fa-star"></i>
             <span>${cardItem.rating.number}</span>
            </div>
            <div class="details-btn">
             <button onclick="loadCatagotyDetails('${cardItem._id}')" type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal">
             <i class="fa-solid fa-arrow-right"></i>
            </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
    `;
    cardContainer.appendChild(div);
    getLoading(false);  
  })
 
}

//click to loading spnieer
const getLoading = isLoading => {
  const loder =document.getElementById('loder');
  if(isLoading){
    loder.classList.remove('d-none');
  }else{
    loder.classList.add('d-none');
  }
}

//Details news id get
const loadCatagotyDetails = async (news_id) => {
 const url = `https://openapi.programming-hero.com/api/news/${news_id}`;
 const res = await fetch(url);
 const data = await res.json();
 displaySingleCatgoryData(data.data[0])

}


//modal data show

const displaySingleCatgoryData = (productItem) =>{
  console.log(productItem)
  const titleContent = document.getElementById('exampleModalLabel');
  titleContent.innerHTML = productItem.title;
  const bodyID = document.getElementById('bodyID');
  bodyID.innerHTML = `
    <img src="${productItem.thumbnail_url}" class="img-fluid w-100 rounded-start" alt="...">
    <p class="m-3">${productItem.details}</p>
    <img src="${productItem.author.img}" class="img-fluid authorMdl rounded-start" alt="Author">
    <h5 class="card-text"><small class="text-muted">Author Name : ${productItem.author.name ? productItem.author.name : 'Not Found <i class="fa-regular fa-face-sad-tear"></i>'}</small></h5>
    <h5 class="card-text"><small class="text-muted">Publish : ${productItem.author.published_date ? productItem.author.published_date : 'Not Found <i class="fa-regular fa-face-sad-tear"></i>'}</small></h5>
    <h5 class="card-text"><small class="text-muted">Rating : ${productItem.rating.badge ? productItem.rating.badge : 'Not Found <i class="fa-regular fa-face-sad-tear"></i>'}</small></h5>
  `
}


 loadCatagotyData()

