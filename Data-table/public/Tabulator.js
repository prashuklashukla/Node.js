
//Build Tabulator
var table = new Tabulator("#userTable", {
  ajaxURL: "http://localhost:3000/api/users",
  clipboard: true,
  printAsHtml: true,
  printHeader: "<h1>Example Table Header<h1>",
  printFooter: "<h2>Example Table Footer<h2>",
  ajaxResponse: function (url, params, response) {
    //url - the URL of the request
    //params - the parameters passed with the request
    //response - the JSON object returned in the body of the response.

    return response.data; //return the tableData property of a response json object
  },
  layout: "fitColumns",
  pagination: true,
  paginationSize: 10,
  paginationSizeSelector: [10, 25, 50, 100],
  placeholder: "No Data Set",
  columns: [
    { title: "Name", field: "name" , headerFilter:"input"},
    { title: "Email", field: "email" , headerFilter:"input"},
    { title: "Age", field: "age" },
    {
      title: "Action",
      formatter: function () {
        return `
              <button onclick="viewUser()">view</button>
   <button onclick="updateUser()">updata</button>
<button onclick="deleteUser()">delete</button>
            `;
      },
    },
  ],
});

document.querySelector("#print-table").addEventListener("click", function () {
  table.print(false, true);
});

//trigger download of data.csv file
document.getElementById("download-csv").addEventListener("click", function(){
    table.download("csv", "data.csv");
});

//trigger download of data.json file
document.getElementById("download-json").addEventListener("click", function(){
    table.download("json", "data.json");
});

//trigger download of data.xlsx file
document.getElementById("download-xlsx").addEventListener("click", function(){
    table.download("xlsx", "data.xlsx", {sheetName:"My Data"});
});

//trigger download of data.pdf file
document.getElementById("download-pdf").addEventListener("click", function(){
    table.download("pdf", "data.pdf", {
        orientation:"portrait", //set page orientation to portrait
        title:"Example Report", //add title to report
    });
});

//trigger download of data.html file
document.getElementById("download-html").addEventListener("click", function(){
    table.download("html", "data.html", {style:true});
});


//search 
// Search
var fieldEl = document.getElementById("filter-field");
var typeEl = document.getElementById("filter-type");
var valueEl = document.getElementById("filter-value");

function updateFilter(){
  var filterVal = fieldEl.value
  var typeVal = typeEl.value
  var filter = valueEl.value

  if(filterVal){
    table.setFilter(filterVal,typeVal, filter);
  }
}

valueEl.addEventListener("keyup", updateFilter)