import { useEffect, useRef, useState } from 'react';
import ReactDOM from 'react-dom';
import * as esbuild from 'esbuild-wasm';

const App = () => {
    const ref = useRef<any>();
    const [input, setInput] = useState("");
    const [code, setCode] = useState("");

    const startService = async () => {
        ref.current = await esbuild.startService({
            worker: true,
            wasmURL: '/esbuild.wasm'
        });
    }

    useEffect(() => {
        startService();
    }, []);

    const onClick = () => {
        if(!ref.current) return;

        console.log(ref.current);
        
    }

    return (
        <div>
            <textarea onChange={e => setInput(e.target.value)}></textarea>
            <div>
                <button onClick={onClick}>Submit</button>
            </div>
            <pre></pre>
        </div>
    )
}

ReactDOM.render(
    <App />,
    document.querySelector("#root")
)