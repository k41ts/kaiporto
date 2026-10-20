"use client";

import { useEffect, useState } from "react";
import { profile } from "@/content/site";

/** Jam Jakarta. Server ngirim "--:--" supaya HTML server dan klien sama; jamnya diisi setelah hydrate. */
export function Clock({ suffix = "" }: { suffix?: string }) {
  const [time, setTime] = useState("--:--");

  useEffect(() => {
    const fmt = new Intl.DateTimeFormat("en-GB", { timeZone: profile.timezone, hour: "2-digit", minute: "2-digit" });
    const tick = () => setTime(fmt.format(new Date()));
    tick();
    const id = setInterval(tick, 20000);
    return () => clearInterval(id);
  }, []);

  return (
    <>
      {time}
      {suffix}
    </>
  );
}
