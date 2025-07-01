let customerList = [];

function addCustomer(){

    // if(localStorage.getItem("customerList"))

    let customer = {
        fullName:document.getElementById("txtFullName").value,
        email:document.getElementById("txtEmail").value,
        address:document.getElementById("txtAddress").value,
        age:document.getElementById("txtAge").value,
        birthday:document.getElementById("dateDob").value
    }



    customerList.push(customer);

    let strCustomerList = JSON.stringify(customerList);

    localStorage.setItem("customerList",strCustomerList);

    let objCustomerList = localStorage.getItem("customerList");

    console.log(objCustomerList);
}

function loadTable(){
    let body = `
            <tr>
            <th>Full Name</th>
            <th>Email</th>
            <th>Address</th>
            <th>Age</th>
            <th>Birthday</th>
        </tr>
    `;

    customerList = JSON.parse(localStorage.getItem("customerList"));

    for(data of customerList){
            body+=`
            <tr>
            <td>${data.fullName}</td>
            <td>${data.email}</td>
            <td>${data.address}</td>
            <td>${data.age}</td>
            <td>${data.birthday}</td>
        </tr>
    `
    }

    document.getElementById("customerTable").innerHTML=body;

}