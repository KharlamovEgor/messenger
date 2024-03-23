import { Client } from "@stomp/stompjs";
import { useState } from "react";

export function useStomp(): Client {
  return useState(new Client({ brokerURL: "ws://messanger.ddns.net:6543/ws" }))[0];
}
