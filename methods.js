// not being used - just some function that i change in the main app but want the keep the old version 


internals.generateMemoryGame = function (images) {
    const dimensions = internals.selectors.board.getAttribute('data-dimension');

    const imagesUrls = images.map(image => image.url);

    console.log("Images URL array: " + imagesUrls);

    if (dimensions % 2 !== 0) {
        throw new Error("The dimension of the board must be an even number.");
    };

    const picks = internals.pickRandomImages(imagesUrls, (dimensions * dimensions) / 2);
    console.log("Pick a random Image method: " + picks);
    const items = internals.shuffleItems([...picks, ...picks]);
    console.log("Shuffle item method: " + items);

    const cards = items.map(url => `
        <div class="card">
            <div class="card-front"></div>
            <div class="card-back" style="background-image: url('${url}')"></div>
        </div>
    `).join('');

    internals.selectors.board.innerHTML = cards;
};
