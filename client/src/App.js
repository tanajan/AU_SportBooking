import Index from "./components/pages/index"

function App() {
  useEffect(() => {
    document.title = 'AU Sport Booking'
  }, [])
  return (
    <div className="App">
      <Index />
    </div>
  );
}

export default App;
