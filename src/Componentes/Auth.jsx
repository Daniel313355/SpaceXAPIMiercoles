
// src/components/Auth.jsx
import { useState } from 'react'
import { supabase } from '../supabaseClient'

export default function Auth({ onLogin }) {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [isLogin, setIsLogin] = useState(true)
  const [error, setError] = useState('')

  const handleAuth = async () => {
    let result
    if (isLogin) {
      result = await supabase.auth.signInWithPassword({ email, password })
    } else {
      result = await supabase.auth.signUp({ email, password })
    }

    const { data, error } = result
    if (error) {
      setError(error.message)
    } else {
      setError('')
      onLogin(data)
    }
  }

  return (
    <div>
      <h2>{isLogin ? 'Iniciar sesión' : 'Registrarse'}</h2>
      <input type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="Email" />
      <input type="password" value={password} onChange={e => setPassword(e.target.value)} placeholder="Contraseña" />
      <button onClick={handleAuth}>{isLogin ? 'Iniciar sesión' : 'Registrarse'}</button>
      <p onClick={() => setIsLogin(!isLogin)} style={{ cursor: 'pointer' }}>
        {isLogin ? '¿No tienes cuenta? Regístrate' : '¿Ya tienes cuenta? Inicia sesión'}
      </p>
      {error && <p style={{ color: 'red' }}>{error}</p>}
    </div>
  )
}
