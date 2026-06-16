import React from 'react'

interface PageLoaderProps {
   title?: string
   description?: string
   fullScreen?: boolean
}

const PageLoader = ({ 
   title = 'Loading...', 
   description = 'Please wait while we prepare your experience.', 
   fullScreen = true 
}: PageLoaderProps) => {
   return (
      <div className={`flex flex-col items-center justify-center bg-c-neutral-10/50 backdrop-blur-sm z-[9999] transition-all duration-300 ${fullScreen ? 'fixed inset-0 h-screen w-screen' : 'w-full h-full min-h-[300px] rounded-xl'}`}>
         <div className="flex flex-col items-center p-8 bg-white/80 rounded-[24px] shadow-xl shadow-black-[0.03] border border-white/60 backdrop-blur-lg">
            {/* Animated Ring */}
            <div className="relative flex items-center justify-center w-14 h-14 mb-5">
               <svg className="animate-spin w-full h-full text-c-primary-50" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <circle className="opacity-20" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-80" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
               </svg>
            </div>
            
            {/* Text Overlay */}
            <div className="text-center space-y-1.5 animate-pulse">
               <h3 className="text-[15px] font-bold tracking-wide font-jakarta text-c-neutral-90">{title}</h3>
               {description && <p className="text-[13px] font-jakarta text-c-neutral-60 font-medium max-w-[220px] leading-relaxed">{description}</p>}
            </div>
         </div>
      </div>
   )
}

export default PageLoader
