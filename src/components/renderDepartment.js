import getDepartments from "../services/departmentService.js";
const app = document.getElementById("app");

export default async function renderDepartment() {
  const departments = await getDepartments();

  departments.forEach((department) => {
    const { name, id } = department;
    const link = document.createElement("a");
    link.setAttribute("class", "d-grid gap-3 p-2 m-2 bg-light border");
    link.innerHTML = `Department ${name} </br>`;
    link.href = `#/departments/${id}/details`;
    app.appendChild(link);
  });

  const btnAddDep = document.createElement("a");
  btnAddDep.setAttribute("class", "btn btn-primary m-4");
  btnAddDep.innerHTML = "Add department";
  btnAddDep.href = "#/departments/add";
  app.appendChild(btnAddDep);
}