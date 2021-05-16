const router = require('express').Router()

router.route('/').all((req, res) => {
// res.header("Access-Control-Allow-Origin: *");
  res.send("Bienvenue sur mon API")
  
})

// middleware that is specific to this router
router.use(function timeLog(req, res, next) {
 if (req) {
        console.info(
           `Requête ${req.method} reçue de ${req.ip} à destination de ${req.url}`
        )
    }
    if (res) {
        console.info(
            `Réponse ${res}`
        )
    }
    next()
});

module.exports = router