export const ftpConfig = () => ({
    host: process.env.FTP_HOST || "127.0.0.1",
    port: parseInt(process.env.FTP_PORT) || 21,
    user: process.env.FTP_USER || "root",
    password: process.env.FTP_PASS || "",
});