export default function LoginPage() {
  return (
    <div className="bg-background text-on-background min-h-screen flex flex-col items-center justify-center p-6 selection:bg-primary-container selection:text-on-primary-container">
      {/* Subtle Background Element */}
      <div className="fixed inset-0 -z-10 overflow-hidden">
        <div className="absolute -top-[10%] -left-[5%] w-[40%] h-[40%] rounded-full bg-secondary-container/20 blur-[120px]"></div>
        <div className="absolute -bottom-[10%] -right-[5%] w-[30%] h-[30%] rounded-full bg-primary-container/10 blur-[100px]"></div>
      </div>
      
      {/* Login Container */}
      <main className="w-full max-w-[440px] animate-in fade-in slide-in-from-bottom-4 duration-700">
        
        {/* Branding Anchor */}
        <div className="text-center mb-10">
          <h1 className="text-3xl font-extrabold tracking-tight text-on-background mb-2">
            Clarified Curator
          </h1>
          <p className="text-on-surface-variant font-medium">
            The Administrative Editorial
          </p>
        </div>

        {/* Auth Card */}
        <div className="bg-surface-container-lowest rounded-xl p-10 shadow-sm ghost-border">
          <header className="mb-8">
            <h2 className="text-xl font-bold text-on-surface">Welcome back</h2>
            <p className="text-on-surface-variant text-sm mt-1">Please enter your credentials to continue.</p>
          </header>

          <form action="#" className="space-y-6" method="POST">
            {/* Field Group: Email */}
            <div className="space-y-2">
              <label className="block text-xs font-bold tracking-wider uppercase text-on-surface-variant px-1" htmlFor="email">
                Professional Email
              </label>
              <div className="relative">
                <span className="absolute left-4 top-1/2 -translate-y-1/2 material-symbols-outlined text-outline text-lg">mail</span>
                <input className="w-full pl-12 pr-4 py-4 bg-surface-container-low border-transparent ghost-border rounded-lg focus:ring-4 focus:ring-primary/10 focus:border-primary transition-all duration-200 outline-none text-on-surface placeholder:text-outline/60" id="email" name="email" placeholder="name@organization.com" required type="email" />
              </div>
            </div>

            {/* Field Group: Password */}
            <div className="space-y-2">
              <div className="flex justify-between items-center px-1">
                <label className="block text-xs font-bold tracking-wider uppercase text-on-surface-variant" htmlFor="password">
                  Security Key
                </label>
                <a className="text-xs font-semibold text-primary hover:text-primary-dim transition-colors" href="#">
                  Forgot?
                </a>
              </div>
              <div className="relative">
                <span className="absolute left-4 top-1/2 -translate-y-1/2 material-symbols-outlined text-outline text-lg">lock</span>
                <input className="w-full pl-12 pr-4 py-4 bg-surface-container-low border-transparent ghost-border rounded-lg focus:ring-4 focus:ring-primary/10 focus:border-primary transition-all duration-200 outline-none text-on-surface placeholder:text-outline/60" id="password" name="password" placeholder="••••••••" required type="password" />
              </div>
            </div>

            {/* Remember Me Toggle */}
            <div className="flex items-center px-1">
              <input className="h-4 w-4 rounded border-outline-variant text-primary focus:ring-primary/20 bg-surface-container-low transition-all" id="remember" name="remember" type="checkbox" />
              <label className="ml-3 block text-sm text-on-surface-variant font-medium" htmlFor="remember">
                Remember this device
              </label>
            </div>

            {/* Primary Action */}
            <button className="w-full editorial-gradient text-on-primary-fixed font-bold py-4 rounded-lg shadow-lg shadow-primary/20 hover:brightness-110 active:scale-[0.98] transition-all duration-200 flex items-center justify-center gap-2 group" type="submit">
              Sign In
              <span className="material-symbols-outlined text-xl group-hover:translate-x-1 transition-transform">arrow_forward</span>
            </button>
          </form>

          {/* Footer Tonal Section */}
          <footer className="mt-10 pt-8 border-t border-surface-variant flex flex-col items-center gap-4">
            <p className="text-sm text-on-surface-variant">
              Don't have an account? 
              <a className="text-primary font-bold hover:underline underline-offset-4 ml-1" href="#">Contact Registry</a>
            </p>
          </footer>
        </div>

        {/* Decorative Illustration Element (Optional/Minimalist) */}
        <div className="mt-12 flex justify-center items-center gap-8 opacity-40">
          <div className="flex items-center gap-2 grayscale hover:grayscale-0 transition-all cursor-default">
            <span className="material-symbols-outlined text-on-surface-variant">verified_user</span>
            <span className="text-[10px] font-bold tracking-widest uppercase text-on-surface-variant">Secure Vault</span>
          </div>
          <div className="flex items-center gap-2 grayscale hover:grayscale-0 transition-all cursor-default">
            <span className="material-symbols-outlined text-on-surface-variant">analytics</span>
            <span className="text-[10px] font-bold tracking-widest uppercase text-on-surface-variant">Editorial Suite</span>
          </div>
        </div>
      </main>

      {/* Support Links */}
      <nav className="fixed bottom-8 w-full flex justify-center gap-8 text-[11px] font-bold tracking-widest uppercase text-outline">
        <a className="hover:text-primary transition-colors" href="#">Security Policy</a>
        <a className="hover:text-primary transition-colors" href="#">Help Desk</a>
        <a className="hover:text-primary transition-colors" href="#">System Status</a>
      </nav>
    </div>
  );
}
