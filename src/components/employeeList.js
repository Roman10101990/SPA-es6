import { getTotalSalaryDepartment, getAverageSalaryDepartment, getLowerAverageSalary } from "../services/employeeService.js";
import { getDepartmentById } from "../services/departmentService.js";
const app = document.getElementById("app");

export default async function employeeList(params) {
  const departId = +params.id;

  const currentDepartment = await getDepartmentById(departId);
  const emplList = currentDepartment.employees;

  if (!emplList.length) {
    location.href = `#/departments/${departId}/employees/add`;
    return;
  }

  const divListEmployee = document.createElement("div");
  divListEmployee.setAttribute("id", "divList");

  const header = document.createElement("h2");
  header.innerHTML = `Employees list of department ${currentDepartment.name}`;
  divListEmployee.appendChild(header);
  app.appendChild(divListEmployee);

  const btnAddEmpl = document.createElement("a");
  btnAddEmpl.setAttribute("class", "btn btn-primary m-4");
  btnAddEmpl.innerHTML = "Add employee";
  btnAddEmpl.href = `#/departments/${departId}/employees/add`;
  app.appendChild(btnAddEmpl);

  for (const empl of emplList) {
    const outerDiv = document.createElement("div");
    const innerDiv = document.createElement("div");
    const p = document.createElement("p");
    p.innerHTML = `First name:  ${empl.firstName} </br>
      Last name:  ${empl.lastName} </br>
      Date of birth: ${empl.dateOfBirth} </br>
      Email: ${empl.email} </br>
      Salary: ${empl.salary} </br>`;
    const btnEditEmpl = document.createElement("a");
    btnEditEmpl.setAttribute("class", "btn btn-primary m-4");
    btnEditEmpl.innerHTML = "Edit employee";
    btnEditEmpl.href = `#/departments/${departId}/employees/${empl.id}/edit`;

    innerDiv.appendChild(p);
    innerDiv.appendChild(btnEditEmpl);
    outerDiv.appendChild(innerDiv);
    divListEmployee.appendChild(outerDiv);
    app.appendChild(divListEmployee);
  }

  const salaryBlock = document.createElement("div");
  salaryBlock.innerHTML = `<h3>List of employees with a salary lower than average in the department</h3></br>
      Total department salary = ${await getTotalSalaryDepartment(emplList)}USD   Average department salary = ${getAverageSalaryDepartment(emplList)}USD`;

  const lowerSalaryEmployee = await getLowerAverageSalary(emplList);
  for (const lowerSalaryPerson of lowerSalaryEmployee) {
    const { firstName, lastName, dateOfBirth, email, salary } = lowerSalaryPerson;
    const elemLowSalary = document.createElement("div");
    const p = document.createElement("p");

    p.innerHTML = `  First name: ${firstName}</br>
    Last name: ${lastName} </br>
    Date of birth: ${dateOfBirth} </br>
    Email:  ${email} </br>
    Salary: ${salary} </br>`;

    elemLowSalary.appendChild(p);
    divListEmployee.appendChild(elemLowSalary);
  }

  divListEmployee.appendChild(salaryBlock);
  app.appendChild(divListEmployee);
}