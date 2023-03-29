/*gk comment out code 3/28/23
document.getElementById('score').addEventListener('click', () => {
  gameOver();
  document.location.replace("/scores");
});
*/

//gk add code 3/28/23 to save score

const newScore = async (event) => {
  event.preventDefault();

  const score = parseInt(document.querySelector('#info').innerHTML);


  if (score) {
    const response = await fetch(`/api/scores`, {
      method: 'POST',
      body: JSON.stringify({ score }),
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (response.ok) {
      document.location.replace('/game');
    } else {
      alert('Failed to save score');
    }
  }
};
document
  .querySelector('#saveScoreBtn')
  .addEventListener('click', newScore);

// // high scores list------- change to save it to the data base rather than to local storage. 
// const NO_OF_HIGH_SCORES = 5;
// const HIGH_SCORES = 'highScores';

// const highScoreString = localStorage.getItem(HIGH_SCORES);
// const highScores = JSON.parse(highScoreString) ?? []; // high scores being parsed with an array.
// const lowestScore = highScores[NO_OF_HIGH_SCORES - 1]?.score ?? 0; // compares your score with the lowest score on the high score list to see if your score qualifies.



// function checkHighScore(score) {
//   const highScores = JSON.parse(localStorage.getItem(HIGH_SCORES)) ?? [];
//   const lowestScore = highScores[NO_OF_HIGH_SCORES - 1]?.score ?? 0;
  
//   if (score > lowestScore) {
//     saveHighScore(score, highScores); 
//     showHighScores()}; 
// };

// // const name = prompt("You got a high score! Enter your name:"); //initiates a prompt to save your score to the list. 
// // const newScore = { score, name }; // This object saves your score. 


// // function saveHighScore(score, highScores) {
// //   const name = prompt('You got a high score! Enter your name:');
// //   const newScore = { score, name };
  
// //   // Adds to list
// //   highScores.push(newScore);

// //   // Sorts the list
// //   highScores.sort((a, b) => b.score - a.score);
  
// //   // Selects new list
// //   highScores.splice(NO_OF_HIGH_SCORES);
  
// //   // Saves to local storage
// //   localStorage.setItem(HIGH_SCORES, JSON.stringify(highScores));
// // };


// // // retrieves the high score list from local storage.
// // highScores.map((score) => `<li>${score.score} — ${score.name}`); 


// // This grabs the list and adds it to the html.
// const highScoreList = document.getElementById(HIGH_SCORES);

// highScoreList.innerHTML = highScores.map((score) => 
//   `<li>${score.score} - ${score.name}`
// );


// // Function runs every time a new game is ran. 
// function showHighScores() {
//   const highScores = JSON.parse(localStorage.getItem(HIGH_SCORES)) ?? [];
//   const highScoreList = document.getElementById(HIGH_SCORES);
  
//   highScoreList.innerHTML = highScores
//     .map((score) => `<li>${score.score} - ${score.name}`)
//     .join('');
// }
