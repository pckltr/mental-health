const main = document.getElementById("main");

fetch("./data.json")
  .then((response) => response.json())
  .catch(onFail)
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

function onFail(error) {
  console.error(error);

  return {
    info: [
      {
        title: 'Oops, something went wrong...',
        details: 'Reload the page. If the issue persists, consider opening an issue on github!',
        link: 'https://github.com/pckltr/mental-health/issues/new'
      }
    ]
  };
}
