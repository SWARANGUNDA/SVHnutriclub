import { redirect } from 'next/navigation';

export default function VoiceRedirect() {
  // Voice assistant is a floating component accessible everywhere.
  // Clicking the voice route can open a dedicated page if needed, but for now we redirect back to dashboard.
  redirect('/dashboard');
}
