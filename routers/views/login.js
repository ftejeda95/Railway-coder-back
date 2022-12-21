import { Router } from 'express';
import passport from 'passport';

const router = Router();

router.get('/', (req, res) => {
      if (!req.isAuthenticated()) {
            res.render('login');
      } else {
            const { user } = req;
            let data = { user: user.email };
            res.render('index', data);
      }
});
router.post(
      '/sign-in',
      passport.authenticate('sign-in', {
            successRedirect: '/',
            failureRedirect: '/faillogin',
      }),
      (req, res) => {
            logger.info(`Ruta ${req.originalUrl} metodo GET`)
            res.redirect('/');
            
      }
);
router.get('/faillogin', (req, res) => {
      logger.info(`Ruta ${req.originalUrl} metodo GET`)
      res.render('faillogin');
});

router.get('/logout', (req, res) => {
      const { username } = req.body;
      req.logout((error) => {
            if (!error) {
                  let data = { user: username };
                  logger.info(`Ruta ${req.originalUrl} metodo GET`)
                  res.render('logout', data);
            } else {
                  logger.error(error.message);
                  res.send('Ocurrio un  error', error.message);
            }
      });
});

export default router;