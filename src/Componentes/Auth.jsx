import { useState } from 'react'
import { supabase } from '../supabaseClient'

export default function Auth() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [isLogin, setIsLogin] = useState(true)
  const [error, setError] = useState('')

  const handleAuth = async () => {
    setError('') // Limpiar errores anteriores
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
      // Autenticación exitosa, recarga para actualizar el estado en App.jsx
      window.location.reload()
    }
  }

  return (
    <div style={styles.container}>
      <h2>{isLogin ? 'Iniciar Sesión' : 'Registrarse'}</h2>

      <input
        style={styles.input}
        type="email"
        placeholder="Correo electrónico"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        style={styles.input}
        type="password"
        placeholder="Contraseña"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />

      <button style={styles.button} onClick={handleAuth}>
        {isLogin ? 'Iniciar sesión' : 'Registrarse'}
      </button>

      <p style={styles.switch} onClick={() => setIsLogin(!isLogin)}>
        {isLogin ? '¿No tienes cuenta? Regístrate aquí' : '¿Ya tienes cuenta? Inicia sesión'}
      </p>

      {error && <p style={{ color: 'red' }}>{error}</p>}
    </div>
  )
}

const styles = {
  container: {
    maxWidth: '400px',
    margin: '100px auto',
    padding: '20px',
    textAlign: 'center',
    border: '1px solid #ccc',
    borderRadius: '10px',
    background: '#f9f9f9',
  },
  input: {
    width: '90%',
    padding: '10px',
    margin: '10px 0',
    borderRadius: '5px',
    border: '1px solid #ccc',
  },
  button: {
    padding: '10px 20px',
    background: '#007bff',
    color: '#fff',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
  },
  switch: {
    marginTop: '15px',
    cursor: 'pointer',
    color: '#007bff',
  },
}
