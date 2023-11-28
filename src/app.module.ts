import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { APP_GUARD, RouterModule } from '@nestjs/core';
import { ThrottlerGuard, ThrottlerModule } from '@nestjs/throttler';
import { appRoutes } from 'app.routes';
import { throttlerConfig } from 'app/config/throttler.config';
import { CoreService } from 'app/core/core.service';
import { FtpModule } from 'app/modules/ftp/ftp.module';
import { HelloModule } from 'app/modules/hello/hello.module';
import { SftpModule } from 'app/modules/sftp/sftp.module';

@Module({
    imports: [
        // Config modules
        ConfigModule.forRoot({expandVariables: true}),
        ThrottlerModule.forRoot(throttlerConfig),
        // Custom modules
        HelloModule,
        FtpModule,
        SftpModule,
        // Router modules
        RouterModule.register(appRoutes)
    ],
    providers: [
        {
            provide: APP_GUARD,
            useClass: ThrottlerGuard
        },
        CoreService
    ]
})
export class AppModule {}