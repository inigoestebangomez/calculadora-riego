/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect } from "react";
import './Riego.css';
import logoRiego from './assets/logo_riego_app.png';

const CalculadorRiego = () => {
  const [frecuencia, setFrecuencia] = useState(4);
  const [litrosTotales, setLitrosTotales] = useState(3.2);
  const [numeroMacetas, setNumeroMacetas] = useState(1);
  const [tiempoRiego, setTiempoRiego] = useState(0);
  const [litrosPorRiego, setLitrosPorRiego] = useState(0);
  
  // Constante de fábrica
  const CAUDAL_ML_POR_MINUTO = 400;
  const CAUDAL_LITROS_POR_MINUTO = CAUDAL_ML_POR_MINUTO / 1000;

  const calcularRiego = () => {
    if (frecuencia <= 0 || numeroMacetas <= 0) {
      setTiempoRiego(0);
      setLitrosPorRiego(0);
      return;
    }

    // Litros disponibles por cada sesión de riego
    const litrosDisponiblesPorRiego = litrosTotales / frecuencia;
    
    // Litros por maceta en cada riego
    const litrosPorMacetaPorRiego = litrosDisponiblesPorRiego / numeroMacetas;
    
    // Tiempo necesario por maceta (en minutos)
    const tiempoPorMaceta = litrosPorMacetaPorRiego / CAUDAL_LITROS_POR_MINUTO;
    
    // Tiempo total de riego (todas las macetas)
    const tiempoTotal = tiempoPorMaceta * numeroMacetas;
    
    setTiempoRiego(Math.round(tiempoTotal * 100) / 100);
    setLitrosPorRiego(Math.round(litrosDisponiblesPorRiego * 100) / 100);
  };

  // Recalcular automáticamente cuando cambien los valores
  useEffect(() => {
    calcularRiego();
  }, [frecuencia, litrosTotales, numeroMacetas]);

  const litrosPorMaceta = numeroMacetas > 0 ? Math.round((litrosPorRiego / numeroMacetas) * 1000) / 1000 : 0;

  return (
    <div className="riego-container">
      <img src={logoRiego} alt="Logo Calculadora de Riego" className="riego-logo" />
      <h1 className="riego-title">
        Calculadora de Riego
      </h1>
      
      <div className="riego-form">
        <div className="riego-field">
          <label className="riego-label">
            Frecuencia de riego (veces al día):
          </label>
          <input
            type="number"
            inputMode="numeric"
            min="1"
            value={frecuencia}
             onChange={(e) => {
                const value = e.target.value;
                if (value === '') {
                  setFrecuencia('');
                } else if (/^\d+$/.test(value)) {
                  setFrecuencia(value);
                }
              }}
            className="riego-input"
          />
        </div>

        <div className="riego-field">
          <label className="riego-label">
            Litros totales disponibles al día:
          </label>
          <input
            type="number"
            inputMode="numeric"
            min="0"
            step="0.1"
            value={litrosTotales}
            onChange={(e) => {
              const value = e.target.value;
              if (value === '') {
                setLitrosTotales('');
              } else if (/^\d*\.?\d*$/.test(value)) {
                setLitrosTotales(value);
              }
            }}
            className="riego-input"
          />
        </div>

        <div className="riego-field">
          <label className="riego-label">
            Número de macetas:
          </label>
          <input
            type="number"
            inputMode="numeric"
            min="1"
            value={numeroMacetas}
            onChange={(e) => {
              const value = e.target.value;
              if (value === '') {
                setNumeroMacetas('');
              } else if (/^\d+$/.test(value)) {
                setNumeroMacetas(value);
              }
            }}

            className="riego-input"
          />
        </div>
      </div>

      <div className="riego-results">
        <h2 className="riego-results-title">Resultados:</h2>
        
        <div className="riego-grid">
          <div className="riego-result-item">
            <span className="riego-result-label">Duración por riego:</span>
            <p className="riego-result-value">{tiempoRiego} min</p>
          </div>
          
          <div className="riego-result-item">
            <span className="riego-result-label">Litros por riego:</span>
            <p className="riego-result-value">{litrosPorRiego} L</p>
          </div>
          
          <div className="riego-result-item">
            <span className="riego-result-label">Litros por maceta:</span>
            <p className="riego-result-value">{litrosPorMaceta} L</p>
          </div>
          
          <div className="riego-result-item">
            <span className="riego-result-label">Caudal bomba:</span>
            <p className="riego-result-value">{CAUDAL_ML_POR_MINUTO} ml/min</p>
          </div>
        </div>
      </div>

      <div className="riego-summary">
        <h3 className="riego-summary-title">Resumen diario:</h3>
        <p className="riego-summary-text">
          Regar {frecuencia} veces al día, {tiempoRiego} minutos cada vez
        </p>
        <p className="riego-summary-text">
          Total: {Math.round(tiempoRiego * frecuencia * 100) / 100} minutos de riego al día
        </p>
      </div>
    </div>
  );
};

export default CalculadorRiego;

//------ Iñigo Esteban Gómez https://github.com/inigoestebangomez/calculadora-riego ------//