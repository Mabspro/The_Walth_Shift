# Tally Form Setup Guide for The Wealth Shift

This document provides step-by-step instructions for setting up Tally forms for The Wealth Shift website. These forms are essential for the user journey, guiding visitors through the assessment and manifesto commitment process before accessing the portal.

## Table of Contents

1. [Creating a Tally Account](#creating-a-tally-account)
2. [Setting Up the Assessment Form](#setting-up-the-assessment-form)
3. [Setting Up the Manifesto Commitment Form](#setting-up-the-manifesto-commitment-form)
4. [Configuring Form Redirects](#configuring-form-redirects)
5. [Updating Form IDs in the Website](#updating-form-ids-in-the-website)
6. [Testing the User Journey](#testing-the-user-journey)

## Creating a Tally Account

1. Visit [Tally.so](https://tally.so) and click "Sign up" to create a new account
2. You can sign up with Google, GitHub, or email
3. Complete the onboarding process:
   - Enter your name and organization details
   - Select "Personal" or "Business" depending on your needs
   - Choose the free plan to start (can upgrade later if needed)
4. Once your account is created, you'll be taken to the Tally dashboard

## Setting Up the Assessment Form

### Basic Form Setup

1. From the Tally dashboard, click "Create form"
2. Name your form "Wealth Journey Assessment"
3. Add a description: "Discover where you are on your wealth journey with our personalized assessment."
4. Customize the form appearance:
   - Click "Design" in the left sidebar
   - Set the theme color to match our accent color (#d4a850)
   - Upload a logo if available
   - Choose a font that matches our website aesthetic

### Adding Assessment Questions

Add the following questions to your form (you can modify or add more as needed):

1. **Welcome Section**
   - Add a "Welcome" block
   - Title: "Your Wealth Journey Assessment"
   - Description: "This assessment will take approximately 5-10 minutes to complete. Please answer each question honestly to get the most accurate results."

2. **Question 1: Current Wealth Mindset**
   - Question type: Multiple choice
   - Question: "How would you describe your current relationship with wealth?"
   - Options:
     - "I struggle with financial scarcity and often worry about money"
     - "I'm financially stable but feel stuck or uncertain about growth"
     - "I'm growing my wealth but want more purpose and alignment"
     - "I have abundance but seek deeper meaning and impact"

3. **Question 2: Growth Areas**
   - Question type: Checkboxes
   - Question: "Which areas of wealth are you most interested in developing? (Select all that apply)"
   - Options:
     - "Financial literacy and investment knowledge"
     - "Mindset and relationship with money"
     - "Purpose-driven wealth creation"
     - "Community and collaborative opportunities"
     - "Ethical impact and giving"

4. **Question 3: Challenges**
   - Question type: Multiple choice
   - Question: "What is your biggest challenge when it comes to wealth building?"
   - Options:
     - "Lack of knowledge or resources"
     - "Limiting beliefs or mindset blocks"
     - "Finding alignment with my values"
     - "Building supportive community"
     - "Other (please specify)"

5. **Question 4: Values Alignment**
   - Question type: Rating scale
   - Question: "How important is it that your wealth journey aligns with your personal values?"
   - Scale: 1-5 (Not important to Very important)

6. **Question 5: Community**
   - Question type: Multiple choice
   - Question: "How do you prefer to engage with a community of like-minded individuals?"
   - Options:
     - "Learning from experts and mentors"
     - "Collaborative projects and opportunities"
     - "Peer support and accountability"
     - "Networking and relationship building"
     - "Contributing my knowledge and experience"

7. **Final Section: Contact Information**
   - Add fields for:
     - Name (required)
     - Email (required)
     - Optional: How did you hear about us?

### Configuring Form Settings

1. Click "Settings" in the left sidebar
2. Under "General":
   - Enable "Collect email addresses"
   - Set "After submission" to "Redirect to a custom URL"
   - Enter your website's manifesto page URL (e.g., "https://thewealthshift.com/manifesto")
3. Under "Notifications":
   - Enable email notifications for new submissions
   - Add the admin email address to receive notifications
4. Under "Share":
   - Copy the form ID (you'll need this later)

## Setting Up the Manifesto Commitment Form

### Basic Form Setup

1. From the Tally dashboard, click "Create form"
2. Name your form "Manifesto Commitment"
3. Add a description: "Affirm your commitment to The Wealth Shift principles."
4. Customize the form appearance to match the assessment form

### Adding Commitment Questions

1. **Welcome Section**
   - Add a "Welcome" block
   - Title: "Affirm Your Commitment"
   - Description: "To continue your journey and unlock access to our portal, please affirm your commitment to The Wealth Shift principles."

2. **Question 1: Commitment**
   - Question type: Checkboxes
   - Question: "I affirm that I have read and commit to the following principles:"
   - Options:
     - "Intentional Growth: I commit to embracing both comfort and discomfort as teachers on my journey."
     - "Community Support: I commit to supporting fellow community members and contributing to collective elevation."
     - "Authentic Empowerment: I commit to practices that build genuine confidence and self-awareness."
     - "Holistic Prosperity: I commit to nurturing all dimensions of prosperity in balanced harmony."
     - "Ethical Impact: I commit to considering the impact of my actions on others and the planet."
   - Make all checkboxes required

3. **Question 2: Personal Commitment**
   - Question type: Long text
   - Question: "What aspect of The Wealth Shift resonates most with you, and how do you plan to incorporate it into your journey? (Optional)"
   - Make this question optional

4. **Final Section: Confirmation**
   - Add a "Text" block
   - Content: "By submitting this form, you're agreeing to show up authentically, support fellow community members, and embrace both the challenges and celebrations along the way."

### Configuring Form Settings

1. Click "Settings" in the left sidebar
2. Under "General":
   - Enable "Collect email addresses"
   - Set "After submission" to "Redirect to a custom URL"
   - Enter your website's unlock page URL (e.g., "https://thewealthshift.com/unlock")
3. Under "Notifications":
   - Enable email notifications for new submissions
   - Add the admin email address to receive notifications
4. Under "Share":
   - Copy the form ID (you'll need this later)

## Configuring Form Redirects

### Setting Up Hidden Fields

Hidden fields allow you to pass data between forms and track user progress:

1. For the Assessment Form:
   - Go to "Settings" > "Hidden fields"
   - Add a field named "source" (this will track where users came from)
   - Add a field named "assessment_completed" (this will be set to "true")

2. For the Manifesto Form:
   - Go to "Settings" > "Hidden fields"
   - Add a field named "source" (this will track where users came from)
   - Add a field named "manifesto_affirmed" (this will be set to "true")

### Enabling Cross-Domain Redirects

To ensure redirects work properly:

1. Go to "Settings" > "General"
2. Under "Privacy & Security":
   - Enable "Allow embedding on any website"
   - Enable "Allow cross-domain redirects"

## Updating Form IDs in the Website

Once your forms are created, you need to update the form IDs in the website code:

1. Open `src/app/assessment/page.tsx`
2. Find the `FormEmbed` component
3. Replace the `formId` value with your Assessment form ID
4. Open `src/app/manifesto/page.tsx`
5. Find the `FormEmbed` component
6. Replace the `formId` value with your Manifesto form ID

Example:

```tsx
// In assessment/page.tsx
<FormEmbed 
  formId="YOUR_ASSESSMENT_FORM_ID_HERE"
  formType="tally"
  height="600px"
  title="Wealth Journey Assessment"
  redirectUrl="/manifesto"
  hiddenFields={{
    source: "website",
    assessment_completed: "true"
  }}
  className="bg-background/10 backdrop-blur-sm rounded-lg border border-accent/20 p-2"
/>

// In manifesto/page.tsx
<FormEmbed 
  formId="YOUR_MANIFESTO_FORM_ID_HERE"
  formType="tally"
  height="400px"
  title="Manifesto Commitment Form"
  redirectUrl="/unlock"
  hiddenFields={{
    source: "website",
    manifesto_affirmed: "true"
  }}
  className="bg-background/10 backdrop-blur-sm rounded-lg border border-accent/20 p-2"
/>
```

## Testing the User Journey

After setting up the forms and updating the form IDs, test the complete user journey:

1. Visit the assessment page
2. Complete and submit the assessment form
3. Verify that you're redirected to the manifesto page
4. Complete and submit the manifesto commitment form
5. Verify that you're redirected to the unlock page
6. Check that the video player and portal access work correctly

## Troubleshooting

If redirects aren't working:

1. Check that the form IDs are correct in the code
2. Verify that "Allow cross-domain redirects" is enabled in Tally settings
3. Ensure the redirect URLs are correct in both the Tally settings and the FormEmbed component
4. Check browser console for any errors

## Additional Resources

- [Tally Documentation](https://tally.so/help)
- [Tally API Documentation](https://tally.so/help/api) (for advanced integrations)
- [Tally Embed Documentation](https://tally.so/help/embed)

---

By following these instructions, you'll have fully functional assessment and manifesto forms that guide users through The Wealth Shift journey, collecting valuable information while providing a seamless experience.
