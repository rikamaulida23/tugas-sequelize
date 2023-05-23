const db = require("../models")

const Book = db.book;
const Op = db.sequelize.Op;

//create book method
exports.create = (req, res) => {
    console.log('>> book controller api');
    //validate request
    if(!req.body.nama){
        res.status(400).send({
            message: "Content can not be empty"
        });
        return;
    }
    console.log('>> create book object');
    //create book object
    const book = {
        nama: req.body.nama,
        tempat_lahir: req.body.tempat_lahir,
        tanggal_lahir: req.body.tanggal_lahir,
        alamat: req.body.alamat,
    };

    //save book to database
    Book.create(book)
    .then( data => {
        console.log('>> insert book successfully');
        res.send(data);
    })
    .catch(err => {
        console.log('>> insert book failed');
        res.status(500).send({
            message: "Error occurred while inserting book."
        });

    });
}

// get all book method
exports.findAll = (req, res) => {
    Book.findAll()
    .then(data => {
        res.send(data);
    })
    .catch(err => {
        res.status(500).send({
            message: err.message || "Error while retrieving books."
        })
    })
}

//find a single books with an id
exports.findOne = (req, res) => {
    Book.findOne ({
        where: {
            id: req.params.id
        }
    })
    .then(data => {
        res.send(data);
    })
    .catch(err => {
        res.status(500).send({
            message: err.message || "Error while finding book."
        });
    });
}

//delete
exports.delete = (req, res) => {
    Book.destroy({
        where: {
            id: req.params.id
        }
    })
    .then(
        res.send({
            message: `Success delete book with id = ${req.params.id}!`
    })
    )
    .catch(err => {
        res.status(500).send({
            message: `could not delete book with id = ${req.params.id}.id`
        });
    });
}

//update
exports.update = (req,res) => {
    //validate requests
    if(!req.body.nama) {
        res.status(400).send({
            message: "title can not be empty!"
        });
        return;
    }
    if(!req.body.tempat_lahir) {
        res.status(400).send({
            message: "author can not be empty!"
        })
        return;
    }
    if(!req.body.tanggal_lahir) {
        res.status(400).send({
            message: "release date can not be empty!"
        })
        return;
    }
    if(!req.body.alamat) {
        res.status(400).send({
            message: "subject can not be empty!"
        })
        return;
    }

    Book.findOne({
        where: {
            id: req.params.id
        }
    })
    .then(data => {
        data.nama = req.body.nama;
        data.tempat_lahir = req.body.tempat_lahir;
        data.tanggal_lahir = req.body.tanggal_lahir;
        data.alamat = req.body.alamat;
        data.save();

        res.send(data);
    })
    .catch(err => {
        res.status(500).send({
            message: err.message || "Error while finding book."
        });
    });
}

exports.patch = (req, res) => {
    Book.findOne({
        where: {
            id: req.params.id
        }
    })
    .then(data => {
        if(req.body.nama){
            data.nama =req.body.nama;
        }
        if(req.body.tempat_lahir){
            data.tempat_lahir =req.body.tempat_lahir;
        }
        if(req.body.tanggal_lahir){
            data.tanggal_lahir =req.body.tanggal_lahir;
        }
        if(req.body.alamat){
            data.alamat =req.body.alamat;
        }

        data.save();

        res.send(data);
    })
    .catch(err=> {
        res.status(500).send({
            message: err.message || "Error while finding book"
        });
    });
}
