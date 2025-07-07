"use client";

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import Image from 'next/image';
import { signIn } from 'next-auth/react';
import { useToast } from '@/hooks/use-toast';

const SocialLogin = ({ 
  onSuccess, 
  redirectUrl = '/',
  className = '',
  compact = false 
}) => {
  const [isGoogleLoading, setIsGoogleLoading] = useState(false);
  const [error, setError] = useState('');
  const { toast } = useToast();

  const handleGoogleLogin = async () => {
    setIsGoogleLoading(true);
    setError('');
    
    try {
      // Use the provided redirectUrl directly
      await signIn('google', { 
        callbackUrl: redirectUrl,
        redirect: true
      });
      
      // This code won't execute because the page will redirect
    } catch (err) {
      setError(err.message || 'Google login failed. Please try again.');
      console.error('Google login error:', err);
      toast({
        variant: "destructive",
        title: "Login failed",
        description: err.message || 'Google login failed. Please try again.'
      });
      setIsGoogleLoading(false);
    }
  };

  return (
    <div className={`flex flex-col space-y-3 ${className}`}>
      {error && <div className="text-sm text-red-500">{error}</div>}
      
      <Button
        type="button"
        variant="outline"
        className="relative"
        disabled={isGoogleLoading}
        onClick={handleGoogleLogin}
      >
        {isGoogleLoading ? (
          <div className="w-5 h-5 border-2 border-gray-300 border-t-primary rounded-full animate-spin"></div>
        ) : (
          <>
            <div className="absolute left-3">
              <Image
                src="/Google__G__logo.svg"
                alt="Google"
                width={20}
                height={20}
              />
            </div>
            {compact ? 'Google' : 'Continue with Google'}
          </>
        )}
      </Button>
    </div>
  );
};

export default SocialLogin; 