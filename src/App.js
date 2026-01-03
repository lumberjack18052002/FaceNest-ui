import "./App.css";
import ProfileList from "./Components/ProfileList";

function App() {
  return (
    <div className="page">
      <div className="header">
        <h2>FaceNest</h2>
      </div>
      <div className="content">
        <div className="left"></div>
        <div className="center">
          <ProfileList />
        </div>
        <div className="right"></div>
      </div>
      <div className="footer">
        <p>© 2025 FaceNest. All rights reserved.</p>
      </div>
    </div>
  );
}

export default App;
