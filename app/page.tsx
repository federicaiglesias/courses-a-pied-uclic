import { headers } from "next/headers";
import { redirect } from "next/navigation";

export default async function RootPage() {
  const accept = (await headers()).get("accept-language") || "";
  const locale = accept.toLowerCase().startsWith("fr") ? "fr" : "en";
  redirect(`/${locale}`);
}
