import createMyElement from "./../services/renderUtils.js";
import getDepartments from "../services/departmentService.js";
import { addNewDepartment } from "../services/departmentService.js";
import { DepartmentValidationSchema } from "../services/DepartmentValidationSchema.js";
const app = document.getElementById("app");

export default async function addDepartment() {
  const departments = await getDepartments();
  const div = document.createElement("div");

  div.setAttribute("class", "head--title");
  div.innerText = "Enter data to create a new department";

  const formDepartment = document.createElement("form");
  formDepartment.setAttribute("autocomplete", "off");
  formDepartment.setAttribute("id", "formDepartmentId");

  const depName = createMyElement({
    class: "m-2",
    name: "name",
    type: "text",
    placeholder: "Department name",
  });
  const depDescription = createMyElement({
    class: "m-2",
    name: "description",
    type: "textarea",
    placeholder: "Department description",
  });
  const btnAdd = createMyElement({
    class: "btn btn-primary m-2",
    id: "addBtn",
    type: "submit",
    value: "Add",
  })

  formDepartment.appendChild(depName);
  formDepartment.appendChild(depDescription);
  formDepartment.appendChild(btnAdd);
  div.appendChild(formDepartment);
  app.appendChild(div);

  $(document).find('#formDepartmentId').validate({
    ...DepartmentValidationSchema,
    submitHandler: () => {
      const newDepartment = {
        id: !departments.length
          ? 1
          : departments[departments.length - 1].id + 1,
        name: depName.value,
        description: depDescription.value,
        headOfDepartment: "",
        employees: []
      };
      addNewDepartment(newDepartment);
    }
  })
}