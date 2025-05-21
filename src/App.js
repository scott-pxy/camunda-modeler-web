import './App.css';
import BpmnEditor from './BpmnEditor';
import { saveAs } from 'file-saver';
import 'bpmn-js/dist/assets/diagram-js.css';
import 'bpmn-js/dist/assets/bpmn-font/css/bpmn.css';
import '@bpmn-io/properties-panel/dist/assets/properties-panel.css';


function App() {
  const handleDownload = (blob) => {
    saveAs(blob, 'diagram.bpmn');
  };

  return (
    <div className="App">
      <h1>Camunda Web Modeler</h1>
      <BpmnEditor/>
    </div>
  );
}

export default App;