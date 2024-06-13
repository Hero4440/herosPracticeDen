'use server'

import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'

import { createClient } from '../../../utils/supabase/server'

export async function login(formData: FormData) {
  console.log("login");

  const supabase = createClient()
  const data = {
    email: formData.get('email') as string,
    password: formData.get('password') as string,
  }

  const { error } = await supabase.auth.signInWithPassword(data)
  console.log("log in data--->",data,"error --->",error, )
  if (error) {
    redirect('/error')
  }
  
  revalidatePath('/', 'layout')
  redirect('/')
}

export async function signup(formData: FormData) {
  console.log("signup");
  
  const supabase = createClient()
  const data = {
    email: formData.get('email') as string,
    password: formData.get('password') as string,
  }
  
  const { error } = await supabase.auth.signUp(data)
  console.log("sign in data--->",data,"error --->",error, )
  
  if (error) {
    redirect('/error')
  }

  revalidatePath('/', 'layout')
  redirect('/')
}   