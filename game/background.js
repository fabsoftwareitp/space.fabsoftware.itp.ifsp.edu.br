export default class Background {

    AlienRandom() {
        const aliensContainer = document.querySelector('.aliens');
        for (let i = 0; i < 15; i++) {
            const spanAlien = document.createElement('span');
            spanAlien.style.left = Math.random() * 100 + 'vw';
            spanAlien.style.setProperty('--i', Math.random() * 10 + 3);
            aliensContainer.appendChild(spanAlien);
        }
    }

    StarRandom() {
        const starsContainer = document.querySelector('.stars');
        for (let i = 0; i < 70; i++) {
            const spanStar = document.createElement('span');
            spanStar.style.left = Math.random() * 100 + 'vw';
            spanStar.style.setProperty('--i', Math.random() * 2 + 6);
            starsContainer.appendChild(spanStar);
        }
    }
}