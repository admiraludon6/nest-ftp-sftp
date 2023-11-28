import { Injectable } from '@nestjs/common';
import * as Client from 'ssh2-sftp-client';
import * as fs from 'fs-extra';
import { sftpConfig } from 'app/config/sftp.config';

@Injectable()
export class SftpService {
    private sftpConfig = {
        host: sftpConfig().host,
        port: sftpConfig().port,
        username: sftpConfig().username,
        password: sftpConfig().password,
    };

    
    async downloadFile(remotePath: string, localPath: string): Promise<void> {
        console.log({
            sftpConfig: this.sftpConfig
        })
        const client = new Client();
        try {
            await client.connect(this.sftpConfig);
            await client.get(remotePath, localPath);
        } finally {
            await client.end();
        }
    }

    async uploadFile(localPath: string, remotePath: string): Promise<void> {
        const client = new Client();
        await client.connect(this.sftpConfig);
        await client.fastPut(localPath, remotePath);
        await client.end();
    }

    async modifyFileContent(filePath: string): Promise<void> {
        // Modify the file content as needed
        const content = await fs.readFile(filePath, 'utf-8');
        const modifiedContent = content.toUpperCase(); // Example modification
        await fs.writeFile(filePath, modifiedContent, 'utf-8');
    }
}
