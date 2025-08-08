function ExpensiveComponent({ value }) {
    useEffect(() => {
        console.log("rendering!");
    });
    return <span>{value + 1000}</span>;
}

function App() {
    const [value, setValue] = useState(10);
    const [, triggerRendering] = useState(false);
}
