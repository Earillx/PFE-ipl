import {AppSecurityContext} from '../../shared/SecurityContextDTO';
import SecurityContext from '../utils/middleware/tokens/SecurityContext';


export class AnonymousSecurityContext implements AppSecurityContext {

    canDoSomething = false;
    canDoSomethingElse = false;

    canCreateAccount = true;

}


export class AdminSecurityContext extends AnonymousSecurityContext {

    canDoSomethingElse = true;

}


SecurityContext.exportDefaultProfile(new AnonymousSecurityContext);
SecurityContext.exportUser('guest', new AnonymousSecurityContext);
SecurityContext.exportUser('admin', new AdminSecurityContext);

export default {
    'anonymous': AnonymousSecurityContext,
    'admin': AdminSecurityContext
};
