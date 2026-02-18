import React from 'react';
import { useNavigate } from 'react-router-dom';

const ProductDetails = () => {
    const navigate = useNavigate();

    return (
        <div className="bg-background-light dark:bg-background-dark font-display text-slate-900 dark:text-slate-100 min-h-screen">
            <div className="ios-status-bar bg-background-light dark:bg-background-dark sticky top-0 z-50"></div>
            {/* Top Navigation Bar */}
            <header className="sticky top-0 z-40 bg-background-light/80 dark:bg-background-dark/80 backdrop-blur-md border-b border-slate-200 dark:border-slate-800">
                <div className="flex items-center justify-between px-4 py-3">
                    <button onClick={() => navigate(-1)} className="flex items-center text-primary">
                        <span className="material-symbols-outlined">arrow_back_ios</span>
                        <span className="hidden sm:inline">返回</span>
                    </button>
                    <div className="flex flex-col items-center">
                        <h1 className="text-base font-bold leading-tight">產品數據詳情</h1>
                        <span className="text-[10px] uppercase tracking-wider text-slate-500 font-semibold">Dimension 1</span>
                    </div>
                    <button className="flex items-center text-primary">
                        <span className="material-symbols-outlined">more_horiz</span>
                    </button>
                </div>
            </header>

            <main className="max-w-md mx-auto p-4 space-y-4 ios-bottom-nav">
                {/* Product Profile Header */}
                <div className="flex items-start gap-4 mb-6">
                    <div className="w-20 h-20 rounded-xl bg-slate-200 dark:bg-slate-800 flex-shrink-0 overflow-hidden border border-slate-200 dark:border-slate-700">
                        <div
                            className="w-full h-full bg-cover bg-center"
                            data-alt="G92D1-VU010"
                            style={{ backgroundImage: "url('/assets/G92D1-VU010_main.jpg')" }}
                        ></div>
                    </div>
                    <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                            <span className="bg-primary/10 text-primary text-[10px] font-bold px-1.5 py-0.5 rounded uppercase">Active</span>
                            <span className="text-slate-500 text-xs">最後更新: 2023-11-20</span>
                        </div>
                        <h2 className="text-xl font-bold dark:text-white leading-tight">G92D1-VU010</h2>
                        <div className="mt-2 flex items-center gap-2">
                            <span className="material-symbols-outlined text-sm text-primary">precision_manufacturing</span>
                            <span className="text-sm font-medium bg-primary/20 text-primary px-2 py-0.5 rounded-full">550T (501機)</span>
                        </div>
                    </div>
                </div>

                {/* Section: Basic Information */}
                <section className="bg-white dark:bg-slate-900 rounded-xl p-4 shadow-sm border border-slate-200 dark:border-slate-800">
                    <div className="flex items-center gap-2 mb-4">
                        <span className="material-symbols-outlined text-primary text-xl">info</span>
                        <h3 className="font-bold">基本資訊</h3>
                    </div>
                    <div className="space-y-3">
                        <div className="flex justify-between items-center border-b border-slate-100 dark:border-slate-800 pb-2">
                            <span className="text-sm text-slate-500 dark:text-slate-400">產品名稱</span>
                            <span className="text-sm font-medium">DUCT, HV BATTERY INTAKE</span>
                        </div>
                        <div className="flex justify-between items-center border-b border-slate-100 dark:border-slate-800 pb-2">
                            <span className="text-sm text-slate-500 dark:text-slate-400">模具廠商</span>
                            <span className="text-sm font-medium">源達</span>
                        </div>
                        <div className="flex justify-between items-center border-b border-slate-100 dark:border-slate-800 pb-2">
                            <span className="text-sm text-slate-500 dark:text-slate-400">車型</span>
                            <span className="text-sm font-medium font-mono">841W</span>
                        </div>
                        <div className="flex justify-between items-center">
                            <span className="text-sm text-slate-500 dark:text-slate-400">原料編號</span>
                            <span className="text-sm font-medium">FTP20DY-202B</span>
                        </div>
                    </div>
                </section>

                {/* Section: Production Parameters (Highlight CT) */}
                <section className="bg-white dark:bg-slate-900 rounded-xl p-4 shadow-sm border border-slate-200 dark:border-slate-800">
                    <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center gap-2">
                            <span className="material-symbols-outlined text-primary text-xl">settings_input_component</span>
                            <h3 className="font-bold">生產參數</h3>
                        </div>
                        <span className="text-[10px] font-bold text-slate-400">UNIT: SEC</span>
                    </div>
                    {/* CT Highlights */}
                    <div className="grid grid-cols-2 gap-3 mb-4">
                        <div className="bg-slate-50 dark:bg-slate-800/50 p-3 rounded-lg border border-slate-100 dark:border-slate-800">
                            <p className="text-[10px] text-slate-500 font-semibold mb-1 uppercase tracking-tight">預估 CT</p>
                            <div className="flex items-baseline gap-1">
                                <span className="text-2xl font-bold">45.0</span>
                                <span className="text-xs text-slate-400">s</span>
                            </div>
                        </div>
                        <div className="bg-primary/5 dark:bg-primary/10 p-3 rounded-lg border border-primary/20">
                            <p className="text-[10px] text-primary font-semibold mb-1 uppercase tracking-tight">實測 CT</p>
                            <div className="flex items-baseline gap-1">
                                <span className="text-2xl font-bold text-primary">43.8</span>
                                <span className="text-xs text-primary/70">s</span>
                            </div>
                            <div className="flex items-center text-[10px] text-emerald-500 font-bold mt-1">
                                <span className="material-symbols-outlined text-xs">trending_down</span>
                                <span>-2.6% (領先)</span>
                            </div>
                        </div>
                    </div>
                    <div className="space-y-3">
                        <div className="flex justify-between items-center border-b border-slate-100 dark:border-slate-800 pb-2">
                            <span className="text-sm text-slate-500 dark:text-slate-400">模具穴數</span>
                            <span className="text-sm font-medium">1 模 2 穴</span>
                        </div>
                        <div className="flex justify-between items-center">
                            <span className="text-sm text-slate-500 dark:text-slate-400">標準不良率預估</span>
                            <span className="text-sm font-medium">1.25%</span>
                        </div>
                    </div>
                </section>

                {/* Section: Material Specifications */}
                <section className="bg-white dark:bg-slate-900 rounded-xl p-4 shadow-sm border border-slate-200 dark:border-slate-800">
                    <div className="flex items-center gap-2 mb-4">
                        <span className="material-symbols-outlined text-primary text-xl">layers</span>
                        <h3 className="font-bold">原料規範</h3>
                    </div>
                    <div className="space-y-4">
                        <div className="flex items-start gap-3">
                            <div className="p-2 bg-slate-100 dark:bg-slate-800 rounded">
                                <span className="material-symbols-outlined text-slate-500">opacity</span>
                            </div>
                            <div>
                                <p className="text-xs text-slate-500">主要樹脂原料</p>
                                <p className="text-sm font-bold">PP-T30S Grade A</p>
                                <p className="text-[10px] text-slate-400">Vendor: Formosa Plastics Corp.</p>
                            </div>
                        </div>
                        <div className="bg-amber-50 dark:bg-amber-950/20 p-3 rounded-lg border border-amber-100 dark:border-amber-900/50">
                            <div className="flex items-center justify-between mb-2">
                                <div className="flex items-center gap-1.5">
                                    <span className="material-symbols-outlined text-amber-600 dark:text-amber-500 text-sm">rebase_edit</span>
                                    <span className="text-xs font-bold text-amber-600 dark:text-amber-500">二次料使用規範</span>
                                </div>
                                <span className="bg-amber-100 dark:bg-amber-900/50 text-amber-700 dark:text-amber-400 text-[10px] px-2 py-0.5 rounded-full font-bold">MAX 15%</span>
                            </div>
                            <p className="text-xs text-amber-700/80 dark:text-amber-400/80 leading-relaxed">
                                僅限本品粉碎回用。嚴禁混入外部回收料。每次配料需紀錄比例並簽名核可。
                            </p>
                        </div>
                    </div>
                </section>

                {/* Section: Packaging Parameters */}
                <section className="bg-white dark:bg-slate-900 rounded-xl p-4 shadow-sm border border-slate-200 dark:border-slate-800">
                    <div className="flex items-center gap-2 mb-4">
                        <span className="material-symbols-outlined text-primary text-xl">inventory_2</span>
                        <h3 className="font-bold">包裝參數</h3>
                    </div>
                    <div className="flex items-center gap-4 bg-slate-50 dark:bg-slate-800 p-4 rounded-xl mb-4 border border-slate-100 dark:border-slate-700/50">
                        <div className="flex flex-col items-center justify-center bg-white dark:bg-slate-900 w-16 h-16 rounded-lg shadow-sm">
                            <span className="text-2xl font-black text-primary">24</span>
                            <span className="text-[9px] font-bold text-slate-400 uppercase">PCS</span>
                        </div>
                        <div>
                            <h4 className="text-sm font-bold mb-0.5">台車收容數</h4>
                            <p className="text-xs text-slate-500 leading-tight">標準 A-Type 鐵製台車，每車放置 4 層，每層 6 件。</p>
                        </div>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                        <div className="flex flex-col gap-1">
                            <span className="text-[10px] text-slate-500 font-bold uppercase">內材規範</span>
                            <div className="flex items-center gap-1">
                                <span className="material-symbols-outlined text-xs text-primary">check_circle</span>
                                <span className="text-sm font-medium">防震珍珠棉</span>
                            </div>
                        </div>
                        <div className="flex flex-col gap-1">
                            <span className="text-[10px] text-slate-500 font-bold uppercase">標籤位置</span>
                            <div className="flex items-center gap-1">
                                <span className="material-symbols-outlined text-xs text-primary">check_circle</span>
                                <span className="text-sm font-medium">右上角 (外側)</span>
                            </div>
                        </div>
                    </div>
                </section>
            </main>

            {/* Bottom Action Area (iOS style) */}
            <div className="fixed bottom-0 left-0 right-0 bg-white/80 dark:bg-slate-950/80 backdrop-blur-xl border-t border-slate-200 dark:border-slate-800 px-6 pt-4 pb-8 z-50">
                <div className="max-w-md mx-auto flex gap-3">
                    <button className="flex-1 bg-slate-100 dark:bg-slate-800 text-slate-900 dark:text-white py-3 rounded-xl font-bold text-sm shadow-sm flex items-center justify-center gap-2">
                        <span className="material-symbols-outlined text-sm">history</span>
                        異動日誌
                    </button>
                    <button className="flex-1 bg-primary text-white py-3 rounded-xl font-bold text-sm shadow-lg shadow-primary/20 flex items-center justify-center gap-2">
                        <span className="material-symbols-outlined text-sm">edit</span>
                        編輯數據
                    </button>
                </div>
            </div>
            {/* Background Decoration */}
            <div className="fixed top-0 left-0 w-full h-full -z-10 pointer-events-none opacity-20 dark:opacity-40">
                <div className="absolute top-[-10%] left-[-20%] w-[60%] h-[40%] bg-primary/20 blur-[120px] rounded-full"></div>
            </div>
        </div>
    );
};

export default ProductDetails;
