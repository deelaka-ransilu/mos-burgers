let customerList;

if (localStorage.getItem("customerList")) {
  customerList = JSON.parse(localStorage.getItem("customerList"));
} else {
  customerList = [];
}

let editIndex;

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

  for (var i = 0; i < customerList.length; i++) {
    var customer = customerList[i];
    body += `
      <tr class="h-[50px]">
        <td>${customer.fullName}</td>
        <td>${customer.contactNumber}</td>
        <td>${customer.address}</td>
        <td>${customer.email}</td>
        <td>
          <button 
            onclick="btnEditCustomer(${i})"
            class="bg-yellow-400 text-black px-2 py-1 rounded mr-2 hover:bg-yellow-300"
          >
            Edit
          </button>
          <button 
            onclick="btnDeleteCustomer(${i})"
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

function btnEditCustomer(index){
  document.getElementById("fullName").value = customerList[index].fullName;
  document.getElementById("contactNumber").value = customerList[index].contactNumber;
  document.getElementById("address").value = customerList[index].address;
  document.getElementById("email").value = customerList[index].email;
  document.getElementById("dob").value = customerList[index].dob;

  editIndex = index;
  
  document.getElementById("addBtn").style.display = "none";
  document.getElementById("updateBtn").style.display = "inline-block";
}

function btnDeleteCustomer(index) {
  if (confirm("Are you sure you want to delete this customer?")) {
    customerList.splice(index, 1);
    localStorage.setItem("customerList", JSON.stringify(customerList));
    btnReloadOnClick();
    btnResetOnClick();
  }
}

function btnUpdateOnClick(){
  if(editIndex!=null){
    customerList[editIndex] = {
        fullName: document.getElementById("fullName").value,
        contactNumber: document.getElementById("contactNumber").value,
        address: document.getElementById("address").value,
        email: document.getElementById("email").value,
        dob: document.getElementById("dob").value,
    };
  }

  localStorage.setItem("customerList", JSON.stringify(customerList));
  btnReloadOnClick();
  btnResetOnClick();

  editIndex = null;

  document.getElementById("addBtn").style.display = "inline-block";
  document.getElementById("updateBtn").style.display = "none";
}

function btnResetOnClick(){
  document.getElementById("fullName").value = "";
  document.getElementById("contactNumber").value = "";
  document.getElementById("address").value = "";
  document.getElementById("email").value = "";
  document.getElementById("dob").value = "";
}

