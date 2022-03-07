const form = document.querySelector("#film-form");
const titleElement = document.querySelector("#title");
const directorElement = document.querySelector("#director");
const urlElement = document.querySelector("#url");
const cardbody = document.querySelectorAll(".card-body")[1];
const clear = document.querySelector("#clear-films");

//Static fonksiyonlardan dolayı artık objelerimize gerek kalmadı

//Tüm eventleri yokleme
eventListeners();


function eventListeners(){
    form.addEventListener("submit",addFilm);
    document.addEventListener("DOMContentLoaded",function(){
        let films = Storage.getFilmsFromStorage();

        UI.loadAllFilms(films);

    })
    cardbody.addEventListener("click",deleteFilm);
    clear.addEventListener("click",clearAllFilms);
}

function addFilm(e){
    const title = titleElement.value;
    const director = directorElement.value;
    const url = urlElement.value;

    if( title === ""  || director === "" || url === ""){
        //Hata mesajı
        UI.displayMessages("Tüm alanları doldurun","danger");
    }
    else{
        //Yeni Film
        const newFilm = new Film(title,director,url);

        UI.addFilmToUI(newFilm);  //Arayüze film ekleme
        Storage.addFilmToStorage(newFilm);  //Storage'a film ekleme
        UI.displayMessages("Film başarıyla eklendi...","success");
    }

    UI.clearInputs(titleElement,directorElement,urlElement);
    



    e.preventDefault();  //submit tuşunun varsayılan ayarlarını kapatır
}

function deleteFilm(e){
    
    if(e.target.id === "delete-film"){
        UI.deleteFilmFromUI(e.target);
        Storage.deleteFilmFromStorage(e.target.parentElement.previousElementSibling.previousElementSibling.textContent);
        UI.displayMessages("Silme işlemi başarılı...","success");
        
    }
}

function clearAllFilms(){

    if( confirm("Tüm filmleri silmek istediğinizden emin misiniz?")){

        UI.clearAllFilmsFromUI();
    Storage.clearAllFilmsFromStorage();

    }

    
}

