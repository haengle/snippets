// dynamically wrap youtube/vimeo embed with bootstrap responsive embed eleemnts

function responsiveVideos() {
    var videoSelector = document.querySelectorAll('iframe[src*="youtube"], iframe[src*="vimeo"]');
    var responsiveWrapper = document.querySelector('.embed-responsive');
    if (videoSelector && !responsiveWrapper) {
       [...videoSelector].forEach(video => {
            var newWrapper = document.createElement('div');
            newWrapper.setAttribute('class', 'ratio ratio-16x9 embed-responsive embed-responsive-16by9');
            video.classList.add('embed-responsive-item')
            video.before(newWrapper);
            newWrapper.append(video);
        }) 
    }
}

export {responsiveVideos}