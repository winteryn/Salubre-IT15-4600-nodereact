import { useState } from "react";
import "./dashboard.css";

const STATS = [
  { label: "Total Users",     value: "12,847",  change: "+8.2%",  dir: "up",   icon: "👥", iconClass: "purple"  },
  { label: "Revenue",         value: "$48,392", change: "+14.5%", dir: "up",   icon: "💰", iconClass: "violet"  },
  { label: "Active Sessions", value: "3,291",   change: "+2.1%",  dir: "up",   icon: "🔥", iconClass: "indigo"  },
  { label: "Bounce Rate",     value: "24.8%",   change: "-3.4%",  dir: "down", icon: "📉", iconClass: "fuchsia" },
];

const ACTIVITY = [
  { name: "Jhon Rey Uy",  email: "jhon@mail.com",   action: "Logged In",       status: "active",   time: "2m ago",  avatarBg: "#ede9fe", avatarColor: "#6d28d9", initials: "JR" },
  { name: "Jupri Clerigo",   email: "jupri@mail.com", action: "Updated Profile", status: "active",   time: "11m ago", avatarBg: "#fae8ff", avatarColor: "#a21caf", initials: "JC" },
  { name: "Thea Kang",     email: "thea@mail.com",    action: "Reset Password",  status: "pending",  time: "34m ago", avatarBg: "#eef2ff", avatarColor: "#4338ca", initials: "TK" },
  { name: "Mariel Cortez", email: "mariel@mail.com", action: "Uploaded File",   status: "active",   time: "1h ago",  avatarBg: "#ddd6fe", avatarColor: "#5b21b6", initials: "MC" },
  { name: "Joshua Hong",   email: "joshua@mail.com", action: "Deactivated",     status: "inactive", time: "3h ago",  avatarBg: "#fce7f3", avatarColor: "#050505", initials: "JH" },
  { name: "Llyod Loria",   email: "joshua@mail.com", action: "Deactivated",     status: "inactive", time: "10h ago",  avatarBg: "#fce7f3", avatarColor: "#ff34e7", initials: "LL" },
  { name: "Monjiro Diaz", email: "mariel@mail.com", action: "Uploaded File",   status: "active",   time: "5m ago",  avatarBg: "#ddd6fe", avatarColor: "#21b673", initials: "MD" },
];

const NAV_MAIN = [
  { icon: "🏠", label: "Overview" },
  { icon: "👤", label: "Users",    badge: "12" },
  { icon: "📊", label: "Analytics" },
  { icon: "💬", label: "Messages", badge: "4" },
  { icon: "📁", label: "Files" },
];

const NAV_SYSTEM = [
  { icon: "⚙️", label: "Settings" },
  { icon: "🛡️", label: "Security" },
  { icon: "❓", label: "Help" },
];

const QUICK_ACTIONS = [
  { icon: "➕", title: "Add New User",   sub: "Create account"   },
  { icon: "📤", title: "Export Report",  sub: "Download CSV/PDF" },
  { icon: "🔔", title: "Send Broadcast", sub: "Notify all users" },
  { icon: "🔒", title: "Lock Account",   sub: "Manage access"    },
];

const logoutStyle = {
  display: "flex",
  alignItems: "center",
  gap: 8,
  width: "calc(100% - 32px)",
  margin: "8px 16px 16px",
  padding: "10px 16px",
  background: "rgba(232, 142, 255, 0.58)",
  color: "#ffffff",
  border: "1px solid rgba(136, 0, 167, 0.34)",
  borderRadius: 10,
  cursor: "pointer",
  fontSize: 13,
  fontWeight: 600,
  transition: "background 0.2s",
};

