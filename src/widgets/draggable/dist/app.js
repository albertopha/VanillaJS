"use strict";
;
;
const store = {
    project: {
        title: "",
        description: "",
        people: 0
    },
    activeProjects: [],
    finishedProjects: [],
    isDraggable: false
};
const addProjectForm = document.getElementById("add-project-form");
const activeProjectForm = document.getElementById("active-projects");
const title = addProjectForm.querySelector("#title");
addProjectForm.addEventListener("submit", onAddProject);
addProjectForm.addEventListener("input", onChangeInput);
function onAddProject(event) {
    event.preventDefault();
    const newProject = Object.assign({}, store.project);
    store.activeProjects.push(newProject);
    displayActiveProject(newProject);
    resetForm();
}
function onChangeInput(event) {
    if (event && event.target) {
        const id = event.target.id;
        const value = event.target.value;
        switch (id) {
            case "title":
                store.project.title = value;
                break;
            case "description":
                store.project.description = value;
                break;
            case "people":
                store.project.people = Number(value);
                break;
            default:
                break;
        }
    }
}
function displayActiveProject(project) {
    const { title, description, people } = project;
    const card = document.createElement("project-card");
    const titleElem = document.createElement("h3");
    const descriptionElem = document.createElement("div");
    const peopleElem = document.createElement("div");
    titleElem.textContent = title;
    titleElem.setAttribute("slot", "title");
    descriptionElem.textContent = description;
    descriptionElem.setAttribute("slot", "description");
    peopleElem.textContent = String(people);
    peopleElem.setAttribute("slot", "people");
    card.appendChild(titleElem);
    card.appendChild(descriptionElem);
    card.appendChild(peopleElem);
    activeProjectForm.appendChild(card);
}
function resetForm() {
    store.project = {
        title: "",
        description: "",
        people: 0
    };
    addProjectForm.reset();
}
//# sourceMappingURL=app.js.map