import React from 'react';
import { useNavigate } from 'react-router-dom';

const StandardDocuments = () => {
    const navigate = useNavigate();

    return (
        <div className="bg-background-light dark:bg-background-dark font-display text-slate-900 dark:text-slate-100 min-h-screen">
            <div className="relative flex h-auto min-h-screen w-full flex-col bg-background-light dark:bg-background-dark overflow-x-hidden">
                {/* Top Navigation Bar */}
                <header className="sticky top-0 z-50 flex items-center bg-background-light/80 dark:bg-background-dark/80 backdrop-blur-md p-4 pb-2 justify-between border-b border-slate-200 dark:border-slate-800">
                    <div
                        onClick={() => navigate(-1)}
                        className="text-primary flex size-10 shrink-0 items-center justify-center rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 cursor-pointer"
                    >
                        <span className="material-symbols-outlined">arrow_back_ios_new</span>
                    </div>
                    <h2 className="text-slate-900 dark:text-white text-lg font-bold leading-tight tracking-tight flex-1 text-center pr-10">標準書類與品質預警</h2>
                </header>

                {/* Product Basic Info Section */}
                <div className="flex p-4 @container border-b border-slate-200 dark:border-slate-800 bg-white dark:bg-background-dark">
                    <div className="flex w-full flex-col gap-4 @[520px]:flex-row @[520px]:justify-between">
                        <div className="flex gap-4 items-center">
                            <div
                                className="bg-center bg-no-repeat aspect-square bg-cover rounded-xl h-24 w-24 shadow-sm border border-slate-200 dark:border-slate-700"
                                style={{ backgroundImage: 'url("/assets/G92D1-VU010_main.jpg")' }}
                            ></div>
                            <div className="flex flex-col">
                                <div className="flex items-center gap-2">
                                    <p className="text-slate-900 dark:text-white text-2xl font-black leading-tight tracking-tight">G92D1-VU010</p>
                                    <span className="bg-primary/10 text-primary text-[10px] font-bold px-2 py-0.5 rounded-full border border-primary/20 uppercase">Digital Master</span>
                                </div>
                                <p className="text-slate-500 dark:text-[#9dabb9] text-sm font-medium mt-1">品番名稱: DUCT, HV BATTERY INTAKE</p>
                                <div className="flex items-center gap-3 mt-1.5">
                                    <p className="text-slate-500 dark:text-[#9dabb9] text-xs font-normal">車型: <span className="text-slate-900 dark:text-slate-200 font-semibold">841W</span></p>
                                    <span className="h-1 w-1 rounded-full bg-slate-300 dark:bg-slate-700"></span>
                                    <p className="text-slate-500 dark:text-[#9dabb9] text-xs font-normal">機台: <span className="text-slate-900 dark:text-slate-200 font-semibold">550T (501機)</span></p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Documentation Section (核心三表) */}
                <div className="px-4 pt-6 pb-2 flex justify-between items-end">
                    <h3 className="text-slate-900 dark:text-white text-lg font-bold leading-tight tracking-tight">核心三表 (最新版本)</h3>
                    <span className="text-primary text-xs font-semibold cursor-pointer">查看歷史版本</span>
                </div>
                <div className="grid grid-cols-3 gap-3 p-4">
                    {/* QC Chart */}
                    <a href="/assets/G92D1-VU010_qc1.pdf" target="_blank" rel="noopener noreferrer" className="flex flex-1 gap-2 rounded-xl border border-slate-200 dark:border-[#3b4754] bg-white dark:bg-[#1c2127] p-3 flex-col items-center text-center shadow-sm hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors">
                        <div className="bg-primary/10 text-primary p-2 rounded-lg">
                            <span className="material-symbols-outlined">assignment</span>
                        </div>
                        <div className="flex flex-col gap-0.5">
                            <h2 className="text-slate-900 dark:text-white text-xs font-bold">QC工程表</h2>
                            <p className="text-slate-500 dark:text-[#9dabb9] text-[10px] font-medium">Ver. 2.1</p>
                        </div>
                    </a>
                    {/* SOP */}
                    <a href="/assets/G92D1-VU010_qc2.pdf" target="_blank" rel="noopener noreferrer" className="flex flex-1 gap-2 rounded-xl border border-slate-200 dark:border-[#3b4754] bg-white dark:bg-[#1c2127] p-3 flex-col items-center text-center shadow-sm hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors">
                        <div className="bg-primary/10 text-primary p-2 rounded-lg">
                            <span className="material-symbols-outlined">menu_book</span>
                        </div>
                        <div className="flex flex-col gap-0.5">
                            <h2 className="text-slate-900 dark:text-white text-xs font-bold">SOP 指導書</h2>
                            <p className="text-slate-500 dark:text-[#9dabb9] text-[10px] font-medium">Ver. 1.8</p>
                        </div>
                    </a>
                    {/* Molding Conditions */}
                    <a href="/assets/G92D1-VU010_qc3.pdf" target="_blank" rel="noopener noreferrer" className="flex flex-1 gap-2 rounded-xl border border-slate-200 dark:border-[#3b4754] bg-white dark:bg-[#1c2127] p-3 flex-col items-center text-center shadow-sm hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors">
                        <div className="bg-primary/10 text-primary p-2 rounded-lg">
                            <span className="material-symbols-outlined">settings_input_component</span>
                        </div>
                        <div className="flex flex-col gap-0.5">
                            <h2 className="text-slate-900 dark:text-white text-xs font-bold">成型條件表</h2>
                            <p className="text-slate-500 dark:text-[#9dabb9] text-[10px] font-medium">Ver. 3.0</p>
                        </div>
                    </a>
                </div>

                {/* Quality Alert Section (Red Tag) */}
                <div className="px-4 pt-4 pb-2 flex items-center gap-2">
                    <span className="material-symbols-outlined text-warning animate-pulse">report</span>
                    <h3 className="text-slate-900 dark:text-white text-lg font-bold leading-tight tracking-tight">品質預警區 (Red Tag)</h3>
                </div>
                <div className="mx-4 mb-8 flex flex-col gap-4">
                    {/* Anomaly Summary Card */}
                    <div className="bg-warning/5 dark:bg-warning/10 border border-warning/30 rounded-xl overflow-hidden">
                        <div className="bg-warning/20 px-4 py-2 flex justify-between items-center border-b border-warning/20">
                            <div className="flex items-center gap-2">
                                <span className="text-warning font-black text-xs">RED TAG ID: RT-20231012-04</span>
                            </div>
                            <span className="text-warning text-[10px] font-bold">發生日期: 2023/10/12</span>
                        </div>
                        <div className="p-4 flex flex-col gap-3">
                            <div>
                                <span className="text-[10px] font-bold text-warning uppercase tracking-widest">異常描述</span>
                                <p className="text-slate-800 dark:text-slate-200 text-sm font-semibold leading-relaxed mt-1">
                                    澆口(Gate)處修剪毛邊異常，影響平整度達 0.15mm，可能導致組裝干涉。
                                </p>
                            </div>
                            <div className="p-3 bg-white/50 dark:bg-black/30 rounded-lg border border-slate-200 dark:border-slate-800">
                                <span className="text-[10px] font-bold text-primary uppercase tracking-widest">再發防止對策</span>
                                <ul className="mt-2 space-y-2">
                                    <li className="flex gap-2 text-xs text-slate-700 dark:text-slate-300">
                                        <span className="text-primary font-bold">1.</span>
                                        刀具點檢頻率由每 2000 模次提升至每 500 模次，並記錄磨損值。
                                    </li>
                                    <li className="flex gap-2 text-xs text-slate-700 dark:text-slate-300">
                                        <span className="text-primary font-bold">2.</span>
                                        模具冷卻水溫鎖定在 85°C ± 2°C，防止澆口處冷卻不均導致收縮變形。
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>

                    {/* Visual Aid & Hotspots */}
                    <div className="bg-white dark:bg-[#1c2127] rounded-xl border border-slate-200 dark:border-slate-800 overflow-hidden shadow-sm">
                        <div className="px-4 py-3 border-b border-slate-100 dark:border-slate-800 flex justify-between items-center">
                            <h4 className="text-slate-900 dark:text-white text-sm font-bold">關鍵檢驗點示意圖</h4>
                            <span className="material-symbols-outlined text-slate-400 text-sm">zoom_in</span>
                        </div>
                        <div className="relative aspect-video bg-slate-100 dark:bg-slate-900/50 flex items-center justify-center p-4">
                            {/* Placeholder for technical diagram */}
                            <div className="w-full h-full rounded-lg border-2 border-dashed border-slate-300 dark:border-slate-700 flex flex-col items-center justify-center relative overflow-hidden">
                                <img className="absolute inset-0 w-full h-full object-cover opacity-40 mix-blend-overlay" alt="Technical CAD drawing of automotive plastic part" src="https://lh3.googleusercontent.com/aida-public/AB6AXuDtKqVLGeBfYaixh7S4Lx4YW5Kao3FsrVPj6g-V52D56C5MZXs90uGXGfIwSVimW_iCxjHdUyYR58p2o3JZzOfcfbMhhV_bTaizr7TDGMmP9CbnQnUUeIyIqY1iOhal5_-KZbBo8B1FjotVPB_ASVBICkpsb5htNw556B1jdDkn1RyaDd_SyaqX7495JiOBSxGnjfXTKrj15uacdAasPoTJjbKKiGzo0k6FPmTS6j55im7LPJOfwFU3Ot2KTavHefRHJwsuCMUJVF1O" />
                                {/* Hotspot marker */}
                                <div className="absolute top-1/2 left-1/3 group cursor-pointer">
                                    <div className="w-8 h-8 rounded-full bg-warning/40 flex items-center justify-center animate-ping absolute"></div>
                                    <div className="w-8 h-8 rounded-full bg-warning text-white flex items-center justify-center relative shadow-lg">
                                        <span className="material-symbols-outlined text-sm font-bold">priority_high</span>
                                    </div>
                                    {/* Tooltip/Label */}
                                    <div className="absolute top-full left-1/2 -translate-x-1/2 mt-2 bg-slate-900 text-white text-[10px] px-2 py-1 rounded whitespace-nowrap z-10 font-bold border border-white/10">
                                        重點：Gate 平整度
                                    </div>
                                </div>
                                {/* Secondary hotspot */}
                                <div className="absolute bottom-1/4 right-1/4 cursor-pointer">
                                    <div className="w-6 h-6 rounded-full bg-primary text-white flex items-center justify-center relative shadow-md">
                                        <span className="text-[10px] font-bold">B</span>
                                    </div>
                                </div>
                                <span className="text-slate-400 text-xs font-medium z-0">CAD Schematic View</span>
                            </div>
                        </div>
                        <div className="p-3 bg-slate-50 dark:bg-slate-800/50">
                            <div className="flex items-center gap-2 mb-2">
                                <span className="w-3 h-3 rounded-full bg-warning"></span>
                                <p className="text-slate-900 dark:text-white text-xs font-bold">A區：澆口位置 (Gate)</p>
                            </div>
                            <p className="text-slate-500 dark:text-slate-400 text-[11px] leading-relaxed">
                                注意修剪後高度。標準：落差 &lt; 0.05mm。如發現不平整，請立即切換備份刀組並填寫異常單。
                            </p>
                        </div>
                    </div>

                    {/* Quick Action Footer Button */}
                    <button className="w-full bg-primary text-white font-bold py-4 rounded-xl shadow-lg shadow-primary/20 flex items-center justify-center gap-2 active:scale-[0.98] transition-transform">
                        <span className="material-symbols-outlined">edit_square</span>
                        <span>異常履歷簽核 / 紀錄</span>
                    </button>
                </div>
                {/* Spacer for iOS indicator */}
                <div className="h-8 bg-background-light dark:bg-background-dark"></div>
            </div>
        </div>
    );
};

export default StandardDocuments;
