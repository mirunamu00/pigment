import { team } from '../data/team';

export default function TeamPage() {
  return (
    <>
      <div className="page-header">
        <h1>Team</h1>
        <p className="muted">{team.length} people across engineering, design and operations.</p>
      </div>
      <section className="panel" aria-label="Team members">
        <div className="table-wrap">
          <table className="table" data-testid="team-table">
            <thead>
              <tr>
                <th scope="col">Name</th>
                <th scope="col">Role</th>
                <th scope="col">Location</th>
                <th scope="col">Active projects</th>
              </tr>
            </thead>
            <tbody>
              {team.map((member) => (
                <tr key={member.id} data-testid="team-row">
                  <td>
                    <div className="person">
                      <span className="avatar" aria-hidden="true">
                        {member.name
                          .split(' ')
                          .map((part) => part[0])
                          .join('')}
                      </span>
                      <div>
                        <div>{member.name}</div>
                        <a href={`mailto:${member.email}`} className="small">
                          {member.email}
                        </a>
                      </div>
                    </div>
                  </td>
                  <td>{member.role}</td>
                  <td>{member.location}</td>
                  <td className="numeric">{member.activeProjects}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </>
  );
}
