"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const app_module_1 = require("./app.module");
async function bootstrap() {
    const app = await core_1.NestFactory.create(app_module_1.AppModule, {
        rawBody: true,
    });
    app.enableCors({
        origin: [
            'http://localhost:3000',
            process.env.FRONTEND_URL,
        ].filter(Boolean),
        methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'],
        credentials: true,
        allowedHeaders: ['Content-Type', 'Authorization'],
    });
    app.setGlobalPrefix('api', {
        exclude: ['payment-strip/webhook'],
    });
    const PORT = process.env.PORT || 5002;
    await app.listen(PORT);
    console.log(`Server running on port ${PORT}`);
}
bootstrap();
//# sourceMappingURL=main.js.map