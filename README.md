# ⚓ DEEP SCAN: Tactical Sonar Defense System

![License](https://img.shields.io/badge/license-MIT-blue.svg)
![React](https://img.shields.io/badge/React-18.2-blue)
![Tailwind](https://img.shields.io/badge/Tailwind-4.0-38bdf8)
![Status](https://img.shields.io/badge/Status-Operational-green)

> **CLASSIFIED // LEVEL 5 SECURITY CLEARANCE**
> An autonomous underwater threat identification system utilizing Random Forest Ensemble learning to differentiate between benign geological formations and active naval mine threats.

![Project Screenshot](src/assets/screenshot-demo.png) 
*(Note: Upload a screenshot of your Home Page to your repo and link it here)*

## 📋 Operational Capabilities

* **Target Acquisition:** Wide-band FM sonar sweep visualization.
* **Algorithmic Processing:** Random Forest classification (n_estimators=100) for material density analysis.
* **Forensic UI:** Military-grade HUD with Radar, Spectrum, and Heatmap visualization modes.
* **Mission Export:** Generates downloadable SIGINT text reports for command review.

## 🛠️ Tech Stack

* **Core:** React 18, Vite
* **Styling:** Tailwind CSS v4 (Military/Tactical Theme)
* **Icons:** Lucide React
* **Routing:** React Router DOM
* **Simulation:** JavaScript-based Random Forest logic

## 🚀 Deployment

### Prerequisites
* Node.js (v16+)
* npm or yarn

### Installation Sequence

1.  **Clone the Repository**
    ```bash
    git clone [https://github.com/yourusername/deep-scan-sonar.git](https://github.com/yourusername/deep-scan-sonar.git)
    cd deep-scan-sonar
    ```

2.  **Install Dependencies**
    ```bash
    npm install
    ```

3.  **Initialize System**
    ```bash
    npm run dev
    ```

## 📂 Data Ingestion Format

The system accepts `.csv` files containing 60-float vectors representing sonar energy bands.
* **0.0 - 1.0:** Normalized signal strength.
* **Rows:** Each row represents a single sonar return chirp.

## 🛡️ License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---
*© 2025 Department of Defense Simulation. For educational purposes only.*
