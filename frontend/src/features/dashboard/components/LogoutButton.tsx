import { useNavigate } from "react-router-dom";

import { DoorIcon } from "@/components/Icons";
import { useSession } from "@/features/auth/context/AuthContext";

export default function LogoutButton() {
  const navigate = useNavigate();
  const { mode, logout } = useSession();

  function handleLogout() {
    logout();
    navigate("/");
  }

  return (
    <button
      type="button"
      className="primary-button logout-button"
      onClick={handleLogout}
    >
      <DoorIcon />
      Logout
      {mode === "guest" && <span className="logout-mode">· invitado</span>}
    </button>
  );
}
