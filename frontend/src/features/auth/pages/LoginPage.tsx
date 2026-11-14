import PlanetIcon from "@/components/PlanetIcon"
import GuestLink from "@/features/auth/components/GuestLink"
import LoginForm from "@/features/auth/components/LoginForm"
import "@/features/auth/styles.css"

export default function LoginPage() {
    
  return (
    <main className="login">
      <div className="orbit orbit-1" aria-hidden="true" />
      <div className="orbit orbit-2" aria-hidden="true" />
      <div className="card login-card">
        <div className="login-icon">
          <PlanetIcon size={52} />
          <span className="login-title">METEORITE</span>
        </div>
        <p className="login-subtitle">
          Meteoritos
          registrados por la NASA
        </p>
        <LoginForm />
        <GuestLink />
      </div>
    </main>
  )
  
}