'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';

interface Question {
  id: string;
  text: string;
  type: 'text' | 'radio' | 'checkbox' | 'textarea';
  options?: string[];
  required?: boolean;
}

interface SimpleFormProps {
  title: string;
  description?: string;
  questions: Question[];
  submitButtonText?: string;
  redirectUrl?: string;
  onSubmit?: (formData: Record<string, string | string[]>) => void;
  className?: string;
}

const SimpleForm: React.FC<SimpleFormProps> = ({
  title,
  description,
  questions,
  submitButtonText = 'Submit',
  redirectUrl,
  onSubmit,
  className = ''
}) => {
  const router = useRouter();
  const [formData, setFormData] = useState<Record<string, string | string[]>>({});
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleInputChange = (questionId: string, value: string | string[]) => {
    setFormData(prev => ({
      ...prev,
      [questionId]: value
    }));
    
    // Clear error when user starts typing
    if (errors[questionId]) {
      setErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors[questionId];
        return newErrors;
      });
    }
  };

  const handleCheckboxChange = (questionId: string, option: string, checked: boolean) => {
    const currentValues = Array.isArray(formData[questionId]) 
      ? formData[questionId] as string[] 
      : [];
    
    let newValues: string[];
    
    if (checked) {
      newValues = [...currentValues, option];
    } else {
      newValues = currentValues.filter(value => value !== option);
    }
    
    handleInputChange(questionId, newValues);
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    
    questions.forEach(question => {
      if (question.required) {
        const value = formData[question.id];
        
        if (!value) {
          newErrors[question.id] = 'This field is required';
        } else if (Array.isArray(value) && value.length === 0) {
          newErrors[question.id] = 'Please select at least one option';
        }
      }
    });
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (validateForm()) {
      setIsSubmitting(true);
      
      // Store form data in localStorage for potential use later
      localStorage.setItem(`form_${title.replace(/\s+/g, '_').toLowerCase()}`, JSON.stringify(formData));
      
      // Simulate form submission delay
      setTimeout(() => {
        if (onSubmit) {
          // Call the onSubmit callback if provided
          onSubmit(formData);
        } else if (redirectUrl) {
          // Redirect to the next page if redirectUrl is provided
          router.push(redirectUrl);
        }
        
        // Reset submission state if not redirecting
        if (!redirectUrl) {
          setIsSubmitting(false);
        }
      }, 1000);
    }
  };

  return (
    <div className={`w-full max-w-6xl mx-auto my-8 ${className}`}>
      <div className="bg-portal-beige-card rounded-lg p-8 border border-portal-border shadow-lg">
        <h2 className="text-2xl font-bold mb-2 text-portal-text-primary">{title}</h2>
        
        {description && (
          <p className="mb-6 leading-relaxed text-portal-text-secondary">
            {description}
          </p>
        )}
        
        <form onSubmit={handleSubmit} className="space-y-6">
          {questions.map(question => (
            <div key={question.id} className="space-y-2">
              <label 
                htmlFor={question.id} 
                className="block font-medium text-portal-text-primary"
              >
                {question.text}
                {question.required && <span className="text-red-400 ml-1">*</span>}
              </label>
              
              {question.type === 'text' && (
                <input
                  id={question.id}
                  type="text"
                  value={formData[question.id] as string || ''}
                  onChange={e => handleInputChange(question.id, e.target.value)}
                  className="w-full px-4 py-2 bg-portal-beige-light rounded-md border border-portal-border focus:border-accent focus:outline-none focus:ring-1 focus:ring-accent text-portal-text-primary"
                />
              )}
              
              {question.type === 'textarea' && (
                <textarea
                  id={question.id}
                  value={formData[question.id] as string || ''}
                  onChange={e => handleInputChange(question.id, e.target.value)}
                  className="w-full px-4 py-2 bg-portal-beige-light rounded-md border border-portal-border focus:border-accent focus:outline-none focus:ring-1 focus:ring-accent text-portal-text-primary"
                  rows={4}
                />
              )}
              
              {question.type === 'radio' && question.options && (
                <div className="space-y-2">
                  {question.options.map(option => (
                    <div key={option} className="flex items-center">
                      <input
                        id={`${question.id}-${option}`}
                        type="radio"
                        name={question.id}
                        value={option}
                        checked={(formData[question.id] as string) === option}
                        onChange={e => handleInputChange(question.id, e.target.value)}
                        className="mr-2 text-accent focus:ring-accent"
                      />
                      <label 
                        htmlFor={`${question.id}-${option}`}
                        className="text-portal-text-secondary"
                      >
                        {option}
                      </label>
                    </div>
                  ))}
                </div>
              )}
              
              {question.type === 'checkbox' && question.options && (
                <div className="space-y-2">
                  {question.options.map(option => (
                    <div key={option} className="flex items-center">
                      <input
                        id={`${question.id}-${option}`}
                        type="checkbox"
                        value={option}
                        checked={Array.isArray(formData[question.id]) && (formData[question.id] as string[]).includes(option)}
                        onChange={e => handleCheckboxChange(question.id, option, e.target.checked)}
                        className="mr-2 text-accent focus:ring-accent"
                      />
                      <label 
                        htmlFor={`${question.id}-${option}`}
                        className="opacity-90"
                        style={{ color: 'var(--soft-sage)' }}
                      >
                        {option}
                      </label>
                    </div>
                  ))}
                </div>
              )}
              
              {errors[question.id] && (
                <p className="text-red-400 text-sm mt-1">{errors[question.id]}</p>
              )}
            </div>
          ))}
          
          <div className="pt-4">
            <button
              type="submit"
              disabled={isSubmitting}
              className="px-8 py-3 bg-accent hover:bg-highlight text-portal-beige font-semibold rounded-md transition-all duration-300 flex items-center gap-2 hover:shadow-[0_0_15px_rgba(212,168,80,0.5)] hover:-translate-y-1 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isSubmitting ? (
                <>
                  <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-portal-beige" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Processing...
                </>
              ) : submitButtonText}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SimpleForm;
