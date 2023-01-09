class Photographer {
    constructor(data) {
        this.portrait = data.portrait;
        this.name = data.name;
        this.city = data.city;
        this.country = data.country;
        this.tagline = data.tagline;
        this.price = data.price;
        this.id = data.id;
    }
    createHTML() {
        return `
        <a tabindex="3" href="photographer.html?id=${this.id}">
            <div tabindex="C" class="this_div"> 
                <div tabindex="" class= "this_portrait">
                    <img src="Images/Photographer/${this.portrait}" alt ="Portrait de ${this.name}">
                </div>
                <div tabindex="" class="this_name">${this.name}</div>
                <div tabindex="" class="this_place">${this.city}, ${this.country}</div>
                <div tabindex="" class="this_tagline">${this.tagline}</div>
                <div tabindex="" class="this_price">${this.price} € / jour</div>
            </div>
        </a>
        `
    } 
    createHtml2() {
        return `
        <div class = "photographer_media">
            <div tabindex="1" class = "photographer_info">
                <div class = "photographer_name">${this.name}</div>
                <div class="photographer_city">${this.city}, ${this.country}</div>
                <div class="photographer_tagline">${this.tagline}</div>
            </div>
            <button tabindex="2" class="contact_button" onclick="displayModal()">Contactez-moi</button>
            <div class= "photographer_portrait">
                    <img tabindex="3" src="Images/Photographer/${this.portrait}" alt ="Portrait de ${this.name}">
            </div>
        </div>
        `
    }
}


class MediaFactory {
    constructor(data) {
        if(data.image) {
            return new Image(data);
        } else {
            return new Video(data);
        }   
    }
}



class Image {
    constructor(data) {
        this.id = data.id
        this.photographerId = data.photographerId
        this.title = data.title
        this.image = data.image
        this.likes = data.likes
        this.data = data.date
        this.price = data.price
    }
   createMedia() {
    return `
    <div class = "flexbox_media_div">
        <div class = "flexbox_media"> 
            <img tabindex="5" class="all_links" src="Images/${this.photographerId}/${this.image}" alt ="Image de ${this.title}">
        </div>
        <div class = "media_infos">
            <div tabindex="5" class= "media_infos_title">${this.title}</div>
            <div class = "media_infos_likes">
                <div tabindex="5" class ="media_number_like">${this.likes}</div>
                <i tabindex="5" class="fa-regular fa-heart hearth"></i>
            </div>
        </div>
    </div>
    `
   }

}

class Video {
    constructor(data) {
        this.id = data.id
        this.photographerId = data.photographerId
        this.title = data.title
        this.video = data.video
        this.likes = data.likes
        this.data = data.date
        this.price = data.price
    }
    createMedia() {
        return `
        <div class = "flexbox_media_div">
        <div class = "flexbox_media"> 
            <video controls class="all_links" src="Images/${this.photographerId}/${this.video}" alt ="Video de ${this.title}">
        </div>
        <div class = "media_infos">
            <div class= "media_infos_title">${this.title}</div>
            <div class = "media_infos_likes">
            <div class ="media_number_like">${this.likes}</div>
            <i class="fa-regular fa-heart hearth"></i></div>
        </div>
    </div>
        `
    }
}



