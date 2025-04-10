const totalClasses = document.getElementById('totalClasses');
const criteria = document.getElementById('criteria');
const attendedClasses = document.getElementById('attendedClasses');
const result = document.getElementById('result');
const progressBar = document.getElementById('progressBar');

const inputs = [totalClasses, criteria, attendedClasses];

inputs.forEach(input => {
  input.addEventListener('input', calculateBunks);
});

function calculateBunks() {
  const total = parseInt(totalClasses.value);
  const crit = parseInt(criteria.value);
  const attended = parseInt(attendedClasses.value);

  if (isNaN(total) || isNaN(crit) || isNaN(attended)) {
    result.textContent = '';
    progressBar.style.width = '0%';
    progressBar.textContent = '0%';
    return;
  }

  if (total < 0 || crit < 0 || attended < 0 || crit > 100) {
    result.textContent = 'Please enter valid non-negative values.';
    result.className = 'result warning';
    progressBar.style.width = '0%';
    progressBar.textContent = '0%';
    return;
  }

  const currentPercentage = total === 0 ? 0 : (attended / total) * 100;
  const percentageDisplay = Math.min(100, currentPercentage.toFixed(2)) + '%';

  progressBar.style.width = percentageDisplay;
  progressBar.textContent = percentageDisplay;

  const requiredAttendance = Math.ceil((crit / 100) * total);

  if (attended >= requiredAttendance) {
    const canBunk = Math.floor((attended - requiredAttendance) / (crit / 100));
    result.textContent = `You're safe! You can bunk ${canBunk} more classes.`;
    result.className = 'result safe';
  } else {
    const extraNeeded = Math.ceil(((crit / 100) * total - attended) / ((1 - crit / 100)));
    result.textContent = `Attend ${extraNeeded} more classes to reach ${crit}% attendance.`;
    result.className = 'result warning';
  }
}