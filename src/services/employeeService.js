const url = "http://localhost:3000/departments";

function getTotalSalaryDepartment(emplList) {
    const totalSalary = emplList.reduce((prev, val) => {
        return prev + +val.salary;
    }, 0);
    return totalSalary;
}

function getAverageSalaryDepartment(emplList) {
    const averageSalary = Math.round(
        emplList.reduce((prev, val) => {
            return prev + +val.salary;
        }, 0) / emplList.length
    );
    return averageSalary;
}

function getLowerAverageSalary(emplList) {
    const lowerSalary = emplList.filter(el => el.salary < getAverageSalaryDepartment(emplList));
    return lowerSalary;
}

async function editEmployee(values, depId) {
    try {
        await fetch(`${url}/${depId}`, {
            method: "PATCH",
            body: JSON.stringify(values),
            headers: {
                "Content-type": "application/json",
            },
        })
        location.href = `#/departments/${depId}/employees`
    } catch (e) {
        console.log(e)
    }
}

async function deleteEmployee(depId, values) {
    try {
        await fetch(`${url}/${depId}`, {
            method: "PATCH",
            body: JSON.stringify(values),
            headers: {
                "Content-type": "application/json",
            },
        })
        location.href = `#/departments/${depId}/employees`
    } catch (e) {
        console.log(e)
    }
}

async function addNewEmployee(departId, values) {
    try {
        await fetch(`${url}/${departId}`, {
            method: "PATCH",
            body: JSON.stringify(values),
            headers: {
                "Content-type": "application/json",
            },
        })
        location.href = `#/departments/${departId}/employees`
    } catch (e) {
        console.log(e)
    }
}
export { addNewEmployee, getTotalSalaryDepartment, getAverageSalaryDepartment, getLowerAverageSalary, editEmployee, deleteEmployee }