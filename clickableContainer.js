// dynamically add Bootstrap 'stretched link' class to an element
// clickableContainer('.element-container');
function clickableContainer(target){
     var targets = document.querySelectorAll(target);
     [...targets].forEach(target => {
         const posValue = getComputedStyle(target);
         const targetLink = target.getElementsByTagName('a')[0];
         if (posValue.position == 'static') { target.style.position = "relative"; }
         targetLink.classList.add('stretched-link');
         targetLink.style.position = "static";
         target.classList.add('clickable');
 
         var targetLinkContentWrapper = document.createElement('span');
         targetLinkContentWrapper.append(...targetLink.childNodes);
         targetLink.appendChild(targetLinkContentWrapper);
     });
 }

 export {clickableContainer};