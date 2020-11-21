const card = document.querySelectorAll(".card");
const reset_button = document.querySelector(".reset_button");
const images = ['https://images.unsplash.com/photo-1576080121747-26ade08979f0?ixlib=rb-1.2.1&ixid=MXwxMjA3fDB8MHx0b3BpYy1mZWVkfDF8NnNNVmpUTFNrZVF8fGVufDB8fHw%3D&auto=format&fit=crop&w=500&q=60',
    'https://images.unsplash.com/photo-1582516011693-04e5c7be8817?ixlib=rb-1.2.1&ixid=MXwxMjA3fDB8MHx0b3BpYy1mZWVkfDJ8NnNNVmpUTFNrZVF8fGVufDB8fHw%3D&auto=format&fit=crop&w=500&q=60',
    'https://images.unsplash.com/photo-1605719720722-a14496ab72f0?ixlib=rb-1.2.1&ixid=MXwxMjA3fDB8MHx0b3BpYy1mZWVkfDE0fDZzTVZqVExTa2VRfHxlbnwwfHx8&auto=format&fit=crop&w=500&q=60',
    'https://images.unsplash.com/photo-1605726135442-468dd2b7eff1?ixlib=rb-1.2.1&ixid=MXwxMjA3fDB8MHx0b3BpYy1mZWVkfDIwfDZzTVZqVExTa2VRfHxlbnwwfHx8&auto=format&fit=crop&w=500&q=60',
    'https://images.unsplash.com/photo-1605601986857-974b3ed3022f?ixlib=rb-1.2.1&ixid=MXwxMjA3fDB8MHx0b3BpYy1mZWVkfDI2fDZzTVZqVExTa2VRfHxlbnwwfHx8&auto=format&fit=crop&w=500&q=60',
    'https://images.unsplash.com/photo-1547845178-f8fc8f77f873?ixlib=rb-1.2.1&ixid=MXwxMjA3fDB8MHx0b3BpYy1mZWVkfDMwfDZzTVZqVExTa2VRfHxlbnwwfHx8&auto=format&fit=crop&w=500&q=60',
    'https://images.unsplash.com/photo-1545375359-366c37031751?ixlib=rb-1.2.1&ixid=MXwxMjA3fDB8MHx0b3BpYy1mZWVkfDMyfDZzTVZqVExTa2VRfHxlbnwwfHx8&auto=format&fit=crop&w=500&q=60',
    'https://images.unsplash.com/photo-1605441065768-a2798213ac26?ixlib=rb-1.2.1&ixid=MXwxMjA3fDB8MHx0b3BpYy1mZWVkfDU2fDZzTVZqVExTa2VRfHxlbnwwfHx8&auto=format&fit=crop&w=500&q=60',
    'https://images.unsplash.com/photo-1605447781678-2a5baca0e07b?ixlib=rb-1.2.1&ixid=MXwxMjA3fDB8MHx0b3BpYy1mZWVkfDg4fDZzTVZqVExTa2VRfHxlbnwwfHx8&auto=format&fit=crop&w=500&q=60',
    'https://images.unsplash.com/photo-1577403922630-ee5218668ae5?ixlib=rb-1.2.1&ixid=MXwxMjA3fDB8MHx0b3BpYy1mZWVkfDk0fDZzTVZqVExTa2VRfHxlbnwwfHx8&auto=format&fit=crop&w=500&q=60'
]

const _top = document.querySelector('.top');
const bottom = document.querySelector('.bottom');
const right = document.querySelector('.right');
const left = document.querySelector('.left');

const time = document.getElementById('time');
const cards_matched_el = document.getElementById('cards_marched');
const render_game_over = document.getElementById('game_over');
const remarks = document.getElementById('remarks');
const rating = document.getElementById('rating');
const rating_info = document.getElementById('rating_info');
const play_again_btn = document.getElementById('play_again_btn');
const cover = document.getElementById('cover');


let cards_matched = 0;

let minutes = 1;
let seconds = 10;

let is_reset = true; //it had to be true to work, becareful with this line
let is_game_over = false
const duplicateImages = arr => {
    const image_clone = arr.slice();
    for (let i = 0; i < arr.length; i++) {
        image_clone.push(arr[i]);
    }
    return image_clone;
}
const image_duplicate = duplicateImages(images);

const getRandomImage = max => {
    return Math.floor(Math.random() * Math.floor(max));
}
const generateImagesRandom = arr => {
    const random = [];
    let num = arr.length;
    while (num !== 0) {
        let random_image = getRandomImage(num);
        random.push(arr[random_image]);
        arr.splice(random_image, 1);
        num--;
    }
    return random;
}

let random_images = generateImagesRandom(image_duplicate);
let random_images_keys = [...random_images.keys()];

for (let i = 0; i < random_images.length; i++) {
    card[i].style.backgroundImage = "url(" + random_images[i] + ")";
}


const flipCards = () => {
    for (let i = 0; i < card.length; i++) {
        card[i].classList.add("back");
        card[i].style.backgroundSize = '0';
    }
    is_reset = false;
    cover.style.display = "none";
    startProgress();
}

const unFlipCards = () => {
    for (let i = 0; i < card.length; i++) {
        if (card[i].classList.contains('back'))
            card[i].classList.remove("back");
        card[i].classList.add("front");
        card[i].style.backgroundSize = 'cover';
    }
    is_reset = false;
}

setTimeout(flipCards, 5000);


const marched_cards = [];
const marched_cards_keys = [];


