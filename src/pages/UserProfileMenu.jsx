export default function UserProfileMenu() {
  return (
    <div className="bg-surface text-on-surface min-h-screen pt-20">
      <header className="fixed top-0 w-full z-50 bg-slate-50/80 dark:bg-slate-900/80 backdrop-blur-xl shadow-sm dark:shadow-none">
        <div className="flex justify-between items-center px-8 py-4 w-full max-w-screen-2xl mx-auto">
          <div className="flex items-center gap-8">
            <span className="text-2xl font-bold tracking-tight text-slate-900 dark:text-slate-50">Clarified Curator</span>
            <div className="hidden md:flex items-center gap-6">
              <nav className="flex gap-6">
                <a className="text-blue-700 dark:text-blue-400 border-b-2 border-blue-700 font-bold tracking-wider uppercase text-xs" href="/">Dashboard</a>
                <a className="text-slate-500 hover:bg-slate-200/50 transition-colors tracking-wider uppercase text-xs" href="/settings">Settings</a>
              </nav>
            </div>
          </div>
        </div>
      </header>

      {/* User Profile Modal/Overlay */}
      <div className="fixed inset-0 z-[100] flex items-start justify-end pr-8 pt-20 pointer-events-none">
        <div className="pointer-events-auto w-80 bg-surface-container-lowest rounded-xl shadow-[0_40px_80px_rgba(44,52,55,0.12)] border border-outline-variant/10 overflow-hidden transform transition-all animate-in fade-in slide-in-from-top-4 duration-200 origin-top-right">
          {/* Modal Header */}
          <div className="p-6 pb-4 flex flex-col items-center text-center">
            <div className="relative mb-4">
              <img alt="User profile avatarLarge" className="w-20 h-20 rounded-full object-cover ring-4 ring-surface-container-low" src="https://lh3.googleusercontent.com/aida-public/AB6AXuBCmVLuV2o76yzygw7hHJx7uVGE40ykkAIc9qU1HL17Xg6iPAbn26MtTEFy2Ym3FnYlp4rGE7_KJNK0dQycaPopyzDB2JlL_qrJ146A1p4NCnOJHo0hOze9Asqu7TMCQ3kzWu4QLzfcvQe3UGAclI2pOVQLsrh1bUPnilGp0vde6TlyABy61QPO1p6cqs7pt3dU8FrT0ePFM8YX_qs5dDeJmbU93o6qcR6ReyLK4o9_dqfBI1UCEbaR_wo0bAQLYsGI1LcNCiR_c0tB"/>
              <div className="absolute bottom-0 right-1 w-5 h-5 bg-tertiary border-4 border-surface-container-lowest rounded-full"></div>
            </div>
            <h4 className="text-xl font-bold text-on-surface tracking-tight">Admin User</h4>
            <p className="text-sm text-on-surface-variant font-medium">admin.curator@registry.gov</p>
            <div className="mt-4 inline-flex items-center gap-2 px-3 py-1 bg-primary/10 rounded-full">
              <span className="w-2 h-2 bg-primary rounded-full"></span>
              <span className="text-[10px] font-bold text-primary uppercase tracking-widest">System Administrator</span>
            </div>
          </div>
          {/* Modal Menu Options */}
          <div className="p-4 bg-surface-container-low/50">
            <div className="space-y-1">
              <a className="group flex items-center justify-between w-full p-4 bg-surface-container-lowest rounded-lg hover:bg-primary hover:text-on-primary transition-all duration-200" href="/settings">
                <div className="flex items-center gap-3">
                  <span className="material-symbols-outlined text-primary group-hover:text-on-primary">settings</span>
                  <span className="text-sm font-semibold">Go to Settings</span>
                </div>
                <span className="material-symbols-outlined text-outline-variant group-hover:text-on-primary/60 text-lg">chevron_right</span>
              </a>
              <a className="group flex items-center justify-between w-full p-4 bg-surface-container-lowest rounded-lg hover:bg-error hover:text-on-error transition-all duration-200" href="/login">
                <div className="flex items-center gap-3">
                  <span className="material-symbols-outlined text-error group-hover:text-on-error">logout</span>
                  <span className="text-sm font-semibold">Sign Out</span>
                </div>
                <span className="material-symbols-outlined text-outline-variant group-hover:text-on-error/60 text-lg">arrow_forward</span>
              </a>
            </div>
          </div>
        </div>
      </div>
      
      {/* Background Dim Layer */}
      <div className="fixed inset-0 bg-on-background/5 backdrop-blur-[2px] z-[90]"></div>
    </div>
  );
}
