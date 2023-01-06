// Function to get Photographer data
async function getData() {
    const data = fetch("data/photographers.json")
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
        // On relance ces fonctions après le tri pour que ces fonctionnalités fonctionnent toujours
        displayMedia(goodMedia);
        addlike(allLikes);
        lightbox();
        
    })
}

let pricePhotographe = undefined;


// Fonction permettant de lancer les fonctions indispensables au bon fonctionnement du site FishEye
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


// Fonction permettant d'ouvrir une lightbox contenant un carroussel de toutes les images d'un photographe
function lightbox() {
    const lightbox = document.querySelector('.lightbox');
    const lightboxContent = document.querySelector(".media_lightbox");
    const allLinks = document.querySelectorAll('.flexbox_media');
    const allTitle = document.querySelectorAll('.media_infos_title');
    const lightboxTitle = document.querySelector('.lightbox_title');
    const close = document.querySelector('.close');
    const right = document.querySelector('.right');
    const left = document.querySelector('.left');
    const main = document.getElementById("main");

    // Permet d'ajouter la fonctionnalité de clic droit pour se déplacer dans le carroussel d'image
    const rightClickEvent = () => { 
        for(let i = 0; i < allLinks.length; i++) {
            if(lightboxContent.children[0].src == allLinks[i].children[0].src) {
                    lightboxContent.innerHTML = "";
                    lightboxTitle.innerHTML = "";
                    if(i == allLinks.length - 1) {
                        lightboxTitle.innerHTML = allTitle[i].innerHTML;
                        const copy = allLinks[0].children[0].cloneNode(true);
                        lightboxContent.appendChild(copy);
                    } else {
                        lightboxTitle.innerHTML = allTitle[i + 1].innerHTML;
                        const copy = allLinks[i + 1].children[0].cloneNode(true);
                        lightboxContent.appendChild(copy);
                    }
                break;
            } 
        }
    }

    // Permet d'ajouter la fonctionnalité de flêche droite pour se déplacer dans le carroussel d'image
    function rightKeyEvent(e) { 
        if(e.key === 'ArrowRight'){
        for(let i = 0; i < allLinks.length; i++) {
            if(lightboxContent.children[0].src == allLinks[i].children[0].src) {
                    lightboxContent.innerHTML = "";
                    lightboxTitle.innerHTML = "";
                    if(i == allLinks.length - 1) {
                        lightboxTitle.innerHTML = allTitle[i].innerHTML;
                        const copy = allLinks[0].children[0].cloneNode(true);
                        lightboxContent.appendChild(copy);
                    } else {
                        lightboxTitle.innerHTML = allTitle[i + 1].innerHTML;
                        const copy = allLinks[i + 1].children[0].cloneNode(true);
                        lightboxContent.appendChild(copy);
                    }
                break;
            } 
        }
    }
    }

    // Permet d'ajouter la fonctionnalité de clic gauche pour se déplacer dans le carroussel d'image
    const leftClickEvent = () => { 
        for(let i = 0; i < allLinks.length; i++) {
            if(lightboxContent.children[0].src == allLinks[i].children[0].src) {
                lightboxContent.innerHTML = "";
                lightboxTitle.innerHTML = "";
                if(i == 0){
                    lightboxTitle.innerHTML = allTitle[i].innerHTML;
                    const copy = allLinks[allLinks.length - 1].children[0].cloneNode(true);
                    lightboxContent.appendChild(copy);
                } else {
                    lightboxTitle.innerHTML = allTitle[i - 1].innerHTML;
                    const copy = allLinks[i-1].children[0].cloneNode(true);
                    lightboxContent.appendChild(copy);
                }
            break;
            }
        }
    }

    // Permet d'ajouter la fonctionnalité de flêche gauche pour se déplacer dans le carroussel d'image
    function leftKeyEvent(e) { 
        if(e.key === 'ArrowLeft'){
            for(let i = 0; i < allLinks.length; i++) {
                if(lightboxContent.children[0].src == allLinks[i].children[0].src) {
                    lightboxContent.innerHTML = "";
                    lightboxTitle.innerHTML = "";
                    if(i == 0){
                        lightboxTitle.innerHTML = allTitle[i].innerHTML;
                        const copy = allLinks[allLinks.length - 1].children[0].cloneNode(true);
                        lightboxContent.appendChild(copy);
                    } else {
                        lightboxTitle.innerHTML = allTitle[i - 1].innerHTML;
                        const copy = allLinks[i-1].children[0].cloneNode(true);
                        lightboxContent.appendChild(copy);
                    }
                break;
                }
            }
    }
    }

    

    for(let link of allLinks){

    // Ajout des déclencheurs 
    link.addEventListener('keyup',rightKeyEvent);
    link.addEventListener('keyup',leftKeyEvent);
    right.addEventListener('click',rightClickEvent);
    left.addEventListener('click',leftClickEvent);

        link.addEventListener('click', function(){
            const copy = link.children[0].cloneNode(true);
            lightboxContent.appendChild(copy);
            lightboxTitle.innerHTML = link.nextElementSibling.children[0].innerHTML;

            lightbox.classList.add("show");

            main.setAttribute("display","none");

        })
        link.addEventListener('keyup', function(e){
            if(e.key === 'Enter'){
            const copy = link.children[0].cloneNode(true);
            lightboxContent.appendChild(copy);
            lightboxTitle.innerHTML = link.nextElementSibling.children[0].innerHTML;

            lightbox.classList.add("show");

            main.setAttribute("display","none");
            }

        })
    }

    
        
        
// Permet de fermer la lightbox
    close.addEventListener('click', function(){
        lightbox.classList.remove("show");
        lightboxContent.innerHTML = '';
        lightboxTitle.innerHTML = "";

        main.removeAttribute("display","none");

    })
    close.addEventListener('keyup', function(e){
        if(e.key == 'Enter'){
        lightbox.classList.remove("show");
        lightboxContent.innerHTML = '';
        lightboxTitle.innerHTML = "";

        main.removeAttribute("display","none");
        }

    })


}


