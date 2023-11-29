import { Controller, Get } from '@nestjs/common';
import { FtpService } from 'app/core/services/ftp/ftp.service';
import { resolve } from 'path';

@Controller()
export class FtpController {
    constructor(private readonly ftpService: FtpService) {}

    @Get('download-transform-upload')
    async downloadAndModifyFile(): Promise<string> {
        const fileName = "test.txt";
        const remoteFilePath = `${process.env.FTP_PATH}/${fileName}`;
        const localFilePath = resolve(`./src/storage/downloads/${fileName}`);
        
        await this.ftpService.downloadFile(localFilePath, remoteFilePath);
        await this.ftpService.modifyFileContent(localFilePath);
        await this.ftpService.uploadFile(localFilePath, remoteFilePath);

        return 'File downloaded, modified, and uploaded successfully! (using ftp)';
    }
}
