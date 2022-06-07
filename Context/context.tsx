import React, { createContext, SetStateAction, useEffect, useState } from 'react'
import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
  User,
} from 'firebase/auth'
import { auth } from '../firebase'
import { deflate } from 'zlib'
import Router, { useRouter } from 'next/router'

interface user {
  email: string,
  password: string
}
interface AuthProviderProps {
  children: React.ReactNode
}

interface IAuth {
  user: User | null
  signUp: (email: string, password: string) => Promise<void>
  signIn: (email: string, password: string) => Promise<void>
  logout: () => Promise<void>
  openAlert: boolean | undefined,
  message: string | null,
  handleSetOpenAlert: (open: boolean) => void,
  err: string | null


}

export const AuthContext = createContext<IAuth>({
  user: null,
  signUp: async () => { },
  signIn: async () => { },
  logout: async () => { },
  openAlert: false,
  message: null,
  handleSetOpenAlert: () => { },
  err: null

});

const AuthState = ({ children }: AuthProviderProps) => {
  const router = useRouter()
  const [user, setUser] = useState<User | null>(null)
  const [openAlert, setOpenAlert] = useState<boolean>(false);
  const [message, setMessage] = useState("");
  const [err, setErr] = useState(null);

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(user)
      }
      else {
        router.push('/login')
        setUser(null)
      }
    })
  }, [auth])

  const signUp = async (email: string, password: string) => {
    const res = await createUserWithEmailAndPassword(auth, email, password).then((res) => {
      setUser(res.user)
      console.log(res.user)
      router.push("/")
      setErr(null)
      setMessage(`Wellcome ${res.user.email}`)
    }).catch((err) => {
      console.log("err", err)
      setMessage(err.message)
      setErr(err.message)
    })
    setOpenAlert(true)
  }

  const signIn = async (email: string, password: string) => {
    const res = await signInWithEmailAndPassword(auth, email, password)
      .then((res) => {
        setMessage(`wellcome back ${res.user.email}`)
        setUser(res.user)
        console.log(res.user.email)
        setOpenAlert(true)
        setErr(null)
        router.push("/")
      }).catch((err) => {
        setMessage(err.message)
        setErr(err.message)
        setOpenAlert(true)
      })


  }
  const logout = async () => {
    signOut(auth).then(() => setUser(null));

  }
  const handleSetOpenAlert = (open: boolean) => {
    setOpenAlert(open);
  }
  return (
    <div>
      <AuthContext.Provider
        value={{
          user,
          signUp,
          signIn,
          logout,
          openAlert,
          message,
          handleSetOpenAlert,
          err
        }}
      >
        {children}
      </AuthContext.Provider>
    </div>
  )
}

export default AuthState;


