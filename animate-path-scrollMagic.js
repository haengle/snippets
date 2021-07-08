var homecontroller = new ScrollMagic.Controller();
var drawPath = document.querySelectorAll('.track');


if (drawPath) {
    [...drawPath].forEach(path => {
        var drawPathLength = path.getTotalLength();
        path.style.strokeDasharray = drawPathLength + ' ' + drawPathLength;
        path.style.strokeDashoffset = drawPathLength;
    })


    new ScrollMagic.Scene({
        triggerElement: '#track1',
        offset: 50,
        triggerHook: 0.9,
    })
    .setClassToggle("#track1", "visible") // add class toggle
    .addTo(homecontroller);

    new ScrollMagic.Scene({
        triggerElement: '#track2',
        offset: 50,
        triggerHook: 0.9,
    })
    .setClassToggle("#track2", "visible") // add class toggle
    .addTo(homecontroller);

    new ScrollMagic.Scene({
        triggerElement: '#track3',
        offset: 50,
        triggerHook: 0.9,
    })
    .setClassToggle("#track3", "visible") // add class toggle
    .addTo(homecontroller);
}