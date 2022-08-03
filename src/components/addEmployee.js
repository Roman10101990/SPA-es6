import createMyElement from "../services/renderUtils.js";
import { EmployeeValidationSchema } from "../services/EmployeeValidationSchema.js";
import { getDepartmentById } from "../services/departmentService.js";
import { addNewEmployee } from "../services/employeeService.js";
const app = document.getElementById("app");

export default async function addEmployee(params) {
  const departId = +params.id;

  const currentDepartment = await getDepartmentById(departId);
  const emplList = currentDepartment.employees;

  const div = document.createElement("div");
  div.setAttribute("class", "add_empl");
  div.innerText = "Enter data to create new employee";

  const formEmployee = document.createElement("form");
  formEmployee.setAttribute("autocomplete", "off");
  formEmployee.setAttribute("id", "addNewEmployeeForm");

  const emplName = createMyElement({
    class: "m-3 d-block",
    type: "text",
    name: "name",
    placeholder: "Employee name",
  });
  const emplSurname = createMyElement({
    class: "m-3 d-block",
    type: "text",
    name: "surname",
    placeholder: "Employee surname",
  });
  const bDay = createMyElement({
    class: "m-3 d-block",
    type: "date",
    name: "bDay",
    placeholder: "Employee date of birth",
  });
  const email = createMyElement({
    class: "m-3 d-block",
    type: "email",
    name: "email",
    placeholder: "Employee email",
  });
  const salary = createMyElement({
    class: "m-3 d-block",
    type: "text",
    name: "salary",
    placeholder: "Employee salary",
  });
  const btnAdd = createMyElement({
    class: "m-3 btn btn-primary d-block",
    type: "submit",
    value: "Add",
  });

  formEmployee.appendChild(emplName);
  formEmployee.appendChild(emplSurname);
  formEmployee.appendChild(bDay);
  formEmployee.appendChild(email);
  formEmployee.appendChild(salary);
  formEmployee.appendChild(btnAdd);
  div.appendChild(formEmployee);
  app.appendChild(div);

  $(document).find('#addNewEmployeeForm').validate({
    ...EmployeeValidationSchema,
    submitHandler: () => {
      const newEmployee = {
        id: !emplList.length
          ? 1
          : emplList[emplList.length - 1].id + 1,
        firstName: emplName.value,
        lastName: emplSurname.value,
        dateOfBirth: bDay.value,
        email: email.value,
        salary: salary.value
      };
      emplList.push(newEmployee);

      const newEmplOfDepart = {
        employees: emplList
      };
      addNewEmployee(departId, newEmplOfDepart)
    }
  })
}