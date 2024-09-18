import TeamCard from '../team_card/TeamCard';
import './team.scss';
import { Inter } from 'next/font/google';

const inter = Inter({
  subsets: ['latin'],
  weight: ['600', '400', '500'],
});

const team = [
  {
    name: 'Salwa Mekni',
    image: '/images/team/salwa.png',
    linkedin: '#',
    position: 'President',
  },
  {
    name: 'Asma Rejeb',
    image: '/images/team/asma.png',
    linkedin: '#',
    position: 'Vice President',
  },
  {
    name: 'Nessrine Daghbeji',
    image: '/images/team/nessrine.png',
    linkedin: '#',
    position: 'General Secretary',
  },
  {
    name: 'Wiem Ksaier',
    image: '/images/team/wiem.png',
    linkedin: '#',
    position: 'Head of HR',
  },
  {
    name: 'Dorra Smii',
    image: '/images/team/dorra.png',
    linkedin: '#',
    position: 'HR Manager',
  },
  {
    name: 'Jacer Chetoui',
    image: '/images/team/jacer.png',
    linkedin: '#',
    position: 'Technical lead',
  },
  {
    name: 'Mehdi Ben Hariz',
    image: '/images/team/mehdi.png',
    linkedin: 'https://www.linkedin.com/in/mehdi-ben-hariz/',
    position: 'Head of Business',
    portfolio: 'https://mehdibenhariz.dev/',
  },
  {
    name: 'Malek Khannoussi',
    image: '/images/team/malek.png',
    linkedin: 'https://www.linkedin.com/in/khannoussi-malek/',
    position: 'Head of Basic Web Department',
    portfolio: 'https://www.malekkhannoussi.tn/',
  },
  {
    name: 'Amen Allah Mselmi',
    image: '/images/team/amen.png',
    linkedin: '#',
    position: 'Basic Web Instructor',
  },
  {
    name: 'Oumaya Ben Ammar',
    image: '/images/team/oumeya.png',
    linkedin: '#',
    position: 'Basic Web Instructor',
  },
  {
    name: 'Ahmed Sadraoui',
    image: '/images/team/ahmed.png',
    linkedin: '#',
    position: 'Head Of Intermediate Web',
  },
  {
    name: 'Rami Chargui',
    image: '/images/team/rami.png',
    linkedin: '#',
    position: 'Advanced Web Instructor',
  },
  {
    name: 'Mariem Tlatli',
    image: '/images/team/mariem.png',
    linkedin: '#',
    position: 'Basic Web Mentor',
  },
  {
    name: 'Ghassen Latrach',
    image: '/images/team/ghassen.png',
    linkedin: '#',
    position: 'Basic Web Mentor',
  },
  {
    name: 'Samar Larbi',
    image: '/images/team/samar.png',
    linkedin: '#',
    position: 'Basic Web Mentor',
  },
  {
    name: 'Iheb Haded',
    image: '/images/team/iheb.png',
    linkedin: '#',
    position: 'Intermediate Web Mentor',
  },
  {
    name: 'Haythem Zaaber',
    image: '/images/team/haythem.png',
    linkedin: '#',
    position: 'Intermediate Web Mentor',
  },
  {
    name: 'Adem Bechir',
    image: '/images/team/adem.png',
    linkedin: '#',
    position: 'Head of Events',
  },
  {
    name: 'Yossra Jamei',
    image: '/images/team/youssra.png',
    linkedin: '#',
    position: 'Business & Events Manager',
  },
  {
    name: 'Sarra Zouaghi',
    image: '/images/team/sarra.png',
    linkedin: '#',
    position: 'Business & Events Manager',
  },
  {
    name: 'Ali Zayen',
    image: '/images/team/ali.png',
    linkedin: '#',
    position: 'Business & Events Manager',
  },

  {
    name: 'Eya Ghribi',
    image: '/images/team/eya.png',
    linkedin: '#',
    position: 'Business & Events Manager',
  },

  {
    name: 'Rim Zghida',
    image: '/images/team/rim.png',
    linkedin: '#',
    position: 'Head of Media & Marketing',
  },
  {
    name: 'Yossr Baaziz',
    image: '/images/team/yossr.png',
    linkedin: '#',
    position: 'Media & Marketing Manager',
  },
  {
    name: 'Anas Dahmani',
    image: '/images/team/anas.png',
    linkedin: '#',
    position: 'Media & Marketing Manager',
  },
  {
    name: 'Omar Mechi',
    image: '/images/team/omar.png',
    linkedin: '#',
    position: 'Media & Marketing Manager',
  },
];

export default function Team() {
  return (
    <section id="team" className={inter.className}>
      <div className="container">
        <div className="title">
          <h1 data-aos="fade-up">Our Team</h1>
          <p data-aos="fade-up" data-aos-delay="150">
            Meet the dedicated individuals behind our club.
          </p>
        </div>
        <div className="team-list">
          {team.map((member) => (
            <TeamCard key={member.position} infos={member} />
          ))}
        </div>
      </div>
    </section>
  );
}
