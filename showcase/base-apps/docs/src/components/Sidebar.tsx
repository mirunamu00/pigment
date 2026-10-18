import { useEffect, useRef, useState } from 'react';
import { NavLink } from 'react-router';
import { groups, pagePath, pagesInGroup, type GroupId } from '../data/docs';

interface SidebarProps {
  open: boolean;
  onClose: () => void;
}

export default function Sidebar({ open, onClose }: SidebarProps) {
  const [expanded, setExpanded] = useState<Record<GroupId, boolean>>({
    'getting-started': true,
    guides: true,
    'api-reference': true,
    resources: true,
  });

  const closeRef = useRef<HTMLButtonElement>(null);

  // Opening the drawer moves focus into it.
  useEffect(() => {
    if (open) closeRef.current?.focus();
  }, [open]);

  function toggle(id: GroupId) {
    setExpanded((current) => ({ ...current, [id]: !current[id] }));
  }

  return (
    <aside
      id="docs-sidebar"
      className={open ? 'sidebar is-open' : 'sidebar'}
      aria-label="Documentation sidebar"
      data-open={open ? 'true' : 'false'}
      data-testid="sidebar"
    >
      <div className="sidebar-header">
        <span className="sidebar-title">Documentation</span>
        <button
          ref={closeRef}
          type="button"
          className="button button-small drawer-close"
          onClick={onClose}
          data-testid="drawer-close"
        >
          Close
        </button>
      </div>
      <nav aria-label="Documentation" className="sidebar-nav">
        {groups.map((group) => {
          const isExpanded = expanded[group.id];
          const listId = `nav-group-list-${group.id}`;
          return (
            <div key={group.id} className="nav-group" data-testid="nav-group">
              <button
                type="button"
                className="nav-group-toggle"
                aria-expanded={isExpanded}
                aria-controls={listId}
                onClick={() => toggle(group.id)}
                data-testid={`nav-group-toggle-${group.id}`}
              >
                <span className="nav-group-chevron" aria-hidden="true">
                  {isExpanded ? '▾' : '▸'}
                </span>
                {group.label}
              </button>
              <ul id={listId} className="nav-group-list" hidden={!isExpanded} data-testid={listId}>
                {pagesInGroup(group.id).map((page) => (
                  <li key={page.slug}>
                    <NavLink to={pagePath(page)} className="sidebar-link" data-testid="sidebar-link">
                      {page.title}
                    </NavLink>
                  </li>
                ))}
              </ul>
            </div>
          );
        })}
      </nav>
    </aside>
  );
}
