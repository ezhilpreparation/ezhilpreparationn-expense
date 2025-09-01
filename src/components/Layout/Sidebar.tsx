import { NavLink } from 'react-router-dom';
import { useLogout } from '../../hooks/useAuth';
import {
  BarChart3,
  TrendingUp,
  CreditCard,
  ArrowUpDown,
  Tag,
  Target,
  FolderOpen,
  Calendar,
  Users,
  Eye,
  Settings,
  Info,
  LogOut,
  X,
  ChevronDown,
  ChevronRight,
  CalendarDays,
  Sliders as Sliders3,
  ChevronLeft,
} from 'lucide-react';
import { useEffect, useMemo, useState } from 'react';

const mainMenuItems = [
  { name: 'Dashboard', path: '/dashboard', icon: BarChart3 },
  { name: 'Analysis', path: '/analysis', icon: TrendingUp },
  { name: 'Accounts', path: '/accounts', icon: CreditCard },
  { name: 'Transactions', path: '/transactions', icon: ArrowUpDown },
  { name: 'Tags', path: '/tags', icon: Tag },
  { name: 'Budgets', path: '/budgets', icon: Target },
  { name: 'Categories', path: '/categories', icon: FolderOpen },
  { name: 'Scheduled Txns', path: '/scheduled', icon: Calendar },
  { name: 'Debts', path: '/debts', icon: Users },
];

const viewsSubMenu = [
  { name: 'Day', path: '/views/day', icon: CalendarDays },
  { name: 'Calendar', path: '/views/calendar', icon: Calendar },
  { name: 'Custom', path: '/views/custom', icon: Sliders3 },
];

const otherItems = [
  { name: 'Settings', path: '/settings', icon: Settings },
  { name: 'About', path: '/about', icon: Info },
];

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

/* Small tooltip component used in condensed mode */
function SidebarTooltip({ label }: { label: string }) {
  return (
    <div
      role="tooltip"
      className="absolute left-full ml-2 px-2 py-1 bg-gray-900 text-white text-sm rounded-md opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none whitespace-nowrap z-50"
    >
      {label}
    </div>
  );
}

