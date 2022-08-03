import { getDepartmentById } from "../services/departmentService.js";
const app = document.getElementById("app");

export default async function departmentDetails(params) {
  const departId = +params.id;
  const currentDepartment = await getDepartmentById(departId);

  const { name, description, headOfDepartment } = currentDepartment;

  const containerDiv = document.createElement("div");
  containerDiv.setAttribute("class", "dep--det--head");
  containerDiv.innerHTML = `Department <span class='text-primary dep--main'>name:</span> ${name} </br>
  <span class='text-primary dep--main2'>Description:</span> ${description} </br>
  Head of department:  ${headOfDepartment}  `;

  const btnEditDep = document.createElement("a");
  btnEditDep.setAttribute("class", "btn btn-primary m-4");
  btnEditDep.innerHTML = "Edit department";
  btnEditDep.href = `#/departments/${departId}/edit`;
  app.appendChild(btnEditDep);

  const showEmployee = document.createElement("a");
  showEmployee.setAttribute("class", "btn btn-primary m-4");
  showEmployee.innerHTML = "Show employees";
  showEmployee.href = `#/departments/${departId}/employees`;

  app.appendChild(showEmployee);
  app.appendChild(containerDiv);
}