const express = require('express')
const path = require('path');
const data = require('./movies.json')

const app = express();
const port = 3000;

app.use(express.json())
    // app.use(express.static(path.join(__dirname, 'public')));
app.get('/', (req, res) => {
    res.send("Server ok")
})

app.get('/movies', (req, res) => {
    // res.send('Our best movies')
    res.status(200).json(data)
})
app.get("/movies/:id", (req, res) => {
    const id_movie = parseInt(req.params.id);
    const movie = data.find(m => m.id == id_movie);
    res.status(200).json(movie);
});
app.post("/movies", (req, res) => {
    data.push(req.body);
    res.status(200).json(data);
});
app.put("/movies/:id", (req, res) => {
    const id = parseInt(req.params.id);
    let movie = data.find(m => m.id === id);
    (movie.title = req.body.title), (movie.release = req.body.release);
    res.status(200).json(movie);
});
app.delete("/movies/:id", (req, res) => {
    const id = parseInt(req.params.id);
    let movie = data.find(m => m.id === id);
    data.splice(data.indexOf(movie), 1);
    res.status(200).json(data);
});

app.listen(port, () => {
    console.log(`Server listening on port ${port}`);
});