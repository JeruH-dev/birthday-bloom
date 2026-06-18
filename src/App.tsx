/**
 * Romantic Birthday Website
 * This React application serves as a romantic birthday website, designed to celebrate a special occasion with love and affection. The website features a heartfelt message, beautiful images, and interactive elements to create a memorable experience for the birthday person. It is built using React, allowing for a dynamic and responsive user interface that can be easily customized to suit the preferences of the couple. The website aims to convey love and appreciation in a unique and meaningful way, making the birthday celebration even more special.
 */
import{ BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import IndexPage from './pages/Index';
const App = () => (
    <Router>
        <Routes>
            <Route path="/" element={<IndexPage />} />
        </Routes>
    </Router>
);

export default App;
