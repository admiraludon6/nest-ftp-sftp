import { Module } from '@nestjs/common';
import { FtpServiceModule } from 'app/core/services/ftp/ftp.module';
import { FtpController } from 'app/modules/ftp/ftp.controller';

@Module({
    imports: [FtpServiceModule],
    controllers: [FtpController]
})
export class FtpModule {}