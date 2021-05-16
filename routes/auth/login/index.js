const router = require('express').Router()

const jwt = require('jsonwebtoken')

const token = require('../../../services/token')

const User = require('../../../models/user')


router
  .route('/') // <URL>:<PORT>/users/login
  .post((req, res) => {
    // Collecte des paramètres de la requête
    const email = req.body.email
    const password = req.body.password

    if (!email) {
      return res.status(500).send('Email manquant')
    } else if (!password) {
      return res.status(500).send('Mot de passe manquant')
    } else {
      // Récupération de l'utilisateur
      User.findOne({ email: email }, (error, user) => {
        if (!user) {
          return res.status(500).send('Identifiants invalides')
        } else {
          // Comparaison du mot de passe
          user.comparePassword(password, (error, isMatch) => {
              console.log('error',error)
              console.log('isMatch',isMatch)
            if (!isMatch) {
              // Mots de passe non identiques
              return res.status(500).send('Identifiants invalides')
            } else if (isMatch) {
              // Mots de passe identiques
              // On prépare le payload du token (informations contenues dans le token)
              const payload = {
                id: user._id
              }
              // Génération du token d'accès (payload + secret + options)
              token.generateToken(user._id).then((token,error) => {
                  if(token.error) {
                    return res
                    .status(500)
                    .send('Erreur dans la génération du token')
                  } else {
                    console.log('tesdt',token)
                    // Envoi du user + token en réponse
                    return res.send({
                        user,
                        token
                    })
                  }
              })


            //   jwt.sign(
            //     payload,
            //     process.env.JWT_SECRET,
            //     { expiresIn: '7d' },
            //     (error, token) => {
            //       if (error) {
            //         return res
            //           .status(500)
            //           .send('Erreur dans la génération du token')
            //       }
            //       // Envoi du user + token en réponse
            //       return res.send({
            //         user,
            //         token
            //       })
            //     }
            //   )
            }
          })
        }
      })
    }
  })

module.exports = router ;