const newScore = async (event) => {
  event.preventDefault();

  const strScore = document.querySelector('#info').innerHTML;
  const score=strScore.substring(strScore.indexOf(":") + 1);
 

  if (score) {
    const response = await fetch(`/api/scores`, {
      method: 'POST',
      body: JSON.stringify({ score }),
      headers: {
        'Content-Type': 'application/json',
      },
    });



    if (response.ok) {
      alert('Score saved successfully!')
      document.location.replace('/');
    } else {
      alert('Failed to save score');
    }
  }
};


document
  .querySelector('#saveScoreBtn')
  .addEventListener('click', newScore);