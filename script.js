const main = document.getElementById("main");
let data;

fetch("./data.json")
  .then((response) => response.json())
  .then((obj) => renderList(obj.info));

function renderList(array) {
  array.forEach((item) => {
    const details = document.createElement("li");

    const linkPara = item.link
      ? `<p class="item-link">
            <a href="${item.link}" target="_blank">
            ${item.link}
          </a>
        </p>`
      : "";

    details.innerHTML = `
      <h2>${item.title}</h2>
      <p>${item.details}</p>
      ${linkPara}
    `;

    main.appendChild(details);
  });
}
