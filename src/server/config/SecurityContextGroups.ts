import {AppSecurityContext} from '../../shared/SecurityContextDTO';
import SecurityContext from '../utils/middleware/tokens/SecurityContext';


export class AnonymousSecurityContext implements AppSecurityContext {

    canDoSomething = false;
    canDoSomethingElse = false;

}


export class UserSecurityContext extends AnonymousSecurityContext {

    canDoSomething = true;

}


export class AdminSecurityContext extends UserSecurityContext {

    canDoSomethingElse = true;

}


SecurityContext.exportDefaultProfile(new AnonymousSecurityContext);
SecurityContext.exportUser('anonymous', new AnonymousSecurityContext);
SecurityContext.exportUser('user', new UserSecurityContext);
SecurityContext.exportUser('admin', new AdminSecurityContext);

export default {
    'anonymous': AnonymousSecurityContext,
    'user': UserSecurityContext,
    'admin': AdminSecurityContext
};
