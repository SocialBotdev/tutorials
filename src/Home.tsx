import React from 'react';
import { useNavigate } from 'react-router-dom';
import Card from './components/Card';
import Button from './components/Button';

interface Tutorial {
  id: string;
  title: string;
  description: string;
  icon?: string; // Optional icon for each tutorial
  difficulty?: 'beginner' | 'intermediate' | 'advanced'; // Difficulty level
}

interface TutorialCardProps extends Tutorial {
  onSelect: () => void;
}

const TutorialCard: React.FC<TutorialCardProps> = ({ title, description, onSelect, icon, difficulty }) => {
  // Map difficulty to color
  const difficultyColors = {
    beginner: 'bg-green-100 text-green-800',
    intermediate: 'bg-yellow-100 text-yellow-800',
    advanced: 'bg-red-100 text-red-800',
  };
  
  const difficultyBadge = difficulty && (
    <span className={`text-xs font-semibold inline-block py-1 px-2 rounded-full ${difficultyColors[difficulty]} uppercase last:mr-0 mr-1`}>
      {difficulty}
    </span>
  );

  return (
    <Card className="overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 ease-in-out flex flex-col transform hover:-translate-y-2 rounded-lg border border-gray-200">
      <div className="p-6 flex-grow">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-2xl font-bold text-gray-800 font-sans">{title}</h3>
          {icon && <span className="text-2xl text-blue-600">{icon}</span>}
        </div>
        {difficultyBadge && <div className="mb-3">{difficultyBadge}</div>}
        <p className="text-gray-600 leading-relaxed mb-4">{description}</p>
      </div>
      <div className="p-6 bg-gray-50 border-t border-gray-100">
        <Button 
          onClick={onSelect} 
          className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium px-6 py-3 rounded-md transition-colors duration-300 flex items-center justify-center"
        >
          Start Tutorial
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-2" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
          </svg>
        </Button>
      </div>
    </Card>
  );
};

const Home: React.FC = () => {
  const navigate = useNavigate();

  const tutorials: Tutorial[] = [
    {
      id: 'whatsappbot',
      title: 'WhatsApp Cloud API Chatbot',
      description: 'An interactive tutorial to guide you through building your first chatbot using the WhatsApp Cloud API, from setup to sending messages.',
      icon: '💬',
      difficulty: 'beginner',
    },
    // Add more tutorials here
  ];

  return (

    <div className="font-sans antialiased bg-gradient-to-br from-blue-50 to-indigo-100 min-h-screen p-4 sm:p-6 lg:p-8">
      <header className="text-center mb-12 pt-12">
        <h1 className="text-4xl sm:text-5xl font-extrabold text-gray-900 mb-6 leading-tight tracking-tight">
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-indigo-600">
            Interactive Tech Tutorials
          </span>
        </h1>
        <p className="text-lg sm:text-xl text-gray-700 max-w-3xl mx-auto leading-relaxed">
          Explore step-by-step guides to master new technologies and build exciting projects. 
          <span className="block mt-2 font-medium text-blue-700">Select a tutorial below to begin your journey.</span>
        </p>
      </header>

      <main className="max-w-6xl mx-auto px-4">
        {tutorials.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {tutorials.map((tutorial) => (
              <TutorialCard
                key={tutorial.id}
                {...tutorial}
                onSelect={() => navigate(`/${tutorial.id}`)}
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-16 bg-white rounded-lg shadow-sm">
            <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <p className="mt-4 text-gray-600 text-lg">No tutorials available at the moment. Check back soon!</p>
          </div>
        )}
      </main>

      <footer className="text-center mt-20 py-8 border-t border-gray-200">
        <p className="text-gray-600">&copy; {new Date().getFullYear()} Your Tutorial Hub. Happy Coding!</p>
      </footer>
    
    </div>
  );
};

export default Home;