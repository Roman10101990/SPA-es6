const url = "http://localhost:3000/departments";

export default async function getDepartments() {
    try {
        const response = await fetch(url);
        const departments = await response.json();
        return departments;
    } catch (e) {
        console.log(e)
    }
}

async function getDepartmentById(id) {
    try {
        const response = await fetch(`${url}/${id}`);
        const department = await response.json();
        return department;
    } catch (e) {
        console.log(e)
    }
}

async function addNewDepartment(values) {
    try {
        await fetch(url, {
            method: "POST",
            body: JSON.stringify(values),
            headers: {
                "Content-type": "application/json",
            },
        });
        location.href = `#/departments`
    } catch (e) {
        console.log(e)
    }
}

async function editDepartment(departId, values) {
    try {
        await fetch(`http://localhost:3000/departments/${departId}`, {
            method: "PATCH",
            body: JSON.stringify(values),
            headers: {
                "Content-type": "application/json",
            },
        })
        location.href = `#/departments/${departId}/details`
    } catch (e) {
        console.log(e)
    }
}

async function deleteDepartment(departId) {
    try {
        await fetch(`http://localhost:3000/departments/${departId}`, {
            method: "DELETE",
        });
        location.href = "#/departments";
    } catch (e) {
        console.log(e)
    }
}
export { getDepartmentById, addNewDepartment, editDepartment, deleteDepartment }