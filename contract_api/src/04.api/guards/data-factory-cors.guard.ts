import { ExecutionContext, Inject } from "@nestjs/common";
import { Observable } from "rxjs";
import { BaseGuard } from "./base.guard";
import { IAppConfigurationService } from "src/03.infra/03.03.app-configuration/service/iapp-configuration.service";
import { AppConfigurationService } from "src/03.infra/03.03.app-configuration/service/app-configuration.service";

export class DataFactoryCorsGuard extends BaseGuard {
    private readonly _appConfiguration: IAppConfigurationService;

    constructor(@Inject(AppConfigurationService) appConfiguration: IAppConfigurationService){
        super();
        this._appConfiguration = appConfiguration;
    }

    override canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
        const request = context.switchToHttp().getRequest();
        const apikey = request.headers["x-api-key"];
        const allowedOrigin = this._appConfiguration.getValue<string>("DATA_FACTORY_API_KEY");

        if (allowedOrigin === apikey) {
            return true;
        }
        
        this.sendUnauthorizedResponse(context);
        return false;
    }
}