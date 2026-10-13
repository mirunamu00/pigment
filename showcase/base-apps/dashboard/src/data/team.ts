export interface TeamMember {
  id: string;
  name: string;
  role: string;
  email: string;
  location: string;
  activeProjects: number;
}

export const currentUser = {
  name: 'Jordan Avery',
  email: 'jordan.avery@northwind.example',
  initials: 'JA',
};

export const team: TeamMember[] = [
  { id: 'priya', name: 'Priya Natarajan', role: 'Engineering Manager', email: 'priya@northwind.example', location: 'Toronto', activeProjects: 2 },
  { id: 'marcus', name: 'Marcus Lee', role: 'Senior Backend Engineer', email: 'marcus@northwind.example', location: 'Austin', activeProjects: 3 },
  { id: 'dana', name: 'Dana Whitfield', role: 'Platform Engineer', email: 'dana@northwind.example', location: 'Dublin', activeProjects: 3 },
  { id: 'aisha', name: 'Aisha Bello', role: 'Product Designer', email: 'aisha@northwind.example', location: 'Lagos', activeProjects: 2 },
  { id: 'tomas', name: 'Tomás Herrera', role: 'Mobile Engineer', email: 'tomas@northwind.example', location: 'Madrid', activeProjects: 1 },
  { id: 'lena', name: 'Lena Okafor', role: 'Frontend Engineer', email: 'lena@northwind.example', location: 'Berlin', activeProjects: 2 },
];
