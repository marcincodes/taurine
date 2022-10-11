import { useState } from "react";

import { trpc } from './trpc';

export function Greet() {
  const [greetMsg, setGreetMsg] = useState('');
  const [name, setName] = useState('');
  
  const { mutate } = trpc.useMutation(['greet']);

  const greet = () => {
    mutate({ name }, { onSuccess: (message) => {
      setGreetMsg(message);
    }});
  }
  
  return (
    <>
      <div className="row">
        <div>
          <input
            id="greet-input"
            onChange={(e) => setName(e.currentTarget.value)}
            placeholder="Enter a name..."
          />
          <button type="button" onClick={() => greet()}>
            Greet
          </button>
        </div>
      </div>
      <p>{greetMsg}</p>
    </>
  )
}
