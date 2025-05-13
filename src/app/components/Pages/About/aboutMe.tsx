import React from 'react';
import Image from 'next/image';
import './about.css';

interface TechWithIcon {
  name: string;
  icon: string;
  className: string;
}

interface TechWithoutIcon {
  name: string;
  className: string;
}

type TechItem = TechWithIcon | TechWithoutIcon;

const AboutMe: React.FC = () => {
  // Tech stack data
  const techStacks: Record<string, TechItem[]> = {
    Frontend: [
      { name: 'HTML', icon: '/assets/icons/html5.png', className: 'html' },
      { name: 'CSS', icon: '/assets/icons/css3.png', className: 'css' },
      { name: 'React', icon: '/assets/icons/reactjs.png', className: 'react' },
      { name: 'Vue.js', icon: '/assets/icons/vuejs.png', className: 'vue' },
      { name: 'Next.js', icon: '/assets/icons/nextjs.png', className: 'react' },
    ],
    Core: [
      { name: 'TypeScript', icon: '/assets/icons/typescript.png', className: 'typescript' },
      { name: 'JavaScript', icon: '/assets/icons/js.png', className: 'javascript' },
      { name: 'Python', icon: '/assets/icons/python.png', className: 'python' },
      { name: 'Node.js', icon: '/assets/icons/nodejs.png', className: 'nodejs' },
      { name: 'Go', icon: '/assets/icons/go.png', className: 'go' },
    ],
    Database: [
      { name: 'MongoDB', icon: '/assets/icons/mongodb.png', className: 'mongodb' },
      { name: 'Supabase', icon: '/assets/icons/supabase.png', className: 'supabase' },
      { name: 'PostgreSQL', icon: '/assets/icons/postgresql.png', className: 'postgresql' },
    ],
    Mobile: [
      { name: 'Swift', icon: '/assets/icons/swift.png', className: 'swift' },
    ],
    Cloud: [
      { name: 'Docker', icon: '/assets/icons/docker.png', className: 'docker' },
      { name: 'AWS', icon: '/assets/icons/aws.png', className: 'aws' },
      { name: 'Kubernetes', icon: '/assets/icons/kubernetes.png', className: 'docker' },
    ],
    'Editors & Misc': [
      { name: 'VS Code', icon: '/assets/icons/vscode.png', className: 'vscode' },
      { name: 'Git', icon: '/assets/icons/git.png', className: 'git' },
      { name: 'Linux', icon: '/assets/icons/linux.png', className: 'linux' },
      { name: 'Postman', icon: '/assets/icons/postman.png', className: 'postman' },
      { name: 'Markdown', icon: '/assets/icons/markdown.png', className: 'markdown' },
      { name: 'Figma', icon: '/assets/icons/figma.png', className: 'vscode' },
    ]
  };

  // Function to check if tech has an icon
  const hasIcon = (tech: TechItem): tech is TechWithIcon => {
    return 'icon' in tech;
  };

  return (
    <div className='aboutContainer'>
      <div className='header'>
        <div className='avatar'>
          <Image 
            src="/assets/Images/avatar.png" 
            alt="Profile" 
            fill
            priority
            sizes="(max-width: 480px) 120px, (max-width: 768px) 180px, 240px"
            style={{ 
              objectFit: 'cover',
              borderRadius: '50%'
            }}
          />
        </div>
        <div className='profileInfo font-mono flex flex-col'>
          <h1>Minh Tran</h1>
          <p>Software Engineer</p>
          <ul className='aboutList mt-6'>
          <li>
            <span role="img" aria-label="wave">👋</span>
            <span>Hi, I&apos;m a self-taught software engineer</span>
          </li>
          <li>
            <span role="img" aria-label="eyes">👀</span>
            <span>I live in Saigon, Vietnam.</span>
          </li>
          <li>
            <span role="img" aria-label="seedling">🌱</span>
            <span>I&apos;m studying anything related to Software Development and some ML/AI (for my own product)</span>
          </li>
        </ul>
        </div>
        
      </div>


      <div className='divider' />

      <div className='section'>
        <div className='sectionTitle'>
        🛠️ Tech stacks
        </div>
        <div className='techGrid'>
          {Object.entries(techStacks).map(([category, technologies]) => (
            <React.Fragment key={category}>
              <div className='categoryCell'>{category}</div>
              <div className='techCell'>
                {technologies.map((tech) => (
                  <div key={tech.name} className={`techBadge ${tech.className}`}>
                    {hasIcon(tech) && (
                      <Image 
                        src={tech.icon} 
                        alt={tech.name} 
                        width={16} 
                        height={16} 
                        priority
                      />
                    )}
                    <span className='mx-1'>{tech.name}</span>
                  </div>
                ))}
              </div>
            </React.Fragment>
          ))}
        </div>
      </div>

      <div className='section'>
        <ul className='aboutList'>
          <li>
            <span role="img" aria-label="rocket">🚀</span>
            <span>I&apos;m building my own iOS application product. Looking forward to bring it to user.</span>
          </li>
          <li>
            <span role="img" aria-label="globe">🌐</span>
            <span>How to reach me ... on my email: <a className='text-blue-500 underline' href="mailto:tgminh1995@gmail.com">tgminh1995@gmail.com</a></span>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default AboutMe;
    