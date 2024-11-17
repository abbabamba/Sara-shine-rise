import React, { useState, useEffect } from 'react';
import { Alert, AlertDescription } from '../components/ui/alert';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const ImageCarousel = () => {
  const [currentImage, setCurrentImage] = useState(0);
  
  // Remplacez ces URLs par vos vraies images
  const images = [
    "/images/slide1.jpeg",
    "/images/slide2.jpeg",
    "/images/slide3.jpeg"
  ];

  const nextImage = () => {
    setCurrentImage((prev) => (prev + 1) % images.length);
  };

  const prevImage = () => {
    setCurrentImage((prev) => (prev - 1 + images.length) % images.length);
  };

  // Auto-play
  useEffect(() => {
    const timer = setInterval(nextImage, 5000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="relative h-96 overflow-hidden">
      {/* Images */}
      <div className="relative h-full w-full">
        {images.map((img, index) => (
          <div
            key={index}
            className={`absolute w-full h-full transition-opacity duration-500 ${
              currentImage === index ? 'opacity-100' : 'opacity-0'
            }`}
          >
            <img
              src={img}
              alt={`Slide ${index + 1}`}
              className="w-full h-full object-cover"
            />
          </div>
        ))}
      </div>

      {/* Navigation Buttons */}
      <button
        onClick={prevImage}
        className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white/80 p-2 rounded-full"
      >
        <ChevronLeft size={24} />
      </button>
      <button
        onClick={nextImage}
        className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white/80 p-2 rounded-full"
      >
        <ChevronRight size={24} />
      </button>

      {/* Indicators */}
      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
        {images.map((_, index) => (
          <button
            key={index}
            className={`w-3 h-3 rounded-full ${
              currentImage === index ? 'bg-white' : 'bg-white/50'
            }`}
            onClick={() => setCurrentImage(index)}
          />
        ))}
      </div>
    </div>
  );
};

const SaraWebsite = () => {
  const [formData, setFormData] = useState({
    studentName: '',
    studentAge: '',
    parentName: '',
    email: '',
    phone: '',
    service: '',
    message: ''
  });
  
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Formatage du message pour WhatsApp
    const message = `
*Nouvelle inscription SARA Academy*
📚 *Informations élève :*
Nom : ${formData.studentName}
Âge : ${formData.studentAge}

👥 *Parent/Tuteur :*
Nom : ${formData.parentName}
Email : ${formData.email}
Tél : ${formData.phone}

✨ *Service souhaité :*
${formData.service}

💬 *Message :*
${formData.message}
    `.trim();

    // Numéro WhatsApp de l'entreprise (à remplacer par votre numéro)
    const phoneNumber = '33600000000'; // Format : indicatif pays sans '+' suivi du numéro
    
    // Création du lien WhatsApp avec le message encodé
    const whatsappUrl = `https://api.whatsapp.com/send?phone=${+221786017545}&text=${encodeURIComponent(message)}`;
    
    // Ouverture de WhatsApp dans un nouvel onglet
    window.open(whatsappUrl, '_blank');
    
    setIsSubmitted(true);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-purple-50">
      {/* Header */}
      <header className="bg-white shadow-md">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <span className="text-3xl font-bold text-blue-600">SARA</span>
              <span className="ml-2 text-sm text-purple-600">Shine And Rise Academy</span>
            </div>
            <nav className="hidden md:flex space-x-6">
              <a href="#services" className="text-gray-600 hover:text-blue-600">Nos Services</a>
              <a href="#about" className="text-gray-600 hover:text-blue-600">À Propos</a>
              <a href="#contact" className="text-gray-600 hover:text-blue-600">Contact</a>
            </nav>
          </div>
        </div>
      </header>

      {/* Carousel Banner */}
      <ImageCarousel />

      {/* Services Section */}
      <section id="services" className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Nos Services</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="p-6 bg-blue-50 rounded-lg shadow-md hover:shadow-lg transition-shadow">
              <h3 className="text-xl font-semibold mb-4">Cours Particuliers</h3>
              <p className="text-gray-600">Accompagnement personnalisé pour une réussite scolaire garantie</p>
            </div>
            <div className="p-6 bg-purple-50 rounded-lg shadow-md hover:shadow-lg transition-shadow">
              <h3 className="text-xl font-semibold mb-4">Anglais Professionnel</h3>
              <p className="text-gray-600">Perfectionnez votre anglais pour booster votre carrière</p>
            </div>
            <div className="p-6 bg-indigo-50 rounded-lg shadow-md hover:shadow-lg transition-shadow">
              <h3 className="text-xl font-semibold mb-4">Développement Personnel</h3>
              <p className="text-gray-600">Libérez votre potentiel et atteignez vos objectifs</p>
            </div>
            <div className="p-6 bg-pink-50 rounded-lg shadow-md hover:shadow-lg transition-shadow">
              <h3 className="text-xl font-semibold mb-4">Coaching Sportif</h3>
              <p className="text-gray-600">Optimisez vos performances avec notre coaching mental</p>
            </div>
          </div>
        </div>
      </section>

      {/* Formulaire d'inscription */}
      <section id="contact" className="py-16">
        <div className="container mx-auto px-4 max-w-2xl">
          <h2 className="text-3xl font-bold text-center mb-12">Inscription</h2>
          
          {isSubmitted ? (
            <Alert className="mb-8 bg-green-50 text-green-800 border border-green-200">
              <AlertDescription>
                Merci pour votre inscription ! Vous allez être redirigé vers WhatsApp pour finaliser votre demande.
              </AlertDescription>
            </Alert>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6 bg-white p-8 rounded-lg shadow-md">
              {/* Form fields remain the same */}
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Nom de l'élève
                  </label>
                  <input
                    type="text"
                    required
                    className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-blue-500"
                    value={formData.studentName}
                    onChange={(e) => setFormData({...formData, studentName: e.target.value})}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Âge de l'élève
                  </label>
                  <input
                    type="number"
                    required
                    className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-blue-500"
                    value={formData.studentAge}
                    onChange={(e) => setFormData({...formData, studentAge: e.target.value})}
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Nom du parent/tuteur
                </label>
                <input
                  type="text"
                  required
                  className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-blue-500"
                  value={formData.parentName}
                  onChange={(e) => setFormData({...formData, parentName: e.target.value})}
                />
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Email
                  </label>
                  <input
                    type="email"
                    required
                    className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-blue-500"
                    value={formData.email}
                    onChange={(e) => setFormData({...formData, email: e.target.value})}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Téléphone
                  </label>
                  <input
                    type="tel"
                    required
                    className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-blue-500"
                    value={formData.phone}
                    onChange={(e) => setFormData({...formData, phone: e.target.value})}
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Service souhaité
                </label>
                <select
                  required
                  className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-blue-500"
                  value={formData.service}
                  onChange={(e) => setFormData({...formData, service: e.target.value})}
                >
                  <option value="">Sélectionnez un service</option>
                  <option value="Cours particuliers">Cours particuliers</option>
                  <option value="Anglais professionnel">Anglais professionnel</option>
                  <option value="Développement personnel">Développement personnel</option>
                  <option value="Coaching mental sportif">Coaching mental sportif</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Message (optionnel)
                </label>
                <textarea
                  className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-blue-500 h-32"
                  value={formData.message}
                  onChange={(e) => setFormData({...formData, message: e.target.value})}
                ></textarea>
              </div>

              <button
                type="submit"
                className="w-full bg-blue-600 text-white py-3 px-6 rounded-md hover:bg-blue-700 transition-colors"
              >
                Envoyer la demande via WhatsApp
              </button>
            </form>
          )}
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-800 text-white py-8">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-3 gap-8">
            <div>
              <h3 className="text-xl font-bold mb-4">SARA Academy</h3>
              <p className="text-gray-400">Votre partenaire pour la réussite</p>
            </div>
            <div>
              <h3 className="text-xl font-bold mb-4">Contact</h3>
              <p className="text-gray-400">Email: contact@sara-academy.fr</p>
              <p className="text-gray-400">Tél: 01 23 45 67 89</p>
            </div>
            <div>
              <h3 className="text-xl font-bold mb-4">Horaires</h3>
              <p className="text-gray-400">Lun - Ven: 9h - 19h</p>
              <p className="text-gray-400">Sam: 9h - 17h</p>
            </div>
          </div>
          <div className="mt-8 pt-8 border-t border-gray-700 text-center">
            <p className="text-gray-400">&copy; 2024 SARA Academy. Tous droits réservés.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default SaraWebsite;