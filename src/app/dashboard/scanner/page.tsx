import { redirect } from 'next/navigation';

export default function ScannerRedirect() {
  redirect('/dashboard/food-scan');
}
