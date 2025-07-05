let customerList = JSON.parse(localStorage.getItem("customerList")) || [];

function btnAddCustomerOnClick() {
    let newCustomer = {
        fullName: document.getElementById("fullName").value,
        contactNumber: document.getElementById("contactNumber").value,
        address: document.getElementById("address").value,
        email: document.getElementById("email").value,
        dob: document.getElementById("dob").value,
    };

    customerList.push(newCustomer);

    localStorage.setItem("customerList", JSON.stringify(customerList));
    btnReloadOnClick();

    document.getElementById("customerForm").reset();

    console.log(customerList);
}

function btnReloadOnClick() {
  let body = "";

  for (customer of customerList) {
    body += `
      <tr class="h-[50px]">
        <td>${customer.fullName}</td>
        <td>${customer.contactNumber}</td>
        <td>${customer.address}</td>
        <td>${customer.email}</td>
        <td>
          <button 
            onclick="btnUpdateCustomer()"
            class="bg-yellow-400 text-black px-2 py-1 rounded mr-2 hover:bg-yellow-300"
          >
            Update
          </button>
          <button 
            onclick="btnDeleteCustomer()"
            class="bg-red-600 text-white px-2 py-1 rounded hover:bg-red-500"
          >
            Delete
          </button>
        </td>
      </tr>
      
    `;
  }

  document.getElementById("customerTableBody").innerHTML = body;
}
