import { useNavigate } from "react-router-dom"

import { useSession } from "@/features/auth/context/AuthContext"

export default function GuestLink() {

  const navigate = useNavigate()
  const { openGuest } = useSession()

  function continueAsGuest() {
    openGuest()
    navigate("/dashboard")
  }

  return (
    <button type="button" className="guest-link" onClick={continueAsGuest}>
      Entrar sin autenticación
    </button>
  )

}