import { Card } from '@/components/ui/card'

export default function Loading() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-[#fff8f0] to-[#e8f0ec] flex items-center justify-center p-4">
      <Card className="w-full max-w-md mx-auto p-8 text-center">
        <div className="space-y-4">
          {/* Logo */}
          <div className="mx-auto mb-6 p-4 bg-[#6e8b7c] rounded-full w-16 h-16 flex items-center justify-center animate-pulse">
            <img 
              src="/logos/original_paw_website_logo.png" 
              alt="Pawsome Grooming" 
              className="h-8 w-8 rounded-sm object-contain filter brightness-0 invert"
            />
          </div>
          
          {/* Loading Animation */}
          <div className="space-y-3">
            <div className="flex justify-center space-x-2">
              <div className="w-2 h-2 bg-[#6e8b7c] rounded-full animate-bounce [animation-delay:-0.3s]"></div>
              <div className="w-2 h-2 bg-[#6e8b7c] rounded-full animate-bounce [animation-delay:-0.15s]"></div>
              <div className="w-2 h-2 bg-[#6e8b7c] rounded-full animate-bounce"></div>
            </div>
            
            <p className="text-gray-600 font-medium">Loading Pawsome Grooming...</p>
            <p className="text-sm text-gray-500">Preparing your pet care experience</p>
          </div>
        </div>
      </Card>
    </div>
  )
}