reset_button.addEventListener('click', () => {
    random_images = generateImagesRandom(random_images);
    for (let i = 0; i < random_images.length; i++) {
        card[i].style.backgroundImage = "url(" + random_images[i] + ")";
        unHideCards(card[i]);
        turnCardFront(card[i]);
    }
    removeProgressbar();

    cover.style.display = "";
    setTimeout(flipCards, 5000);
    resetActions();
})


play_again_btn.addEventListener('click', () => {
    random_images = generateImagesRandom(random_images);
    for (let i = 0; i < random_images.length; i++) {
        card[i].style.backgroundImage = "url(" + random_images[i] + ")";
        unHideCards(card[i]);
        turnCardFront(card[i]);
    }
    removeProgressbar();


    cover.style.display = "";
    setTimeout(flipCards, 5000);
    resetActions();
    reset_button.style.display = "";
})

for (let i = 0; i < random_images.length; i++) {
    card[i].addEventListener('click', () => {
        if (card[i].classList.contains("back")) {
            turnCardFront(card[i]);
            marched_cards.push(random_images[i]);
            marched_cards_keys.push(random_images_keys[i]);
            if (marched_cards.length === 2) {
                if (marched_cards[0].toString() === marched_cards[1].toString()) {
                    setTimeout(hideCards, 1000,
                        card[marched_cards_keys[0]],
                        card[marched_cards_keys[1]]);

                    setTimeout(() => {
                        cards_matched += 2;
                        cards_matched_el.innerHTML = `cards matched : ${cards_matched}`;
                    }, 1000);

                    resetMarchedCards();
                } else if (marched_cards[0].toString() !== marched_cards[1].toString()) {
                    setTimeout(flipDownCards, 1000,
                        card[marched_cards_keys[0]],
                        card[marched_cards_keys[1]]);
                    resetMarchedCards();
                }
            }
        }
        else {
            card[i].classList.add("back");
            card[i].style.backgroundSize = '0';
            resetMarchedCards();
        }
    })
}


const hideCards = (index1, index2) => {
    index1.classList.toggle("hide");
    index2.classList.toggle("hide");

}

const flipDownCards = (index1, index2) => {
    index1.classList.remove("front");
    index1.classList.add("back");
    index1.style.backgroundSize = '0';
    index2.classList.remove("front");
    index2.classList.add("back");
    index2.style.backgroundSize = '0';
}


const turnCardFront = card => {
    card.classList.remove("back");
    card.classList.add("front");
    card.style.backgroundSize = 'cover';
}

const resetMarchedCards = () => {
    marched_cards.length = 0;
    marched_cards_keys.length = 0;
}

const unHideCards = card => {
    if (card.classList.contains("hide")) {
        card.classList.remove("hide");
    }
}

function startProgress() {
    _top.classList.add('top_anim');
    bottom.classList.add('bottom_anim');
    left.classList.add('left_anim');
    right.classList.add('right_anim');
    _top.style.webkitAnimation = "";
    bottom.style.webkitAnimation = "";
    left.style.webkitAnimation = "";
    right.style.webkitAnimation = "";
}

function resetActions() {
    is_reset = true;
    is_game_over = false;
    cards_matched = 0;
    cards_matched_el.innerHTML = '';
    time.innerHTML = '';

    render_game_over.style.visibility = 'hidden';
}

function removeProgressbar() {
    _top.style.webkitAnimation = "none";
    bottom.style.webkitAnimation = "none";
    left.style.webkitAnimation = "none";
    right.style.webkitAnimation = "none";
}

function renderRating() {
    if (((minutes * 60) + seconds) > 30) {
        rating.innerHTML = '&#9733; &#9733; &#9733; &#9733; &#9733;'
    }
    else if (((minutes * 60) + seconds) >= 25 && ((minutes * 60) + seconds) <= 30) {
        rating.innerHTML = '&#9733; &#9733; &#9733; &#9733;'
    }
    else if (((minutes * 60) + seconds) >= 20 && ((minutes * 60) + seconds) < 25) {
        rating.innerHTML = '&#9733; &#9733; &#9733;'
    }
    else if (((minutes * 60) + seconds) >= 15 && ((minutes * 60) + seconds) < 20) {
        rating.innerHTML = '&#9733; &#9733;'
    }
    else {
        rating.innerHTML = '&#9733;'
    }
}


setInterval(() => {
    if (is_reset || is_game_over) {
        clearInterval();
        minutes = 1;
        seconds = 11;
    } else {
        seconds--;
        console.log(((minutes * 60) + seconds));
        if (seconds === 0) {
            minutes--;
            seconds = 60;
        }
        time.innerHTML = `time : 0${minutes} : ${seconds}`;
        if (seconds < 10) {
            time.innerHTML = `time : 0${minutes} : 0${seconds}`;
        }
        if (minutes < 0) {
            time.innerHTML = "Time Up";
            remarks.innerHTML = "Lost";
            rating_info.style.display = 'none'
            render_game_over.style.visibility = 'visible';
            is_game_over = true;
            cover.style.display = "";
            unFlipCards();
            reset_button.style.display = "none";
        }
        if (cards_matched === random_images.length) {
            is_game_over = true;
            time.innerHTML = "";
            rating_info.style.display = ''
            remarks.innerHTML = 'Winner';
            renderRating();
            render_game_over.style.visibility = 'visible';
            reset_button.style.display = "none";

            removeProgressbar()
        }
    }
}, 1000)


