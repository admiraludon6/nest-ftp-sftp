import { Controller, Get } from '@nestjs/common';
import { SftpService } from 'app/core/services/sftp/sftp.service';
import { resolve } from 'path';

@Controller()
export class SftpController {
    constructor(private readonly sftpService: SftpService) {}

    @Get('download-transform-upload')
    async downloadAndModifyFile(): Promise<string> {
        const fileName = "test.txt";
        const remoteFilePath = `${process.env.SFTP_PATH}/${fileName}`;
        const localFilePath = resolve(`./src/storage/downloads/${fileName}`);

        await this.sftpService.downloadFile(remoteFilePath, localFilePath);
        await this.sftpService.modifyFileContent(localFilePath);
        await this.sftpService.uploadFile(localFilePath, remoteFilePath);

        return 'File downloaded, modified, and uploaded successfully! (using sftp)';
    }
}
