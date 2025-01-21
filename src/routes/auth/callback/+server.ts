import { redirect, type RequestHandler } from "@sveltejs/kit";

export const GET: RequestHandler = async ({url, locals: { supabase }}) => {
    const code = url.searchParams.get('code');
    if (code) {
    await supabase.auth.exchangeCodeForSession(code);
    }

    const sessionDate = await supabase.auth.getSession();

    if (sessionDate.data.session) {
        throw redirect(303, "/private/dashboard")
    }

    return new Response("Session data not found", { status: 400});
}