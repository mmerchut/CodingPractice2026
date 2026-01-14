//

function playerRankUp (points) {
  if (points >= 100) {
    return "Well done! You have advanced to the qualifying stage. Win 2 out of your next 3 games to rank up."
  } else {
    return false
  }
}

//

function sum (numbers) {
   if (numbers.length === 0) {
        return 0;
    }

    return numbers.reduce((sum, current) => sum + current, 0);
}

//