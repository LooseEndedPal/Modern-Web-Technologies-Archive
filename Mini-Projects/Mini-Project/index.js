const express = require("express");
const app = express();
const port = 3000;
const methodOverride = require('method-override');

app.use(express.json());
app.use(express.urlencoded());
app.set('view engine', 'ejs');
app.use(methodOverride('override'))

const shoppingList = [
    { id: 1, name: 'Pasta', quantity: 1 },
    { id: 2, name: 'Apples', quantity: 1 },
    { id: 3, name: 'Crab', quantity: 1 },
    { id: 4, name: 'Orange Juice', quantity: 1 },
]

app.use((req, res, next) => {
    next()
})


app.get('/', (req, res) => {
    res.render("shoppingList.ejs", { shoppingList });
})

app.get('/add', (req, res) => {
    res.render('updateList.ejs');
})


app.post('/api/shoppingList/increaseQuantity/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const index = shoppingList.findIndex(x => x.id === id);

    shoppingList[index].quantity += 1;

    res.redirect('/')

})

app.post('/api/shoppingList/decreaseQuantity/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const index = shoppingList.findIndex(x => x.id === id);

    shoppingList[index].quantity -= 1;

    if (shoppingList[index].quantity <= 0) {

        if (index !== -1) {
            shoppingList.splice(index, 1);
            res.redirect('/');
        }
        else {
            res.status(404).send(`${itemId} not found.`)
        }
    }

    res.redirect('/')

})

app.post('/api/shoppingList/delete/:id', (req, res) => {

    const itemId = parseInt(req.params.id);

    const index = shoppingList.findIndex(x => x.id === itemId);

    if (index !== -1) {
        shoppingList.splice(index, 1);
        // res.status(200).send(`Workout with ID ${workoutId} deleted.`)
        res.redirect('/');
    }
    else {
        res.status(404).send(`${itemId} not found.`)
    }
})

app.post('/api/add', (req, res) => {

    console.log(req.body.name);

    const newItem = {
        id: shoppingList.length + 1,
        name: req.body.name,
        quantity: 1
    };

    shoppingList.push(newItem);
    res.redirect('/');

})


app.listen(port, () => {
    console.log(`Its running on port ${port}`);
})