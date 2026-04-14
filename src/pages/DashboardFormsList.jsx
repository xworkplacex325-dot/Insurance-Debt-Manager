import Modal from '../components/Modal';
import { useTheme } from '../contexts/ThemeContext';

export default function DashboardFormsList() {
  const { theme, toggleTheme } = useTheme();

  return (
    <div className="bg-background dark:bg-slate-950 min-h-screen transition-colors duration-300">
      {/* TopNavBar Component */}
      <header className="fixed top-0 w-full z-50 bg-slate-50/80 dark:bg-slate-900/90 backdrop-blur-xl shadow-sm border-b border-transparent dark:border-slate-800 transition-colors duration-300">
        <div className="flex justify-between items-center px-8 py-4 w-full max-w-screen-2xl mx-auto">
          <div className="flex items-center gap-8">
            <span className="text-2xl font-bold tracking-tight text-slate-900 dark:text-slate-50 font-headline transition-colors">Clarified Curator</span>
          </div>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <button onClick={toggleTheme} className="p-2 text-slate-500 dark:text-slate-400 hover:bg-slate-200/50 dark:hover:bg-slate-800/50 rounded-full transition-colors flex items-center justify-center">
                <span className="material-symbols-outlined">{theme === 'dark' ? 'light_mode' : 'dark_mode'}</span>
              </button>
              <button className="p-2 text-slate-500 dark:text-slate-400 hover:bg-slate-200/50 dark:hover:bg-slate-800/50 rounded-full transition-colors">
                <span className="material-symbols-outlined" data-icon="notifications">notifications</span>
              </button>
              <button className="p-2 text-slate-500 dark:text-slate-400 hover:bg-slate-200/50 dark:hover:bg-slate-800/50 rounded-full transition-colors">
                <span className="material-symbols-outlined" data-icon="help">help</span>
              </button>
            </div>
            <div className="h-8 w-[1px] bg-slate-200 dark:bg-slate-800"></div>
            <div className="flex items-center gap-3 ml-2">
              <div className="text-right">
                <p className="text-sm font-bold text-slate-900 dark:text-slate-50 font-headline transition-colors">Alex Johnson</p>
                <p className="text-[10px] tracking-wider uppercase text-slate-500">Admin User</p>
              </div>
              <img alt="User profile avatar" className="w-10 h-10 rounded-full border-2 border-primary-container object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuAZUouBigZHbWuoy7OKEomuc7cSMlLAhKepHIectYrUYlor7ukvkCzbTk6sk3T6eCtMUxOSgo2Kjzi19nJjWVgh9FkzJQbkFhfpMN4tCw5elrRUrODtMFb4XHY3J9GOEaqxyud5QTBduVZdjPKXB585afDFz_IeIB-NXvPV1W6_pchc_a6KToumFlVMdCKyJoaKY5s9wKRjDp4awrHWRqHxkjBZKZzUfDh4366hnU7dZCSKx2RS3kkamfz1yRirXg9qUh9KBVNWXKDt" />
            </div>
          </div>
        </div>
      </header>

      <div className="flex pt-20 h-screen overflow-hidden">
        {/* SideNavBar Component */}
        <aside className="h-full w-64 bg-slate-100 dark:bg-slate-900/50 border-r border-transparent dark:border-slate-800 flex flex-col sticky top-0 p-6 space-y-8 transition-colors duration-300">
          <div className="flex items-center gap-3 px-2">
            <div className="w-10 h-10 bg-primary-container rounded-lg flex items-center justify-center text-white">
              <span className="material-symbols-outlined" data-icon="auto_stories">auto_stories</span>
            </div>
            <div>
              <h2 className="text-lg font-black text-slate-900 dark:text-slate-50 font-headline leading-tight transition-colors">Editorial Admin</h2>
              <p className="text-[10px] tracking-wider uppercase text-slate-500 font-label">Registry Office</p>
            </div>
          </div>
          <nav className="flex-1 space-y-1">
            <a className="flex items-center gap-3 px-4 py-3 bg-white dark:bg-slate-800/80 text-blue-700 dark:text-blue-400 font-semibold rounded-lg shadow-sm transition-all duration-200 ease-in-out" href="#">
              <span className="material-symbols-outlined" data-icon="dashboard">dashboard</span>
              <span className="font-label text-sm">Dashboard</span>
            </a>
            <a className="flex items-center gap-3 px-4 py-3 text-slate-600 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-800 hover:text-slate-900 dark:hover:text-slate-50 rounded-lg transition-all duration-200 ease-in-out" href="#">
              <span className="material-symbols-outlined" data-icon="description">description</span>
              <span className="font-label text-sm">Form Archive</span>
            </a>
            <a className="flex items-center gap-3 px-4 py-3 text-slate-600 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-800 hover:text-slate-900 dark:hover:text-slate-50 rounded-lg transition-all duration-200 ease-in-out" href="#">
              <span className="material-symbols-outlined" data-icon="history_edu">history_edu</span>
              <span className="font-label text-sm">Pending Review</span>
            </a>
            <a className="flex items-center gap-3 px-4 py-3 text-slate-600 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-800 hover:text-slate-900 dark:hover:text-slate-50 rounded-lg transition-all duration-200 ease-in-out" href="#">
              <span className="material-symbols-outlined" data-icon="analytics">analytics</span>
              <span className="font-label text-sm">Reports</span>
            </a>
          </nav>
          <div className="pt-6 border-t border-slate-200/50 dark:border-slate-800/50 space-y-1">
            <a className="flex items-center gap-3 px-4 py-3 text-slate-600 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-800 hover:text-slate-900 dark:hover:text-slate-50 rounded-lg transition-all duration-200 ease-in-out" href="/settings">
              <span className="material-symbols-outlined" data-icon="settings">settings</span>
              <span className="font-label text-sm">Settings</span>
            </a>
            <a className="flex items-center gap-3 px-4 py-3 text-slate-600 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-800 hover:text-slate-900 dark:hover:text-slate-50 rounded-lg transition-all duration-200 ease-in-out" href="/login">
              <span className="material-symbols-outlined" data-icon="logout">logout</span>
              <span className="font-label text-sm">Sign Out</span>
            </a>
          </div>
        </aside>

        {/* Main Content Area */}
        <main className="flex-1 overflow-y-auto bg-background dark:bg-transparent p-10 pb-24 transition-colors duration-300">
          <header className="mb-12 flex justify-between items-end">
            <div className="max-w-2xl">
              <h1 className="text-5xl font-extrabold text-on-surface dark:text-slate-50 font-headline tracking-tight leading-none mb-4 transition-colors">Registry Overview</h1>
              <p className="text-secondary dark:text-slate-400 text-lg leading-relaxed max-w-xl transition-colors">
                Manage and track physical form submissions. Each entry is curated for precise administrative auditing and status monitoring.
              </p>
            </div>
            <div className="flex gap-4">
              <button className="px-6 py-3 bg-white dark:bg-slate-800 text-on-surface dark:text-slate-50 font-semibold rounded-lg border-none shadow-sm hover:bg-surface-container-low dark:hover:bg-slate-700 transition-colors">
                Export Report
              </button>
              <Modal>
                <Modal.Open opens="new-form">
                  <button className="px-6 py-3 bg-gradient-to-r from-primary to-primary-container text-white font-semibold rounded-lg shadow-lg shadow-primary/20 hover:scale-[0.98] transition-transform">
                    Add New Form
                  </button>
                </Modal.Open>
                <Modal.Window name="new-form">
                  <div className="pt-2">
                    <h2 className="text-xl font-bold mb-4 font-headline text-on-surface dark:text-slate-50">Create New Form</h2>
                    <p className="text-sm text-on-surface-variant dark:text-slate-400 mb-6">Fill in the details to generate a new entry in the registry system.</p>

                    <div className="space-y-4">
                      <div className="space-y-2">
                        <label className="text-xs font-bold uppercase tracking-wider text-on-surface-variant dark:text-slate-400 font-label ml-1">Company Name</label>
                        <input type="text" className="w-full bg-surface-container-lowest dark:bg-slate-950 border border-outline-variant/20 dark:border-slate-800 rounded-lg px-4 py-3 focus:ring-4 focus:ring-primary/10 transition-all outline-none text-on-surface dark:text-slate-50 placeholder-slate-400 dark:placeholder-slate-600" placeholder="e.g. Stellar Dynamics" />
                      </div>

                      <div className="space-y-2">
                        <label className="text-xs font-bold uppercase tracking-wider text-on-surface-variant dark:text-slate-400 font-label ml-1">Form Number</label>
                        <input type="text" className="w-full bg-surface-container-lowest dark:bg-slate-950 border border-outline-variant/20 dark:border-slate-800 rounded-lg px-4 py-3 focus:ring-4 focus:ring-primary/10 transition-all outline-none text-on-surface dark:text-slate-50 placeholder-slate-400 dark:placeholder-slate-600" placeholder="e.g. #FRM-2024-001" />
                      </div>

                      <div className="space-y-2">
                        <label className="text-xs font-bold uppercase tracking-wider text-on-surface-variant dark:text-slate-400 font-label ml-1">Form Date</label>
                        <input type="date" className="w-full bg-surface-container-lowest dark:bg-slate-950 border border-outline-variant/20 dark:border-slate-800 rounded-lg px-4 py-3 focus:ring-4 focus:ring-primary/10 transition-all outline-none text-on-surface dark:text-slate-50" defaultValue={new Date().toISOString().split('T')[0]} />
                      </div>

                      <div className="flex justify-end pt-4 mt-6 border-t border-outline-variant/10 dark:border-slate-800">
                        <button className="px-6 py-2.5 bg-primary text-white font-semibold rounded-lg shadow-md hover:brightness-110 transition-colors">Submit</button>
                      </div>
                    </div>
                  </div>
                </Modal.Window>
              </Modal>
            </div>
          </header>


          {/* Table Actions / Search */}
          <div className="flex items-center justify-between mb-4">
            <div className="relative w-full max-w-md">
              <span className="absolute left-4 top-1/2 -translate-y-1/2 material-symbols-outlined text-outline dark:text-slate-500 text-[20px]">search</span>
              <input type="text" placeholder="Search entries by company, ID, or initiator..." className="w-full pl-11 pr-4 py-3 bg-surface-container-lowest dark:bg-slate-900 border border-outline-variant/15 dark:border-slate-800 rounded-xl focus:ring-4 focus:ring-primary/10 focus:border-primary transition-all outline-none text-sm text-on-surface dark:text-slate-50 placeholder:text-outline/70 shadow-sm" />
            </div>

            {/* Optional Filter Button (Visual consistency) */}
            <button className="flex items-center gap-2 px-4 py-3 bg-surface-container-lowest dark:bg-slate-900 border border-outline-variant/15 dark:border-slate-800 rounded-xl text-on-surface-variant dark:text-slate-400 hover:bg-surface-container-low dark:hover:bg-slate-800 transition-colors shadow-sm text-sm font-bold">
              <span className="material-symbols-outlined text-[18px]">tune</span>
              Filter
            </button>
          </div>

          {/* Administrative Data Table */}
          <section className="bg-surface-container-lowest dark:bg-slate-900 rounded-2xl p-2 border border-outline-variant/10 dark:border-slate-800 shadow-sm">
            <div className="overflow-x-auto">
              <table className="w-full border-collapse text-left">
                <thead>
                  <tr className="bg-surface-container-high dark:bg-slate-800/80">
                    <th className="px-8 py-5 text-[10px] tracking-wider uppercase text-secondary dark:text-slate-400 font-bold font-label rounded-tl-xl transition-colors">Company Name</th>
                    <th className="px-8 py-5 text-[10px] tracking-wider uppercase text-secondary dark:text-slate-400 font-bold font-label transition-colors">Form Number</th>
                    <th className="px-8 py-5 text-[10px] tracking-wider uppercase text-secondary dark:text-slate-400 font-bold font-label transition-colors">Form Date</th>
                    <th className="px-8 py-5 text-[10px] tracking-wider uppercase text-secondary dark:text-slate-400 font-bold font-label transition-colors">Added By</th>
                    <th className="px-8 py-5 text-[10px] tracking-wider uppercase text-secondary dark:text-slate-400 font-bold font-label rounded-tr-xl text-right transition-colors">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y-0">
                  {/* Row 1: Valid Date */}
                  <tr className="hover:bg-surface-container-low dark:hover:bg-slate-800 transition-colors group">
                    <td className="px-8 py-6">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded bg-slate-100 dark:bg-slate-950 flex items-center justify-center">
                          <span className="material-symbols-outlined text-slate-400 dark:text-slate-500" data-icon="corporate_fare">corporate_fare</span>
                        </div>
                        <span className="text-lg font-bold text-on-surface dark:text-slate-50 font-headline transition-colors">Stellar Dynamics</span>
                      </div>
                    </td>
                    <td className="px-8 py-6 text-secondary dark:text-slate-400 font-medium transition-colors">#FRM-2024-001</td>
                    <td className="px-8 py-6">
                      <div className="inline-flex items-center px-4 py-1.5 rounded-full bg-tertiary-container dark:bg-tertiary/40 text-on-tertiary-container dark:text-tertiary-container text-xs font-bold font-label">
                        Oct 12, 2024
                      </div>
                    </td>
                    <td className="px-8 py-6">
                      <div className="flex items-center gap-2">
                        <div className="w-6 h-6 rounded-full bg-secondary-container dark:bg-secondary-container/50"></div>
                        <span className="text-sm font-medium dark:text-slate-300">Michael Chen</span>
                      </div>
                    </td>
                    <td className="px-8 py-6 text-right">
                      <button className="opacity-0 group-hover:opacity-100 p-2 text-primary hover:bg-primary/10 rounded-lg transition-all">
                        <span className="material-symbols-outlined" data-icon="open_in_new">open_in_new</span>
                      </button>
                    </td>
                  </tr>
                  {/* Row 2: Expired Date */}
                  <tr className="bg-surface-container-low/30 dark:bg-slate-800/40 hover:bg-surface-container-low dark:hover:bg-slate-800 transition-colors group">
                    <td className="px-8 py-6">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded bg-slate-100 dark:bg-slate-950 flex items-center justify-center">
                          <span className="material-symbols-outlined text-slate-400 dark:text-slate-500" data-icon="apartment">apartment</span>
                        </div>
                        <span className="text-lg font-bold text-on-surface dark:text-slate-50 font-headline transition-colors">North Peak Logistics</span>
                      </div>
                    </td>
                    <td className="px-8 py-6 text-secondary dark:text-slate-400 font-medium transition-colors">#FRM-2023-892</td>
                    <td className="px-8 py-6">
                      <div className="inline-flex items-center px-4 py-1.5 rounded-full bg-error-container dark:bg-error/40 text-on-error-container dark:text-error-container text-xs font-bold font-label">
                        Jan 15, 2023
                      </div>
                    </td>
                    <td className="px-8 py-6">
                      <div className="flex items-center gap-2">
                        <div className="w-6 h-6 rounded-full bg-secondary-container dark:bg-secondary-container/50"></div>
                        <span className="text-sm font-medium dark:text-slate-300">Sarah Miller</span>
                      </div>
                    </td>
                    <td className="px-8 py-6 text-right">
                      <button className="opacity-0 group-hover:opacity-100 p-2 text-primary hover:bg-primary/10 rounded-lg transition-all">
                        <span className="material-symbols-outlined" data-icon="open_in_new">open_in_new</span>
                      </button>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </section>
        </main>
      </div>
    </div>
  );
}
