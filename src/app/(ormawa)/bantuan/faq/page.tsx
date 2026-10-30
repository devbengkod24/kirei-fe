import type { Metadata } from "next";
import { FaqPage } from "@/modules/ormawa/faq/FaqPage";

export const metadata: Metadata = { title: "FAQ" };

export default function Page() {
  return <FaqPage />;
}
