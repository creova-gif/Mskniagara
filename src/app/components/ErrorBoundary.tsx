/**
 * Error Boundary Component
 * 
 * Catches JavaScript errors anywhere in the component tree and displays
 * a fallback UI instead of crashing the entire application.
 * 
 * Security Features:
 * - Prevents app crashes from propagating
 * - Logs errors for debugging
 * - Provides user-friendly error messages
 * - Automatic recovery mechanism
 */

import React, { Component, ErrorInfo, ReactNode } from 'react';
import { AlertTriangle, RefreshCw, Home } from 'lucide-react';
import { Button } from './ui/button';

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
  errorInfo: ErrorInfo | null;
}

export class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false,
    error: null,
    errorInfo: null,
  };

  public static getDerivedStateFromError(error: Error): State {
    // Update state so the next render will show the fallback UI
    return { 
      hasError: true, 
      error,
      errorInfo: null 
    };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    // Log error details for debugging
    console.error('Error Boundary caught an error:', error, errorInfo);
    
    this.setState({
      error,
      errorInfo,
    });

    // In production, you could send this to an error reporting service
    // Example: logErrorToService(error, errorInfo);
  }

  private handleReset = () => {
    this.setState({
      hasError: false,
      error: null,
      errorInfo: null,
    });
  };

  private handleGoHome = () => {
    window.location.href = '/';
  };

  public render() {
    if (this.state.hasError) {
      // Custom fallback UI
      if (this.props.fallback) {
        return this.props.fallback;
      }

      // Default error UI
      return (
        <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center px-4">
          <div className="max-w-2xl w-full bg-white rounded-2xl shadow-2xl p-8 md:p-12 text-center border-t-4 border-[#CC0000]">
            <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-red-100 mb-6">
              <AlertTriangle className="w-10 h-10 text-[#CC0000]" />
            </div>
            
            <h1 className="text-3xl md:text-4xl font-bold text-[#0A0A0A] mb-4">
              Something Went Wrong
            </h1>
            
            <p className="text-lg text-gray-600 mb-8 leading-relaxed">
              We encountered an unexpected error. Don't worry, your data is safe. 
              Please try refreshing the page or return to the homepage.
            </p>

            {/* Error details (only in development) */}
            {import.meta.env.DEV && this.state.error && (
              <div className="mb-8 p-6 bg-red-50 border-2 border-red-200 rounded-xl text-left">
                <h3 className="font-bold text-red-900 mb-2 text-sm uppercase tracking-wide">
                  Error Details (Development Only)
                </h3>
                <pre className="text-xs text-red-800 overflow-auto whitespace-pre-wrap break-words">
                  {this.state.error.toString()}
                  {this.state.errorInfo && (
                    <>
                      {'\n\n'}
                      {this.state.errorInfo.componentStack}
                    </>
                  )}
                </pre>
              </div>
            )}

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                onClick={this.handleReset}
                className="gap-2 bg-[#CC0000] hover:bg-[#800000] text-white px-8 py-6 text-lg"
              >
                <RefreshCw className="w-5 h-5" />
                Try Again
              </Button>
              
              <Button
                onClick={this.handleGoHome}
                variant="outline"
                className="gap-2 border-2 px-8 py-6 text-lg"
              >
                <Home className="w-5 h-5" />
                Go to Homepage
              </Button>
            </div>

            <p className="mt-8 text-sm text-gray-500">
              If this problem persists, please contact our support team.
            </p>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
