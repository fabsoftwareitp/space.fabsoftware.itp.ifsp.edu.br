const rankingList = document.querySelector("#rankingList");


fetch('http://localhost:9091/ranking')
  .then(res => res.json())
  .then(res =>  createRankingList(res));

async function createRankingList(rankingJson) {
  await rankingJson.forEach(player => {
    const item = createPlayerElement(player);
    rankingList.appendChild(item);
  });
}

function createPlayerElement(player) {
  const element = document.createElement('li');
  element.innerHTML = `<span>${player.name}</span>: <span class="player-score">${player.score}</span>`;
  return element;
}