// Interfaces
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

// Store
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

// Elements
const addProjectForm = document.querySelector("#add-project-form")!;
const title = addProjectForm.querySelector("#title")!;
// const description = addProjectForm.querySelector("#description")!;
// const people = addProjectForm.querySelector("#people")!;
// const addProjectBtn = addProjectForm.querySelector("#add-project-btn")!;

// Event listeners
document.addEventListener("mousedown", onDrag);
document.addEventListener("mousemove", onDrag);
document.addEventListener("mouseup", onStopDrag);
addProjectForm.addEventListener("submit", onAddProject);
addProjectForm.addEventListener("input", onChangeInput);

// Utility functions

// Event functions
function onDrag(event: Event) {
	if (!store.isDraggable) {
		store.isDraggable = true;
	}

	console.log(event);
}

function onStopDrag(event: Event) {
	if (store.isDraggable) {
		store.isDraggable = false;
	}
	console.log(event);
}

function onAddProject(event: Event) {
	event.preventDefault();
	console.log("** event == ", event);
}

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

// Execution
