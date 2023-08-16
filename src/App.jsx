import { useEffect, useState } from "react";
import reactLogo from "./assets/react.svg";
import moneyPNG from "./assets/money.png";
import viteLogo from "/vite.svg";
import axios from "axios";
import "./App.css";

function App() {
  const [data, setData] = useState(null);
  const [inputChange1,setInputChange1] =useState(1);
  const [inputChange2,setInputChange2] =useState(1);
  const [change1,setChange1] =useState("USD");
  const [change2,setChange2] =useState("THB");
  const [exchange_rate,setExchange_rate] = useState();
  useEffect(() => {
    apiExchange();
  }, []);
  const apiExchange = () => {
    axios
      .get(
        "https://v6.exchangerate-api.com/v6/3fa0d5849e5ee2039023726e/latest/USD"
      )
      .then((res) => {
        setData(res.data.conversion_rates);
        setInputChange2(res.data.conversion_rates['THB'])
        
      })
      .catch((err) => console.log(err));
  };
  const handleinputChange1= (event)=>{
    setInputChange1(event.target.value)
    const exchange =axios
      .get(
        `https://v6.exchangerate-api.com/v6/3fa0d5849e5ee2039023726e/pair/${change1}/${change2}`
      )
      .then((res) => {
        setInputChange2(event.target.value*res.data.conversion_rate)
        setExchange_rate(res.data.conversion_rate)
      })
      .catch((err) => console.log(err));
  }
  const handleinputChange2= (event)=>{
    setInputChange2(event.target.value)
    const exchange =axios
      .get(
        `https://v6.exchangerate-api.com/v6/3fa0d5849e5ee2039023726e/pair/${change1}/${change2}`
      )
      .then((res) => {
        setInputChange1(event.target.value/res.data.conversion_rate)
        setExchange_rate(res.data.conversion_rate)
      })
      .catch((err) => console.log(err));
    
  }
  const handleCurrencyChange1= (event)=>{
    setChange1(event.target.value)
    const exchange =axios
      .get(
        `https://v6.exchangerate-api.com/v6/3fa0d5849e5ee2039023726e/pair/${event.target.value}/${change2}`
      )
      .then((res) => {
        setInputChange2(inputChange1*res.data.conversion_rate)
        setExchange_rate(res.data.conversion_rate)
      })
      .catch((err) => console.log(err));
  }
  const handleCurrencyChange2= (event)=>{
    setChange2(event.target.value)
    const exchange =axios
      .get(
        `https://v6.exchangerate-api.com/v6/3fa0d5849e5ee2039023726e/pair/${change1}/${event.target.value}`
      )
      .then((res) => {
        setInputChange1(inputChange2/res.data.conversion_rate)
        setExchange_rate(res.data.conversion_rate)
      })
      .catch((err) => console.log(err));
  }
  const handleAlternateExchangeRate = ()=>{
    
    const exchange =axios
      .get(
        `https://v6.exchangerate-api.com/v6/3fa0d5849e5ee2039023726e/pair/${change2}/${change1}`
      )
      .then((res) => {
        setChange1(change2)
      setChange2(change1)
        setInputChange2(inputChange1*res.data.conversion_rate)
        setExchange_rate(res.data.conversion_rate)
      })
      .catch((err) => console.log(err));
      
  }

  return data !== null ? (
    <>
      <div className="container-img">
        <img src={moneyPNG} className="moneyimg"></img>
      </div>
      <div style={{ fontSize: "50px" }}>โปรแกรมแปลงสกุลเงิน</div>
      <div className="container">
        <div className="currency" >
          <select className="currency-one" onChange={handleCurrencyChange1} value={change1}>
            <option value="AED">AED</option>
            <option value="ARS">ARS</option>
            <option value="AUD">AUD</option>
            <option value="BGN">BGN</option>
            <option value="BRL">BRL</option>
            <option value="BSD">BSD</option>
            <option value="CAD">CAD</option>
            <option value="CHF">CHF</option>
            <option value="CLP">CLP</option>
            <option value="CNY">CNY</option>
            <option value="COP">COP</option>
            <option value="CZK">CZK</option>
            <option value="DKK">DKK</option>
            <option value="DOP">DOP</option>
            <option value="EGP">EGP</option>
            <option value="EUR">EUR</option>
            <option value="FJD">FJD</option>
            <option value="GBP">GBP</option>
            <option value="GTQ">GTQ</option>
            <option value="HKD">HKD</option>
            <option value="HRK">HRK</option>
            <option value="HUF">HUF</option>
            <option value="IDR">IDR</option>
            <option value="ILS">ILS</option>
            <option value="INR">INR</option>
            <option value="ISK">ISK</option>
            <option value="JPY">JPY</option>
            <option value="KRW">KRW</option>
            <option value="KZT">KZT</option>
            <option value="MXN">MXN</option>
            <option value="MYR">MYR</option>
            <option value="NOK">NOK</option>
            <option value="NZD">NZD</option>
            <option value="PAB">PAB</option>
            <option value="PEN">PEN</option>
            <option value="PHP">PHP</option>
            <option value="PKR">PKR</option>
            <option value="PLN">PLN</option>
            <option value="PYG">PYG</option>
            <option value="RON">RON</option>
            <option value="RUB">RUB</option>
            <option value="SAR">SAR</option>
            <option value="SEK">SEK</option>
            <option value="SGD">SGD</option>
            <option value="THB" >
              THB
            </option>
            <option value="TRY">TRY</option>
            <option value="TWD">TWD</option>
            <option value="UAH">UAH</option>
            <option value="USD" selected>USD</option>
            <option value="UYU">UYU</option>
            <option value="VND">VND</option>
            <option value="ZAR">ZAR</option>
          </select>
          <input type="number" name="" id="amount-one" value={inputChange1} onChange={handleinputChange1}></input>
        </div>
        <div className="swap-container">
          <button className="btn" onClick={()=>{handleAlternateExchangeRate()}}>สลับสกุลเงิน</button>
          <div class="rate" id="rate">
            อัตราการแลกเปลี่ยน 1 {change1} = {exchange_rate} {change2} 
          </div>
        </div>
        <div className="currency" >
          <select className="currency-two" onChange={handleCurrencyChange2} value={change2}>
            <option value="AED">AED</option>
            <option value="ARS">ARS</option>
            <option value="AUD">AUD</option>
            <option value="BGN">BGN</option>
            <option value="BRL">BRL</option>
            <option value="BSD">BSD</option>
            <option value="CAD">CAD</option>
            <option value="CHF">CHF</option>
            <option value="CLP">CLP</option>
            <option value="CNY">CNY</option>
            <option value="COP">COP</option>
            <option value="CZK">CZK</option>
            <option value="DKK">DKK</option>
            <option value="DOP">DOP</option>
            <option value="EGP">EGP</option>
            <option value="EUR">EUR</option>
            <option value="FJD">FJD</option>
            <option value="GBP">GBP</option>
            <option value="GTQ">GTQ</option>
            <option value="HKD">HKD</option>
            <option value="HRK">HRK</option>
            <option value="HUF">HUF</option>
            <option value="IDR">IDR</option>
            <option value="ILS">ILS</option>
            <option value="INR">INR</option>
            <option value="ISK">ISK</option>
            <option value="JPY">JPY</option>
            <option value="KRW">KRW</option>
            <option value="KZT">KZT</option>
            <option value="MXN">MXN</option>
            <option value="MYR">MYR</option>
            <option value="NOK">NOK</option>
            <option value="NZD">NZD</option>
            <option value="PAB">PAB</option>
            <option value="PEN">PEN</option>
            <option value="PHP">PHP</option>
            <option value="PKR">PKR</option>
            <option value="PLN">PLN</option>
            <option value="PYG">PYG</option>
            <option value="RON">RON</option>
            <option value="RUB">RUB</option>
            <option value="SAR">SAR</option>
            <option value="SEK">SEK</option>
            <option value="SGD">SGD</option>
            <option value="THB" selected>THB</option>
            <option value="TRY">TRY</option>
            <option value="TWD">TWD</option>
            <option value="UAH">UAH</option>
            <option value="USD" >
              USD
            </option>
            <option value="UYU">UYU</option>
            <option value="VND">VND</option>
            <option value="ZAR">ZAR</option>
          </select>
          <input type="number" id="amount-one" value={inputChange2} onChange={handleinputChange2}></input>
        </div>
      </div>
    </>
  ) : (
    <div>Loading !!!</div>
  );
}

export default App;
