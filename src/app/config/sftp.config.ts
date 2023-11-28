export const sftpConfig = () => ({
    host: process.env.SFTP_HOST || "127.0.0.1",
    port: parseInt(process.env.SFTP_PORT) || 22,
    username: process.env.SFTP_USER || "root",
    password: process.env.SFTP_PASS || "",
});