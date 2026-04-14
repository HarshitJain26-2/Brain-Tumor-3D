---
title: NeuroSeg AI - 3D Brain Tumor Segmenter
emoji: 🧠
colorFrom: blue
colorTo: indigo
sdk: docker
app_port: 7860
pinned: false
---

# Brain Tumor 3D Segmenter

A comprehensive 3D medical imaging analysis tool that utilizes a UNet-3D architecture for brain tumor segmentation from NIfTI files. This project features a high-performance FastAPI backend and a modern React-based frontend for visualization and inference.

## Project Structure

```text
.
├── app/                    # FastAPI Backend Application
│   ├── routes/             # API route handlers (health, infer)
│   ├── main.py             # Backend entry point
│   └── model_service.py    # Model loading & inference logic
├── frontend/               # React + Vite + TypeScript Frontend
│   └── src/
│       ├── components/     # UI Components
│       └── App.tsx
├── scripts/                # ML training & evaluation utilities
│   ├── train.py            # Training script
│   ├── infer.py            # Standalone inference script
│   ├── dataset.py          # Data loading and preprocessing
│   ├── unet3d.py           # UNet-3D architecture definition
│   ├── losses.py           # Custom loss functions
│   ├── cross_validate.py   # K-fold cross validation
│   ├── evaluate_metrics.py # Model evaluation & metrics
│   ├── evaluate_comprehensive.py  # Comprehensive evaluation
│   ├── get_metrics.py      # Metrics extraction helper
│   ├── create_sample.py    # Sample data creator
│   └── test_infer.py       # Inference smoke test
├── models/                 # Model weights directory (*.pth, *.onnx)
├── results/                # Evaluation outputs (heatmaps, metrics)
│   └── cv/                 # Cross-validation results
├── sample_data/            # Sample NIfTI files
└── requirements.txt        # Python dependencies
```

## Features

- **3D Segmentation**: Precise tumor localization using UNet-3D.
- **ONNX Optimization**: High-speed CPU inference on Hugging Face Spaces.
- **REST API**: Batch processing and real-time inference via FastAPI.
- **Modern UI**: Interactive dashboard for uploading and visualizing scans.
- **Scalable**: Container-ready architecture.

## Getting Started

### Setup & Installation

#### 1. Clone & Setup
```bash
git clone https://github.com/HarshitJain26-2/Brain-Tumor-3D.git
cd Brain-Tumor-3D
```

#### 2. Environment
```bash
python -m venv venv
source venv/bin/activate  # or venv\Scripts\activate on Windows
pip install -r requirements.txt
```

#### 3. Run Locally
```bash
# Backend
uvicorn app.main:app --reload

# Frontend
cd frontend
npm install
npm run dev
```

## Usage

1. Open the frontend in your browser.
2. Upload a `.nii.gz` brain scan (FLAIR, T1, T1CE, T2).
3. Wait for the segmentation results to be processed and visualized.

## License

[MIT](LICENSE)
