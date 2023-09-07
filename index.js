const express = require('express');
const Joi = require('joi');
const app = express();

app.use(express.json());

const courses = [
    { id: 1, name: "course1" },
    { id: 2, name: 'course2' },
    { id: 3, name: "course3" }
];

app.get('/', (req, res) => {
    res.send('Hello');
});

app.get('/api/courses', (req, res) => {
    res.send(courses);
});

app.get('/api/courses/:id', (req, res) => {
    const course = courses.find(c => c.id === parseInt(req.params.id));
    if (!course) return res.status(404).send("The course with given id is not found");
    res.send(course);
});


app.post('/api/courses', (req, res) => {
    const result = validateCourse(req.body);

    if (result.error) {
        return res.status(400).send(result.error.details[0].message);
    }

    const course = {
        id: courses.length + 1,
        name: req.body.name
    };
    courses.push(course);
    res.send(course);
});


app.put('/api/courses/:id', (req, res) => {
    const course = courses.find(c => c.id === parseInt(req.params.id));
    if (!course) return res.status(404).send('Course with given ID is not found!');

    const result = validateCourse(req.body);

    if (result.error) {
        return res.status(400).send(result.error.details[0].message);
    }

    course.name = req.body.name;
    res.send(course);

});


app.delete('/api/courses/:id', (req, res) => {
    const course = courses.find(c => c.id === parseInt(req.params.id));
    if (!course) return res.status(404).send("Course Id Not found!")

    const index = courses.indexOf(course);
    courses.splice(index, 1);

    res.send(course);
});






function validateCourse(course) {
    const schema = Joi.object({
        name: Joi.string().min(3).required()
    });

    const result = schema.validate(course);
    return result;
};

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log("Listening on port " + PORT));


