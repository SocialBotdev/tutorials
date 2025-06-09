import { BrowserRouter as Router, Routes, Route, useNavigate } from 'react-router-dom';
import Whatsappbot from './Whatsappbot';
import Home from './Home'; // Import the Home component
import Button from './components/Button'; // For the "Back to Home" button

const BackButton = () => {
  const navigate = useNavigate();
  return (
    <div className="p-4 sticky top-0 z-50 shadow-xs backdrop-filter backdrop-blur-lg bg-opacity-40 bg-gray-200">
      <Button
      onClick={() => navigate('/')}
      className="bg-gray-600 hover:bg-gray-700 text-white flex items-center"
      aria-label="Back to tutorials list"
      >
      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
        <path
        fillRule="evenodd"
        d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z"
        clipRule="evenodd"
        />
      </svg>
      Back to Tutorials
      </Button>
    </div>
  );
};

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route
          path="/whatsappbot"
          element={
            <>
              <BackButton />
              <Whatsappbot />
            </>
          }
        />
        {/* Add more routes for future tutorials */}
      </Routes>
    </Router>
  );
}

export default App;