export default function Sidebar({ isOpen, onClose }: SidebarProps) {
  const logout = useLogout();
  const [isViewsExpanded, setIsViewsExpanded] = useState(false);
  const [isCondensed, setIsCondensed] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [logoutError, setLogoutError] = useState<string | null>(null);

  // Lock body scroll when mobile sidebar is open
  useEffect(() => {
    const prev = document.body.style.overflow;
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = prev || '';
    }
    return () => {
      document.body.style.overflow = prev || '';
    };
  }, [isOpen]);

  const handleLogout = () => {
    setLogoutError(null);
    logout.mutate(undefined, {
      onSuccess: () => {
        setLogoutError(null);
        // optional: any extra success handling
      },
      onError: (err: any) => {
        const message =
          (err && err.message) || 'Logout failed. Please try again.';
        setLogoutError(message);
      },
    });
  };

  const shouldShowCondensed = useMemo(
    () => isCondensed && !isHovered && !isOpen,
    [isCondensed, isHovered, isOpen]
  );

  // auto collapse submenu if sidebar is condensed (keeps UI consistent)
  useEffect(() => {
    if (shouldShowCondensed) {
      setIsViewsExpanded(false);
    }
  }, [shouldShowCondensed]);

  return (
    <>
      {/* Mobile overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
          onClick={onClose}
          aria-hidden
        />
      )}

      {/* Sidebar */}
      <aside
        aria-hidden={!isOpen && window.innerWidth < 1024}
        className={`
          fixed lg:static inset-y-0 left-0 z-50 bg-white shadow-lg h-screen flex flex-col transform transition-all duration-300 ease-in-out
          ${isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
          ${shouldShowCondensed ? 'w-16' : 'w-64 sm:w-72 lg:w-64'}
        `}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {/* Mobile close button */}
        <div className="lg:hidden absolute top-3 right-3 sm:top-4 sm:right-4">
          <button
            onClick={onClose}
            className="p-1.5 sm:p-2 rounded-md text-gray-400 hover:text-gray-600 hover:bg-gray-100 transition-colors focus:outline-none focus-visible:ring focus-visible:ring-indigo-300"
            aria-label="Close sidebar"
          >
            <X className="h-5 w-5 sm:h-6 sm:w-6" />
          </button>
        </div>

        {/* Header */}
        <div className="p-4 sm:p-6 border-b border-gray-200">
          <div className="flex items-center justify-between">
            {/* Logo / Brand: animate width + opacity to avoid empty gap */}
            <div
              className={`flex items-center space-x-2 transition-all duration-300 overflow-hidden ${
                shouldShowCondensed ? 'max-w-0 opacity-0' : 'max-w-xs opacity-100'
              }`}
            >
              <span className="text-2xl font-extrabold text-indigo-600 leading-none">
                Expense
                <span className="text-xl font-bold text-gray-900 ml-1">Trace</span>
              </span>
            </div>

            {/* Collapse/Expand button - desktop only */}
            <button
              onClick={() => setIsCondensed((s) => !s)}
              aria-label={shouldShowCondensed ? 'Expand sidebar' : 'Collapse sidebar'}
              aria-pressed={shouldShowCondensed}
              className="hidden lg:block p-1.5 rounded-md text-gray-400 hover:text-gray-600 hover:bg-gray-100 transition-colors focus:outline-none focus-visible:ring focus-visible:ring-indigo-300"
            >
              <ChevronLeft
                className={`h-5 w-5 transition-transform duration-300 ${
                  shouldShowCondensed ? 'rotate-180' : ''
                }`}
              />
            </button>
          </div>
        </div>

        {/* Menu */}
        <nav className="flex-1 overflow-y-auto scrollbar-hide p-3 sm:p-4" aria-label="Primary">
          <div className="space-y-6">
            {/* Main Menu */}
            <div>
              <h3
                className={`px-2 sm:px-3 text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2 sm:mb-3 transition-opacity duration-300 ${
                  shouldShowCondensed ? 'opacity-0 h-0' : 'opacity-100'
                }`}
              >
                Main Menu
              </h3>

              <div className="space-y-1">
                {mainMenuItems.map((item) => (
                  <div key={item.name} className="relative group">
                    <NavLink
                      to={item.path}
                      onClick={() => {
                        if (isOpen) onClose();
                      }}
                      className={({ isActive }) =>
                        `flex items-center px-2 sm:px-3 py-2 text-sm font-medium rounded-md transition-colors focus:outline-none focus-visible:ring focus-visible:ring-indigo-300 ${
                          isActive
                            ? 'bg-indigo-50 text-indigo-700 border-r-2 border-indigo-700'
                            : 'text-gray-700 hover:bg-gray-50 hover:text-gray-900'
                        } ${shouldShowCondensed ? 'justify-center' : ''}`
                      }
                    >
                      <item.icon
                        className={`h-4 w-4 sm:h-5 sm:w-5 flex-shrink-0 ${
                          shouldShowCondensed ? '' : 'mr-2 sm:mr-3'
                        }`}
                        aria-hidden
                      />
                      <span
                        className={`transition-all duration-300 overflow-hidden ${
                          shouldShowCondensed ? 'max-w-0 opacity-0' : 'max-w-xs opacity-100'
                        }`}
                      >
                        {item.name}
                      </span>
                    </NavLink>

                    {/* Tooltip only in condensed mode */}
                    {shouldShowCondensed && <SidebarTooltip label={item.name} />}
                  </div>
                ))}

                {/* Views with submenu */}
                <div className="relative group">
                  <button
                    onClick={() => setIsViewsExpanded((s) => !s)}
                    aria-expanded={isViewsExpanded}
                    aria-controls="views-submenu"
                    className={`w-full flex items-center py-2 text-sm font-medium rounded-md transition-colors text-gray-700 hover:bg-gray-50 hover:text-gray-900 focus:outline-none focus-visible:ring focus-visible:ring-indigo-300 ${
                      shouldShowCondensed ? 'justify-center px-2' : 'justify-between px-2 sm:px-3'
                    }`}
                  >
                    <div className="flex items-center">
                      <Eye
                        className={`h-4 w-4 sm:h-5 sm:w-5 flex-shrink-0 ${
                          shouldShowCondensed ? '' : 'mr-2 sm:mr-3'
                        }`}
                        aria-hidden
                      />
                      <span
                        className={`transition-all duration-300 overflow-hidden ${
                          shouldShowCondensed ? 'max-w-0 opacity-0' : 'max-w-xs opacity-100'
                        }`}
                      >
                        Views
                      </span>
                    </div>

                    {!shouldShowCondensed && (
                      <div className="transition-transform duration-200">
                        {isViewsExpanded ? <ChevronDown className="h-4 w-4" /> : <ChevronRight className="h-4 w-4" />}
                      </div>
                    )}
                  </button>

                  {/* Tooltip for condensed mode */}
                  {shouldShowCondensed && <SidebarTooltip label="Views" />}

                  {/* Submenu - smooth accordion */}
                  <div
                    id="views-submenu"
                    className={`ml-4 sm:ml-6 mt-1 overflow-hidden transition-all duration-300 ${
                      isViewsExpanded && !shouldShowCondensed ? 'max-h-64 opacity-100' : 'max-h-0 opacity-0'
                    }`}
                    aria-hidden={!isViewsExpanded}
                  >
                    <div className="space-y-1">
                      {viewsSubMenu.map((item) => (
                        <div key={item.name} className="relative group">
                          <NavLink
                            to={item.path}
                            onClick={() => {
                              if (isOpen) onClose();
                            }}
                            className={({ isActive }) =>
                              `flex items-center px-2 sm:px-3 py-2 text-sm font-medium rounded-md transition-colors focus:outline-none focus-visible:ring focus-visible:ring-indigo-300 ${
                                isActive
                                  ? 'bg-indigo-50 text-indigo-700 border-r-2 border-indigo-700'
                                  : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                              }`
                            }
                          >
                            <item.icon className="mr-2 sm:mr-3 h-4 w-4 flex-shrink-0" aria-hidden />
                            <span className="truncate">{item.name}</span>
                          </NavLink>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Other Items */}
            <div>
              <h3
                className={`px-2 sm:px-3 text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2 sm:mb-3 transition-opacity duration-300 ${
                  shouldShowCondensed ? 'opacity-0 h-0' : 'opacity-100'
                }`}
              >
                Other
              </h3>
              <div className="space-y-1">
                {otherItems.map((item) => (
                  <div key={item.name} className="relative group">
                    <NavLink
                      to={item.path}
                      onClick={() => {
                        if (isOpen) onClose();
                      }}
                      className={({ isActive }) =>
                        `flex items-center px-2 sm:px-3 py-2 text-sm font-medium rounded-md transition-colors focus:outline-none focus-visible:ring focus-visible:ring-indigo-300 ${
                          isActive
                            ? 'bg-indigo-50 text-indigo-700 border-r-2 border-indigo-700'
                            : 'text-gray-700 hover:bg-gray-50 hover:text-gray-900'
                        } ${shouldShowCondensed ? 'justify-center' : ''}`
                      }
                    >
                      <item.icon
                        className={`h-4 w-4 sm:h-5 sm:w-5 flex-shrink-0 ${
                          shouldShowCondensed ? '' : 'mr-2 sm:mr-3'
                        }`}
                        aria-hidden
                      />
                      <span
                        className={`transition-all duration-300 overflow-hidden ${
                          shouldShowCondensed ? 'max-w-0 opacity-0' : 'max-w-xs opacity-100'
                        }`}
                      >
                        {item.name}
                      </span>
                    </NavLink>

                    {/* Tooltip */}
                    {shouldShowCondensed && <SidebarTooltip label={item.name} />}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </nav>

        {/* Footer - Logout */}
        <div className="p-3 sm:p-4 border-t border-gray-200">
          <div className="relative group">
            <button
              onClick={handleLogout}
              disabled={logout.isPending}
              className={`w-full flex items-center px-2 sm:px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 hover:text-gray-900 rounded-md transition-colors disabled:opacity-50 focus:outline-none focus-visible:ring focus-visible:ring-indigo-300 ${
                shouldShowCondensed ? 'justify-center' : ''
              }`}
            >
              <LogOut
                className={`h-4 w-4 sm:h-5 sm:w-5 flex-shrink-0 ${shouldShowCondensed ? '' : 'mr-2 sm:mr-3'}`}
                aria-hidden
              />
              <span
                className={`transition-all duration-300 overflow-hidden ${
                  shouldShowCondensed ? 'max-w-0 opacity-0' : 'max-w-xs opacity-100'
                }`}
              >
                {logout.isPending ? 'Signing out...' : 'Sign Out'}
              </span>
            </button>

            {/* Tooltip */}
            {shouldShowCondensed && <SidebarTooltip label="Sign Out" />}
          </div>

          {/* logout error message */}
          {logoutError && (
            <div className="mt-2 text-xs text-red-600 px-2" role="alert">
              {logoutError}
            </div>
          )}
        </div>
      </aside>
    </>
  );
}