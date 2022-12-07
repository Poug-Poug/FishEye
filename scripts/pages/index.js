    async function getPhotographers() {
        const photographers = fetch("../data/photographers.json")
            .then(response => response.json())
        return photographers;
    }

     function displayData(photographers) {
        const photographersSection = document.querySelector(".photographer_section");

        photographers.forEach((photographer) => {
            let photographerModel = new Photographer(photographer);
            console.log(photographersSection);
            photographersSection.innerHTML += photographerModel.createHTML(); // += : Permet de sauvegarder l'ancienne valeur
        });
    };

    async function init() {
        // Récupère les datas des photographes
        const { photographers } = await getPhotographers();
       //const data  = await getPhotographers(); Pareil
        //console.log(photographers);
        //displayData(data.photographers); Pareil   
        displayData(photographers);
    };
    
    init();

    