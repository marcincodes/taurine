import { QueryClient, QueryClientProvider } from 'react-query';
import { listen, TauriEvent } from "@tauri-apps/api/event";
import { Command } from "@tauri-apps/api/shell";

import { trpc } from './trpc';
import reactLogo from "./assets/react.svg";
import { Greet } from './Greet';
import "./App.css";

/**
 * Running NodeJS process as a sidecar
 */
const cmd = Command.sidecar('binaries/app');

cmd.spawn().then((child) => {
  /**
   * Killing server process when window is closed. Probably won't
   * work for multi window application
   */
  listen(TauriEvent.WINDOW_DESTROYED, function () {
    child.kill();
  })
});

const queryClient = new QueryClient();
const trpcClient = trpc.createClient({
  url: 'http://localhost:3000/api'
});

function App() {
  return (
    <trpc.Provider client={trpcClient} queryClient={queryClient}>
      <QueryClientProvider client={queryClient}>
        <div className="container">
          <h1>Welcome to Tauri<strong>ne</strong>!</h1>

          <div className="row">
            <a href="https://vitejs.dev" target="_blank">
              <img src="/vite.svg" className="logo vite" alt="Vite logo" />
            </a>
            <a href="https://tauri.app" target="_blank">
              <img src="/tauri.svg" className="logo tauri" alt="Tauri logo" />
            </a>
            <a href="https://reactjs.org" target="_blank">
              <img src={reactLogo} className="logo react" alt="React logo" />
            </a>
          </div>

          <p>Click on the Tauri, Vite, and React logos to learn more.</p>

          <Greet />
        </div>
      </QueryClientProvider>
    </trpc.Provider>
  );
}

export default App;
