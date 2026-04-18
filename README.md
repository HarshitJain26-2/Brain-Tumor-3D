
<div align="center">
  <img src="frontend/public/logo.png" alt="NeuroSeg AI Logo" width="120" />

# 🧬 NeuroSeg AI: 3D Brain Tumor Segmentation
### Advanced Radiology Intelligence & Volumetric Analysis

[![Python 3.10+](https://img.shields.io/badge/Python-3.10%2B-blue?style=for-the-badge&logo=python)](https://www.python.org/)
[![PyTorch](https://img.shields.io/badge/PyTorch-EE4C2C?style=for-the-badge&logo=pytorch&logoColor=white)](https://pytorch.org/)
[![Project MONAI](https://img.shields.io/badge/MONAI-Medical_AI-000000?style=for-the-badge&logo=monai)](https://monai.io/)
[![FastAPI](https://img.shields.io/badge/FastAPI-009688?style=for-the-badge&logo=fastapi&logoColor=white)](https://fastapi.tiangolo.com/)
[![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)](https://reactjs.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)

</div>

---

## 🌟 Executive Summary

NeuroSeg AI is a state-of-the-art medical imaging application designed for fully autonomous, high-precision 3D brain tumor segmentation. Leveraging a deep Residual U-Net (**UNet-3D**) architecture, the platform ingests patient NIfTI scans (FLAIR, T1, T1CE, T2) and performs computationally intensive volumetric spatial analysis to classify Whole Tumor (WT), Necrotic Core (NCR), Peritumoral Edema (ED), and GD-Enhancing Tumor (ET) boundaries.

Designed for clinical agility, it bridges sophisticated PyTorch deep learning with a blazing-fast FastAPI backend and an ultra-modern, glassmorphism-inspired React diagnostic dashboard.

---

## 🏗️ System Architecture & Data Flow

Our architecture is decoupled to ensure inference speed, parallel processing, and a fluid user experience.

```mermaid
graph TD
    %% Styling for high visibility and premium feel
    classDef frontend fill:#f0f7ff,stroke:#0369a1,stroke-width:2px,color:#0c4a6e;
    classDef backend fill:#f0fdf4,stroke:#15803d,stroke-width:2px,color:#064e3b;
    classDef ml fill:#fff7ed,stroke:#c2410c,stroke-width:2px,color:#7c2d12;
    classDef process fill:#fafafa,stroke:#737373,stroke-width:1px,stroke-dasharray: 5 5;

    subgraph FE ["💻 CLINICAL DASHBOARD (REACT / VITE)"]
        UI["<b>User Interface</b><br/>Glassmorphism UI"]:::frontend
        MI["<b>Modality Ingestion</b><br/>Parallel Uploads"]:::frontend
        RD["<b>Diagnostic Reports</b><br/>PDF Generation"]:::frontend
        UI --> MI
    end

    subgraph BE ["⚙️ FASTAPI BACKEND"]
        API["<b>REST Gateway</b><br/>Uvicorn / Pydantic"]:::backend
        JS["<b>Job Scheduler</b><br/>Singleton Queue"]:::backend
        MS["<b>Inference Engine</b><br/>SSE Streaming"]:::backend
        API --> JS --> MS
    end
    
    subgraph AI ["🧠 AI PIPELINE (PYTORCH)"]
        DP["<b>Preprocessing</b><br/>MONAI Transforms"]:::ml
        MDL["<b>3D Residual U-Net</b><br/>Inference Path"]:::ml
        PP["<b>Volumetrics</b><br/>Segment Geometry"]:::ml
        DP --> MDL --> PP
    end
    
    %% Connections with descriptive labels
    MI -- "NIfTI Multipart Stream" --> API
    MS -- "Raw Voxel Tensors" --> DP
    PP -- "Segmentation Stats" --> MS
    MS -- "Live SSE Events" --> RD

    %% Link Styling
    linkStyle default stroke:#94a3b8,stroke-width:1px;
    linkStyle 4,5,6,7 stroke:#0369a1,stroke-width:2px;
```

---

## 🚀 Key Capabilities

- **Autonomous 3D Segmentation**: Precise tumor localization and quad-class categorization using a customized MONAI/PyTorch UNet-3D.
- **Multi-Modal Support**: Intelligent aggregation of native weighted (T1), contrast-enhanced (T1CE), T2-weighted, and Fluid-Attenuated (FLAIR) dimensions.
- **Volumetric Spatial Analysis**: Real-time extraction of tumor mass bounding boxes (HWD), volumetric density in mm³, and primary focal point tracking.
- **Automated Clinical Reporting**: Generate pixel-perfect, professional Clinical Analysis Reports in PDF format directly from the browser.
- **High-Concurrency Pipeline**: Handles heavyweight `.nii.gz` scans locally or via Hugging Face Spaces through optimized inference orchestration.

---

## 🛠️ Technology Stack

### Artificial Intelligence & ML Pipeline
*   **Deep Learning**: [PyTorch](https://pytorch.org/) core computation engine.
*   **Medical Vision**: [MONAI](https://monai.io/) (Medical Open Network for AI) transforms and loss primitives.
*   **Neuroimaging**: [NiBabel](https://nipy.org/nibabel/) for robust read/write of `.nii` / `.nii.gz` formatted medical binaries.
*   **Architecture**: Optimized 3D Residual U-Net.

### High-Performance Backend
*   **Framework**: [FastAPI](https://fastapi.tiangolo.com/) + Pydantic for robust API definitions.
*   **Server**: Uvicorn ASGI server with SSE (Server-Sent Events) streaming.
*   **Concurrency**: Singleton ModelService pattern handling thread-safe background inference.

### Clinical Dashboard (Frontend)
    
*   **Core**: [React 18](https://react.dev/) + TypeScript + Vite.
*   **Styling**: [Tailwind CSS](https://tailwindcss.com/) with pure Vanilla CSS extensions.
*   **Motion**: [Framer Motion](https://www.framer.com/motion/) for scale & stagger micro-animations.
*   **Icons**: [Lucide React](https://lucide.dev/) workflow visualizations.

---

## 📂 Project Anatomy

```text
Brain-Tumor-3D/
├── frontend/                     # React + Vite UI
│   ├── src/
│   │   ├── components/           # Reusable UI (Sidebar, MedicalReport, etc)
│   │   ├── hooks/                # Async job polling & SSE tracking
│   │   ├── index.css             # Vanilla CSS + Tailwind tokens
│   │   └── App.tsx               # Primary Orchestrator & Viewport
├── app/                          # FastAPI Backend
│   ├── routes/                   # API entry points (ingestion, health)
│   ├── main.py                   # Server lifespan and static file serving
│   └── model_service.py          # Singleton pipeline orchestrating UNet-3D
├── scripts/                      # ML Training Environment
│   ├── train.py                  # Model training loop
│   ├── unet3d.py                 # Core AI topology definitions
│   ├── dataset.py                # DataLoader & Transform pipelines
│   └── cross_validate.py         # Statistical K-Fold validation
├── models/                       # Inference Weights Directory
│   └── best_model.pth            # 275MB Checkpoint (Git LFS)
└── sample_data/                  # Demo BraTS NIfTI files
```

---

## ⚡ Deployment & Installation Guide

### 1. Repository Setup & Git LFS

Verify that Git LFS is operational for handling the large medical model weights.

```bash
git clone https://github.com/HarshitJain26-2/Brain-Tumor-3D.git
cd Brain-Tumor-3D

# Critical: Ensure Git LFS pulls the 275MB model weights
git lfs install
git lfs pull
```

### 2. Backend Initialization (Python 3.10+)

```bash
# Instantiate Virtual Environment
python -m venv venv
# Windows:
.\venv\Scripts\activate
# Unix:
source venv/bin/activate

# Install Medical AI Stack
pip install -r requirements.txt

# Launch FastAPI Server
python -m uvicorn app.main:app --host 0.0.0.0 --port 8000
```

### 3. Frontend Compilation

In a separate terminal, deploy the diagnostic dashboard:

```bash
cd frontend
npm install

# Option A: Local Dev Server
npm run dev

# Option B: Build for Production
# The backend will automatically serve these static files on localhost:8000
npm run build
```

---

## 🩺 Clinical Workflows

1. **Access Dashboard**: Open `http://localhost:8000` (or the Vite dev port).
2. **Modality Ingestion**: Supply the 4 required MRI modalities (FLAIR, T1, T1CE, T2).
3. **Inference**: Set Optimization Mode and engage the pipeline.
4. **Analysis**: Review 3D spatial segments and algorithmic diagnostic summaries.
5. **Reporting**: Click "Save PDF" to generate the final Clinical Analysis Report.

---


