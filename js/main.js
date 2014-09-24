/* Define the functions we'll use */
function completeItem(){
  this.nextSibling.className = "completed";
}

/* This function reads the form and returns an object with the form values */
function getFormValues(){
  var form = document.getElementById ("the_form");
  var tsk = form.elements.task.value;
 
  return {task: tsk}; 
}


/* This function adds a new list item to the list using the given parameters */

/* Why do we separate this function from the one above? Where else do these values come from? */

function addListItem( formValues){
  /* make the list item element */
  var item = document.createElement("li");
  

    /* put a checkbox at the start of a list item and make it clickable */

  var checkbox = document.createElement("input");
  checkbox.setAttribute("type","checkbox");
  checkbox.setAttribute("class", "checkbox");
  checkbox.addEventListener("click", completeItem);
  item.appendChild(checkbox);


    /* add the text from the parameter and make it styable using a span element */

  var the_span = document.createElement("span");

  /* make the text node and attach it to the list element */
  var node = document.createTextNode( formValues.task);
  item.appendChild(node);

  the_span.appendChild(node);
  item.appendChild(the_span);

  /* make the image for the delete button and attach it to the list item element */
  deleteButtonImage = document.createElement("img");
  deleteButtonImage.setAttribute("src", "img/delete.png");
  deleteButtonImage.setAttribute("alt", "[X]");
  deleteButtonImage.setAttribute("class", "deleteListItem");
  /* make it clickable */
  deleteButtonImage.addEventListener("click", removeListItem);
  /* attach the button to the list item */
  item.appendChild(deleteButtonImage);
  /* attach the list item to the list */
  
  var list = document.getElementById("taskList");
  list.appendChild(item);

 }

/* This function uses two other functions to 1) get the values from the form, and 2) put them in the list */
function addListItemFromForm() {
  addListItem( getFormValues());
}


/* This function will be called when the delete button image in the list item is clicked. */
function removeListItem() {
  var listItem = this.parentNode;
  listItem.parentNode.removeChild(listItem);
}

/* this function sets up things to catch clicks on the form submit button */
function setUpForm(){
  var button = document.getElementById("submitButton");
  button.addEventListener("click", addListItemFromForm); 
}

/* this function sets up things to catch clicks on ALL the current delete buttons */
function attachDeleteButtonListeners() {
  /* Find all the delete buttons (which are images) */
  var closeButtonElements = document.getElementsByClassName("deleteListItem");

  /* For each one, add an event listener */
  if (closeButtonElements.length > 0) {
    for (var i = 0; i<closeButtonElements.length; i++) {
      closeButtonElements[i].addEventListener("click", removeListItem);
    }  
  }
  else { /* handle errors */
    console.log("No delete buttons found.");
  }
}

/* this function adds a bunch of dummy values to the list */
function makeStartingList(){
  for(var i = 0; i<3; i++){
    addListItem( {task: "Get eggs"});
  }
}

/* FINALLY, let's run the functions we've defined to get the page ready for the user */
setUpForm();
makeStartingList();
attachDeleteButtonListeners();


