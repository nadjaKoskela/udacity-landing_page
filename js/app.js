// Get list of all sections

const sectionList = Array.from(document.querySelectorAll('section'));
const dropdownMenu = document.getElementById('dropdown-menu');
const burgerIcon = document.getElementById('burger-icon');
let burgerMenuVisible = false;

// Create top menu items

function buildTopMenu() {
  const sectionList = Array.from(document.querySelectorAll('section'));
  const topMenu = document.getElementById('top-menu');
  const dropdownMenu = document.getElementById('dropdown-menu-items');
  sectionList.forEach(e => {
    let newMenuItemTitle = e.id[0].toUpperCase() + e.id.slice(1);
    newMenuItemTitle = newMenuItemTitle.replace('-', ' ');
    // build desktop navigation
    let newMenuItem = document.createElement('li');
    newMenuItem.setAttribute('class', 'top-menu-item');
    newMenuItem.setAttribute('id', `nav-to-${e.id}`);
    newMenuItem.innerHTML = `<p>${newMenuItemTitle}<p>`;
    newMenuItem.addEventListener('click', function () {
      document.getElementById(e.id).scrollIntoView();
    });
    topMenu.append(newMenuItem);
    // build mobile navigation
    let newDropdownMenuItem = document.createElement('li');
    newDropdownMenuItem.setAttribute('class', 'top-menu-item');
    newDropdownMenuItem.setAttribute('id', `mobile-nav-to-${e.id}`);
    newDropdownMenuItem.innerHTML = `<p>${newMenuItemTitle}<p>`;
    newDropdownMenuItem.addEventListener('click', function () {
      document.getElementById(e.id).scrollIntoView();
    });
    dropdownMenu.append(newDropdownMenuItem);
    console.log(e.id);
  });
}

// Highlight active element

// Add overlays to sections

function addOverlays() {
  for (section of sectionList) {
    let e = document.getElementById(section.id);
    section.insertAdjacentHTML(
      'afterbegin',
      `<div id="${section.id}--overlay" class="section-overlay"></div>`
    );
  }
}

// Highlight sections depending on position

function highlightSection() {
  const sectionOverlays = document.getElementsByClassName('section-overlay');
  for (overlay of sectionOverlays) {
    let positionTop = document
      .getElementById(overlay.id)
      .getBoundingClientRect().top;
    if (positionTop < 0.3 * window.innerHeight) {
      Array.from(sectionOverlays).forEach(e => {
        e.classList.remove('highlight');
        removeHighlightMenu(e.id);
      });
      document.getElementById(overlay.id).classList.add('highlight');
      addHighlightMenu(overlay.id);
    }
  }
}

function toggleDropdownMenu() {
  if (burgerMenuVisible === false) {
    showDropdownMenu();
  } else {
    hideDropdownMenu();
  }
  console.log('Done');
}

function showDropdownMenu() {
  burgerIcon.src = 'assets/burger_icon_dark.png';
  dropdownMenu.classList.add('dropdown-menu-visible');
  burgerMenuVisible = true;

  console.log('shown');
}

function hideDropdownMenu() {
  burgerIcon.src = 'assets/burger_icon_light.png';
  dropdownMenu.classList.remove('dropdown-menu-visible');
  burgerMenuVisible = false;

  console.log('hidden');
}

// Highlight menu section

function addHighlightMenu(sectionId) {
  let highlightId = sectionId.slice(0, sectionId.length - 9);

  let activeSectionMenu = document.getElementById(`nav-to-${highlightId}`);
  activeSectionMenu.classList.add('highlight');
}

function removeHighlightMenu(sectionId) {
  let highlightId = sectionId.slice(0, sectionId.length - 9);
  let activeSectionMenu = document.getElementById(`nav-to-${highlightId}`);
  console.log(highlightId);
  activeSectionMenu.classList.remove('highlight');
}

// On page load / assign functionalities

document.addEventListener('scroll', highlightSection);
document
  .getElementById('burger-icon')
  .addEventListener('click', toggleDropdownMenu);
buildTopMenu();
addOverlays();
