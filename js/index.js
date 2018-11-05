// Inspired by https://codepen.io/anon/pen/OVZpqO?editors=1100

let item = {
    items: ['test1', 'test2'],
    init: function() {
        this.cacheDom();
        this.bindEvents();
    },
    cacheDom: function() {
        // Cache DOM elements
        this.form = document.getElementById('formItem');
        this.userInput = this.form.elements["inputItem"];
        this.submit = this.form.elements["submitItem"];
        this.clearAll = this.form.elements["clearAll"];
        
        this.listItem = document.getElementById('listItem');
        this.delChildEl = this.listItem.getElementsByClassName('del');
    },
    addItem: function() {
        this.items.push(this.userInput.value);
        this.userInput.value = '';
    },
    createList: function(list) {
        const liEl = document.createElement('li');
        const liText = document.createTextNode(list);
        liEl.appendChild(liText);

        const iEl = document.createElement('b');
        iEl.className = 'del';
        const iText = document.createTextNode('x')
        iEl.appendChild(iText);

        liEl.appendChild(iEl);

        this.listItem.appendChild(liEl)
    },
    deleteItem: function(childEl) {
        childEl.parentNode.remove();
    },
    deleteAllItems: function() {
        // delete items in DOM
        for (let i = 0, delChildElLength = this.delChildEl.length; i < delChildElLength; i++) {
            this.delChildEl[0].parentNode.remove();
            console.log(delChildElLength);
        }
        
        // clear out this.items array
        this.items.length = 0;
    },
    bindEvents: function() {
        // show existing items
        if (this.items.length > 0) {
            for (const item of this.items){
                this.createList(item);
            }
        }

        // show new items after clicking the button
        this.submit.addEventListener("click", e => {
            e.preventDefault();
            if (this.userInput.value !== '') {
                this.addItem();

                const newItem = this.items.length - 1;
                this.createList(this.items[newItem]);
            } else {
                alert('Enter a value');
            }
        });

        // show new items after pressing enter
        this.userInput.addEventListener("keypress", e => {
            if (e.keyCode === 13) {
                e.preventDefault();
                if (this.userInput.value === '') {
                    alert('Enter a value');
                } else {
                    this.addItem();

                    const newItem = this.items.length - 1;
                    this.createList(this.items[newItem]);
                }
            }
        });


        // delete an item
        this.listItem.addEventListener("click", e => {
            e.preventDefault();
            if (e.target.className === 'del'){
                this.deleteItem(e.target);
            }
        });

        // delete all items
        this.clearAll.addEventListener("click", e => {
            e.preventDefault();
            this.deleteAllItems();
        });
    }
};

item.init();