import {
    Controller,
    Get,
    Inject,
    Logger,
    LoggerService,
    Query,
} from "@nestjs/common";

@Controller("")
export class AppController {
    constructor(@Inject(Logger) private readonly logger: LoggerService) {}
    @Get("home")
    home(@Query("IP") IP: string, @Query("MAC") MAC: string) {
        try {
            return `${IP} / ${MAC}`;
        } catch (err) {
            this.logger.error(err, "AppController.home", "AppException");
            throw err;
        }
    }
}
