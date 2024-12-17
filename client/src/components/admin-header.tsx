import { Link, useLocation } from "react-router-dom";
import { ModeToggle } from "./theme/mode-toggle";
import { AccountMenu } from "./account-menu";

export function AdminHeader() {
  const { pathname } = useLocation();

  return (
    <nav className="flex justify-between border-b border-solid px-8 py-4">
      {/* ESQUERDA */}
      <div className="flex items-center gap-10">
        <Link
          to={"/admin/gyms"}
          className={
            pathname === "/admin/gyms"
              ? "font-bold text-primary"
              : "text-muted-foreground"
          }
        >
          Academias
        </Link>
        <Link
          to={"/admin/users"}
          className={
            pathname === "/admin/users"
              ? "font-bold text-primary"
              : "text-muted-foreground"
          }
        >
          Usuários
        </Link>
      </div>
      {/* DIREITA */}
      <div className="flex items-center gap-2 justify-center w-max-[250px] p-1 ">
        <AccountMenu />
        <ModeToggle />
      </div>
    </nav>
  );
}
