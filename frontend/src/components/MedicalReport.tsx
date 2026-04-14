import { Download, Printer, Brain, Calendar, User, FileText, ChevronRight } from 'lucide-react'
import { motion } from 'framer-motion'

interface Props {
  isOpen: boolean
  onClose: () => void
  stats: any
  jobId: string
  snapshot: string | null
}

export default function MedicalReport({ isOpen, onClose, stats, jobId, snapshot }: Props) {
  if (!isOpen) return null

  const printReport = () => {
    window.print()
  }

  const currentDate = new Date().toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })

  // Basic Quadrant Description Helper
  const getQuadrantText = () => {
    if (!stats.location?.description) return "N/A"
    return stats.location.description;
  }

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 backdrop-blur-md p-4 sm:p-8 print:static print:block print:p-0">
      <motion.div 
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        className="w-full max-w-4xl max-h-[90vh] bg-white rounded-[2.5rem] shadow-2xl flex flex-col overflow-hidden print:max-h-none print:h-screen print:min-h-screen print:shadow-none print:rounded-none"
      >
        {/* Header Controls */}
        <div className="px-8 py-6 border-b border-slate-100 flex items-center justify-between bg-slate-50/50 print:hidden">
          <div className="flex items-center gap-4">
             <div className="w-10 h-10 rounded-xl bg-accent-blue flex items-center justify-center text-white shadow-apple">
               <FileText className="w-5 h-5" />
             </div>
             <div>
               <h2 className="text-lg font-black text-slate-900 leading-tight">Clinical Analysis Report</h2>
               <p className="text-[10px] text-slate-500 font-bold uppercase tracking-widest">Job Reference #{jobId.slice(0, 8)}</p>
             </div>
          </div>
          <div className="flex gap-3">
             <button 
               onClick={printReport}
               className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-slate-900 text-white text-[10px] font-black uppercase tracking-widest hover:bg-black transition-all shadow-apple active:scale-95"
             >
               <Printer className="w-4 h-4" /> Print / Save PDF
             </button>
             <button 
               onClick={onClose}
               className="flex items-center justify-center w-10 h-10 rounded-xl bg-white border border-slate-200 text-slate-400 hover:text-slate-900 transition-all active:scale-95 text-2xl"
             >
               &times;
             </button>
          </div>
        </div>

        {/* Report Content */}
        <div id="printable-report" className="flex-1 overflow-y-auto p-12 bg-white print:p-16 print:overflow-visible print:min-h-screen print:flex print:flex-col">
          {/* Institutional Header (Print Only) */}
          <div className="hidden print:flex items-center justify-between mb-12 border-b-2 border-slate-900 pb-8">
             <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-black rounded-xl flex items-center justify-center text-white text-2xl font-bold">NS</div>
                <div>
                   <h1 className="text-2xl font-black tracking-tighter">NEUROSEG AI LABS</h1>
                   <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-slate-500">Advanced 3D Radiology Intelligence</p>
                </div>
             </div>
             <div className="text-right">
                <p className="text-xs font-bold text-slate-900">NEUROSEG_OFFICIAL_CMD</p>
                <p className="text-[10px] text-slate-500 font-medium">Auto-Generated Clinical Report</p>
             </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 print:flex print:flex-row print:gap-16 print:flex-1">
            
            {/* Meta Info */}
            <div className="space-y-8 print:w-1/2 print:space-y-10">
               <section>
                  <h3 className="text-[10px] font-black text-accent-blue uppercase tracking-[0.2em] mb-4 flex items-center gap-2">
                    <User className="w-3 h-3" /> Case Metadata
                  </h3>
                  <div className="grid grid-cols-2 gap-6 bg-slate-50 p-6 rounded-[1.5rem] border border-slate-100 print:bg-white print:p-0">
                     <div>
                        <p className="text-[9px] text-slate-400 font-black uppercase mb-1">Analysis Date</p>
                        <p className="text-xs font-black text-slate-800">{currentDate}</p>
                     </div>
                     <div>
                        <p className="text-[9px] text-slate-400 font-black uppercase mb-1">Subject ID</p>
                        <p className="text-xs font-black text-slate-800">BRATS_{jobId.slice(0, 8)}</p>
                     </div>
                     <div className="col-span-2">
                        <p className="text-[9px] text-slate-400 font-black uppercase mb-1">System Version</p>
                        <p className="text-xs font-black text-slate-800">v1.2.0 (3D Residual U-Net)</p>
                     </div>
                  </div>
               </section>

               <section>
                  <h3 className="text-[10px] font-black text-accent-blue uppercase tracking-[0.2em] mb-4 flex items-center gap-2">
                    <BarChart3 className="w-3 h-3" /> Volumetric Findings
                  </h3>
                  <div className="space-y-3">
                     <ReportMetric label="Whole Tumor (WT) Volume" value={stats.WT?.volume_mm3} unit="mm³" />
                     <ReportMetric label="Necrotic Core (NCR/NET)" value={stats.NET?.volume_mm3} unit="mm³" />
                     <ReportMetric label="Peritumoral Edema (ED)" value={stats.ED?.volume_mm3} unit="mm³" />
                     <ReportMetric label="GD-Enhancing Tumor (ET)" value={stats.ET?.volume_mm3} unit="mm³" highlight />
                  </div>
               </section>

               <section>
                  <h3 className="text-[10px] font-black text-accent-blue uppercase tracking-[0.2em] mb-4 flex items-center gap-2">
                    <ChevronRight className="w-3 h-3" /> Spatial Orientation
                  </h3>
                  <div className="bg-slate-900 border border-slate-800 p-6 rounded-[1.5rem] text-white space-y-4 shadow-xl print:bg-slate-50 print:border-slate-200 print:text-slate-900 print:shadow-none">
                     <div>
                        <p className="text-[9px] text-white/40 font-bold uppercase mb-1 tracking-widest print:text-slate-500">Primary Focal Point</p>
                        <p className="text-xl font-black text-white leading-tight uppercase print:text-slate-900">{getQuadrantText()}</p>
                     </div>
                     <div className="flex justify-between items-end border-t border-white/5 pt-4 mt-4 print:border-slate-200">
                        <div>
                           <p className="text-[9px] text-white/40 font-bold uppercase mb-1 print:text-slate-500">Coordinated HWD</p>
                           <p className="text-xs font-bold text-accent-blue">{stats.location?.coordinates || 'N/A'}</p>
                        </div>
                        <div className="text-right">
                           <p className="text-[9px] text-white/40 font-bold uppercase mb-1 print:text-slate-500">Overall Diameter</p>
                           <p className="text-xs font-bold text-white print:text-slate-900">{stats.location?.bbox_mm || 'N/A'}</p>
                        </div>
                     </div>
                  </div>
               </section>
            </div>

            {/* Snapshot and Conclusion */}
            <div className="space-y-8 print:w-1/2 print:space-y-10">
               <section>
                  <h3 className="text-[10px] font-black text-accent-blue uppercase tracking-[0.2em] mb-4 flex items-center gap-2">
                    <Brain className="w-3 h-3" /> Automated 3D Snapshot
                  </h3>
                  <div className="aspect-square bg-slate-900 rounded-[2rem] overflow-hidden border-4 border-white shadow-apple relative flex items-center justify-center print:bg-slate-50 print:border-slate-200 print:shadow-none">
                    {snapshot ? (
                      <img src={snapshot} alt="Tumor Snapshot" className="w-full h-full object-cover" />
                    ) : (
                      <div className="text-center p-8">
                        <Loader2 className="w-8 h-8 text-white/20 animate-spin mx-auto mb-4 print:text-slate-200" />
                        <p className="text-[10px] text-white/40 font-bold uppercase tracking-widest print:text-slate-400">Capturing Viewport...</p>
                      </div>
                    )}
                    <div className="absolute bottom-4 right-4 text-[9px] bg-black/60 backdrop-blur-md text-white px-3 py-1 rounded-full border border-white/10 font-bold uppercase tracking-widest print:bg-white print:text-slate-900 print:border-slate-200">
                      Axial/3D_Segmented_View
                    </div>
                  </div>
               </section>

               <section className="bg-slate-50 p-8 rounded-[2rem] border-2 border-slate-100 border-dashed print:bg-white print:p-0 print:border-none">
                  <h3 className="text-[10px] font-black text-slate-800 uppercase tracking-[0.2em] mb-4">Diagnostic Interpretation</h3>
                  <p className="text-sm text-slate-600 leading-relaxed font-medium print:text-slate-800">
                    Automated segmentation indicates a significant volume in the <span className="text-slate-900 font-bold underline decoration-accent-blue decoration-2 underline-offset-4">{getQuadrantText()}</span> quadrant. 
                    The presence of <span className="text-slate-900 font-bold">{(stats.ET?.volume_mm3 || 0).toLocaleString()} mm³</span> of enhancing tissue 
                    suggests high metabolic activity consistent with GD-enhancement patterns.
                  </p>
                  <div className="mt-8 pt-6 border-t border-slate-200">
                    <div className="flex items-center gap-3">
                       <div className="w-8 h-8 rounded-full bg-slate-200 border-2 border-white shadow-sm flex items-center justify-center text-[10px] font-black print:bg-white print:border-slate-200">AI</div>
                       <div>
                          <p className="text-[9px] font-black text-slate-900 uppercase">NeuroSeg Intelligence Engine</p>
                          <p className="text-[8px] text-slate-400 font-bold uppercase tracking-tighter">Certified Autonomous Segmentation</p>
                       </div>
                    </div>
                  </div>
               </section>
            </div>

          </div>

          {/* Footer */}
          <div className="mt-auto pt-8 border-t border-slate-100 flex justify-between items-center opacity-40 print:opacity-100">
             <p className="text-[8px] font-black uppercase text-slate-500">&copy; 2024 NEUROSEG AI &middot; CLINICAL DASHBOARD</p>
             <p className="text-[8px] font-bold text-slate-400">REPORT_HASH_{jobId.slice(-8).toUpperCase()}</p>
          </div>
        </div>
      </motion.div>

      {/* Styles for Printing */}
      <style>{`
        @page { 
          size: auto; 
          margin: 0mm; 
        }

        @media print {
          html, body {
            height: 100%;
            margin: 0 !important;
            padding: 0 !important;
            overflow: hidden;
          }

          body {
            background-color: white !important;
          }

          /* Force high-fidelity color and background reproduction */
          * {
            -webkit-print-color-adjust: exact !important;
            print-color-adjust: exact !important;
            color-adjust: exact !important;
          }

          /* Surgeons isolation: hide all but the report */
          .no-print {
            display: none !important;
          }
        }
      `}</style>
    </div>
  )
}

function ReportMetric({ label, value, unit, highlight }: { label: string, value: any, unit: string, highlight?: boolean }) {
  return (
    <div className={`flex items-center justify-between p-4 rounded-xl transition-all ${highlight ? 'bg-accent-blue/5 border border-accent-blue/20' : 'bg-white border border-slate-100'}`}>
       <span className={`text-[10px] font-black ${highlight ? 'text-accent-blue' : 'text-slate-500'} uppercase tracking-widest`}>{label}</span>
       <span className="text-sm font-black text-slate-900 tracking-tight">
         {Number(value || 0).toLocaleString()} <span className="text-[8px] text-slate-400 uppercase ml-1">{unit}</span>
       </span>
    </div>
  )
}

function BarChart3(props: any) {
  return (
    <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 3v18h18"/><path d="M18 17V9"/><path d="M13 17V5"/><path d="M8 17v-3"/></svg>
  )
}

function Loader2(props: any) {
  return (
    <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 12a9 9 0 1 1-6.219-8.56"/></svg>
  )
}
