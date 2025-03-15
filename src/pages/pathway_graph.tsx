import React from 'react';
import { ReactFlow, Controls, Background, Node, Edge } from '@xyflow/react';
import { CustomNodeDefault, CustomNodeInput, CustomNodeLeft, CustomNodeLeftChild, CustomNodeRight, CustomNodeRightChild } from '@/components/ui/custom-node';
import '@xyflow/react/dist/style.css';


const nodes: Node[] = [
    { id: '1', type: 'customInput', data: { label: 'Self-Treatment', info: 'Do this everyday for 5 days straight' }, position: { x: 0, y: 0 } },
    { id: '2', type: 'customLeftChild', data: { label: 'Eat high-fiber diet', info: 'Do this everyday for 5 days straight' }, position: { x: -400, y: -100 } },
    { id: '3', type: 'customLeftChild', data: { label: 'Drink plenty of water', info: 'Do this everyday for 5 days straight' }, position: { x: -400, y: 0 } },
    { id: '4', type: 'customLeftChild', data: { label: "Don't avoid the urge to pass stool", info: 'Do this everyday for 5 days straight' }, position: { x: -400, y: 100 } },
    { id: '5', type: 'customLeftChild', data: { label: 'Try to keep a schedule for passing stool after every meal', info: 'Do this everyday for 5 days straight' }, position: { x: -400, y: 200 } },
    { id: '6', type: 'customDefault', data: { label: 'See your doctor (a Gastroentologist is recommended)', info: 'Tap to see recommended gastroentologists' }, position: { x: 0, y: 200 } },
    { id: '7', type: 'customRight', data: { label: 'Over-the-Counter Medication', info: 'Do this every day for 14 days straight' }, position: { x: 150, y: 400 } },
    { id: '8', type: 'customRightChild', data: { label: 'Take Laxatives Medication', info: 'Do this every day for 14 days straight' }, position: { x: 550, y: 400 } },
    { id: '9', type: 'customRight', data: { label: 'Prescription Medication', info: 'Do this every day for 14 days straight' }, position: { x: 150, y: 600 } },
    { id: '10', type: 'customRightChild', data: { label: 'Take Lubiprostone (Amitiza) Medication', info: 'Do this every day for 14 days straight' }, position: { x: 550, y: 550 } },
    { id: '11', type: 'customRightChild', data: { label: 'Take Linaclotide (Linzess) Medication', info: 'Do this every day for 14 days straight' }, position: { x: 550, y: 650 } },
    { id: '12', type: 'customLeft', data: { label: 'Continue the Self-Treatment', info: 'Do this everyday for 14 days straight' }, position: { x: -150, y: 400 } },
    { id: '13', type: 'customLeftChild', data: { label: 'Eat high-fiber diet', info: 'Do this everyday for 14 days straight' }, position: { x: -550, y: 300 } },
    { id: '14', type: 'customLeftChild', data: { label: 'Drink plenty of water', info: 'Do this everyday for 14 days straight' }, position: { x: -550, y: 400 } },
    { id: '15', type: 'customLeftChild', data: { label: "Don't avoid the urge to pass stool", info: 'Do this everyday for 14 days straight' }, position: { x: -550, y: 500 } },
    { id: '16', type: 'customLeftChild', data: { label: 'Try to keep a schedule for passing stool after every meal', info: 'Do this everyday for 14 days straight' }, position: { x: -550, y: 600 } },
    { id: '17', type: 'customDefault', data: { label: 'Not feeling well after 14 days since you see a Gastroentologist?', info: 'Do this everyday for 5 days straight' }, position: { x: 0, y: 700 } },
    { id: '18', type: 'customDefault', data: { label: 'See your doctor (a Gastroentologist is recommended)', info: 'Tap to see recommended gastroentologists' }, position: { x: 0, y: 800 } },
    { id: '19', type: 'customDefault', data: { label: 'Prescription Medication', info: 'Do this everyday for 5 days straight' }, position: { x: 0, y: 900 } },
    { id: '20', type: 'customDefault', data: { label: 'You might be scheduled to do Fecal Impaction Removal', info: 'Tap to see recommended Fecal Impaction Removal healthcare facility' }, position: { x: 0, y: 1000 } },
];

const edges: Edge[] = [
    { id: '1-2', source: '1', sourceHandle: 'left', target: '2' },
    { id: '1-3', source: '1', sourceHandle: 'left', target: '3' },
    { id: '1-4', source: '1', sourceHandle: 'left', target: '4' },
    { id: '1-5', source: '1', sourceHandle: 'left', target: '5' },
    { id: '1-6', source: '1', sourceHandle: 'bottom', target: '6' },
    { id: '6-7', source: '6', sourceHandle: 'bottom', target: '7' },
    { id: '7-8', source: '7', sourceHandle: 'right', target: '8' },
    { id: '7-9', source: '7', sourceHandle: 'bottom', target: '9' },
    { id: '9-10', source: '9', sourceHandle: 'right', target: '10' },
    { id: '9-11', source: '9', sourceHandle: 'right', target: '11' },
    { id: '6-12', source: '6', sourceHandle: 'bottom', target: '12' },
    { id: '12-13', source: '12', sourceHandle: 'left', target: '13' },
    { id: '12-14', source: '12', sourceHandle: 'left', target: '14' },
    { id: '12-15', source: '12', sourceHandle: 'left', target: '15' },
    { id: '12-16', source: '12', sourceHandle: 'left', target: '16' },
    { id: '9-17', source: '9', sourceHandle: 'bottom', target: '17' },
    { id: '17-18', source: '17', sourceHandle: 'bottom', target: '18' },
    { id: '18-19', source: '18', sourceHandle: 'bottom', target: '19' },
    { id: '19-20', source: '19', sourceHandle: 'bottom', target: '20' },
];


const TreatmentPathway: React.FC = () => {
  return (
    <>
        <div className='h-screen'>
            <ReactFlow 
                nodes={nodes} 
                edges={edges} 
                nodeTypes={{customLeft: CustomNodeLeft, customLeftChild: CustomNodeLeftChild, customDefault: CustomNodeDefault, customInput: CustomNodeInput, customRight: CustomNodeRight, customRightChild: CustomNodeRightChild}}
            >
                <Background />
                <Controls />
            </ReactFlow>
        </div>
    </>
  );
};

export default TreatmentPathway;
