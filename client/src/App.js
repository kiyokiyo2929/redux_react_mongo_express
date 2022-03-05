import logo from './logo.svg';
import './App.css';
import React from "react"
import AddForm from "./components/AddForm";
import ProjectList from './components/ProjectList';

function App() {
  return (
    <div>
      <AddForm/>
      <ProjectList/>
    </div>
  );
}

export default App;
