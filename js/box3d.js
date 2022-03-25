const box3dCalcValue = (a, b, range) => (a / b * range - range / 2).toFixed(1);

const addEffectBox3d = (box3d) => {

    const range = 40; 
    const images = box3d.querySelectorAll(".box3d_card_img");
    const backgrounds = box3d.querySelectorAll(".box3d_card_bg");

    let box3dTimeout;
    box3d.addEventListener('mousemove', ({ x, y }) => {
        if (box3dTimeout) window.cancelAnimationFrame(box3dTimeout);
    
        const { left, top, width, height } = box3d.getBoundingClientRect();

        const yValue = box3dCalcValue(y - top, height, range);
        const xValue = box3dCalcValue(x - left, width, range);

        box3d.style.transition = '0s';
        box3d.style.transform = `rotateX(${yValue * .5}deg) rotateY(${xValue * .5}deg)`;

        box3dTimeout = window.requestAnimationFrame(() => {
    
            [].forEach.call(images, (image) => {
                image.style.transition = '0s';
                image.style.transform = `translateX(${-xValue}px) translateY(${yValue}px)`;
            });
    
            [].forEach.call(backgrounds, (background) => {
                background.style.transition = '0s';
                background.style.backgroundPosition = `${xValue}px ${-yValue}px`;
            })
        })
    }, false);

    box3d.addEventListener('mouseleave', () => { 

        box3d.style.transition = '1s';
        box3d.style.transform = ``;
    
        [].forEach.call(images, (image) => {
            image.style.transition = '1s';
            image.style.transform = ``;
        });

        [].forEach.call(backgrounds, (background) => {
            background.style.transition = '1s';
            background.style.backgroundPosition = ``;
        })
    })
}

const renderBox3d = (box3d) => {
    const box3dData = JSON.parse(box3d.getAttribute("data"));
    box3d.innerHTML =
    `
    <h3 class="box3d_description">${box3dData.description}</h3>
    <h1 class="box3d_title">${box3dData.title}</h1>
    <div class="box3d_cards">${box3dData.cards.map(card =>
    `
        <div class="box3d_card">
            <div class="box3d_card_bg" style="background-image: url('${card.background}')"></div>
            <img class="box3d_card_img" src="${card.image}" />
            <div class="box3d_card_text">
                <p class="box3d_card_title">${card.title}</p>
            </div>
        </div>
    `
    ).join('\n')}
    </div>
    `;
}

const renderBox3ds = () => {
    const box3dList = document.querySelectorAll(".box3d");
    box3dList.forEach(renderBox3d);
    box3dList.forEach(addEffectBox3d);
}

window.addEventListener('load', renderBox3ds);