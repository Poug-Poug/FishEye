// Function to get Photographer data
async function getData() {
    const data = fetch("../data/photographers.json")
        .then(response => response.json())
    return data;
}

// Function to display photographer data on the second page
 function displayData() {
    const photographerMediaSection = document.querySelector(".photograph-header");

        let photographerMediaModel = new Photographer(photographe);
        photographerMediaSection.innerHTML += photographerMediaModel.createHtml2(); // Permet de sauvegarder l'ancienne valeur
};

// Function to get the id of the photographe
function getIdPhotographers(photographers) {
    let params = new URLSearchParams(document.location.search.substring(1));
    const identifier = params.get("id");
    let goodPhotographe = photographers.find(photographe => photographe.id == identifier);
    const photographerMediaSection = document.querySelector(".photograph-header");
    let photographerMediaModel = new Photographer(goodPhotographe);
    photographerMediaSection.innerHTML += photographerMediaModel.createHtml2();
    return identifier;
}

// Function to get media's photographer
function getMediaPhotographers(media,idPhotographer) {
   let goodMedia = media.filter(media => media.photographerId == idPhotographer);

    displayMedia(goodMedia); // Tableau à trier
}


//Function to screen the media on the page
function displayMedia(medias) {
    const mediaSection = document.querySelector(".media_section");
    mediaSection.innerHTML = '';

    medias.forEach((media) => {
        let mediaModel = new MediaFactory(media);
        mediaSection.innerHTML += mediaModel.createMedia(); // Permet de sauvegarder l'ancienne valeur

    });
};

// Function to get all photo likes
function getAllLikes(){
    let likesDiv = document.querySelectorAll(".media_number_like");

    let totalLikes = 0;

    for(var i = 0; i < likesDiv.length; i++) {
        totalLikes += parseInt(likesDiv[i].innerHTML);
    }

    return totalLikes;
}

// Function to get the good price for the photographe
function getPricePhotographer(photographers, idPhotographe){
    let goodPhotographe = photographers.find(photographe => photographe.id == idPhotographe);
    return goodPhotographe.price;
}

//Function to screen the good price and a total of all photo's like
function createLikeAndPrice(price, like) {
    let likePriceDiv = document.querySelector(".static_like");
    likePriceDiv.innerHTML = `<div class="static_total_like">${getAllLikes()} <i class="fa-solid fa-heart"></i></div>
    <div class="static_price">${price}€ / jour</div>`;
}

// Function to like a photo and add a total number like
function addlike(like) {
    let hearth = document.querySelectorAll(".hearth");
    let number_like = document.querySelectorAll(".media_number_like");
    let totalLikes = like;

    for(let i = 0; i < hearth.length; i++){
        hearth[i].addEventListener('click', function() {
            let photoLike = parseInt(hearth[i].parentNode.innerText);
            if(hearth[i].classList.contains("fa-regular")){
                totalLikes++;
                number_like[i].innerHTML = photoLike + 1;
                hearth[i].classList.replace("fa-regular","fa-solid");
            } else {
                totalLikes--;
                number_like[i].innerHTML = photoLike - 1;
                hearth[i].classList.replace("fa-solid","fa-regular");
            }
            createLikeAndPrice(pricePhotographe,totalLikes);
            
        })
        hearth[i].addEventListener('keyup', function(e) {
            if(e.key == 'Enter') {
            let photoLike = parseInt(hearth[i].parentNode.innerText);
            if(hearth[i].classList.contains("fa-regular")){
                totalLikes++;
                number_like[i].innerHTML = photoLike + 1;
                hearth[i].classList.replace("fa-regular","fa-solid");
            } else {
                totalLikes--;
                number_like[i].innerHTML = photoLike - 1;
                hearth[i].classList.replace("fa-solid","fa-regular");
            }
            createLikeAndPrice(pricePhotographe,totalLikes);

        }
            
        })
        
    }
    
}

// Function to sort media by différent sorts
function sort(media, id, allLikes){
    let goodMedia = media.filter(media => media.photographerId == id);
    let sortDiv = document.querySelector(".tri_select_select");
    sortDiv.addEventListener('change',function(){
        if(sortDiv.value == "titre"){
           goodMedia.sort(function(a, b){
                if(a.title < b.title) {
                    return -1;
                }
                if(a.title > b.title) {
                    return 1;
                } 
                return 0;
           })
        } else if(sortDiv.value == "date"){
            goodMedia.sort(function(a, b){
                return new Date(a.date) - new Date(b.date);
            })
        } else {
            goodMedia.sort(function(a, b){
                if(a.likes < b.likes) {
                    return 1;
                }
                if(a.likes > b.likes) {
                    return -1;
                } 
                return 0;
           })
        }
        displayMedia(goodMedia);
        addlike(allLikes);
        lightbox();
        
    })
}

let pricePhotographe = undefined;


