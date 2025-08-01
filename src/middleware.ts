import { NextURL } from 'next/dist/server/web/next-url'
import { NextRequest, NextResponse } from 'next/server'

export function middleware(request: NextRequest) {
  const { pathname, origin } = request.nextUrl;
  const isAuthenticated = request.cookies.get("loginUser")?.value;

  // 🔐 Protección de rutas privadas (si no está logueado)
  if (
    ( 
      pathname === "/emotions/myHistory" ||
      pathname === "/emotions/myEmotionalLog" ||
      pathname === "/recomendaciones" ||
      pathname === "/emotions" ||
      pathname === "/centrosApoyo" ||
      pathname === "/profile" ||
      pathname === "/recursos" 
    ) && !isAuthenticated
  ) {
    const loginURL = new NextURL("/login", origin);
    return NextResponse.redirect(loginURL);
  }

  // 🚫 Evita que usuarios autenticados accedan a la landing ("/")
 if (isAuthenticated && (pathname === "/" || pathname === "/login")) {
    return NextResponse.redirect(new NextURL("/home", origin));
  }

  // De lo contrario, deja continuar la request
  return NextResponse.next();
}
