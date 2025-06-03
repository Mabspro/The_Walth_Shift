'use client';

import React, { useEffect, useState } from 'react';

interface FormEmbedProps {
  formId: string;
  formType: 'tally' | 'typeform';
  height?: string;
  title?: string;
  redirectUrl?: string;
  hiddenFields?: Record<string, string>;
  onSubmit?: () => void;
  className?: string;
}

const FormEmbed: React.FC<FormEmbedProps> = ({
  formId,
  formType,
  height = '600px',
  title = 'Embedded Form',
  redirectUrl,
  hiddenFields,
  onSubmit,
  className = ''
}) => {
  const [formUrl, setFormUrl] = useState<string>('');
  
  useEffect(() => {
    let url = '';
    
    if (formType === 'tally') {
      url = `https://tally.so/embed/${formId}`;
      
      // Add redirect URL if provided
      if (redirectUrl) {
        url += `?redirectTo=${encodeURIComponent(redirectUrl)}`;
      }
      
      // Add hidden fields if provided
      if (hiddenFields && Object.keys(hiddenFields).length > 0) {
        const prefix = redirectUrl ? '&' : '?';
        const hiddenFieldsParams = Object.entries(hiddenFields)
          .map(([key, value]) => `${encodeURIComponent(key)}=${encodeURIComponent(value)}`)
          .join('&');
        url += `${prefix}${hiddenFieldsParams}`;
      }
    } else if (formType === 'typeform') {
      url = `https://form.typeform.com/to/${formId}`;
      
      // Add hidden fields if provided
      if (hiddenFields && Object.keys(hiddenFields).length > 0) {
        const hiddenFieldsParams = Object.entries(hiddenFields)
          .map(([key, value]) => `${encodeURIComponent(key)}=${encodeURIComponent(value)}`)
          .join('&');
        url += `?${hiddenFieldsParams}`;
      }
      
      // Add redirect URL if provided
      if (redirectUrl) {
        const prefix = hiddenFields && Object.keys(hiddenFields).length > 0 ? '&' : '?';
        url += `${prefix}redirect_after_submit=${encodeURIComponent(redirectUrl)}`;
      }
    }
    
    setFormUrl(url);
  }, [formId, formType, redirectUrl, hiddenFields]);
  
  // Handle form submission message from iframe
  useEffect(() => {
    const handleMessage = (event: MessageEvent) => {
      // Check if the message is from Tally or Typeform
      if (
        (formType === 'tally' && event.origin === 'https://tally.so') ||
        (formType === 'typeform' && event.origin === 'https://form.typeform.com')
      ) {
        // Check if the message indicates form submission
        if (
          (formType === 'tally' && event.data.type === 'tally:form:submit') ||
          (formType === 'typeform' && event.data.type === 'form-submit')
        ) {
          // Call onSubmit callback if provided
          if (onSubmit) {
            onSubmit();
          }
        }
      }
    };
    
    window.addEventListener('message', handleMessage);
    
    return () => {
      window.removeEventListener('message', handleMessage);
    };
  }, [formType, onSubmit]);
  
  return (
    <div className={`w-full max-w-4xl mx-auto my-8 ${className}`}>
      {formUrl ? (
        <iframe
          src={formUrl}
          width="100%"
          height={height}
          title={title}
          frameBorder="0"
          marginHeight={0}
          marginWidth={0}
          className="rounded-lg shadow-lg"
          style={{ border: 'none' }}
          allow="camera; microphone; autoplay; encrypted-media; fullscreen; geolocation"
        />
      ) : (
        <div className="w-full h-[600px] flex items-center justify-center bg-background/20 backdrop-blur-sm rounded-lg border border-accent/20 p-4">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-accent mx-auto mb-4"></div>
            <p className="text-lg font-medium" style={{ color: 'var(--soft-sage)' }}>Loading form...</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default FormEmbed;
