import MainLayout from '../../components/layouts/MainLayout';
import Head from 'next/head';

export default function ContactPage() {
  return (
    <>
      <MainLayout pageColor="#00B0BA">
        <div className="container mx-auto px-4 py-8 text-center">
          <h1 className="text-3xl font-bold text-gray-800 mb-4">Nous contacter</h1>
          <p className="text-base text-gray-700 mb-4">
            Vous pouvez nous contacter à l'adresse email suivante en indiquant qui vous êtes et la raison de votre mail. Nous répondrons au plus vite !
          </p>
          <p className="text-base text-gray-700 mb-4">
            <a href="mailto:educo2050@contact.fr" className="text-blue-600 hover:underline">educo2050@contact.fr</a>
          </p>
        </div>
      </MainLayout>
    </>
  );
}
