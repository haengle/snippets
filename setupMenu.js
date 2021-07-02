
// Setup a UL list of links to behave like Bootstrap 5 dropdown menus
// setupMenu({
//    'behave': "click",  // click or hover
//   'wrapperEl': '.navUl',
//    'navEl': '.navUl > li > a'           
//});

function setupMenu(args) {
    //check parameters
        if (typeof args === "undefined" ||
            typeof args.behave === "undefined" ||
            typeof args.wrapperEl === "undefined" ||
            typeof args.navEl === "undefined") {
            
            console.log('Incorrect/missing arguments. Menu not set up.');
            return false;
        }

    var behave = args.behave;    
    const childmenus = document.querySelectorAll(args.wrapperEl +' > li');
    [...childmenus].forEach(child => {
        // menu link has a 2nd tier
        if (child.hasChildNodes() && child.children[1] !== undefined) {
            var hasUl = child.children[1].children;
            if (hasUl.length > 1) {
                child.classList.add('haschildren');
                child.classList.add('dropdown');
            } else {
                child.children[0].classList.add('no-menu');
            }
        } else {
            child.children[0].classList.add('no-menu');
        }
    });
    
    var setupMenus = document.querySelectorAll(args.wrapperEl +' > li.haschildren');
    [...setupMenus].forEach(menu => {
        var thelink = menu.firstElementChild;
        thelink.classList.add('dropdown-toggle');
        thelink.setAttribute('data-bs-toggle','dropdown');
        thelink.setAttribute('aria-expanded','false');
        thelink.setAttribute('role','button');
        thelink.setAttribute('aria-haspopup','true');
        thelink.nextElementSibling.classList.add('dropdown-menu');

        if (behave == "hover") {
            menu.addEventListener('mouseover', () => {
                menu.classList.add('show');
                thelink.classList.add('active');
                thelink.setAttribute('aria-expanded','true');
                thelink.nextElementSibling.classList.add('show');
            });
            menu.addEventListener('mouseout', () => {
                menu.classList.remove('show');
                thelink.classList.remove('active');
                thelink.setAttribute('aria-expanded','false');
                thelink.nextElementSibling.classList.remove('show');
            })
        }
    });

    var subMenus = document.querySelectorAll(args.wrapperEl +' > li > ul > li');
    [...subMenus].forEach(sub => {
        if (sub.hasChildNodes() && sub.children[1] !== undefined) {
            var hasUl = sub.children[1].children;
            if (hasUl && hasUl.length > 1) {
                sub.classList.add('haschildren');
            }
        }
    })
    
    // disable default link from menu nav links
    var disableClickThru = document.querySelectorAll(args.wrapperEl + ' a.dropdown-toggle');
    [...disableClickThru].forEach(disabled => {
        disabled.setAttribute('href', ''); // bootstrap dropdown chokes if the href is left in here
    });
}

export {setupMenu}