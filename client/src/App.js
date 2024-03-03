import logo from './logo.svg';
import './App.css';
import './compontents/CalculatorComponent'
import CalculatorComponent from "./compontents/CalculatorComponent";
import Header from "./compontents/HeaderComponent";
import RequestedLoanSelector from "./compontents/RequestedLoanSelector";
import BankList from "./compontents/BankListComponent";
function App() {
  return (
    <div className="App">
        <Header/>
        <BankList/>
    </div>
  );
}
export default App;
