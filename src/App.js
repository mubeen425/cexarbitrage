import "./App.css";
import AppRoutes from "./routing/AppRoutes";
import AuthProvider from "./context/AuthContext";

function App() {
  
  return (
    <div className="App">
      <AuthProvider>
        <AppRoutes />
      </AuthProvider>
    </div>
  );
}

export default App;
