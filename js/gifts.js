class VirtualGifts {
    constructor() {
        this.gifts = [
            'A virtual hug! 🤗',
            'Birthday cake! 🎂',
            'Party poppers! 🎉',
            'Birthday crown! 👑',
            'Virtual balloons! 🎈'
        ];
        this.initializeGifts();
    }

    initializeGifts() {
        const giftSection = document.createElement('section');
        giftSection.id = 'virtual-gifts';
        giftSection.innerHTML = `
            <h2>Unwrap Virtual Gifts</h2>
            <div class="gifts-container"></div>
        `;
        document.querySelector('main').appendChild(giftSection);
        this.createGifts();
    }

    createGifts() {
        const container = document.querySelector('.gifts-container');
        this.gifts.forEach(gift => {
            const giftBox = document.createElement('div');
            giftBox.className = 'gift-box unopened';
            giftBox.addEventListener('click', () => this.unwrapGift(giftBox, gift));
            container.appendChild(giftBox);
        });
    }

    unwrapGift(giftBox, surprise) {
        if (giftBox.classList.contains('unopened')) {
            giftBox.classList.remove('unopened');
            giftBox.classList.add('opened');
            giftBox.innerHTML = `<div class="gift-content">${surprise}</div>`;
        }
    }
}