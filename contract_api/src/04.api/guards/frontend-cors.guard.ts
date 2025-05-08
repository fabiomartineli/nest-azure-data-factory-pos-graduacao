import { ExecutionContext, Inject } from "@nestjs/common";
import { Observable } from "rxjs";
import { BaseGuard } from "./base.guard";
import { AppConfigurationService } from "src/03.infra/03.03.app-configuration/service/app-configuration.service";
import { IAppConfigurationService } from "src/03.infra/03.03.app-configuration/service/iapp-configuration.service";

export class FrontendCorsGuard extends BaseGuard {
    private readonly _appConfiguration: IAppConfigurationService;

    constructor(@Inject(AppConfigurationService) appConfiguration: IAppConfigurationService) {
        super();
        this._appConfiguration = appConfiguration;
    }

    override canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
        const request = context.switchToHttp().getRequest();
        const apikey = request.headers["x-api-key"] ?? request.query["x-api-key"];
        const allowedOrigin = this._appConfiguration.getValue<string>("FRONTEND_API_KEY");

        if (allowedOrigin === apikey) {
            return true;
        }

        this.sendUnauthorizedResponse(context);
        return false;
    }
}