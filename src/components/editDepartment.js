import createMyElement from "./../services/renderUtils.js";
import { DepartmentValidationSchema } from "../services/DepartmentValidationSchema.js";
import { getDepartmentById } from "../services/departmentService.js";
import { editDepartment } from "../services/departmentService.js";
import { deleteDepartment } from "../services/departmentService.js";
const app = document.getElementById("app");

export default async function editDepartment(params) {
  const departId = +params.id;
  const currentDepartment = await getDepartmentById(departId);

  const { name, description, headOfDepartment } = currentDepartment;

  const div = document.createElement("div");
  div.setAttribute("class", "head--title--edEmpl");
  div.innerHTML = `You can to edit here departments data </br>
    Department name: ${name}</br>
    Description: ${description}</br>`;
  app.appendChild(div);

  const updDepForm = document.createElement("form");
  updDepForm.setAttribute("autocomplete", "off");
  updDepForm.setAttribute("id", "updDepForm");

  const updDepName = createMyElement({
    class: "m-2",
    name: "name",
    type: "text",
  });
  const updDepDescription = createMyElement({
    class: "m-2",
    name: "description",
    type: "textarea",
  });

  const select = document.createElement("select");
  select.setAttribute("id", "select");
  select.setAttribute("style", "width:200px");

  const delBtn = createMyElement({
    class: "m-2 btn btn-secondary",
    type: "submit",
    value: "Delete",
  });

  const updBtn = createMyElement({
    class: "m-2 btn btn-primary",
    type: "submit",
    value: "Edit",
  });

  const listEmployees = currentDepartment.employees;

  if (listEmployees.length) {
    for (let i = 0; i < listEmployees.length; i++) {
      const option = document.createElement("option");
      option.text = listEmployees[i].firstName + " " + listEmployees[i].lastName;
      select.add(option);
    }
  } else {
    const option = document.createElement("option");
    option.text = "no employee";
    select.add(option);
  }

  updDepForm.appendChild(updDepName);
  updDepForm.appendChild(updDepDescription);
  updDepForm.appendChild(select);
  updDepForm.appendChild(updBtn);
  updDepForm.appendChild(delBtn);
  app.appendChild(updDepForm);

  updDepName.value = name;
  updDepDescription.value = description;
  select.value = headOfDepartment;

  $(document).find('#updDepForm').validate({
    ...DepartmentValidationSchema,
    submitHandler: () => {
      const updateDepartment = {
        name: updDepName.value,
        description: updDepDescription.value,
        headOfDepartment: select.value
      };
      editDepartment(departId, updateDepartment);
    },
  })

  delBtn.addEventListener("click", async (e) => {
    e.preventDefault();
    await deleteDepartment(departId);
  })
}