console.log("Hello");
let count = 1;
// utility functions:
function getElementFromString(string) {
  let div = document.createElement("div");
  div.innerHTML = string;
  return div.firstElementChild;
}
// Hide parameters box initially
let parametersBox = document.getElementById("parametersBox");
parametersBox.style.display = "none";

let paramsRadio = document.getElementById("paramsRadio");
paramsRadio.addEventListener("click", () => {
  document.getElementById("parametersBox").style.display = "block";
  document.getElementById("requestJsonBox").style.display = "none";
});

let jsonRadio = document.getElementById("jsonRadio");
jsonRadio.addEventListener("click", () => {
  document.getElementById("parametersBox").style.display = "none";
  document.getElementById("requestJsonBox").style.display = "block";
});

// adding more parameters :
let addParam = document.getElementById("addParam");
addParam.addEventListener("click", () => {
  let params = document.getElementById("params");
  let str = `<div class="mb-6 row">
  <label for="url" class="col-sm-2 col-form-label">Parameter ${
    count + 1
  }</label>
  <div class="col-sm-4 my-2">
    <div class="row">
      <div class="col">
        <input
          type="text"
          class="form-control"
          placeholder="Enter Parameter  ${count + 1} Key"
          aria-label="First name"
          id="parameterKey ${count + 1}"
        />
      </div>
      <div class="col">
        <input
          type="text"
          class="form-control"
          placeholder="Enter Parameter ${count + 1} Value"
          aria-label="Last name"
          id="parameterValue${count + 1}"
        />
      </div>
      <button class="btn btn-primary col-sm-2 deleteParam" >-</button>
    </div>
  </div>
</div>`;
  let paramElement = getElementFromString(str);
  params.appendChild(paramElement);
  let deleteParam = document.getElementsByClassName("deleteParam");
  for (item of deleteParam) {
    item.addEventListener("click", (e) => {
      e.target.parentElement.remove();
    });
    count++;
  }
});

// on clicking submit buttoon :
let submit = document.getElementById("submit");
submit.addEventListener("click", () => {
  document.getElementById("responseJsonText").value = "Please wait. . .";

  let url = document.getElementById("url").value;
  let requestType = document.querySelector(
    "input[name='requestType']:checked"
  ).value;
  let contentType = document.querySelector(
    "input[name='contentType']:checked"
  ).value;

  if (contentType == "params") {
    data = {};
    for (let i = 1; i <= count; i++) {
      if (document.getElementById("parameterKey" + i) != undefined) {
        let key = document.getElementById("parameterKey" + i).value;
        let value = document.getElementById("parameterValue" + i).value;
        data[key] = value;
      }
      data = JSON.stringify(data);
    }
  } else {
    data = document.getElementById("requestJsonText").value;
  }
  console.log(url);
  console.log(requestType);
  console.log(contentType);
  console.log(data);

  if (requestType == "GET") {
    fetch(url, {
      method: "GET",
    })
      .then((response) => response.text())
      .then((text) => {
        document.getElementById("responseJsonText").value = text;
      });
  } else {
    fetch(url, {
      method: "POST",
      body: data,
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    })
      .then((response) => response.text())
      .then((text) => {
        document.getElementById("responseJsonText").value = text;
      });
  }
});
