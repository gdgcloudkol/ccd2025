import { VERITY_EMAIL_DJANGO_URL } from '@/lib/constants/be';
import { redirect } from 'next/navigation';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(req: NextRequest) {
    const token = req.nextUrl.pathname.split('/').pop(); // Or use req.nextUrl.searchParams if using query string

    if (!token) {
        return NextResponse.json({ error: "Token missing" }, { status: 400 });
    }


    const response = await fetch(VERITY_EMAIL_DJANGO_URL + token + "/", {
        method: "GET",
        cache: 'no-store',
        headers: {
            'Content-Type': 'application/json'
        }
    });
    const result = await response.json();
    if (response.ok) {
        redirect("/login")
    }
    return NextResponse.json(result, { status: response.status });
}