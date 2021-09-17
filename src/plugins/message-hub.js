import {
  HubConnectionBuilder,
  LogLevel,
  HttpTransportType,
} from "@aspnet/signalr";
import PubSub from "pubsub.js";

export default {
  install: (app) => {
    const connection = new HubConnectionBuilder()
      .withUrl(
        `${app.config.globalProperties.$http.defaults.baseURL}/message-hub`,
        {
          skipNegotiation: true,
          transport: HttpTransportType.WebSockets,
        }
      )
      .configureLogging(LogLevel.Information)
      .build();
    connection
      .start()
      .then(function() {
        console.log(
          "Connected to MessageHub using:" +
            app.config.globalProperties.$http.defaults.baseURL
        );
      })
      .catch(function(err) {
        return console.error(err.toString());
      });

    connection.on("YeeeeeeeeeeeHaw", function() {
      PubSub.publish("yeehaw-event");
    });
  },
};
