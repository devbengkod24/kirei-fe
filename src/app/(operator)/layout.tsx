import { OperatorShell } from "@/modules/operator/OperatorShell";

// The page calls requireRole(["operator"]) inside its own Suspense boundary (cacheComponents).
export default function OperatorLayout({ children }: { children: React.ReactNode }) {
  return <OperatorShell>{children}</OperatorShell>;
}
