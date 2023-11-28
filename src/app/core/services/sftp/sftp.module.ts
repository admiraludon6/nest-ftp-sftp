import { Module } from '@nestjs/common';
import { SftpService } from 'app/core/services/sftp/sftp.service';

@Module({
    providers: [SftpService],
    exports: [SftpService]
})
export class SftpServiceModule {}