import { Module } from '@nestjs/common';
import { FtpService } from 'app/core/services/ftp/ftp.service';

@Module({
    providers: [FtpService],
    exports: [FtpService]
})
export class FtpServiceModule {}