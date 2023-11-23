let idToNameMapping = {};

fetch("./files/idToNameMapping.json")
  .then((response) => response.json())
  .then((data) => (idToNameMapping = data))
  .catch((error) => console.error("Error loading JSON:", error));

function showNameFromID() {
  const id = document.getElementById("ptrID").value;
  const name = idToNameMapping[id];

  if (name) {
    document.getElementById("ptrName").textContent = name + "さんです！";
  } else {
    document.getElementById("ptrName").textContent = "不明な値さんです！";
  }
}
