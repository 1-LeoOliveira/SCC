'use client'
import Head from 'next/head';
import LocationForm from '../components/LocationForm';

export default function Home() {
  return (
    <>
      <Head>
        <title>Cadastro de Lojas via WhatsApp</title>
        <meta name="description" content="Envie localizações de lojas via WhatsApp" />
      </Head>
      
      <main className="min-h-screen bg-gray-100 py-12 px-4">
        <LocationForm />
      </main>
    </>
  );
}