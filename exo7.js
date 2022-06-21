let input = document.getElementById('input');
let button = document.querySelector('button');
let checkbox = document.querySelector('#checkbox');
let rowTable = document.querySelector('#tableRow');
let radioName = document.getElementById('alphabeticalOrder');
let radioPrice = document.getElementById('priceOrder');

let traductions = {
    car: "voiture", 
    house: "maison",
    game: "jeu",
    videoGame: "jeux vidéos",
    show: "spectacle"
}

let category = Object.entries(traductions);

// Fonctions de recherche
button.addEventListener('click', function(){
    let request = input.value;

    // Création du bouton radio pour trier par nom dans l'ordre alphabétique
    const listTriable = jsonDatas.slice();
    if (radioName.checked){
        listTriable.sort((function(a,b) {
            return a.items[0].name.localeCompare(b.items[0].name);
        }));
        console.log(listTriable)
    }

    // Création du bouton radio pour trier par prix croissant
    if (radioPrice.checked){
        listTriable.sort((function(a,b) {
            return a.items[0].price - b.items[0].price;
        }));
        console.log(listTriable)
    }

    // Boucle sur les données pour afficher chaque élément
    listTriable.map((data) => {
        data.items[0].traduction = "";
        // Indique la traduction de l'anglais vers le français 
        for (let i = 0; i < category.length; i++){
            if(data.type === category[i][0]){
                data.items[0].traduction = category[i][1]
            }
        }
        // Affiche les éléments dans le HTML
        if (request === data.items[0].traduction){
            console.log(listTriable)
            for (let i = 0; i < data.items.length; i++){
                let newRow = document.createElement('tr');
                let table = document.getElementById('tableBody')
                table.appendChild(newRow);
            }

            let nameProduct = document.getElementById('productName');
            let descriptionProduct = document.getElementById('productDescription');
            let priceProduct = document.getElementById('productPrice');
            let contactProduct = document.getElementById('productContact');

            nameProduct.innerHTML = data.items[0].name;
            descriptionProduct.innerHTML = data.items[0].description;
            contactProduct.innerHTML = data.items[0].contact.firstName;

            // Formatage des prix
            let price = new Intl.NumberFormat('fr-FR', { style: 'currency', currency: 'EUR' }).format(data.items[0].price);
            priceProduct.innerHTML = price;


            // Affichage en fonction du stock
            if (checkbox.checked === true){
                data.quantity > 0 ? rowTable.appendChild(newRow) : console.log(data.items[0].name + " n'est pas en stock")
            }
        }
    })
})

//Fonctions d'ajout d'objet

let addBtn = document.getElementById('addObject');
let nameInput = document.getElementById('name');
let typeInput = document.getElementById('type');
let descriptionInput = document.getElementById('description');
let priceInput = document.getElementById('price');
let quantityInput = document.getElementById('quantity');

addBtn.addEventListener('click', function(e){
    e.preventDefault();
    const addObject = (nameInput, typeInput, descriptionInput, priceInput, quantityInput) => {
        jsonDatas.push({name: nameInput, type: typeInput, description: descriptionInput, price: priceInput, quantity: quantityInput})
    }
    addObject(nameInput.value, typeInput.value, descriptionInput.value, priceInput.value, quantityInput.value);

    console.log(jsonDatas)

})