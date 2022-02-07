import './App.css';
import Router from './routes/Router';
import store from './redux/store'
import { Provider } from 'react-redux'

function App() {
  return (
    <Provider store={store}>
    <div className="App">
      <Router/>
    </div>
    </Provider>
  );
}

export default App;
