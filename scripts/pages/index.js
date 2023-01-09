 // Function to get data from photographe
    async function getPhotographers() {
        const photographers = fetch("data/photographers.json")
            .then(response => response.json())
        return photographers;
    }

    // Function to display this data on the first page
     function displayData(photographers) {
        const photographersSection = document.querySelector(".photographer_section");

        photographers.forEach((photographer) => {
            let photographerModel = new Photographer(photographer);
            photographersSection.innerHTML += photographerModel.createHTML(); // += : Permet de sauvegarder l'ancienne valeur
        });
    }
    

    // Function to init
    async function init() {
        const { photographers } = await getPhotographers();
        displayData(photographers);
    }
    
    init();

    