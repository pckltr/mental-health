const main = document.getElementById("main");

fetch("./data.json")
  .then((response) => response.json())
  .catch(onFail)
  .then((obj) => renderList(obj.info));

function renderList(array) {
  array.forEach((item) => {
    const details = document.createElement("li");

    details.innerHTML = `
      <h2>${item.title}</h2>
      <p>${item.details}</p>
      ${getLink(item.link)}
    `;

    main.appendChild(details);
  });
}

function getLink(link) {
  if (!link) {
    return '';
  }

  const icon = getIconClass(link);
  const className = icon
    ? 'fab fa-' + icon
    : 'fas fa-link'
  ;

  return `
    <p class="item-link">
      <i class="${className}"></i>
      <a href="${link}" target="_blank">${link}</a>
    </p>`
  ;
}

function getIconClass(link) {
  const hostname = getHostname(link);

  switch (hostname) {
    case 'github.com':
      return 'github';
    case 'medium.com':
      return 'medium';
    case 'www.youtube.com':
      return 'youtube';
    case 'reddit.com':
    case 'redditgrid.com':
      return 'reddit';
  }

  return false;
}

function getHostname(link) {
  try {
    const url = new URL(link);

    return url.hostname;
  } catch(e) {
    console.warn(e);
    return false;
  }
}

function onFail(error) {
  console.error(error);

  main.classList.add('error');

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
