import { useState } from 'react';
import { notificationGroups } from '../data/notifications';

function initialState(): Record<string, boolean> {
  const state: Record<string, boolean> = {};
  for (const group of notificationGroups) {
    for (const setting of group.settings) state[setting.id] = setting.enabled;
  }
  return state;
}

export default function NotificationsPage() {
  const [enabled, setEnabled] = useState<Record<string, boolean>>(initialState);

  const total = Object.keys(enabled).length;
  const onCount = Object.values(enabled).filter(Boolean).length;

  function toggle(id: string) {
    setEnabled((current) => ({ ...current, [id]: !current[id] }));
  }

  return (
    <>
      <div className="page-header">
        <h1>Notifications</h1>
        <p className="muted">Choose what you hear about and where. Changes apply right away.</p>
        <p className="small" data-testid="notifications-count">
          {onCount} of {total} notifications on
        </p>
      </div>

      {notificationGroups.map((group) => (
        <fieldset key={group.id} className="panel fieldset" data-testid={`notification-group-${group.id}`}>
          <legend className="legend">{group.title}</legend>
          <p className="muted small">{group.description}</p>
          <ul className="switch-list">
            {group.settings.map((setting) => {
              const inputId = `switch-${setting.id}`;
              const descriptionId = `${inputId}-description`;
              return (
                <li key={setting.id} className="switch-row">
                  <div className="switch-text">
                    <label htmlFor={inputId} className="field-label">
                      {setting.label}
                    </label>
                    <p id={descriptionId} className="muted small">
                      {setting.description}
                    </p>
                  </div>
                  <input
                    id={inputId}
                    type="checkbox"
                    role="switch"
                    className="switch"
                    checked={enabled[setting.id] ?? false}
                    onChange={() => toggle(setting.id)}
                    aria-describedby={descriptionId}
                    data-testid={inputId}
                  />
                </li>
              );
            })}
          </ul>
        </fieldset>
      ))}
    </>
  );
}
