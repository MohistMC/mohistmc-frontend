import { NextRequest, NextResponse } from 'next/server'
import { locales } from '@/i18n/Language'

export function middleware(request: NextRequest) {
    const { pathname, origin } = request.nextUrl;

    // Redirect to the default locale if the user tries to access the docs without specifying a language
    if (pathname.endsWith('/mohist/docs') || pathname.endsWith('/mohist/docs/')) {
        return NextResponse.redirect(`${origin}${pathname.endsWith('/') ? pathname : pathname + '/'}${locales.current.locale.toLowerCase()}`);
    }

    return NextResponse.next();
}