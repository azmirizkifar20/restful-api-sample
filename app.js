const express = require('express');
const app = express();
const PORT = 5000;

// set parsing
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// data buatan
let courses = [
    {
        id: 1,
        title: 'React for Beginners',
        description: 'Learn React concepts step by step and build your React application.',
        price: 250000
    },
    {
        id: 2,
        title: 'Road to React Hooks',
        description: 'Understanding React Hooks and build quite complex application.',
        price: 200000
    },
    {
        id: 3,
        title: 'Getting Started with Node & Express',
        description: 'Learn Node and Express and build Restful services from scratch.',
        price: 250000
    }
];

app.get('/', (req, res, next) => {
    res.status(200).send('Hi from me!');
});

// show all data
app.get('/api/course', (req, res, next) => {
    res.status(200).json(courses);
});

// show single data
app.get('/api/course/:id', (req, res, next) => {
    // courses.find(data => {
    //     if (data.id == req.params.id) {
    //         return res.status(200).json(data);
    //     }
    // });

    var dataFix = courses.find(data => data.id == req.params.id);

    if (!dataFix) {
        return res.status(404).json({ message: `ID ${req.params.id} Tidak ditemukan!` });
    }

    res.status(200).json(dataFix);
});

// insert data
app.post('/api/course', (req, res, next) => {
    // pemborosan
    // const titleCourse = req.body.title;
    // const description = req.body.description;
    // const price = req.body.price;

    const { title, description, price } = req.body;

    var data = {
        id: courses.length + 1,
        title,
        description,
        price
    };

    courses.push(data);
    res.status(200).json(courses);
});

app.delete('/api/course/:id', (req, res, next) => {
    const id = req.params.id;
    var validasi = courses.find(data => data.id == id);

    if (!validasi) {
        return res.status(200).json({
            error: true,
            message: `ID ${id} tidak ditemukan!`
        });
    }

    var data = courses.filter(data => data.id != id);

    // update data
    courses = data;

    res.status(200).json(courses);
});

app.put('/api/course/:id', (req, res, next) => {
    // const { title, description, price } = req.body;
    // let index = courses.findIndex(data => data.id == req.params.id);
    // if (index == -1) {
    //     res.status(404).send({ message: 'Id not found' });
    // } else {
    //     let data = {
    //         id: req.params.id,
    //         title,
    //         description,
    //         price
    //     };
    //     courses[index] = data;
    //     res.status(200).send(courses);
    // }

    var course = courses.find(data => data.id == req.params.id);
    if (!course) {
        return res.status(404).json({ message: `ID ${req.params.id} tidak ditemukan!` });
    }

    const { title, description, price } = req.body;

    course.title = title;
    course.description = description;
    course.price = price;

    res.status(200).json(courses);
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
