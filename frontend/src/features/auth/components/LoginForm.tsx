import { useState, type SubmitEvent } from "react"
import { useNavigate } from "react-router-dom"
import { login } from "@/api/auth"
import { HttpError } from "@/api/client"
import PrimaryButton from "@/components/PrimaryButton"
import TextField from "@/components/TextField"
import { useSession } from "@/features/auth/context/AuthContext"

export default function LoginForm() {

  const navigate = useNavigate()
  const { openSession } = useSession()
  const [user, setUser] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")
  const [isSending, setIsSending] = useState(false)

  async function send(event: SubmitEvent) {

    event.preventDefault()
    setIsSending(true)
    setError("")

    try {

      await login(user, password)
      openSession()
      navigate("/dashboard")

    } catch (exception) {

      const status = exception instanceof HttpError ? exception.status : 0
      setError(
        status === 400
          ? "Usuario o contraseña incorrectos."
          : "No se pudo conectar con el servidor.",
      )

    } finally {

      setIsSending(false)

    }

  }

  return (
    <form className="login-form" onSubmit={send}>
      <TextField
        tag="Usuario"
        id="user"
        name="username"
        placeholder="Tu usuario"
        autoComplete="username"
        value={user}
        onChange={(event) => setUser(event.target.value)}
        required
      />
      <TextField
        tag="Contraseña"
        id="password"
        name="password"
        type="password"
        placeholder="Tu contraseña"
        autoComplete="current-password"
        value={password}
        onChange={(event) => setPassword(event.target.value)}
        required
      />

      {error && <p className="login-error">{error}</p>}

      <PrimaryButton type="submit" disabled={isSending}>
        {isSending ? "Verificando…" : "Iniciar sesión"}
      </PrimaryButton>

    </form>
  )
}