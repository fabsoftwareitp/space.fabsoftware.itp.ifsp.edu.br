export default class Background {
    constructor() {}

   Random(spanTag, amount, rangeMultiplier, offset) {
        const container = document.querySelector(spanTag);
        for (let i = 0; i < amount; i++) {
            const span = document.createElement('span');
            span.style.left = Math.random() * 100 + 'vw';
            span.style.setProperty('--i', Math.random() * rangeMultiplier + offset);
            container.appendChild(span);
        }
    }
}
