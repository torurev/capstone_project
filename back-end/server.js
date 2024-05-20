const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const app = express();
const port = 3000;

app.use(bodyParser.json());
app.use(cors());

let staffs = [
  { id: 1, name: "John Doe", position: "Front-End Developer" },
  { id: 2, name: "Jane Smith", position: "Back-End Developer" },
  // Add more staff data here
];

let projects = [
  {
    id: 1,
    title: "Project ABC",
    details:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras in bibendum sapien. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Praesent eu gravida mauris, non dictum purus. Duis sem erat, pretium sit amet commodo ac, posuere id metus. Morbi erat urna, commodo dapibus gravida at, egestas a enim. Suspendisse ut consequat orci. Vivamus metus lorem, sollicitudin sed sagittis vel, pretium in est. Mauris ut nulla hendrerit turpis finibus fermentum vel et turpis.",
    complete: false,
    assignee: 1,
  },
  {
    id: 2,
    title: "Project DEF",
    details:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras in bibendum sapien. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Praesent eu gravida mauris, non dictum purus. Duis sem erat, pretium sit amet commodo ac, posuere id metus. Morbi erat urna, commodo dapibus gravida at, egestas a enim. Suspendisse ut consequat orci. Vivamus metus lorem, sollicitudin sed sagittis vel, pretium in est. Mauris ut nulla hendrerit turpis finibus fermentum vel et turpis.",
    complete: true,
    assignee: 2,
  },
  // Add more project data here
];

// Middleware to log requests
app.use((req, res, next) => {
  console.log(`${req.method} ${req.url}`);
  next();
});

// Get all staffs
app.get("/staffs", (req, res) => {
  res.json(staffs);
});

// Get all projects
app.get("/projects", (req, res) => {
  res.json(projects);
});

// Get project by ID
app.get("/projects/:id", (req, res) => {
  const id = parseInt(req.params.id, 10);
  const project = projects.find((project) => project.id === id);
  if (project) {
    res.json(project);
  } else {
    res.status(404).send("Project not found");
  }
});

// Create new staff
app.post("/staffs", (req, res) => {
  const newStaff = req.body;
  newStaff.id = staffs.length ? staffs[staffs.length - 1].id + 1 : 1;
  staffs.push(newStaff);
  res.status(201).json(newStaff);
});

// Create new project
app.post("/projects", (req, res) => {
  const newProject = req.body;
  newProject.id = projects.length ? projects[projects.length - 1].id + 1 : 1;
  projects.push(newProject);
  res.status(201).json(newProject);
});

// Update staff
app.put("/staffs/:id", (req, res) => {
  const id = parseInt(req.params.id, 10);
  let staff = staffs.find((staff) => staff.id === id);
  if (staff) {
    Object.assign(staff, req.body);
    res.json(staff);
  } else {
    res.status(404).send("Staff not found");
  }
});

// Update project
app.put("/projects/:id", (req, res) => {
  const id = parseInt(req.params.id, 10);
  let project = projects.find((project) => project.id === id);
  if (project) {
    Object.assign(project, req.body);
    res.json(project);
  } else {
    res.status(404).send("Project not found");
  }
});

// Patch project for completion status
app.patch("/projects/:id", (req, res) => {
  const id = parseInt(req.params.id, 10);
  let project = projects.find((project) => project.id === id);
  if (project) {
    Object.assign(project, req.body);
    res.json(project);
  } else {
    res.status(404).send("Project not found");
  }
});

// Delete staff
app.delete("/staffs/:id", (req, res) => {
  const id = parseInt(req.params.id, 10);
  staffs = staffs.filter((staff) => staff.id !== id);
  res.status(204).send();
});

// Delete project
app.delete("/projects/:id", (req, res) => {
  const id = parseInt(req.params.id, 10);
  projects = projects.filter((project) => project.id !== id);
  res.status(204).send();
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
