import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import { Artists } from "./components/Artists";
import { Genres } from "./components/Genres";
import { Topics } from "./components/Topics";
import { Tracks } from "./components/Tracks";
import { Base } from "./components/Base";

function App() {
  return (
    <Router>
        <Routes>
        <Route path="/" element={<Base />}>
        </Route> 
        <Route path="topics" element={<Topics />}>
        </Route> 
        <Route path="tracks" element={<Tracks />}>
        </Route> 
        <Route path="artists" element={<Artists />}>
        </Route> 
        <Route path="genres" element={<Genres />}>
        </Route> 
        </Routes>
    </Router>
  );
}


export default App;
