const imagesWrapper = document.querySelector(".images");
const loadMoreBtn = document.querySelector(".loadmore");
const searchInput = document.querySelector(".search-box input");
const lightBox = document.querySelector(".lightbox");
const closeBtn = document.querySelector("svg.exit");
const downloadImgBtn = document.querySelector("svg.down");



const apiKey = "8HbFVXCGMlA2zL8CvnX5XJkS0KibOguz0TvXlH34WFKgZhwq0wApHXz9";
const perPage = 15;
let currentPage = 1;
let searchTerm = null;

const showLightbox = (name, img) =>{
  lightBox.querySelector("img").src =img;
  lightBox.querySelector("span").innerText ="Awesome image";
  downloadImgBtn.setAttribute("data-img" , img );
  lightBox.classList.add("show");
}

const  closeLightbox = () =>{
  lightBox.classList.remove("show");
  }

const generateHTML = (Images) =>{
  imagesWrapper.innerHTML += Images.map(img => 

    ` <li class="card" onclick="showLightbox('${img.photo}' , '${img.src.large2x}')">
                <img src="${img.src.large2x} ">
                <div class="details">
                    <div class="photo">
                    <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#000000"><path d="M480-260q75 0 127.5-52.5T660-440q0-75-52.5-127.5T480-620q-75 0-127.5 52.5T300-440q0 75 52.5 127.5T480-260Zm0-80q-42 0-71-29t-29-71q0-42 29-71t71-29q42 0 71 29t29 71q0 42-29 71t-71 29ZM160-120q-33 0-56.5-23.5T80-200v-480q0-33 23.5-56.5T160-760h126l74-80h240l74 80h126q33 0 56.5 23.5T880-680v480q0 33-23.5 56.5T800-120H160Zm0-80h640v-480H638l-73-80H395l-73 80H160v480Zm320-240Z"/></svg>
                    <span>Awesome image </span>
                </div>
                <svg xmlns="http://www.w3.org/2000/svg" class="down"   clheight="24px" viewBox="0 -960 960 960" width="24px" fill="#000000"><path d="M480-350.08q-6.46 0-11.92-2.11-5.46-2.12-10.7-7.35L352.62-464.31q-5.85-5.84-6.12-13.77-.27-7.92 6.12-14.54 6.61-6.61 14.26-6.73 7.66-.11 14.27 6.5L460-414v-326q0-8.54 5.73-14.27T480-760q8.54 0 14.27 5.73T500-740v326l78.85-78.85q5.84-5.84 13.88-6.11 8.04-.27 14.65 6.34 6.39 6.62 6.5 14.16.12 7.54-6.5 14.15L502.62-359.54q-5.24 5.23-10.7 7.35-5.46 2.11-11.92 2.11ZM264.62-200q-27.62 0-46.12-18.5Q200-237 200-264.62v-76.92q0-8.54 5.73-14.27t14.27-5.73q8.54 0 14.27 5.73t5.73 14.27v76.92q0 9.24 7.69 16.93 7.69 7.69 16.93 7.69h430.76q9.24 0 16.93-7.69 7.69-7.69 7.69-16.93v-76.92q0-8.54 5.73-14.27t14.27-5.73q8.54 0 14.27 5.73t5.73 14.27v76.92q0 27.62-18.5 46.12Q723-200 695.38-200H264.62Z"/></svg>
              </div>
            </li>`

  ).join("");
}

const getImages = (apiURL) => {
  loadMoreBtn.innerText = "Loading..."
  loadMoreBtn.classList.add("disabled");
  fetch(apiURL, {
    headers: {Authorization: apiKey}
  }).then(res =>  res.json()).then(data => {
    generateHTML(data.photos);
    loadMoreBtn.innerText = "Load More"
  loadMoreBtn.classList.remove("disabled");
  })
}

const loadMoreImages = () => {
  currentPage++;
  let apiURL = `https://api.pexels.com/v1/curated?page=${currentPage}&per_page=${perPage}`
  getImages(apiURL);
}

const loadSearchImages = (e) => {
  if(e.key === "Enter") {
    currentPage = 1;
    searchTerm = e.target.value;
    imagesWrapper.innerHTML = "";
    getImages(`https://api.pexels.com/v1/search?query=${searchTerm}&page=${currentPage}&per_page=${perPage}`);
  }
}

getImages(`https://api.pexels.com/v1/curated?page=${currentPage}&per_page=${perPage}`);
loadMoreBtn.addEventListener("click" , loadMoreImages);
searchInput.addEventListener("keyup" , loadSearchImages);
closeBtn.addEventListener("click" , closeLightbox);
downloadImgBtn.addEventListener("click" ,(e) => downloadImgBtn(e.target.dataset.img));

