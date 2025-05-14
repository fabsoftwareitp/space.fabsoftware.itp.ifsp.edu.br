export default class Background {

    AlienRandom() {
        const aliensContainer = document.querySelector('.aliens');

        valores = [];
        
        for (let i = 0; i < 15; i++) {
            
            /*const spanAliens = document.getElementById('aliens');
            const enemyImage = 'imagem.png';

            num = Math.floor(Math.random() * (7 + 1));

            if (num == 1) {
                enemyImage = "url('./images/enemy1.png')";
            }
            if (num == 2) {
                enemyImage = "url('./images/enemy2.png')";
            }
            if (num == 3) {
                enemyImage = "url('./images/enemy3.png')";
            }
            if (num == 4) {
                enemyImage = "url('./images/enemy4.png')";
            }
            if (num == 5) {
                enemyImage = "url('./images/enemy5.png')";
            }
            if (num == 6) {
                enemyImage = "url('./images/enemy6.png')";
            }
            if (num == 7) {
                enemyImage = "url('./images/logoSpace.png')";
            }

            spanAliens.style.backgroundImage = enemyImage;*/

            const span = document.createElement('span');
            span.style.left = Math.random() * 100 + 'vw';
            valorAnterior = span.style.left;
            // Daria pra fazer eu por algo pra pegar o valor anterior do for, e repassar e verificar se o valor é 10> ou 10< se for um desses dois ele da math.random dnv
            span.style.setProperty('--i', Math.floor(Math.random() * 6 + 3));
            aliensContainer.appendChild(span);
        }
    }

}