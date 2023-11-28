import { Injectable } from '@nestjs/common';
import { ftpConfig } from 'app/config/ftp.config';
import { Client } from 'basic-ftp';
import { createReadStream, readFile, writeFile } from "fs-extra";

@Injectable()
export class FtpService {
    private ftpConfig = {
        host: ftpConfig().host,
        port: ftpConfig().port,
        user: ftpConfig().user,
        password: ftpConfig().password,
    };

    async downloadFile(localFilePath: string, remoteFilePath: string): Promise<void> {
        const client = new Client();
        await client.access(this.ftpConfig);

        await client.downloadTo(localFilePath, remoteFilePath);

        await client.close();
    }

    async uploadFile(localPath: string, remotePath: string): Promise<void> {
        const client = new Client();
        await client.access(this.ftpConfig);

        await client.upload(createReadStream(localPath), remotePath);

        await client.close();
    }

    async modifyFileContent(filePath: string): Promise<void> {
        // Modify the file content as needed
        const content = await readFile(filePath, 'utf-8');
        const modifiedContent = content.toUpperCase(); // Example modification
        await writeFile(filePath, modifiedContent, 'utf-8');
    }
}
