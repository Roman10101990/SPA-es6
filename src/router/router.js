import renderDepartment from "../components/renderDepartment.js";
import addDepartment from "./../components/addDepartment.js";
import departmentDetails from "../components/departmentDetails.js";
import editDepartment from "../components/editDepartment.js";
import employeeList from "./../components/employeeList.js";
import addEmployee from "../components/addEmployee.js";
import editEmployee from "./../components/editEmployee.js";
import resetData from "./../services/reset.js";
import "./../css/index.css";

const routes = [
  {
    path: "/departments",
    render: renderDepartment,
  },
  {
    path: "/departments/:id/details",
    render: departmentDetails,
  },
  {
    path: "/departments/add",
    render: addDepartment,
  },
  {
    path: "/departments/:id/edit",
    render: editDepartment,
  },
  {
    path: "/departments/:id/employees",
    render: employeeList,
  },
  {
    path: "/departments/:id/employees/add",
    render: addEmployee,
  },
  {
    path: "/departments/:id/employees/:idEmpl/edit",
    render: editEmployee,
  },
];

const getUrlParams = (routeParts, currentPathParts) => {
  const routeParams = {};
  routeParts.forEach((segment, i) => {
    if (segment[0] === ":") {
      const propName = segment.slice(1);
      routeParams[propName] = decodeURIComponent(currentPathParts[i]);
    }
  });
  return routeParams;
}

const matchRoute = () => {
  const currentPath = location.hash.substring(1);
  const currentPathParts = currentPath.split("/");

  for (let i = 0; i < routes.length; i++) {
    const route = routes[i];
    const routeParts = route.path.split("/");
    if (currentPathParts.length === routeParts.length) {
      const isLinkMatched = routeParts.every((el, j) => {
        return el === currentPathParts[j] || el[0] === ":";
      });

      if (isLinkMatched) {
        return {
          link: currentPath,
          route: route,
          params: getUrlParams(routeParts, currentPathParts),
        };
      }
    }
  }
}

const router = () => {
  const link = matchRoute();
  if (!link) {
    routes[0].render();
    return;
  }
  resetData();
  link.route.render(link.params);
}
export default router;