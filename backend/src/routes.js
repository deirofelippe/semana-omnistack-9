const express = require('express');
const multer = require('multer');
const uploadConfig = require('./config/upload')

const SessionController = require('./controllers/SessionController');
const SpotController = require('./controllers/SpotController');
const DashboardController = require('./controllers/DashboardController');
const BookingController = require('./controllers/BookingController');
const ApprovalController = require('./controllers/ApprovalController');
const RejectionController = require('./controllers/RejectionController');

const routes = express.Router();
const upload = multer(uploadConfig);

routes.post('/sessions', SessionController.store);

routes.get('/spots', SpotController.index);
routes.post('/spots', upload.single('thumbnail'), SpotController.store);

routes.get('/dashboard', DashboardController.show);

routes.post('/spots/:spot_id/bookings', BookingController.store);

/*classes com nomes n mt legiveis, dificeis de entender seu objetivo. acesso ao banco de dados junto com controller e model. */
/*tarefas: 1 - so o dono pode aprovar ou reprovar. 2 - depois de aprovado ou reprovado, ele pode mudar p reprovado ou aprovado. 3 - pagina de solicitacao */
/*front: o dono aceita ou rejeita, mobile: o usuario faz solicitacao */
/* */
routes.post('/bookings/:booking_id/approvals', ApprovalController.store);
routes.post('/bookings/:booking_id/rejections', RejectionController.store);


module.exports = routes;