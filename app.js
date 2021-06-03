const express = require('express');
const morgan = require('morgan');
const mongoose = require('mongoose');
const Blog = require('./dbStuffs/blog');

const app = express();

const dbURI = 'mongodb+srv://shreyansh:Sinansh07@nodetrial.dwmvi.mongodb.net/the-aberrant?retryWrites=true&w=majority';
mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then((result) => app.listen(3000))
    .catch((err) => console.log(err));

app.set('view engine', 'ejs');

app.use(express.static('public'));

app.use(express.urlencoded({ extended: true }));


//routes
app.get('/', (req,res) => {

    res.redirect('/blogs');

});


app.get('/about', (req,res) => {

    res.render('about', { title: 'About' });

});

app.get('/blogs/create', (req,res) => {

    res.render('create', { title: 'Create' });

});

app.get('/blogs', (req, res) => {
    Blog.find().sort({ createdAt : -1 })
        .then((result) => res.render('index', { title: 'Blogs', blogs: result }))
        .catch((err) => console.log(err));
});

app.post('/blogs', (req, res) => {
    const blog = new Blog(req.body);

    blog.save()
        .then((result) => res.redirect('blogs'))
        .catch((err) => console.log(err));
});

app.get('/blogs/:id', (req, res) => {
    const id = req.params.id;
    console.log(id);
    Blog.findById(id)
        .then((result) => {
            res.render('details', { blog: result, title: result.title })
        })
        .catch((err) => console.log(err));
});

app.delete('/blogs/:id', (req, res) => {
    const id = req.params.id;
    Blog.findByIdAndDelete(id)
        .then((result) => {
            res.json({ redirect: '/blogs' })
        })
        .catch((err) => console.log(err));
});



app.use((req, res) => {
    res.status(404).render('404', { title: 'Not found!' });
});