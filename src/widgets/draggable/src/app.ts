/*******************************
 *         Interface           *
 *******************************/
interface Project {
	title: string,
	description: string,
	people: number
};

interface Store {
	project: Project,
	activeProjects: Project[],
	finishedProjects: Project[],
	isDraggable: boolean
};

/*******************************
 *            Store            *
 *******************************/
const store: Store = {
	project: {
		title: "",
		description: "",
		people: 0
	},
	activeProjects: [],
	finishedProjects: [],
	isDraggable: false
};

/*******************************
 *         Elements            *
 *******************************/
const addProjectForm = document.getElementById("add-project-form")!;
const activeProjectForm = document.getElementById("active-projects")!;
const title = addProjectForm.querySelector("#title")!;

/*******************************
 *         Listeners           *
 *******************************/
// document.addEventListener("mousedown", onDrag);
// document.addEventListener("mousemove", onDrag);
// document.addEventListener("mouseup", onStopDrag);
addProjectForm.addEventListener("submit", onAddProject);
addProjectForm.addEventListener("input", onChangeInput);


/*******************************
 *       Event callbacks       *
 *******************************/
function onAddProject(event: Event) {
	event.preventDefault();
	const newProject = Object.assign({}, store.project);
	store.activeProjects.push(newProject);
	displayActiveProject(newProject);
	resetForm();
}

// function onDrag(event: Event) {
// 	if (!store.isDraggable) {
// 		store.isDraggable = true;
// 	}
// 	console.log(event);
// }

// function onStopDrag(event: Event) {
// 	if (store.isDraggable) {
// 		store.isDraggable = false;
// 	}
// 	console.log(event);
// }


function onChangeInput(event: Event) {
	if (event && event.target) {
		const id = (<HTMLInputElement>event.target).id!;
		const value = (<HTMLInputElement>event.target).value!;

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


/*******************************
 *       Utility functions     *
 *******************************/
function displayActiveProject(project: Project): void {
	const {
		title,
		description,
		people
	} = project;
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

function resetForm(): void {
	// Reset the project state
	store.project = {
		title: "",
		description: "",
		people: 0
	};

	// Reset inputs
	(<HTMLFormElement> addProjectForm).reset();
}


/*******************************
 *          Execution          *
 *******************************/