export default function Dashboard({ user, onLogout }) {
  const [activeNav, setActiveNav] = useState("Overview");

  const today = new Date().toLocaleDateString("en-US", {
    weekday: "long", year: "numeric", month: "long", day: "numeric",
  });

  const displayName = user?.name
    ? user.name.charAt(0).toUpperCase() + user.name.slice(1)
    : "Jane Doe";

  const initials = user?.name
    ? user.name.slice(0, 2).toUpperCase()
    : "JD";

  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return "Good morning";
    if (hour < 18) return "Good afternoon";
    return "Good evening";
  };

  // ── Safe logout handler ──
  const handleLogout = () => {
    if (typeof onLogout === "function") {
      onLogout();
    }
  };

  return (
    <div className="dashboard-root">
      {/* ── SIDEBAR ── */}
      <aside className="sidebar" style={{ display: "flex", flexDirection: "column", height: "100vh", overflow: "hidden" }}>
        <div className="sidebar-logo">
          <div className="sidebar-logo-icon">✦</div>
          <div className="sidebar-logo-text">Meowy<span>UI</span></div>
        </div>

        <nav className="sidebar-nav" style={{ flex: 1, overflowY: "auto" }}>
          <div className="nav-label">Main Menu</div>
          {NAV_MAIN.map((item) => (
            <button
              key={item.label}
              className={`nav-item ${activeNav === item.label ? "active" : ""}`}
              onClick={() => setActiveNav(item.label)}
            >
              <span className="nav-icon">{item.icon}</span>
              {item.label}
              {item.badge && <span className="nav-badge">{item.badge}</span>}
            </button>
          ))}

          <div className="nav-label" style={{ marginTop: 8 }}>System</div>
          {NAV_SYSTEM.map((item) => (
            <button
              key={item.label}
              className={`nav-item ${activeNav === item.label ? "active" : ""}`}
              onClick={() => setActiveNav(item.label)}
            >
              <span className="nav-icon">{item.icon}</span>
              {item.label}
            </button>
          ))}
        </nav>

        {/* Bottom section — always pinned */}
        <div style={{ flexShrink: 0, borderTop: "1px solid rgba(255,255,255,0.08)", paddingTop: 8 }}>
          {/* User info */}
          <div className="sidebar-user">
            <div className="user-avatar">{initials}</div>
            <div>
              <div className="user-info-name">{displayName}</div>
              <div className="user-info-role">Administrator</div>
            </div>
          </div>

          {/* ✅ LOGOUT BUTTON */}
          <button style={logoutStyle} onClick={handleLogout}>
            <span>🚪</span> Log Out
          </button>
        </div>
      </aside>

      {/* ── MAIN ── */}
      <div className="dashboard-main">
        {/* TOPBAR */}
        <header className="topbar">
          <div className="topbar-title">
            {activeNav} <span>Dashboard</span>
          </div>
          <div className="search-bar">
            <span className="search-icon">🔍</span>
            <input placeholder="Search anything…" />
          </div>
          <div className="topbar-actions">
            <button className="icon-btn" title="Notifications">
              🔔
              <span className="notif-dot" />
            </button>
            <button className="icon-btn" title="Messages">💬</button>
            <div className="topbar-avatar" title="Profile">{initials}</div>
          </div>
        </header>

        {/* CONTENT */}
        <main className="dashboard-content">

          {/* Welcome Banner */}
          <div className="welcome-banner">
            <div className="welcome-text">
              <h2>{getGreeting()}, {displayName}! 👋</h2>
              <p>{today} — Here's what's happening in your workspace.</p>
            </div>
            <button className="welcome-cta">View Reports →</button>
          </div>

          {/* Stats */}
          <div className="stats-grid">
            {STATS.map((s) => (
              <div className="stat-card" key={s.label}>
                <div className="stat-header">
                  <span className="stat-label">{s.label}</span>
                  <div className={`stat-icon ${s.iconClass}`}>{s.icon}</div>
                </div>
                <div className="stat-value">{s.value}</div>
                <div className={`stat-change ${s.dir}`}>
                  {s.dir === "up" ? "▲" : "▼"} {s.change}
                  <span className="stat-change-label">&nbsp;vs last month</span>
                </div>
              </div>
            ))}
          </div>

          {/* Bottom Grid */}
          <div className="bottom-grid">

            {/* Recent Activity */}
            <div className="card">
              <div className="card-header">
                <span className="card-title">Recent Activity</span>
                <button className="card-action">View all</button>
              </div>
              <table className="activity-table">
                <thead>
                  <tr>
                    <th>User</th>
                    <th>Action</th>
                    <th>Status</th>
                    <th>Time</th>
                  </tr>
                </thead>
                <tbody>
                  {ACTIVITY.map((row) => (
                    <tr key={row.email}>
                      <td>
                        <div className="user-cell">
                          <div className="mini-avatar" style={{ background: row.avatarBg, color: row.avatarColor }}>
                            {row.initials}
                          </div>
                          <div>
                            <div className="user-name">{row.name}</div>
                            <div className="user-email">{row.email}</div>
                          </div>
                        </div>
                      </td>
                      <td>{row.action}</td>
                      <td>
                        <span className={`status-badge ${row.status}`}>
                          {row.status.charAt(0).toUpperCase() + row.status.slice(1)}
                        </span>
                      </td>
                      <td>{row.time}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Quick Actions */}
            <div className="card">
              <div className="card-header">
                <span className="card-title">Quick Actions</span>
              </div>
              <div className="quick-actions">
                {QUICK_ACTIONS.map((qa) => (
                  <div className="quick-action-item" key={qa.title}>
                    <div className="qa-icon">{qa.icon}</div>
                    <div>
                      <div className="qa-text-main">{qa.title}</div>
                      <div className="qa-text-sub">{qa.sub}</div>
                    </div>
                    <span className="qa-arrow">›</span>
                  </div>
                ))}

                {/* Storage meter */}
                <div style={{ marginTop: 8, padding: "14px 16px", borderRadius: 10, background: "var(--purple-ghost)" }}>
                  <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 8 }}>
                    <span style={{ fontSize: 13, fontWeight: 600, color: "var(--gray-900)" }}>Storage Used</span>
                    <span style={{ fontSize: 12, color: "var(--purple-main)", fontWeight: 600 }}>67%</span>
                  </div>
                  <div className="progress-bar-track">
                    <div className="progress-bar-fill" style={{ width: "67%" }} />
                  </div>
                  <div style={{ fontSize: 11, color: "var(--gray-400)", marginTop: 6 }}>6.7 GB of 10 GB used</div>
                </div>
              </div>
            </div>

          </div>
        </main>
      </div>
    </div>
  );
}