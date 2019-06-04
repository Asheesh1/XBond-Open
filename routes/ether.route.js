var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});


/**
 * @swagger
 * /talk1-1/create:
 *   post:
 *     tags:
 *       - talk1-1
 *     description: Create Talk1-1
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: member
 *         description: object containing member's details (_id, which is the user id, is mandatory)
 *         in: body
 *         required: true
 *       - name: democrat
 *         description: Boolean
 *         in: body
 *       - name: independent
 *         description: Boolean
 *         in: body
 *       - name: republican
 *         description: Boolean
 *         in: body
 *       - name: topic
 *         description: string
 *         in: body
 *         required: true
 *       - name: description
 *         description: string
 *         in: body
 *         required: false 
 *       - name: callType
 *         description: video or audio
 *         in: body
 *         required: true
 *         example: video
 *     responses:
 *       200:
 *         description: Successfully created
 *       409:
 *         description: Invalid request
 *       500:
 *         description: Backend error
 */

module.exports = router;
