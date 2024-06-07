// Validimi i formes contact.html
function validateForm() {

    var name = document.getElementById("name").value;
    var surname = document.getElementById("surname").value;
    var email = document.getElementById("email").value;
    var comment = document.getElementById("comment").value;


    var nameError = document.getElementById("name-error");
    var surnameError = document.getElementById("surname-error");
    var emailError = document.getElementById("email-error");
    var commentError = document.getElementById("comment-error");


    nameError.textContent = "";
    surnameError.textContent = "";
    emailError.textContent = "";
    commentError.textContent = "";


    var valid = true;

    if (name.trim() === "") {
        nameError.textContent = "Name is required.";
        valid = false;
    }

    if (surname.trim() === "") {
        surnameError.textContent = "Surname is required.";
        valid = false;
    }

    if (email.trim() === "") {
        emailError.textContent = "Email is required.";
        valid = false;
    } else {
        var emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailPattern.test(email)) {
            emailError.textContent = "Please enter a valid email address.";
            valid = false;
        }
    }

    if (comment.trim() === "") {
        commentError.textContent = "Comment is required.";
        valid = false;
    }

    return valid;
}

//kartat e kafsheve

const dogApiUrl = "https://freetestapi.com/api/v1/dogs";
const catApiUrl = "https://freetestapi.com/api/v1/cats";
const birdApiUrl = "https://freetestapi.com/api/v1/birds";

$(document).ready(function() {
    $('#dogs-link').click(function() {
        fetchAnimals(dogApiUrl);
    });

    $('#cats-link').click(function() {
        fetchAnimals(catApiUrl);
    });

    $('#birds-link').click(function() {
        fetchAnimals(birdApiUrl);
    });

     fetchAnimals(dogApiUrl);
});

function fetchAnimals(apiUrl) {
    $.get(apiUrl, function(data) {
        $('#animal-gallery').empty();
        data.forEach(animal => {
            const animalCard = `
                    <div class="col-lg-3 col-md-4 col-sm-6">
                        <div class="card" onclick="showAnimalDetails(${JSON.stringify(animal).replace(/"/g, '&quot;')})">
                            <img src="${animal.image}" class="card-img-top" alt="${animal.name}">
                            <div class="card-body">
                                <h5 class="card-title">${animal.name}</h5>
                                <p class="card-text">Origin: ${animal.origin}</p>
                            </div>
                        </div>
                    </div>
                `;
            $('#animal-gallery').append(animalCard);
        });
    });
}

function showAnimalDetails(animal) {
    const modalBody = `
            <img src="${animal.image}" alt="${animal.name}">
            <h5>${animal.name}</h5>
            <p>Origin: ${animal.origin}</p>
            <p>${animal.description}</p>
        `;
    $('.modal-body').html(modalBody);
    $('#animalModal').modal('show');
}

function searchAnimals() {
    const query = $('#search-bar').val().toLowerCase();
    $('.card').each(function() {
        const animalName = $(this).find('.card-title').text().toLowerCase();
        if (animalName.includes(query)) {
            $(this).parent().show();
        } else {
            $(this).parent().hide();
        }
    });
}



