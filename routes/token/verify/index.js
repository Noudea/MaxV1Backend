const router = require('express').Router()

const token = require('../../../services/token')


router.post('/', function(req, res) {
    const userToken = req.body.token
    console.log(userToken)
    if(userToken) {
        token.verifyToken(userToken).then((verifiedToken) => {
            console.log(verifiedToken)
            if(verifiedToken.error) {
                res.status(500).json({error : verifiedToken.error})
            } else if(verifiedToken) {
                token.decodeToken(userToken).then((userToken) => {
                    if(userToken.error) {
                        res.status(500).json({error : verifiedToken.error})
                    } else {
                        token.generateToken(userToken.userId).then((token,error) => {
                            if(token.error) {
                                return res
                                .status(500)
                                .send('Erreur dans la génération du token')
                            } else {
                                console.log('tesdt',token)
                                // Envoi du user + token en réponse
                                return res.send({
                                    token
                                })
                            }
                        })
                    }
                })
            } else {

            }
        } )
    } else {
        res.status(404).json({
            error: "missing token"
        })
    }
});



module.exports = router ;