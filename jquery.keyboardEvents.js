setupMenu({
    'wrapperEl': '.nav',
    'navEl': '.nav li a'
})

var wrapperEl = args.wrapperEl;
var navEl = args.navEl;


$f(wrapperEl).find('li a').on('keydown', keyboardHandler);

function keyboardHandler(keyVent) {
          var target = keyVent.target;
          var which = keyVent.which;

          if (which === 39) { // RIGHT arrow
            if (isTopLevel(target)) {
              $f(target).parent().next().children('a').focus();
            } else {
              $f(target).parent().next('li').children('a').focus();
            }
          } else if (which === 37) { // LEFT
            if (isTopLevel(target)) {
              $f(target).parent().prev().children('a').focus();
            } else {
              $f(target).parent().prev().children('a').focus();
            }
          } else if (which === 40) { // DOWN
            keyVent.preventDefault();
            if (isTopLevel(target) && hasDropdown(target)) {
              openDropdown(target);
            } else {
              // dropdown item
              if ($f(target).next('ul').length) {
                $f(target).next('ul').find('li:first').children('a').focus();
              } else if ($f(target).parent().next().length) {
                $f(target).parent().next().children('a').focus();
              } else {
                  var parentLi = $f(target).parents()[2];
                  if ($f(parentLi).next().length) {
                    $f(parentLi).next().children('a').focus();
                  } else {
                     // go to next top level link
                     var topLi = $f(target).parents()[4];
                     closeDropdown($f(topLi).find('a'));
                     $f(topLi).next().find('a').focus();
                  }
              }
            }
          } else if (which === 38) { // UP
            keyVent.preventDefault();
            if (isTopLevel(target) && hasDropdown(target)) {
              closeDropdown(target);
            } else {
              // dropdown item
              if ($f(target).prev('ul').length) {
                $f(target).prev('ul').find('li:last').children('a').focus();
              } else if ($f(target).parent().prev().length) {
                $f(target).parent().prev().children('a').focus();
              } else {
                  var parentLi = $f(target).parents()[2];
                  if ($f(parentLi).length) {
                    $f(parentLi).children('a').focus();
                  } 
              }
            }
          } else if (which === 27) { // ESCAPE
            closeDropdown($f(navEl));
          } else if (which === 13 || which === 32) { // ENTER
            if (isTopLevel(target) && hasDropdown(target)) {
              openDropdown(target);
            }
          }
        }

        function isTopLevel(item) {
          return $f(item).is(navEl);
        }

        // determines if the item has a dropdown
        function hasDropdown(item) {
          return $f(item).parent('li').hasClass('haschildren');
        }

        function openDropdown(item) {
          $f(navEl).not($f(item)).attr('aria-expanded','false').removeClass('active').addClass('inactive').next('ul').removeClass('open');
          $f(item).addClass('active').attr('aria-expanded','true').next('ul').addClass('open').find('> li:first > a').focus();
        }

        function closeDropdown(item) {
          $f(item).removeClass('active').attr('aria-expanded','false').next('ul').removeClass('open');
        }
