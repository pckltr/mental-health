const main = document.getElementById("main");
let data;

fetch("./data.json")
  .then((response) => response.json())
  .then((obj) => renderList(obj.info));

function renderList(array) {
  array.forEach((item) => {
    const details = document.createElement("li");
    var newStr = item.details.replace(
      /(<a href=")?((https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)))(">(.*)<\/a>)?/gi,
      function () {
        return (
          '<a target="_blank" href="' +
          arguments[2] +
          '">' +
          (arguments[7] || arguments[2]) +
          "</a>"
        );
      }
    );
    details.innerHTML = `<h2>${item.title}</h2>
          <p>${newStr}</p>`;
    main.appendChild(details);
  });
}
