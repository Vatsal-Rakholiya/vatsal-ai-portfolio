import { AdminEditor } from "@/components/admin-editor";
import { LoginForm } from "@/components/login-form";
import { isAdminSession } from "@/lib/auth";
import { getPortfolio } from "@/lib/portfolio";
import { prisma } from "@/lib/db";

export default async function AdminPage() {
  const isAuthed = await isAdminSession();

  if (!isAuthed) {
    return <LoginForm />;
  }

  const [portfolio, messageCount] = await Promise.all([getPortfolio(), prisma.contactMessage.count().catch(() => 0)]);

  return <AdminEditor initialPortfolio={portfolio} messageCount={messageCount} />;
}
