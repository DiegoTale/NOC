import { Server } from "./presentation/server";
import { envs } from "./config/plugins/envs.plugin";

// funcion anonima autoinvocada
(async () => {
  main();
})();

function main() {
  Server.start();
  // console.log(envs);
}
