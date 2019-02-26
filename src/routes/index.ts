import * as express from 'express';
const router = express.Router();


/* GET home page. */
router.get('/', function(req: express.Request, res: express.Response) {
    res.send('Welcome Home');
});

export = router;