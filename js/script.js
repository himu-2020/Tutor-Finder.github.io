document.querySelector(".button-container").addEventListener("click", () => {
  let text = document.getElementById("filter-tutor").value;
  getTutor().then((tutor) => {
    let filteredTutor = filteredTutor(tutor, text);
    showTutor(filteredTutor);
  });
});

function getTutor() {
  return fetch("data.json")
    .then((res) => res.json())
    .then((data) => {
      return data;
    });
}

function filterTutor(tutor, searchText) {
  if (searchText) {
    let filteredTutor = tutor.filter((tutor) => {
      if (
        tutor.roleName.toLowerCase().includes(searchText) ||
        tutor.type.toLowerCase().includes(searchText) ||
        tutor.company.toLowerCase().includes(searchText) ||
        tutor.requirements.content.toLowerCase().includes(searchText)
      ) {
        return true;
      } else {
        return false;
      }
    });
    return filteredTutor;
  } else {
    return tutor;
  }
}

function showTutor(tutor) {
  console.log(tutor);
  let tutorContainer = document.querySelector(".tutor-container");
  let tutorHTML = "";
  tutor.forEach((tutor) => {
    tutorHTML += `
    <div class="tutor-tile">
                <div class="top">
                    <img src="${tutor.logo}" />
                    <span class="material-icons more_horiz">more_horiz</span>
                </div>
                <div class="rolename">
                    <span>${tutor.roleName}</span>
                </div>
                <div class="description">
                    <span>${tutor.requirements.content}</span>
                </div>
                <div class="buttons">
                    <div class="button find-now">
                        Find Now
                    </div>
                    <div class="button">
                        Message
                    </div>
                </div>
            </div>
    `;
  });

  tutorContainer.innerHTML = tutorHTML;
}

getTutor().then((data) => {
  showTutor(data);
});
