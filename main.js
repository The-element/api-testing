const baseURL = "https://ci-swapi.herokuapp.com/api/";  //Stores the url to the api.

function getData(type, cb) {    //Creates the function getData
    var xhr = new XMLHttpRequest();//this gives us the method to open connections, to send connections, and close them.
//XML stands for Extensible Markup Language, which is similar to HTML in the way it structures its data, and it's a precursor to JSON.


    xhr.onreadystatechange = function() {   //whenever the state changes of our xhr object, we want to run a check.
        if (this.readyState == 4 && this.status == 200) {   //If the ready state is equal to 4 and the status is 200, then do the following:
            cb(JSON.parse(this.responseText));  // cb calls the function getData to print the JSON-object to the console.
        //document.getElementById("data").innerHTML = this.responseText; //And then we're going to change the innerHTML to be equal to the response text that comes back from our xhr object.
        // if everything went well, then we're going to get a div ID of "data", and put the response text in it.
        }
    };

    xhr.open("GET", baseURL + type + "/");
    xhr.send();
}

function getTableHeaders(obj){
    var tableHeaders = [];
    Object.keys(obj).forEach(function(key){
        tableHeaders.push(`<td>${key}</td>`);
    });
    return `<tr>${tableHeaders}</tr>`;
}

function writeToDocument(type) {
    var tableRows = [];
    var el = document.getElementById("data");
    el.innerHTML = "";

    getData(type, function(data) {
        data = data.results;
        var tableHeaders = getTableHeaders(data[0]);

        data.forEach(function(item) {
            //el.innerHTML += "<p>" + item.name + "</p>";
            var dataRow = [];
            Object.keys(item).forEach(function(key){
                dataRow.push(`<td>${item[key]}</td>`);
            });
            tableRows.push(dataRow);
        });
        el.innerHTML = `<table>${tableHeaders}${tableRows}</table>`;
    });
}