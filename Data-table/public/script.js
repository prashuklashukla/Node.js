$(document).ready(function () {
  $("#userTable").DataTable({
    ajax: {
      url: "http://localhost:3000/api/users",
      dataSrc: "data",
    },
    columns: [
      {
        data: null,
        title: "S.no",
        render: function (data, type, row, meta) {
          return meta.row + 1;
        },
      },
      {
        data: "name",
      },
      {
        data: "email",
      },
      {
        data: "age",
      },
      {
        data: null,
        render: function (data, type, row) {
          return `
     <button onclick="viewUser('${row._id}')">view</button>
   <button onclick="editUser('${row._id}')">updata</button>
<button onclick="deleteUser("${data}")">delete</button>
      `;
        },
      },
    ],
    layout: {
      topStart: {
        buttons: ["csvHtml5", "excelHtml5", "pdfHtml5", "copyHtml5"],
      },
    },
  });
});

async function viewUser(id) {
  try {
    const res = await fetch(`http://localhost:3000/api/users/${id}`);
    const user = await res.json();

    const tbody = document.querySelector("#viewsStudent");

    tbody.innerHTML = `
      <tr>
        <td>Name:</td>
        <td>${user.name}</td>
         <br>
      </tr>
      <tr>
        <td>Email:</td>
        <td>${user.email}</td>
         <br>
      </tr>
      <tr>
        <td>Age:</td>
        <td>${user.age}</td>
         <br>
      </tr>
    `;

    loadUser();
  } catch (err) {
    console.log(err);
  }
}

