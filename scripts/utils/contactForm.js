function displayModal() {
    const modal = document.getElementById("contact_modal");
	modal.style.display = "block";

    document.addEventListener('keydown', function(event){
        console.log("escape")
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
