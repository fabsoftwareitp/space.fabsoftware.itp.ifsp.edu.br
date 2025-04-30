const rankingList = document.querySelector("#rankingList");
const host = window.location.origin

fetch(`${host}/ranking`)
  .then(res => res.json())
  .then(res =>  createRankingList(res));

async function createRankingList(rankingJson) {
  let aux = 0;
  console.log(rankingJson);
  rankingJson.sort(function(a, b){return b.score - a.score});
  console.log(rankingJson);
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