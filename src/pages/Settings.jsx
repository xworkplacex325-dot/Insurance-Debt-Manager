import { useTheme } from '../contexts/ThemeContext';

export default function Settings() {
  const { theme, setTheme, toggleTheme } = useTheme();

  return (
    <div className="bg-background text-on-surface min-h-screen pt-20 flex">
      {/* Shell Suppression: TopNavBar used but modified for context */}
      <nav className="fixed top-0 w-full z-50 bg-slate-50/80 backdrop-blur-xl shadow-sm px-8 py-4 w-full max-w-screen-2xl mx-auto flex justify-between items-center">
        <div className="flex items-center gap-6">
          <span className="text-2xl font-bold tracking-tight text-slate-900">Clarified Curator</span>
          <div className="hidden md:flex items-center space-x-8 ml-10">
            <a className="text-slate-500 hover:bg-slate-200/50 transition-colors px-3 py-1 rounded-lg" href="/">Dashboard</a>
            <a className="text-slate-500 hover:bg-slate-200/50 transition-colors px-3 py-1 rounded-lg" href="#">Form Archive</a>
            <a className="text-blue-700 border-b-2 border-blue-700 font-bold px-3 py-1" href="/settings">Settings</a>
          </div>
        </div>
        <div className="flex items-center space-y-0 space-x-4">
          <button onClick={toggleTheme} className="p-2 text-slate-500 dark:text-slate-400 hover:bg-slate-200/50 dark:hover:bg-slate-800/50 rounded-full transition-colors flex items-center justify-center">
            <span className="material-symbols-outlined">{theme === 'dark' ? 'light_mode' : 'dark_mode'}</span>
          </button>
          <button className="p-2 text-slate-500 dark:text-slate-400 hover:bg-slate-200/50 dark:hover:bg-slate-800/50 rounded-full transition-colors">
            <span className="material-symbols-outlined" data-icon="notifications">notifications</span>
          </button>
          <div className="flex items-center gap-3 pl-4 border-l border-slate-200">
            <div className="text-right hidden sm:block">
              <p className="text-sm font-bold text-slate-900">Admin User</p>
              <p className="text-xs text-slate-500 uppercase tracking-wider">Registry Office</p>
            </div>
            <img alt="User profile avatar" className="w-10 h-10 rounded-full bg-surface-container-highest object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuDmpBcmI-ekiOrUsS8o7WyIlCqyTNulv2Z0MmI6tZUdY-eYEItbsqses7oKKhnCi-7YMfBj9T0CuIPXsqnUq0sSkv2RAq2_nKOjYQig6LBAy2zcyOHm-mf07huvmzFyAcRrLrznzS53CrXVHVvmBqUWCiK4maa4YY7_nf6AWujSeE-zukkLKt6A4keiFnpBwzSVZjCYQhDARXTj9KTR5z64w_eCoCYJlfKQzdF8UPDa-yKg97iYRYOGoTUCzyDcBUWrHQeUi6wfkG15"/>
          </div>
        </div>
      </nav>
      
      {/* Sidebar Navigation */}
      <aside className="h-full w-64 fixed top-20 bottom-0 p-6 space-y-8 bg-slate-100 hidden lg:flex flex-col">
        <div className="space-y-1">
          <p className="px-4 text-[10px] uppercase tracking-[0.1em] text-outline font-bold mb-4">Navigation</p>
          <a className="flex items-center gap-3 px-4 py-3 text-slate-600 hover:bg-slate-200 hover:text-slate-900 transition-all duration-200 rounded-lg group" href="/">
            <span className="material-symbols-outlined" data-icon="dashboard">dashboard</span>
            <span className="font-medium">Dashboard</span>
          </a>
          <a className="flex items-center gap-3 px-4 py-3 text-slate-600 hover:bg-slate-200 hover:text-slate-900 transition-all duration-200 rounded-lg group" href="#">
            <span className="material-symbols-outlined" data-icon="description">description</span>
            <span className="font-medium">Form Archive</span>
          </a>
        </div>
        <div className="mt-auto space-y-1">
          <a className="flex items-center gap-3 px-4 py-3 bg-white text-blue-700 font-semibold rounded-lg shadow-sm transition-all duration-200" href="/settings">
            <span className="material-symbols-outlined" data-icon="settings">settings</span>
            <span className="font-medium">Settings</span>
          </a>
          <a className="flex items-center gap-3 px-4 py-3 text-slate-600 hover:bg-slate-200 hover:text-slate-900 transition-all duration-200 rounded-lg group" href="/login">
            <span className="material-symbols-outlined" data-icon="logout">logout</span>
            <span className="font-medium">Sign Out</span>
          </a>
        </div>
      </aside>
      
      {/* Main Content Canvas */}
      <main className="flex-1 lg:ml-64 p-8 md:p-12 lg:p-16 max-w-5xl mx-auto w-full">
        <header className="mb-12">
          <h1 className="text-5xl font-extrabold tracking-tighter text-on-surface mb-2">Settings</h1>
          <p className="text-on-surface-variant font-medium text-lg">Manage your workspace preferences and identity.</p>
        </header>
        <div className="space-y-16">
          {/* Profile Settings Section */}
          <section>
            <div className="flex items-baseline justify-between mb-8">
              <h2 className="text-2xl font-bold tracking-tight">Profile Settings</h2>
              <span className="text-xs font-bold uppercase tracking-widest text-outline">Section 01</span>
            </div>
            <div className="bg-surface-container-low rounded-xl p-8 space-y-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-2">
                  <label className="text-xs font-bold uppercase tracking-wider text-on-surface-variant ml-1">Full Name</label>
                  <input className="w-full bg-surface-container-lowest border border-outline-variant/15 rounded-lg px-4 py-3 focus:ring-4 focus:ring-primary/10 focus:border-primary outline-none transition-all" type="text" defaultValue="Alexander Hamilton"/>
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-bold uppercase tracking-wider text-on-surface-variant ml-1">Email Address</label>
                  <input className="w-full bg-surface-container-lowest border border-outline-variant/15 rounded-lg px-4 py-3 focus:ring-4 focus:ring-primary/10 focus:border-primary outline-none transition-all" type="email" defaultValue="a.hamilton@registry.gov"/>
                </div>
              </div>
            </div>
          </section>
          {/* Appearance Section */}
          <section>
            <div className="flex items-baseline justify-between mb-8">
              <h2 className="text-2xl font-bold tracking-tight">Appearance</h2>
              <span className="text-xs font-bold uppercase tracking-widest text-outline">Section 03</span>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Light Mode Option */}
              <div onClick={() => setTheme('light')} className={`relative bg-white border-2 ${theme === 'light' ? 'border-primary' : 'border-transparent hover:border-slate-300'} rounded-2xl p-6 cursor-pointer overflow-hidden transition-all`}>
                <div className="flex items-center justify-between mb-8">
                  <div className="flex items-center gap-3">
                    <span className="material-symbols-outlined text-primary" data-icon="light_mode">light_mode</span>
                    <span className="font-bold text-on-surface">Light Mode</span>
                  </div>
                  <div className={`w-5 h-5 rounded-full border-4 ${theme === 'light' ? 'border-primary bg-white' : 'border-slate-300'}`}></div>
                </div>
              </div>
              
              {/* Dark Mode Option */}
              <div onClick={() => setTheme('dark')} className={`relative bg-slate-900 border-2 ${theme === 'dark' ? 'border-primary' : 'border-transparent hover:border-slate-700'} rounded-2xl p-6 cursor-pointer overflow-hidden transition-all`}>
                <div className="flex items-center justify-between mb-8">
                  <div className="flex items-center gap-3">
                    <span className="material-symbols-outlined text-slate-400" data-icon="dark_mode">dark_mode</span>
                    <span className="font-bold text-white">Dark Mode</span>
                  </div>
                  <div className={`w-5 h-5 rounded-full border-4 ${theme === 'dark' ? 'border-primary bg-slate-900' : 'border-slate-700'}`}></div>
                </div>
              </div>
            </div>
          </section>
        </div>
      </main>
    </div>
  );
}
