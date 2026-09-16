import { FormEvent, useState } from 'react'
import { Eye, EyeOff, LockKeyhole, Mail, ShieldCheck } from 'lucide-react'

function App() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [remember, setRemember] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setError('')

    if (!email.trim() || !password) {
      setError('Please enter your work email and password.')
      return
    }

    setLoading(true)
    window.setTimeout(() => setLoading(false), 700)
  }

  return (
    <main className="auth-shell">
      <section className="brand-panel" aria-label="HRMS introduction">
        <div className="brand-mark">H</div>
        <div className="brand-copy">
          <span className="eyebrow">PEOPLE • WORK • GROW</span>
          <h1>Everything your<br />people need.</h1>
          <p>One secure workspace for people operations, attendance, leave, payroll and more.</p>
        </div>
        <div className="trust-card">
          <ShieldCheck size={21} />
          <div>
            <strong>Built with security in mind</strong>
            <span>Protected access for your workplace.</span>
          </div>
        </div>
      </section>

      <section className="form-panel">
        <div className="form-wrap">
          <div className="mobile-brand"><span className="brand-mark small">H</span><strong>HRMS</strong></div>
          <div className="heading">
            <span className="eyebrow blue">WELCOME BACK</span>
            <h2>Sign in to your workspace</h2>
            <p>Use your work account to continue.</p>
          </div>

          <form onSubmit={handleSubmit} noValidate>
            <label htmlFor="email">Work email</label>
            <div className="input-wrap">
              <Mail size={18} aria-hidden="true" />
              <input id="email" type="email" autoComplete="username" placeholder="you@company.com" value={email} onChange={(e) => setEmail(e.target.value)} />
            </div>

            <div className="password-label">
              <label htmlFor="password">Password</label>
              <button type="button" className="text-button" onClick={() => setError('Password reset will be connected in the next authentication phase.')}>Forgot password?</button>
            </div>
            <div className="input-wrap">
              <LockKeyhole size={18} aria-hidden="true" />
              <input id="password" type={showPassword ? 'text' : 'password'} autoComplete="current-password" placeholder="Enter your password" value={password} onChange={(e) => setPassword(e.target.value)} />
              <button type="button" className="icon-button" aria-label={showPassword ? 'Hide password' : 'Show password'} onClick={() => setShowPassword((value) => !value)}>
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>

            <label className="remember">
              <input type="checkbox" checked={remember} onChange={(e) => setRemember(e.target.checked)} />
              <span>Keep me signed in</span>
            </label>

            {error && <p className="error" role="alert">{error}</p>}

            <button className="submit" type="submit" disabled={loading}>
              {loading ? 'Signing in…' : 'Sign in'}
            </button>
          </form>

          <p className="legal">By continuing, you agree to your organization's access policies.</p>
          <p className="footer">© 2026 HRMS · Secure workplace platform</p>
        </div>
      </section>
    </main>
  )
}

export default App
