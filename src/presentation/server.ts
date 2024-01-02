import { envs } from "../config/plugins/envs.plugin";
import { LogSeverityLevel } from "../domain/entities/log.entity";
import { CheckService } from "../domain/use-cases/checks/check-service";
import { CheckServiceMultiple } from "../domain/use-cases/checks/check-service-multiple";
import { SendEmailLogs } from "../domain/use-cases/email/send-email-logs";
import { FileSystemDatasource } from "../infrastructure/datasources/file-system.datasource";
import { MongoLogDataSource } from "../infrastructure/datasources/mongo-log.datasource";
import { PostgresLogDataSource } from "../infrastructure/datasources/postgre-log.datasource";
import { LogRepositoryImpl } from "../infrastructure/repositories/log.respository.impl";
import { CronService } from "./cron/cron-service";
import { EmailService } from "./email/email.service";

// crear instancias
const fsLogRepository = new LogRepositoryImpl(
  // new FileSystemDatasource()
  // new MongoLogDataSource()
  // new PostgresLogDataSource()
  new FileSystemDatasource()
);

const mongoLogRepository = new LogRepositoryImpl(new MongoLogDataSource());

const postgresLogRepository = new LogRepositoryImpl(
  new PostgresLogDataSource()
);

const emailService = new EmailService();

export class Server {
  public static async start() {
    console.log("Server started...");

    // mandar email

    // new SendEmailLogs(emailService, fileSystemLogRepository).execute([
    //   "dperezt1@miumg.edu.gt",
    //   "dieguito6122015@gmail.com",
    // ]);
    // const emailService = new EmailService();
    // emailService.senEmailWithFileSystemLogs([
    //   "dperezt1@miumg.edu.gt",
    //   "dieguito6122015@gmail.com",
    // ]);
    // console.log(envs.MAILER_SECRET_KEY, envs.MAILER_EMAIL);

    // const logs = await logRepository.getLogs(LogSeverityLevel.low);
    // console.log(logs);

    CronService.createJob("*/5 * * * * *", () => {
      // new CheckService().execute("http://localhost:3000");
      const url = "https://google.com";
      new CheckServiceMultiple(
        [fsLogRepository, mongoLogRepository, postgresLogRepository],
        () => console.log(`${url} is ok`),
        (error) => console.log(error)
      ).execute(url);
    });
  }
}
