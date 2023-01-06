function displayModal() {
    const modal = document.getElementById("contact_modal");
	modal.style.display = "block";

    document.addEventListener('keydown', function(event){
        if(event.key === "Escape"){
            console.log("escape if")
            modal.style.display = "none";
        }
    })

}

function closeModal() {
    const modal = document.getElementById("contact_modal");
    modal.style.display = "none";
}


// Fonction permettant de gérer le formulaire de contact <> Donc de l'ouvrir / fermer ainsi que de loger les informations présentent dans celui-ci
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
        email_input.value = "";
        lastname_input.value ="";
        firstname_input.value = "";

        closeModal();
    })

}