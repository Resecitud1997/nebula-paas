import React, { useState, useEffect } from 'react';
import { Terminal, Plus, Activity, Server, Trash2, Github, ExternalLink, RefreshCw } from 'lucide-react';

function App() {
  const [projects, setProjects] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newProjectName, setNewProjectName] = useState('');

  // Antes: const createProject = () => {
const createProject = async () => { // <--- AÑADE 'async' AQUÍ
  if (!newProjectName) return;
    
    const newProj = {
      id: Date.now(),
      name: newProjectName,
      status: 'building', // building -> active
      repo: `github.com/user/${newProjectName}`,
      uptime: '0s',
      logs: ['> Initializing build environment...', '> Cloning repository...']
    };

    setProjects([newProj, ...projects]);
    setIsModalOpen(false);
    setNewProjectName('');

    // Simular proceso de despliegue (Build Process)
    simulateDeployment(newProj.id); deployReal(newProjectName);
  };

 // Ejemplo de conexión real
const deployReal = async (nombre) => {
   // Esto conecta tu web con un servidor real
   await fetch('https://api.mi-nebula-real.com/crear-servidor', {
      method: 'POST',
      body: JSON.stringify({ name: nombre })
   });
}

    steps.forEach(({ msg, delay }) => {
      setTimeout(() => {
        setProjects(prev => prev.map(p => {
          if (p.id === id) {
            return { ...p, logs: [...p.logs, msg] };
 simulateDeployment(newProj.id);         }
          return p;
        }));
      }, delay);
    });

    setTimeout(() => {
      setProjects(prev => prev.map(p => 
        p.id === id ? { ...p, status: 'active' } : p
      ));
    }, 7500);
  };

  const deleteProject = (id) => {
    setProjects(projects.filter(p => p.id !== id));
  };

  // EL RETURN DEBE IR AQUÍ. Todo lo anterior es la lógica y estado.
  return (
    <div className="min-h-screen bg-background text-gray-200 p-8 font-mono">
      {/* Header */}
      <header className="flex justify-between items-center mb-10 border-b border-gray-800 pb-4">
        <div className="flex items-center gap-2">
          <Server className="text-indigo-500" />
          <h1 className="text-2xl font-bold tracking-tight text-white">Nebula Cloud</h1>
        </div>
        <button 
          onClick={() => setIsModalOpen(true)}
          className="bg-white text-black px-4 py-2 rounded-md font-bold flex items-center gap-2 hover:bg-gray-200 transition"
        >
          <Plus size={18} /> Nuevo Proyecto
        </button>
      </header>

      {/* Grid de Proyectos */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {projects.length === 0 && (
          <div className="col-span-full text-center py-20 text-gray-500 border border-dashed border-gray-800 rounded-lg">
            <p>No tienes servicios activos.</p>
            <p className="text-sm mt-2">Crea uno nuevo para empezar a desplegar.</p>
          </div>
        )}

        {projects.map((project) => (
          <div key={project.id} className="bg-surface border border-gray-800 rounded-xl overflow-hidden hover:border-gray-600 transition shadow-lg">
            
            {/* Project Header */}
            <div className="p-4 border-b border-gray-800 flex justify-between items-start">
              <div>
                <h3 className="text-xl font-bold text-white">{project.name}</h3>
                <div className="flex items-center gap-2 text-xs text-gray-400 mt-1">
                  <Github size={12} />
                  {project.repo}
                </div>
              </div>
              <div className={`px-2 py-1 rounded-full text-xs font-bold flex items-center gap-1 ${
                project.status === 'active' ? 'bg-green-900/30 text-green-400' : 'bg-yellow-900/30 text-yellow-400 animate-pulse'
              }`}>
                <div className={`w-2 h-2 rounded-full ${project.status === 'active' ? 'bg-green-500' : 'bg-yellow-500'}`}></div>
                {project.status.toUpperCase()}
              </div>
            </div>

            {/* Terminal de Logs */}
            <div className="bg-black p-4 h-48 overflow-y-auto text-xs font-mono text-gray-400 border-b border-gray-800">
              {project.logs.map((log, idx) => (
                <div key={idx} className="mb-1">
                  <span className="text-indigo-400">$</span> {log}
                </div>
              ))}
              {project.status === 'building' && <div className="animate-pulse">_</div>}
            </div>

            {/* Actions */}
            <div className="p-4 bg-surface flex justify-between items-center">
              <div className="text-xs text-gray-500">
                Región: us-east-1
              </div>
              <div className="flex gap-2">
                <button className="p-2 hover:bg-gray-700 rounded-md text-gray-400 hover:text-white" title="Visit">
                  <ExternalLink size={16} />
                </button>
                <button onClick={() => deleteProject(project.id)} className="p-2 hover:bg-red-900/30 rounded-md text-gray-400 hover:text-red-500" title="Delete">
                  <Trash2 size={16} />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Modal Crear Proyecto */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-surface border border-gray-700 p-6 rounded-lg w-full max-w-md shadow-2xl">
            <h2 className="text-xl font-bold mb-4">Desplegar nuevo servicio</h2>
            <input 
              autoFocus
              type="text" 
              placeholder="Nombre del proyecto (ej: mi-api-node)" 
              className="w-full bg-black border border-gray-700 rounded p-3 text-white mb-4 focus:border-indigo-500 outline-none"
              value={newProjectName}
              onChange={(e) => setNewProjectName(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && createProject()}
            />
            <div className="flex gap-3 justify-end">
              <button onClick={() => setIsModalOpen(false)} className="px-4 py-2 text-gray-400 hover:text-white">Cancelar</button>
              <button onClick={createProject} className="bg-indigo-600 hover:bg-indigo-500 text-white px-4 py-2 rounded font-bold">
                Deploy
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
} // <--- ESTA ES LA ÚNICA LLAVE DE CIERRE DE LA FUNCIÓN APP()

export default App;
