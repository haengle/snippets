
// only trigger function for users without prefers reduced motion set
var notReduceMotion = window.matchMedia('(prefers-reduced-motion: no-preference)');
if (!notReduceMotion || notReduceMotion.matches) {
    // do stuff
}

// Accessibility / Helper Functions
function pollContent(content, callback) {
    var numTries = 0;
    var maxTries = 15;
    var interval = 500;
    
    var id = setInterval( function() {
        numTries+=1;
        var c = document.querySelector( content );
        if( c !== null && c !== 'undefined' || numTries > maxTries ) {
            clearInterval(id);
            callback( c );
        }
        
    }, interval);
}

var getSiblings = function (elem) {
    return Array.prototype.filter.call(elem.parentNode.children, function (sibling) {
        return sibling !== elem;
    });
};

var nextUntil = function (elem, selector, filter) {
	var siblings = [];
	var elem = elem.nextElementSibling;
	while (elem) {
		if (elem.matches(selector)) break;
		if (filter && !elem.matches(filter)) {
			elem = elem.nextElementSibling;
			continue;
		}
		siblings.push(elem);
		elem = elem.nextElementSibling;
	}
	return siblings;
};

function wrapAll(nodes, wrapper) {
    var parent = nodes[0].parentNode;
    var previousSibling = nodes[0].previousSibling;
    for (var i = 0; nodes.length - i; wrapper.firstChild === nodes[0] && i++) {
        wrapper.appendChild(nodes[i]);
    }
    parent.insertBefore(wrapper, previousSibling.nextSibling);
    return wrapper;
}

const focusCANDIDATES = `
a, button, input, select, textarea, svg, area, details, summary,
iframe, object, embed, 
[tabindex], [contenteditable]
`;

const trapFocus = (focusNode, rootNode = document) => {
const nodes = [...rootNode.querySelectorAll(focusCANDIDATES)]
    .filter(node => !focusNode.contains(node) && node.getAttribute('tabindex') !== '-1');
nodes.forEach(node => node.setAttribute('tabindex', '-1'));
return;
};

function closeOnEsc(el) {
    document.addEventListener('keydown', function(e) {
        if (e.key === "Escape") { 
            if (typeof el.close == 'function') {
                el.close() 
            }
            if (typeof el.hide == 'function') {
                el.hide();
            }
        }
    });
}

function observeBodyClasses(className, truefunction, falsefunction) {
    var elemToObserve = document.body;
    var classToObserve = className;
    var prevClassState = elemToObserve.classList.contains(classToObserve);

    var observer = new MutationObserver(function(mutations) {
        mutations.forEach(function(mutation) {
            if(mutation.attributeName == "class"){
                var currentClassState = mutation.target.classList.contains(classToObserve);
                if(prevClassState !== currentClassState) {
                    prevClassState = currentClassState;
                    currentClassState ? truefunction() : falsefunction();
                }
            }
        });
    });
    observer.observe(elemToObserve, {attributes: true});
}

function startGlightbox() {
    pollContent('.gslide.current', function() {
        var curslide = document.querySelector('.gslide.current');        
        if (curslide) {
            const focusTrap = trapFocus(curslide);
        }
    });   
}


function endFocus() {
    document.querySelectorAll(focusCANDIDATES).forEach(node => node.removeAttribute('tabindex'));
    var modalsExist = document.querySelectorAll('.modal');
    if (modalsExist) {
        [...modalsExist].forEach(modal => {
            modal.setAttribute('tabindex','-1');
        })
    }
}

export {pollContent, getSiblings, nextUntil, wrapAll, observeBodyClasses, startGlightbox, endFocus}
