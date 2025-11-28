import React, { useRef, useEffect } from 'react';
import { MdClose } from 'react-icons/md';
import './Sidebar.css';


const Sidebar = ({
  channels,
  activeChannel,
  onChannelSelect,
  width,
  onWidthChange,
  isCollapsed,
  onToggle
}) => {
  const sidebarRef = useRef(null);
  const resizeHandleRef = useRef(null);
  const isResizing = useRef(false);

  useEffect(() => {
    const handleMouseMove = (e) => {
      if (!isResizing.current) return;

      const newWidth = e.clientX;
      const minWidth = 200;
      const maxWidth = 400;

      if (newWidth >= minWidth && newWidth <= maxWidth) {
        onWidthChange(newWidth);
      }
    };

    const handleMouseUp = () => {
      isResizing.current = false;
      document.body.style.cursor = '';
      document.body.style.userSelect = '';
    };

    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseUp);

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };
  }, [onWidthChange]);

  const handleResizeStart = () => {
    isResizing.current = true;
    document.body.style.cursor = 'ew-resize';
    document.body.style.userSelect = 'none';
  };

  return (
    <aside
      ref={sidebarRef}
      className={`sidebar ${isCollapsed ? 'collapsed' : ''}`}
      style={{ width: isCollapsed ? '0' : `${width}px` }}
    >
      <div className="sidebar-content">
        <div className="sidebar-header">
          <button
            className="collapse-btn"
            onClick={onToggle}
            aria-label="Sluit sidebar"
          >
            <MdClose />
          </button>
          <div className="logo-section">
            <h1 className="logo">Eddie TV</h1>
            <p className="tagline">Jouw Reality TV Bestemming</p>
          </div>
        </div>

        <nav className="sidebar-nav" aria-label="Kanalen">
          <h2 className="nav-title">Kanalen</h2>
          <ul className="channel-list">
            {channels.map(channel => (
              <li key={channel.id}>
                <a
                  href={`#${channel.id}`}
                  className={`channel-link ${activeChannel === channel.id ? 'active' : ''}`}
                  onClick={(e) => {
                    e.preventDefault();
                    onChannelSelect(channel.id);
                  }}
                  data-shortcut={channel.shortcut}
                >
                  <div className="channel-info">
                    <span className="channel-name">{channel.name}</span>
                    <span className="channel-description">{channel.description}</span>
                  </div>
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <div className="sidebar-footer">
          <p className="version">Eddie TV v1.0</p>
          <p className="copyright">© 2024 Reality Streaming</p>
        </div>
      </div>

      {!isCollapsed && (
        <div
          ref={resizeHandleRef}
          className="resize-handle"
          onMouseDown={handleResizeStart}
          aria-label="Sidebar grootte aanpassen"
        />
      )}
    </aside>
  );
};

export default Sidebar;
