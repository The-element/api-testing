var xhr = new XMLHttpRequest();//this gives us the method to open connections, to send connections, and close them.
//XML stands for Extensible Markup Language, which is similar to HTML in the way it structures its data, and it's a precursor to JSON.
var data; //a variable to store the JSON-Object.

//Now that we have this listener waiting to see for xhr's state to change, I need to open a connection:
xhr.open("GET", "https://ci-swapi.herokuapp.com/api/");
xhr.send();

function setData(jsonData){ //jsonData is the value beign send in to the function by the calling of the function in the function below.
    data = jsonData;
};

xhr.onreadystatechange = function() { //whenever the state changes of our xhr object, we want to run a check.
    if (this.readyState == 4 && this.status == 200) { //If the ready state is equal to 4 and the status is 200, then what we want to do is use JavaScript to do document.getElementByID() and retrieve our data div.
        data = JSON.parse(this.responseText); // calls the above function setData to store the JSON-object to the data variable.
        //document.getElementById("data").innerHTML = this.responseText; //And then we're going to change the innerHTML to be equal to the response text that comes back from our xhr object.
        // if everything went well, then we're going to get a div ID of "data", and put the response text in it.
    };
}

setTimeout(function(){ //This function runs after 500 milliseconds has passed.
    console.log(data);
}, 500);