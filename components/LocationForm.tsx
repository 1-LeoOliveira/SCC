'use client'
import { useState } from 'react';

export default function LocationForm() {
  const [observation, setObservation] = useState('');
  const [recipient, setRecipient] = useState('');
  const [isGettingLocation, setIsGettingLocation] = useState(false);
  const [error, setError] = useState('');
  const [locationData, setLocationData] = useState<{lat: number, lng: number} | null>(null);

  const recipients = [
    { id: '1', name: 'Marcelo Filho', phone: '5591984526743' },
    { id: '2', name: 'Daniel Sales', phone: '5591984740541' },
    { id: '3', name: 'Leo Oliveira', phone: '5591982690087' },
  ];

  const handleGetLocation = () => {
    setIsGettingLocation(true);
    setError('');
    
    if (!navigator.geolocation) {
      setError('Geolocalização não é suportada pelo seu navegador');
      setIsGettingLocation(false);
      return;
    }

    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const { latitude, longitude } = position.coords;
        setLocationData({ lat: latitude, lng: longitude });
        setIsGettingLocation(false);
      },
      (err) => {
        setError('Não foi possível obter sua localização: ' + err.message);
        setIsGettingLocation(false);
      },
      { enableHighAccuracy: true, timeout: 10000, maximumAge: 0 }
    );
  };

  const handleSubmit = () => {
    if (!locationData) {
      setError('Localização não disponível');
      return;
    }

    if (!recipient || !observation) {
      setError('Por favor, selecione um destinatário e adicione uma observação');
      return;
    }

    const selectedRecipient = recipients.find(r => r.id === recipient);
    
    if (!selectedRecipient) {
      setError('Destinatário inválido');
      return;
    }

    const message = `📌 Nova Loja para Cadastro%0A%0A` +
                    `📍 *Localização*%0A` +
                    `https://www.google.com/maps?q=${locationData.lat},${locationData.lng}%0A%0A` +
                    `📝 *Observação*%0A${encodeURIComponent(observation)}%0A%0A` +
                    `🕒 Enviado em: ${new Date().toLocaleString()}`;
    
    // Solução para mobile - cria um link temporário e dispara o click
    const link = document.createElement('a');
    link.href = `https://wa.me/${selectedRecipient.phone}?text=${message}`;
    link.target = '_blank';
    link.rel = 'noopener noreferrer';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="max-w-md mx-auto p-8 bg-white rounded-xl shadow-lg">
      <div className="text-center mb-8">
        <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
          </svg>
        </div>
        <h1 className="text-2xl font-bold text-gray-800">Cadastro de Nova Loja</h1>
        <p className="text-gray-600 mt-2">Envie a localização e detalhes via WhatsApp</p>
      </div>
      
      <div className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-black mb-1">Destinatário</label>
          <select
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all text-black"
            value={recipient}
            onChange={(e) => setRecipient(e.target.value)}
            required
          >
            <option value="">Selecione o destinatário...</option>
            {recipients.map((r) => (
              <option key={r.id} value={r.id}>{r.name}</option>
            ))}
          </select>
        </div>
        
        <div>
          <label className="block text-sm font-medium text-black mb-1">Observação</label>
          <textarea
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all text-black"
            rows={4}
            value={observation}
            onChange={(e) => setObservation(e.target.value)}
            placeholder="Descreva a loja (nome, horário de funcionamento, características, etc.)"
            required
          />
        </div>
        
        {error && (
          <div className="p-3 bg-red-50 text-red-600 text-sm rounded-lg border border-red-100">
            {error}
          </div>
        )}
        
        {!locationData ? (
          <button
            className={`w-full py-3 px-4 rounded-lg font-medium flex items-center justify-center space-x-2 transition-all
              ${isGettingLocation 
                ? 'bg-blue-400 cursor-not-allowed' 
                : 'bg-blue-600 hover:bg-blue-700 text-white shadow-md hover:shadow-lg'}`}
            onClick={handleGetLocation}
            disabled={isGettingLocation}
          >
            {isGettingLocation ? (
              <>
                <svg className="animate-spin -ml-1 mr-2 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                <span>Obtendo localização...</span>
              </>
            ) : (
              <>
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />
                </svg>
                <span>Obter Localização</span>
              </>
            )}
          </button>
        ) : (
          <button
            className="w-full py-3 px-4 rounded-lg font-medium flex items-center justify-center space-x-2 bg-green-600 hover:bg-green-700 text-white shadow-md hover:shadow-lg transition-all"
            onClick={handleSubmit}
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
            </svg>
            <span>Enviar via WhatsApp</span>
          </button>
        )}
        
        <div className="text-center text-xs text-gray-800 mt-4">
          <p>O sistema irá abrir o WhatsApp com a mensagem pronta</p>
          <p className="mt-1">Certifique-se de permitir o acesso à sua localização</p>
        </div>
      </div>
    </div>
  );
}