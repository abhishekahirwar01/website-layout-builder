import { BuilderProvider } from "./context/BuilderContext";
import Sidebar from "./components/Sidebar";
import DropArea from "./components/DropArea";
import PropertyEditor from "./components/PropertyEditor";
import Header from "./components/Header"; 
import styles from "./App.module.css";

const App = () => {
  return (
    <BuilderProvider>
      <div className={styles.app}>
        <Header /> 
        <div className={styles.mainContent}>
          <Sidebar />
          <DropArea />
          <PropertyEditor />
        </div>
      </div>
    </BuilderProvider>
  );
};

export default App;
