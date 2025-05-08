export default class Background {
    
    AlienRandom() {
    const aliensContainer = document.querySelector('.aliens');

    for (let i = 0; i < 15; i++) {
        const span = document.createElement('span');
        span.style.left = Math.random() * 100 + 'vw'; 
        span.style.setProperty('--i', Math.floor(Math.random() * 6 + 3)); 
        aliensContainer.appendChild(span);
    }
    }
}