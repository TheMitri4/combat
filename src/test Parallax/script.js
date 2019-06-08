const layers =  document.querySelectorAll('.layer');

function parallax(event) {
    layers.forEach(layer => {
        let speed = layer.getAttribute('data-speed')
        layer.style.transform = `translateX(${event.clientX*speed/1000}px) translateY(${event.clientY*speed/1000}px)`;
    });
}
document.addEventListener('mousemove', parallax)