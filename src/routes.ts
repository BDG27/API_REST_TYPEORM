import { Router } from 'express';
import { LoginController } from './controllers/LoginController';
import { RoomController } from './controllers/RoomController';
import { RoomSubjectController } from './controllers/RoomSubjectController';
import { SubjectController } from './controllers/SubjectController';
import { UserController } from './controllers/UserController';
import { VideoController } from './controllers/VideoController';
import { authUser } from './middlewares/authUser';

const routes = Router();

routes.post("/user", new UserController().create);

routes.post("/login", new LoginController().login);

routes.use(authUser);

routes.get("/profile",new UserController().getProfile);

routes.post("/subject", new SubjectController().create);

routes.post("/room", new RoomController().create);

routes.get("/room", new RoomController().findAll);

routes.post("/video", new VideoController().create);

routes.post("/room/subject", new RoomSubjectController().create);

export default routes;