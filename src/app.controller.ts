import { Controller, Get, Inject, Logger, LoggerService } from "@nestjs/common";

@Controller("")
export class AppController {
    constructor(@Inject(Logger) private readonly logger: LoggerService) {}
    @Get("home")
    home() {
        try {
            return "";
        } catch (err) {
            this.logger.error(err, "AppController.home", "AppException");
            throw err;
        }
    }
}
