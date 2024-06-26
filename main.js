// Comments are no longer maintained

const initButton = document.getElementById("begin");
const mainClass = document.getElementById("main");

const dhtml = document.documentElement;

const buttons = document.querySelectorAll(".box button");
const verifyButton = document.querySelector(".verify");

const errorMessage = "You didn't complete the captcha";
const errorDisplay = document.querySelector(".errText");

const instr_label_1 = document.getElementById("instr_1");
const instr_label_main = document.getElementById("mainInstr");
const instr_label_2 = document.getElementById("instr_2");

const refresh = document.getElementById("refresh");

document.addEventListener("DOMContentLoaded", function() {

    saveImg();
    let topic = initGame(1);
    buttons.forEach(button => {
        updateButton(button, topic);
    
        button.addEventListener("click", function() {
            handleButtonClick(button);

            // Check if any button in the box section is clicked
            let clickedButton = false;
            buttons.forEach(button => {
                if (button.classList.contains("clicked")) {
                    clickedButton = true;
                }
                if(clickedButton == false) {
                    verifyButton.textContent = "SKIP"
                } else {
                    verifyButton.textContent = "VERIFY"
                }
            });

        });

    });
    reloadImg();

    initButton.addEventListener("click", () => {
        mainClass.style.visibility = "visible";
        mainClass.style.opacity = 1;
    })

    verifyButton.addEventListener("click", function() {
        
        // Change text or button image based on condition
        saveImg();
        topic = initGame(1);
        buttons.forEach(button => {
            raiseError("Please try again");
            refreshButtons(button);
            updateButton(button, topic);
        });
        verifyButton.textContent = "SKIP";
        reloadImg();
    });
});

document.addEventListener('click', function(event) {
    if(event.target == dhtml) {
        if (mainClass.style.visibility == "visible"){
            mainClass.style.opacity = 0;
            errorDisplay.style.visibility = "hidden";
            mainClass.style.visibility = "hidden";
            buttons.forEach(button => {
                refreshButtons(button);
            });
        }

    }
});

refresh.addEventListener("click", () => {
    saveImg();
    let topic = initGame(1);
    buttons.forEach(button => {
        hideError();
        refreshButtons(button);
        updateButton(button, topic);
    });
    verifyButton.textContent = "SKIP";
    reloadImg();
})



function raiseError(err) {
    errorDisplay.textContent = err;
    errorDisplay.style.visibility = "visible";
}

function hideError() {
    errorDisplay.textContent = "";
    errorDisplay.style.visibility = "hidden";
}

// Utility Functions

//const images = ['cars/farrari.jpg','cars/future.jpg'];
const topics = ['cars', 'cats', 'dogs'];

let prevtopic = null;

let images = {
    car_images: [
        'farrari.jpg',
        'cooper.jpeg',
        'fakeIntersection.jpeg',
        'future.jpg',
        'realIntersection.webp',
        'redWoodToyCar.webp',
        'toyRaceCar.webp',
        'zebraCross.jpeg',
        'trees.jpeg',
        'collapseTree.jpeg',
        'policeCar.jpeg',
        'bus.jpeg',
        'dvovT.jpg',
        'Basic_SedanRoblox.webp',
        'RacingGame.jpeg',
        'carcat.jpeg'
    ]
}

let clickedButtons = []; // Array to store clicked buttons

function handleButtonClick(button) {
    if (button.classList.contains("clicked")) {
        button.classList.remove("clicked")

        const index = clickedButtons.indexOf(button);
        if (index !== -1) {
            clickedButtons.splice(index, 1);
        }
    } else {
        button.classList.toggle("clicked");
        clickedButtons.push(button);
    }
}

function refreshButtons(button){
    const index = clickedButtons.indexOf(button);
    if (button.classList.contains("clicked")) {
        button.classList.remove("clicked")
    }
    if (index !== -1) {
        clickedButtons.splice(index, 1);
    }
}

function updateButton(button, topic) {
    const randomImage = getRandomImage(topic);
        
    if (randomImage == "ERR") {
        button.dataset.image = 'placeholder.png.webp'; // Store the image filename in a data attribute
    } else {
        button.style.backgroundImage = `url('img/${randomImage}')`; // Adjust the path to your images folder
        button.dataset.image = randomImage; // Store the image filename in a data attribute
    }
}

function saveImg() {
    image_backup = JSON.stringify(images);
}

function reloadImg() {{
    images = JSON.parse(image_backup);
}}

function initGame(type) {
    // Type 1: Individual Image Selection

    const returnObject = {};

    if(type == 1) {
        const topic = getRandomTopic();

        instr_label_1.textContent = "Select all images with";
        instr_label_2.textContent = "If there are none, click on verify";
        instr_label_main.textContent = topic;

        return topic;
    }
}

function getRandomTopic() {
    const randomIndex = Math.floor(Math.random() * topics.length);
    const topic = topics[randomIndex];

    if(prevtopic) {
        if (topic == prevtopic) {
            return getRandomTopic();
        }
    }
    prevtopic = topic;
    return topic;
}

function getRandomImage(randomTopic) {

    if(randomTopic == 'cars') {
        return getRandomCarsImage(randomTopic);
    } else if(randomTopic == 'cats') {
        return getRandomCarsImage("cars");
    } else if(randomTopic == 'dogs') {
        return getRandomCarsImage("cars");
    } 
}

function getRandomCarsImage(randomTopic) {

    if (images.car_images.length == 0) {
        return "ERR";
    }

    const randomIndex = Math.floor(Math.random() * images.car_images.length);
    
    selected_image = images.car_images[randomIndex];
    
    images.car_images.splice(randomIndex, 1);

    return `${randomTopic}/${selected_image}`;
}