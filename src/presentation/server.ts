import { envs } from "../config/plugins/envs.plugin";
import { CheckService } from "../domain/use-cases/checks/check-service";
import { FileSystemDatasource } from "../infrastructure/datasources/file-system.datasource";
import { LogRepositoryImpl } from "../infrastructure/repositories/log.respository.impl";
import { CronService } from "./cron/cron-service";
import { EmailService } from "./email/email.service";

// crear instancias
const fileSystemLogRepository = new LogRepositoryImpl(
  new FileSystemDatasource()
);

export class Server {
  public static start() {
    console.log("Server started...");

    // mandar email

    const emailService = new EmailService();
    emailService.sendEmail({
      to: "dieguito6122015@gmail.com",
      subject: "Logs de sistema",
      htmlBody: `
        <h3>Logs de sistema - NOC</h3>
        <p>Lorem ipsum, gordo, Griselda te ama mucho</p>
        <p>Ver Logs adjuntos</p>
      `,
    });
    // console.log(envs.MAILER_SECRET_KEY, envs.MAILER_EMAIL);
    // CronService.createJob("*/5 * * * * *", () => {
    //   // new CheckService().execute("http://localhost:3000");
    //   const url = "https://google.com";
    //   new CheckService(
    //     fileSystemLogRepository,
    //     () => console.log(`${url} is ok`),
    //     (error) => console.log(error)
    //   ).execute(url);
    // });
  }
}
