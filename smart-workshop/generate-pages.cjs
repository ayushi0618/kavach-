const fs = require('fs');
const path = require('path');

const pages = [
  'admin/Dashboard', 'admin/Assets', 'admin/Workflow', 'admin/Inventory', 
  'admin/Maintenance', 'admin/Reports', 'admin/Analytics', 'admin/Employees', 'admin/Settings',
  'technician/Dashboard', 'technician/Jobs', 'technician/Scanner', 'technician/Maintenance', 'technician/Profile',
  'public/Login'
];

pages.forEach(p => {
  const f = path.join(process.cwd(), 'src/pages', p + '.jsx');
  fs.mkdirSync(path.dirname(f), { recursive: true });
  const c = p.split('/').pop();
  
  const content = `import PageTransition from '../../components/animations/PageTransition';

export default function ${c}() {
  return (
    <PageTransition>
      <div className="p-6">
        <h1 className="text-2xl font-bold text-olive mb-4">${c}</h1>
        <div className="bg-white p-6 rounded-lg shadow-sm border border-border">
          <p className="text-gray-600">This is the ${c} page.</p>
        </div>
      </div>
    </PageTransition>
  );
}
`;
  fs.writeFileSync(f, content);
});
console.log('Pages generated.');
