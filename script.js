const checkBoxList = document.querySelectorAll(".custom-checkbox");
const errorLabel = document.querySelector(".error-label");
const progressLabel = document.querySelector(".progress-label");
const inputFields = document.querySelectorAll(".goal-input");
const progressBar = document.querySelector(".progress-bar");
const progressValue = document.querySelector(".progress-value");

const allQuotes = [
  
  'Raise the bar by Completing your Goal',
  'Well begun is halg done',
  'Just a step away, keep going!',
  'Whoa! You just completed all the goals, time for chill :🥳',
]

const allGoals = JSON.parse(localStorage.getItem("allGoals")) || {};
let completedGoalsCount = Object.values(allGoals).filter(
  (goal) => goal.completed
).length;

progressLabel.innerText = allQuotes[completedGoalsCount];

progressValue.style.width = `${(completedGoalsCount / 3) * 100}%`;
      progressValue.firstElementChild.innerText = `${completedGoalsCount}/3 Completed `;
      progressLabel.innerText = allQuotes[completedGoalsCount];

checkBoxList.forEach((checkbox) => {
  checkbox.addEventListener("click", (e) => {
    const allGoalsAdded = [...inputFields].every(function (input) {
      return input.value;
    });
    if (allGoalsAdded) {
      checkbox.parentElement.classList.toggle("completed");
      const inputId = checkbox.nextElementSibling.id;
      console.log(inputId);
      allGoals[inputId].completed = !allGoals[inputId].completed;
      completedGoalsCount = Object.values(allGoals).filter(
        (goal) => goal.completed
      ).length;
      progressValue.style.width = `${(completedGoalsCount / 3) * 100}%`;
      progressValue.firstElementChild.innerText = `${completedGoalsCount}/3 Completed `;

      localStorage.setItem("allGoals", JSON.stringify(allGoals));
    } else {
      progressBar.classList.add("show-error");
    }
  });
});

inputFields.forEach((input) => {
  input.value = allGoals[input.id].name;

  if (allGoals[input.id].completed) {
    input.parentElement.classList.add("completed");
  }

  input.addEventListener("focus", () => {
    progressBar.classList.remove("show-error");
  });

  input.addEventListener("input", (e) => {

    if(allGoals[input.id].completed){
      input.value = allGoals[input.id].name;
      return 
    }

    allGoals[input.id] = {
      name: input.value,
      completed: false,
    };
    localStorage.setItem("allGoals", JSON.stringify(allGoals));
  });
});
