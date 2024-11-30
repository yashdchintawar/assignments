function updateFormField() {
  const fieldType = document.querySelector("#form-builder-dropdown").value;
  const fieldName = document.querySelector("#field-name").value;

  if(fieldType === "input-field"){
    formFieldComponantBuilder("input");
  }

  else if(fieldType === "date-picker"){
    formFieldComponantBuilder("date");
  }

  else if(fieldType === "color-picker"){
    formFieldComponantBuilder("color");
  }

  function formFieldComponantBuilder(type){
    const fieldGroup = document.createElement("div");
    fieldGroup.setAttribute("class", "field-group");

    const label = document.createElement("label");
    label.innerHTML = fieldName;

    const inputField = document.createElement("input");
      inputField.setAttribute("type", type);

    fieldGroup.appendChild(label);
    fieldGroup.appendChild(inputField);

    render(fieldGroup);
  }

  function render(element){
    document.querySelector("#dynamic-form").appendChild(element);
  }
}