//Function to init
async function init() {
    // Récupère les datas des photographes
    const { photographers, media } = await getData();
    const idPhotographe = getIdPhotographers(photographers);
    getMediaPhotographers(media, idPhotographe);
    sort(media, idPhotographe);
    pricePhotographe = getPricePhotographer(photographers, idPhotographe);
    let allLikes = getAllLikes();
    createLikeAndPrice(pricePhotographe, allLikes);
    addlike(pricePhotographe, allLikes);
    lightbox();
    contactModal();

};

init();


// Lightbox function
function lightbox() {
    const modale = document.querySelector('.modale');
    const close = document.querySelector('.close');
    const modaleContent = document.querySelector(".media_modale");
    const allLinks = document.querySelectorAll('.flexbox_media');
    const allTitle = document.querySelectorAll('.media_infos_title');
    const modaleTitle = document.querySelector('.media_title');
    const right = document.querySelector('.right');
    const left = document.querySelector('.left');
    
    for(let link of allLinks){
        link.addEventListener('click', function(){
            const copy = link.children[0].cloneNode(true);
            modaleContent.appendChild(copy);
            modaleTitle.innerHTML = link.nextElementSibling.children[0].innerHTML;

            modale.classList.add("show");

            right.addEventListener('click',function(){
                for(let i = 0; i < allLinks.length; i++) {
                    if(modaleContent.children[0].src == allLinks[i].children[0].src) {
                            modaleContent.innerHTML = "";
                            modaleTitle.innerHTML = "";
                            if(i == allLinks.length - 1) {
                                modaleTitle.innerHTML = allTitle[i].innerHTML;
                                const copy = allLinks[0].children[0].cloneNode(true);
                                modaleContent.appendChild(copy);
                            } else {
                                modaleTitle.innerHTML = allTitle[i + 1].innerHTML;
                                const copy = allLinks[i + 1].children[0].cloneNode(true);
                                modaleContent.appendChild(copy);
                            }
                        break;
                    } 
                }
            })
            left.addEventListener('click',function(){
                for(let i = 0; i < allLinks.length; i++) {
                    if(modaleContent.children[0].src == allLinks[i].children[0].src) {
                        modaleContent.innerHTML = "";
                        modaleTitle.innerHTML = "";
                        if(i == 0){
                            modaleTitle.innerHTML = allTitle[i].innerHTML;
                            const copy = allLinks[allLinks.length - 1].children[0].cloneNode(true);
                            modaleContent.appendChild(copy);
                        } else {
                            modaleTitle.innerHTML = allTitle[i - 1].innerHTML;
                            const copy = allLinks[i-1].children[0].cloneNode(true);
                            modaleContent.appendChild(copy);
                        }
                    break;
                    }
                }
           })
        })
        link.addEventListener('keyup', function(e){
            if(e.key == 'Enter'){
            const copy = link.children[0].cloneNode(true);
            modaleContent.appendChild(copy);
            modaleTitle.innerHTML = link.nextElementSibling.children[0].innerHTML;

            modale.classList.add("show");

            link.addEventListener('keyup',function(e){
                if(e.key == 'ArrowRight'){
                for(let i = 0; i < allLinks.length; i++) {
                    if(modaleContent.children[0].src == allLinks[i].children[0].src) {
                            modaleContent.innerHTML = "";
                            modaleTitle.innerHTML = "";
                            if(i == allLinks.length - 1) {
                                modaleTitle.innerHTML = allTitle[i].innerHTML;
                                const copy = allLinks[0].children[0].cloneNode(true);
                                modaleContent.appendChild(copy);
                            } else {
                                modaleTitle.innerHTML = allTitle[i + 1].innerHTML;
                                const copy = allLinks[i + 1].children[0].cloneNode(true);
                                modaleContent.appendChild(copy);
                            }
                        break;
                    } 
                }
            }
            })
            link.addEventListener('keyup',function(e){
                if(e.key == 'ArrowLeft'){
                for(let i = 0; i < allLinks.length; i++) {
                    if(modaleContent.children[0].src == allLinks[i].children[0].src) {
                        modaleContent.innerHTML = "";
                        modaleTitle.innerHTML = "";
                        if(i == 0){
                            modaleTitle.innerHTML = allTitle[i].innerHTML;
                            const copy = allLinks[allLinks.length - 1].children[0].cloneNode(true);
                            modaleContent.appendChild(copy);
                        } else {
                            modaleTitle.innerHTML = allTitle[i - 1].innerHTML;
                            const copy = allLinks[i-1].children[0].cloneNode(true);
                            modaleContent.appendChild(copy);
                        }
                    break;
                    }
                }
            }
           })
        }
        })
            
    }


    close.addEventListener('click', function(){
        modale.classList.remove("show");
        modaleContent.innerHTML = '';
        modaleTitle.innerHTML = "";
    })

}

// Contact Modal Function
function contactModal() {

    const modal_button = document.querySelector('.submit_button');
    const firstname_input = document.querySelector('.firstname_input');
    const lastname_input = document.querySelector('.lastname_input');
    const email_input = document.querySelector('.email_input');

    modal_button.addEventListener('click',function(e){


        e.preventDefault();

        console.log(firstname_input.value);
        console.log(lastname_input.value);
        console.log(email_input.value);

        closeModal();
    })

}
