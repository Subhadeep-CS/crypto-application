import "./App.css";
import Layout from "./Layout";
import AppRouter from "./routes/AppRouter";

function App() {
  return (
    <div className="w-full">
      <Layout>
        <AppRouter />
      </Layout>
    </div>
  );
}

export default App;
