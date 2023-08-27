    function addPlayers() {
      const numPlayers = parseInt(prompt('How many players?', '1'));

      if (!isNaN(numPlayers)) {
        for (let i = 0; i < numPlayers; i++) {
          const playerName = prompt(`Enter name for Player ${i + 1}`);
          if (playerName !== null) {
            const newRow = document.createElement('tr');
            newRow.classList.add('player-row');
            newRow.innerHTML = `
              <td>${playerName}</td>
              <td><input type="number" class="hole-score" min="0"></td>
              <td><input type="number" class="hole-score" min="0"></td>
              <td><input type="number" class="hole-score" min="0"></td>
              <td><input type="number" class="hole-score" min="0"></td>
              <td><input type="number" class="hole-score" min="0"></td>
              <td><input type="number" class="hole-score" min="0"></td>
              <td><input type="number" class="hole-score" min="0"></td>
              <td><input type="number" class="hole-score" min="0"></td>
              <td><input type="number" class="hole-score" min="0"></td>
              <td><input type="number" class="hole-score" min="0"></td>
              <td class="total-cell">0</td>
            `;
            scorecardBody.appendChild(newRow);
          }
        }
      }
    }

    const scorecardBody = document.querySelector('#scorecard tbody');
    const bestPlayerHeader = document.querySelector('#best-player-header');

    scorecardBody.addEventListener('input', () => {
      const playerRows = document.querySelectorAll('.player-row');
      let bestPlayer = null;
      let bestScore = -1;

      playerRows.forEach(row => {
        const holeScores = row.querySelectorAll('.hole-score');
        let total = 0;
        holeScores.forEach(input => {
          total += parseInt(input.value) || 0;
        });
        row.querySelector('.total-cell').textContent = total;

        if (total > bestScore) {
          bestScore = total;
          bestPlayer = row;
        }
      });

      playerRows.forEach(row => {
        row.classList.remove('best-player');
      });
      
      if (bestPlayer) {
        bestPlayer.classList.add('best-player');
        bestPlayerHeader.textContent = `👑 ${bestPlayer.querySelector('td').textContent} 👑`;
      } else {
        bestPlayerHeader.textContent = '';
      }
    });

    const addPlayerButton = document.querySelector('#add-player-button');
    addPlayerButton.addEventListener('click', addPlayers);