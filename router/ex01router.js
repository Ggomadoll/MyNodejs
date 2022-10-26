const { request } = require("express");
const express = require("express");
const ex01router = express.Router();    // express 갖고있는 기능중에 router기능을 사용




router.get('/ex01', (req, res) => {
    const name = req.query.name;
    const season = req.query.seasons;

    res.render('ex01', {
        name: name,
        season: season
    })
})

module.exports = ex01router;