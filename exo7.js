let input = document.getElementById('input');
let button = document.querySelector('button');
let checkbox = document.querySelector('#checkbox');
let elements = document.querySelector('#liste');
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
    }

    // Boucle sur les données pour afficher chaque élément
    listTriable.map((data) => {
        data.items[0].traduction = "";
        // Indique la traduction de la catégorie de l'anglais vers le français 
        for (let i = 0; i < category.length; i++){
            if(data.type === category[i][0]){
                data.items[0].traduction = category[i][1]
            }
        }
        // Affiche les éléments dans le HTML
        if (request === data.items[0].traduction){
            const li = document.createElement('li');
            // Formatage des prix
            let price = new Intl.NumberFormat('fr-FR', { style: 'currency', currency: 'EUR' }).format(data.items[0].price);
            li.innerHTML = `${data.items[0].name} - ${price} - Vendu par : ${data.items[0].contact.firstName}`;
            console.log(data)

            // Affichage en fonction du stock
            if (checkbox.checked === true){
                data.items[0].quantity > 0 ? elements.append(li) : console.log(data.items[0].name + " n'est pas en stock")
            } else {
                elements.append(li);
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
let firstNameInput = document.getElementById('firstName');
let lastNameInput = document.getElementById('lastName');

addBtn.addEventListener('click', function(e){
    e.preventDefault();
    const addObject = (nameInput, typeInput, descriptionInput, priceInput, quantityInput, firstNameInput, lastNameInput) => {
        jsonDatas.push({type: typeInput, items: [{name: nameInput,  description: descriptionInput, price: priceInput, quantity: quantityInput, contact: {firstName: firstNameInput, lastName: lastNameInput}}]})
    }
    addObject(nameInput.value, typeInput.value, descriptionInput.value, priceInput.value, quantityInput.value, firstNameInput.value, lastNameInput.value);

    console.log(jsonDatas)
})