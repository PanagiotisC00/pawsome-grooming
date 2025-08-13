import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Home, ArrowLeft, Phone } from 'lucide-react'

export default function NotFound() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-[#fff8f0] to-[#e8f0ec] flex items-center justify-center p-4">
      <Card className="w-full max-w-md mx-auto text-center animate-slide-up">
        <CardHeader>
          <div className="mx-auto mb-4 p-4 bg-[#6e8b7c] rounded-full w-16 h-16 flex items-center justify-center">
            <div className="text-white text-2xl font-bold">404</div>
          </div>
          <CardTitle className="text-2xl text-gray-900">Page Not Found</CardTitle>
          <CardDescription className="text-gray-600">
            Sorry, we couldn't find the page you're looking for. It might have been moved or doesn't exist.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-3">
            <Button asChild className="w-full">
              <Link href="/">
                <Home className="h-4 w-4 mr-2" />
                Go Home
              </Link>
            </Button>
            <Button variant="outline" asChild className="w-full">
              <Link href="/services">
                <ArrowLeft className="h-4 w-4 mr-2" />
                View Services
              </Link>
            </Button>
          </div>
          <div className="pt-4 border-t">
            <p className="text-sm text-gray-500 mb-3">
              Need help? Contact us directly:
            </p>
            <Button variant="secondary" asChild className="w-full">
              <a href="tel:+35722123456">
                <Phone className="h-4 w-4 mr-2" />
                Call Us: +357 22 123456
              </a>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
