import { CanActivate, ExecutionContext } from "@nestjs/common";
import { Observable } from "rxjs";

export abstract class BaseGuard implements CanActivate {
    
    abstract canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean>;

    protected sendUnauthorizedResponse(context: ExecutionContext) {
        const response = context.switchToHttp().getResponse();
        response.status(401).send();
    }
}