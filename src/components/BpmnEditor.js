import React, { useEffect } from 'react';
// import BpmnModeler from 'bpmn-js/lib/Modeler';
import BpmnModeler from 'camunda-bpmn-js/lib/camunda-platform/Modeler';

import {
  BpmnPropertiesPanelModule,
  BpmnPropertiesProviderModule,
  CamundaPlatformPropertiesProviderModule
} from 'bpmn-js-properties-panel';

import camundaModdleDescriptor from 'camunda-bpmn-moddle/resources/camunda.json';

const BpmnEditor = () => {
  useEffect(() => {
    const modeler = new BpmnModeler({
      container: '#js-canvas',
      propertiesPanel: {
        parent: '#js-properties-panel'
      },
      additionalModules: [
        BpmnPropertiesPanelModule,
        BpmnPropertiesProviderModule,
        CamundaPlatformPropertiesProviderModule
      ],
      moddleExtensions: {
        camunda: camundaModdleDescriptor
      }
    });

    const initialDiagram = `<?xml version="1.0" encoding="UTF-8"?>
    <bpmn:definitions xmlns:bpmn="http://www.omg.org/spec/BPMN/20100524/MODEL"
                      xmlns:camunda="http://camunda.org/schema/1.0/bpmn"
                      xmlns:bpmndi="http://www.omg.org/spec/BPMN/20100524/DI"
                      xmlns:dc="http://www.omg.org/spec/DD/20100524/DC"
                      id="Definitions_1"
                      targetNamespace="http://bpmn.io/schema/bpmn">
      <bpmn:process id="Process_1" isExecutable="true">
        <bpmn:startEvent id="StartEvent_1"/>
      </bpmn:process>
      <bpmndi:BPMNDiagram id="BPMNDiagram_1">
        <bpmndi:BPMNPlane id="BPMNPlane_1" bpmnElement="Process_1">
          <bpmndi:BPMNShape id="_BPMNShape_StartEvent_2" bpmnElement="StartEvent_1">
            <dc:Bounds x="173" y="102" width="36" height="36"/>
          </bpmndi:BPMNShape>
        </bpmndi:BPMNPlane>
      </bpmndi:BPMNDiagram>
    </bpmn:definitions>`;

    modeler.importXML(initialDiagram).catch((err) => {
      console.error('Failed to import diagram:', err);
    });

    return () => {
      modeler.destroy();
    };
  }, []);

  return (
    <div style={{ display: 'flex' }}>
      <div id="js-canvas" style={{ width: 'calc(100% - 300px)', height: '100vh' }}></div>
      <div id="js-properties-panel" style={{ width: '300px', height: '100vh', overflow: 'auto', borderLeft: '1px solid #ccc' }}></div>
    </div>
  );
};

export default BpmnEditor;