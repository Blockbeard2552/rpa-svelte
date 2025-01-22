import { redirect, type RequestHandler } from "@sveltejs/kit";

export const GET: RequestHandler = async ({url, locals: { supabase }}) => {
    const code = url.searchParams.get('code');
    if (code) {
    await supabase.auth.exchangeCodeForSession(code);
    }

    const sessionDate = await supabase.auth.getSession();

    if (sessionDate.data.session) {
        const userId = sessionDate.data.session.user.id;
        const userName = sessionDate.data.session.user.user_metadata.name;

        

        const { data: exsistingUser, error: selectError } = await supabase
        .from("user_names")
        .select("name")
        .eq("user_id", userId)
        .single();

        if (selectError && selectError.code !== 'PGRST116') {
            return new Response("Failed to check for exsisting user.", { status: 500});
        }

        if (!exsistingUser) {
           const { error: insertError} = await supabase
        .from("user_names")
        .insert([{ user_id: userId, name: userName}])
    
        if (insertError) {
            return new Response("Failed to insert user name.", { status: 500});
        }
    }


        throw redirect(303, "/private/dashboard")
    }

    return new Response("Session data not found", { status: 400});
}