// generate bootstrap accordion component from set of title/content elements or from a WYSIWYG token for specific headings

import {nextUntil, wrapAll} from './utilities';

// Toggles/Accordions
function createAccordionTitles(el) {
    var el = document.querySelectorAll(el);
    [...el].forEach(a => {
        var accordionId = a.textContent.trim();
        accordionId = accordionId.replace(/[^a-z0-9\s]/gi, '').replace(/[_\s]/g, '-').replace('--','-').toLowerCase();
        var contentId = 'tab-'+accordionId + '-content';
        a.setAttribute('id','tab-'+accordionId);
        a.nextElementSibling.setAttribute('id', contentId);

        var titleBtn = document.createElement('button');
        titleBtn.classList.add('accordion-button');
        titleBtn.classList.add('collapsed');
        titleBtn.setAttribute('data-bs-toggle','collapse');
        titleBtn.setAttribute('data-bs-target','#'+contentId);
        titleBtn.setAttribute('aria-controls',contentId);
        titleBtn.innerHTML = a.innerHTML;
        a.innerHTML = '';
        a.appendChild(titleBtn);
    })
}

function createAccordionContent(el) {
    var el = document.querySelectorAll(el);
    [...el].forEach( b => {
        var accordionContentWrapper = document.createElement('div');
        accordionContentWrapper.setAttribute('class','accordion-body');
        accordionContentWrapper.append(...b.childNodes);
        b.appendChild(accordionContentWrapper);
        var checkNotEmpty = b.querySelector('.accordion-body');
        if (checkNotEmpty.children.length == 0) { checkNotEmpty.remove(); }        
    });
}

function wrapAccordionItems(el) {
    var titles = el.querySelectorAll('.accordion-header');
    [...titles].forEach(t => {
        var accordionItemWrapper = document.createElement('div');
        accordionItemWrapper.setAttribute('class','accordion-item');
        t.parentNode.appendChild(accordionItemWrapper);
        var accordionItemWrapperContent = t.nextElementSibling;
        accordionItemWrapper.appendChild(t);
        accordionItemWrapper.appendChild(accordionItemWrapperContent);
    })
}

function setupAccordions( expand ) {
    generalAccordion();

    var open = expand || false;
    var accordion = document.querySelectorAll('.accordion:not(.page-tabs)');

    createAccordionTitles('.accordion:not(.page-tabs) .accordion-header');
    createAccordionContent('.accordion:not(.page-tabs) .accordion-collapse');


   [...accordion].forEach((acc, index) => {
        acc.setAttribute('data-accordion', index);
        if (open === true) { acc.setAttribute('data-open','true'); } 

        wrapAccordionItems(acc)
   });

   openAccordionOnLoad();
}

function generalAccordion() {
    var findWysiwygToken = document.getElementsByTagName('p');
    [...findWysiwygToken].forEach(token => {
        var searchtext = token.textContent;
        if (searchtext.includes('{beginAccordion')) {
            token.classList.add('start-accordion');
        }
        if (searchtext.includes('{endAccordion')) {
            token.classList.add('end-accordion');
        }
        if (searchtext.includes('{openTab}')) {
            token.classList.add('d-none');
        }
        if (searchtext.includes('{closeTab}')) {
            token.classList.add('d-none');
        }
    });

    var startAccordion = document.querySelectorAll('.start-accordion');

    [...startAccordion].forEach((start, index) => {
        var index = index;
        var createAccordionWrapper = document.createElement('div');
        createAccordionWrapper.setAttribute('class','accordion');
        var findAccordionContent = nextUntil(start, '.end-accordion');
        start.parentNode.insertBefore(createAccordionWrapper, start);

        for (let accItem of findAccordionContent.entries()) {
            var appendItem = accItem[1];
            createAccordionWrapper.append(appendItem);
        }

        var startAccordionParams = document.querySelector('.start-accordion').textContent.split(' ');
        if (startAccordionParams.length == 1) {
            createAccordionWrapper.setAttribute('data-heading', 'h3');
            createAccordionWrapper.setAttribute('data-open', 'false');
        }
        // specified heading other than h3
        if (startAccordionParams.length == 2) {
          var useHeading = startAccordionParams[1].substring(0, startAccordionParams[1].length - 1);
          createAccordionWrapper.setAttribute('data-heading', useHeading);
          createAccordionWrapper.setAttribute('data-open', 'false');
        }
        // specified heading & open/close value
        if (startAccordionParams.length == 3) {
            var useHeading = startAccordionParams[1].substring(0, startAccordionParams[1].length);
            var startParam = startAccordionParams[2].substring(0, startAccordionParams[2].length - 1);          
            if (startParam == "open" || startParam == "true") {
                startParam = true;
            } else { 
                startParam = false 
            }
            
            createAccordionWrapper.setAttribute('data-heading', useHeading);
            createAccordionWrapper.setAttribute('data-open', startParam);
        }

        start.remove();
    });

    var accordionWrapper = document.querySelectorAll('.accordion:not(.page-tabs)');

    [...accordionWrapper].forEach(accordion => {
        var useHeading = accordion.getAttribute('data-heading');
        createWysiwygAccordion(accordion, useHeading);
    });

    function createWysiwygAccordion(p, h) {
        var accordionHeadings = p.getElementsByTagName(h);
        for (const heading of accordionHeadings) {
            heading.classList.add('accordion-header');
            var contentWrapper = document.createElement('div');
             contentWrapper.setAttribute('class','accordion-collapse collapse');
             var content = nextUntil(heading, h);
             wrapAll(content, contentWrapper);
        };
    }
  }

function openAccordionOnLoad() {
    var openTabs = document.querySelectorAll('.accordion');
    [...openTabs].forEach(open => {
        if (open.getAttribute('data-open') == 'true' && open.children.length !== 1){
            open.querySelector('.accordion-button').click();
        } else if (open.children.length === 1) {
            open.querySelector('.accordion-button').click();
        }

        var token = open.getElementsByTagName('p');
        [...token].forEach(t => {
            var hasClosestTab = t.closest('.accordion-collapse');
            if (hasClosestTab) {
                var tab = hasClosestTab.previousElementSibling.firstElementChild;
            }

            if (t.textContent == "{openTab}") {
               if (tab !== null) { tab.click(); }
            }
            if (t.textContent == "{closeTab}") {
                if (tab !== null && tab.matches('[aria-expanded="true"]')) { tab.click(); }
            }
        });

        // if hash in URL
        var urlHash = window.location.hash;
        if (urlHash) {
            var findAccordion = document.querySelector(urlHash);
            if (findAccordion && findAccordion.classList.contains('accordion-header')) {
                findAccordion.firstElementChild.click();
            }
        }
        
    });
}

export {setupAccordions}