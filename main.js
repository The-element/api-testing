function getData(url, cb) {    //Creates the function getData
    var xhr = new XMLHttpRequest();//this gives us the method to open connections, to send connections, and close them.
//XML stands for Extensible Markup Language, which is similar to HTML in the way it structures its data, and it's a precursor to JSON.


    xhr.onreadystatechange = function() {   //whenever the state changes of our xhr object, we want to run a check.
        if (this.readyState == 4 && this.status == 200) {   //If the ready state is equal to 4 and the status is 200, then do the following:
            cb(JSON.parse(this.responseText));  // cb calls the function getData to print the JSON-object to the console.
        //document.getElementById("data").innerHTML = this.responseText; //And then we're going to change the innerHTML to be equal to the response text that comes back from our xhr object.
        // if everything went well, then we're going to get a div ID of "data", and put the response text in it.
        }
    };

    xhr.open("GET", url);
    xhr.send();
}

function getTableHeaders(obj){
    var tableHeaders = [];
    Object.keys(obj).forEach(function(key){
        tableHeaders.push(`<td>${key}</td>`);
    });
    return `<tr>${tableHeaders}</tr>`;
}

function generatePaginationButtons(next, prev){
    if(next && prev){
        return `<button onclick="writeToDocument('${prev}')">Previous</button>
                <button onclick="writeToDocument('${next}')">Next</button>`;
    }else if(next && !prev){
        return `<button onclick="writeToDocument('${next}')">Next</button>`;
    }else if(!next && prev){
        return `<button onclick="writeToDocument('${prev}')">Previous</button>`;
    }
};

function writeToDocument(url) {
    var tableRows = [];
    var el = document.getElementById("data");
    el.innerHTML = "";

    getData(url, function(data) {

        var pagination;
        if(data.next || data.previous){
            pagination = generatePaginationButtons(data.next, data.previous);
        };

        data = data.results;
        var tableHeaders = getTableHeaders(data[0]);

        data.forEach(function(item) {
            //el.innerHTML += "<p>" + item.name + "</p>";
            var dataRow = [];
            Object.keys(item).forEach(function(key){
                var rowData = item[key].toString();
                var truncatedData = rowData.substring(0, 15);

                dataRow.push(`<td>${truncatedData}</td>`);
            });
            tableRows.push(`<tr>${dataRow}</tr>`);
        });
        el.innerHTML = `<table>${tableHeaders}${tableRows}</table>${pagination}`.replace(/,/g, "");   // /,/ = sök efter komma. g = stanna inte efter första kommat, fortsätt sök igenom allt.
    });
}