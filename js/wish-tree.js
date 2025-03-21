class WishTree {
    constructor() {
        this.wishes = [];
        this.initializeTree();
    }

    initializeTree() {
        const treeSection = document.createElement('section');
        treeSection.id = 'wish-tree';
        treeSection.innerHTML = `
            <h2>Birthday Wish Tree</h2>
            <div class="tree-container">
                <div class="tree"></div>
                <div class="wishes-container"></div>
            </div>
            <div class="wish-form">
                <input type="text" id="wish-text" placeholder="Write your wish...">
                <button id="add-wish">Hang Wish</button>
            </div>
        `;
        document.querySelector('main').appendChild(treeSection);
        this.bindEvents();
    }

    addWish(text) {
        const wish = document.createElement('div');
        wish.className = 'wish-leaf';
        wish.innerHTML = text;
        wish.style.left = `${Math.random() * 80 + 10}%`;
        wish.style.top = `${Math.random() * 60 + 20}%`;
        wish.style.transform = `rotate(${Math.random() * 30 - 15}deg)`;
        document.querySelector('.wishes-container').appendChild(wish);
    }

    bindEvents() {
        document.getElementById('add-wish').addEventListener('click', () => {
            const wishText = document.getElementById('wish-text').value;
            if (wishText.trim()) {
                this.addWish(wishText);
                document.getElementById('wish-text').value = '';
            }
        });
    }
}