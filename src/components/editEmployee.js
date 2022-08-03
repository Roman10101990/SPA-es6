import createMyElement from "./../services/renderUtils.js";
import { EmployeeValidationSchema } from "../services/EmployeeValidationSchema.js";
import { getDepartmentById } from "../services/departmentService.js";
import { editEmployee } from "../services/employeeService.js";
import { deleteEmployee } from "../services/employeeService.js";
const app = document.getElementById("app");

export default async function editEmployee(params) {
  const depId = +params.id;
  const emplId = +params.idEmpl;

  const currentDepartment = await getDepartmentById(depId);

  const emplList = currentDepartment.employees;
  const editEmpl = emplList.find(el => el.id === emplId);
  const { id, firstName, lastName, dateOfBirth, email, salary } = editEmpl;

  const div = document.createElement("div");
  div.setAttribute("class", "head--title--edEmpl");
  div.innerText = "Enter data to edit employee";

  const formEmployee = document.createElement("form");
  formEmployee.setAttribute("autocomplete", "off");
  formEmployee.setAttribute("id", "formEmployeeId");

  const emplNameEl = createMyElement({
    class: "m-2 d-block p-2",
    type: "text",
    name: "name",
    placeholder: "Employee name",
  });
  const emplSurnameEl = createMyElement({
    class: "m-2 d-block p-2",
    type: "textarea",
    name: "surname",
    placeholder: "Employee surname",
  });
  const bDayEl = createMyElement({
    class: "m-2 d-block p-2",
    type: "date",
    name: "bDay",
    placeholder: "Employee date of birth",
  });
  const emailEl = createMyElement({
    class: "m-2 d-block p-2",
    type: "email",
    name: "email",
    placeholder: "Employee email",
  });
  const salaryEl = createMyElement({
    class: "m-2 d-block p-2",
    type: "text",
    name: "salary",
    placeholder: "Employee salary",
  });
  const btnEdit = createMyElement({
    class: "btn btn-primary m-2 d-block p-2",
    type: "submit",
    value: "Edit",
  });
  const btnDel = createMyElement({
    class: "btn btn-secondary m-2 d-block p-2",
    type: "submit",
    value: "Delete",
  });

  formEmployee.appendChild(emplNameEl);
  formEmployee.appendChild(emplSurnameEl);
  formEmployee.appendChild(emailEl);
  formEmployee.appendChild(salaryEl);
  formEmployee.appendChild(bDayEl);
  formEmployee.appendChild(btnDel);
  formEmployee.appendChild(btnEdit);

  div.appendChild(formEmployee);
  app.appendChild(div);

  emplNameEl.value = firstName;
  emplSurnameEl.value = lastName;
  bDayEl.value = dateOfBirth;
  emailEl.value = email;
  salaryEl.value = salary;

  $(document).find('#formEmployeeId').validate({
    ...EmployeeValidationSchema,
    submitHandler: () => {
      const updatedEmployee = {
        id: id,
        firstName: emplNameEl.value,
        lastName: emplSurnameEl.value,
        dateOfBirth: bDayEl.value,
        email: emailEl.value,
        salary: salaryEl.value
      };

      emplList = emplList.map((el) => {
        if (el.id === emplId) return updatedEmployee;
        return el;
      })

      const newEmplOfDepart = {
        employees: emplList
      };
      editEmployee(newEmplOfDepart, depId);
    }
  })
  btnDel.addEventListener("click", (e) => {
    e.preventDefault();
    emplList = emplList.filter(el => el.id !== emplId)
    const employeeListAfterRemove = {
      employees: emplList
    };
    deleteEmployee(depId, employeeListAfterRemove);
  });
}