import { supabase } from "./supabaseClient";

export type emailSignInData = {
    email: string,
    password: string
}

export type signInData = {
    userId: string,
    session: string,
    error: string
}

export async function signUpNewUser(emailAdress: string, password: string) {
    await supabase.auth.signUp({
        email: emailAdress,
        password: password
    })
}

export async function signInWithEmail(input: emailSignInData): Promise<signInData> {
    const { data, error } = await supabase.auth.signInWithPassword(
       {
        email: input.email,
        password: input.password
       } 
    )
    
    if(error) return { userId: "", session: "", error: error.message}
    
    return { userId: data.user?.id, session: data.session.access_token, error: "" }
}

export async function signOut () {
    const { error } = await supabase.auth.signOut()
    return error
}