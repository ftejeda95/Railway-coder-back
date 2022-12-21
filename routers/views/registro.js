import { Router } from 'express';
import passport from 'passport';
const router = Router();
import logger from '../../logger.js'

router.get('/registro', (req, res, next) => {
      res.render('registro');
});

router.get('/failregister', (req, res) => {
      res.render('failregister');
});
router.post(
      '/sign-up',
      passport.authenticate('sign-up', {
            successRedirect: '/',
            failureRedirect: '/failregister',
      }),
      (req, res) => {
            const { user } = req;
            logger.info(`Ruta ${req.originalUrl} metodo GET`)
            console.log('register -> user', user);
      }
);
export default router;