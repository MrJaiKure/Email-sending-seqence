import React, { useCallback, useEffect, useState } from 'react';
import ReactFlow, { addEdge, Background, Controls, MiniMap, useEdgesState, useNodesState } from 'reactflow';
import 'reactflow/dist/style.css';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'; // 👈 For logout redirect

const initialNodes = [];
const initialEdges = [];

function FlowBuilder() {
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);
  const [userEmail, setUserEmail] = useState(''); // 👈 To store user email
  const navigate = useNavigate();

  const onConnect = useCallback((params) => setEdges((eds) => addEdge(params, eds)), []);

  const addNode = (type) => {
    const id = `${nodes.length + 1}`;
    const newNode = {
      id,
      type: 'default',
      position: { x: Math.random() * 250, y: Math.random() * 250 },
      data: { label: `${type} Node` },
    };
    setNodes((nds) => nds.concat(newNode));
  };

  const saveFlow = async () => {
    const flowData = { nodes, edges };
    try {
      const token = localStorage.getItem('token');
      await axios.post('http://localhost:5000/api/save-flow', flowData, {
        headers: { Authorization: `Bearer ${token}` }, // 👈 Fix here
      });
      alert('Flow Saved Successfully!');
    } catch (err) {
      console.error(err);
      alert('Error saving flow');
    }
  };

  const fetchUserProfile = async () => {
    try {
      const token = localStorage.getItem('token');
      const res = await axios.get('http://localhost:5000/api/user/profile', {
        headers: { Authorization: token },
      });
      setUserEmail(res.data.email); // 👈 Set the user's email
    } catch (err) {
      console.error('Error fetching user profile:', err);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('token'); // 👈 Remove token
    navigate('/login'); // 👈 Redirect to login page
  };

  useEffect(() => {
    fetchUserProfile();
  }, []);

  return (
    <div style={{ width: '100vw', height: '100vh' }}>
      
      {/* Top bar */}
      <div style={{
        position: 'absolute', 
        right: 10, 
        top: 10, 
        zIndex: 5, 
        display: 'flex', 
        alignItems: 'center',
        gap: '10px'
      }}>
        {userEmail && <span>{userEmail}</span>}
        <button onClick={handleLogout}>Logout</button>
      </div>

      {/* Buttons to add nodes */}
      <div style={{ position: 'absolute', left: 10, top: 10, zIndex: 4 }}>
        <button onClick={() => addNode('Cold Email')}>Add Cold Email</button>
        <button onClick={() => addNode('Wait/Delay')}>Add Wait/Delay</button>
        <button onClick={() => addNode('Lead Source')}>Add Lead Source</button>
        <button onClick={saveFlow}>Save Flow</button>
      </div>

      {/* React Flow canvas */}
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        fitView
      >
        <Background />
        <Controls />
        <MiniMap />
      </ReactFlow>
    </div>
  );
}

export default FlowBuilder;
