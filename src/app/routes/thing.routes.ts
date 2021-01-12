import { Router } from 'express';
import boardController from '../controllers/board.controller';
import thingController from '../controllers/thing.controller';
import authGuard from '../middleware/guards/auth.guard';
import projectGuard from '../middleware/guards/project.guard';
import thingGuard from '../middleware/guards/thing.guard';

const routes = Router({ mergeParams: true });

routes.post('/', authGuard.isAuthenticated, projectGuard.isAdmin, thingController.create, boardController.create);
routes.post(
  '/:thingId/board/update',
  authGuard.isAuthenticated,
  projectGuard.isAdmin,
  thingGuard.isFromProject,
  boardController.updateDevicesUpcomingChanges
);
routes.get('/', authGuard.isAuthenticated, projectGuard.isUser, thingController.find);
routes.get('/types', authGuard.isAuthenticated, projectGuard.isUser, thingController.getTypes);
routes.get('/:thingId', authGuard.isAuthenticated, projectGuard.isUser, thingGuard.isFromProject, thingController.findOne);
routes.get('/:thingId/board', authGuard.isAuthenticated, projectGuard.isUser, thingGuard.isFromProject, thingController.getBoardStatus);
routes.put('/:thingId', authGuard.isAuthenticated, projectGuard.isAdmin, thingGuard.isFromProject, thingController.update);
routes.delete('/:thingId', authGuard.isAuthenticated, projectGuard.isAdmin, thingGuard.isFromProject, thingController.delete);

export default routes;
