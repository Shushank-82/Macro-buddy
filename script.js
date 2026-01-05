const goalSlider = document.getElementById("goal");
const goalText = document.getElementById("goalText");
const resultDiv = document.getElementById("result");

// Update goal text dynamically
goalSlider.addEventListener("input", () => {
  const value = goalSlider.value;
  if(value==0) goalText.innerText="Fat Loss";
  else if(value==1) goalText.innerText="Maintain";
  else goalText.innerText="Muscle Gain";
});

function calculate(){
  const age = +document.getElementById("age").value;
  const weight = +document.getElementById("weight").value;
  const height = +document.getElementById("height").value;
  const gender = document.getElementById("gender").value;
  const activity = +document.getElementById("activity").value;
  const goal = +goalSlider.value;

  if(!age || !weight || !height){ alert("Fill all fields"); return; }

  const h = height/100;
  const bmi = (weight/(h*h)).toFixed(1);

  let bmr = gender==='male' 
    ? 10*weight + 6.25*height - 5*age +5 
    : 10*weight + 6.25*height - 5*age -161;

  let calories = bmr*activity;
  let proteinFactor = 1.6;

  if(goal===0){ calories-=300; proteinFactor=2.0; }
  if(goal===2){ calories+=300; proteinFactor=2.2; }

  const protein = Math.round(weight*proteinFactor);

  resultDiv.innerHTML=`
    <h3>Results</h3>
    <p><b>Goal:</b> ${goalText.innerText}</p>
    <p><b>BMI:</b> ${bmi}</p>
    <p><b>Calories:</b> ${Math.round(calories)} kcal/day</p>
    <p><b>Protein:</b> ${protein} g/day</p>
  `;

  // Slide in from right
  resultDiv.classList.add("show");
}
