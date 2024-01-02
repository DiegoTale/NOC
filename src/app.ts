import { LogModel, MongoDataBase } from "./data/mongo";
import { Server } from "./presentation/server";
import { envs } from "./config/plugins/envs.plugin";
import { PrismaClient } from "@prisma/client";

// funcion anonima autoinvocada
(async () => {
  main();
})();

async function main() {
  await MongoDataBase.connect({
    mongoUrl: envs.MONGO_URL,
    dbName: envs.MONGO_DB_NAME,
  });

  const prisma = new PrismaClient();
  // const newLog = await prisma.logModel.create({
  //   data: {
  //     level: "HIGH",
  //     message: "Test Message",
  //     origin: "App.ts",
  //   },
  // });

  // const logs = await prisma.logModel.findMany({
  //   where: {
  //     level: "MEDIUM",
  //   },
  // });

  /** Crear una coleccion = tables, documento = registro */

  // const newLog = await LogModel.create({
  //   message: "Test message desde Mongo",
  //   origin: "App.ts",
  //   level: "low",
  // });

  // await newLog.save();

  // console.log(logs);

  // const logs = await LogModel.find();
  // console.log(logs[2].message);

  // Server.start();
  // console.log(envs);
}
