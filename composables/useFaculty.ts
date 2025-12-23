export interface FacultyMember {
  name: string
  titles?: string[]
  email?: string
  imageUrl?: string
  facultyType?: string
  facultyDisplayLevel?: number
  displayOrder?: number
  role?: string[]
  college?: string
  education?: string[]
  published?: boolean
  coursesTaught?: string[]
  body?: any
}

export const useFaculty = () => {
  const getFacultyByLevel = async (level: number): Promise<FacultyMember[]> => {
    const allFaculty = await queryCollection('faculty').all()
    
    return allFaculty
      .filter(member => 
        member.facultyDisplayLevel === level && 
        member.published !== false
      )
      .sort((a, b) => (a.displayOrder || 0) - (b.displayOrder || 0))
  }

  return {
    getFacultyByLevel
  }
}
    {
      name: 'Michael Collins',
      titles: ['Faculty'],
      email: 'msc227@psu.edu',
      imageUrl: '/assets/img/collins-mug.jpg',
      facultyType: 'lead',
      displayLevel: 1,
      displayOrder: 0,
      role: ['Lead Faculty', 'DMD Curriculum Coordinator', 'Instructor'],
      college: 'School of Visual Arts, College of Arts and Architecture',
      education: ['M.F.A., New Media Art, Penn State', 'B.A., Integrative Arts, Penn State', 'B.S., Information Sciences and Technology, Penn State'],
      published: true,
      coursesTeught: ['DMD 100', 'DMD 300', 'DMD 400', 'DART 206'],
      content: 'Michael Collins joined the Penn State School of Visual Arts in 2012 where he teaches 3D animation, digital design, and digital fabrication. His research interests in open-source technology and sustainable design unite around online education, where he works to identify and solve contemporary issues facing online teaching and learning. Long-term project collaborations include the ELMS Learning Network project and the OERSchema project. Collins has previously worked on projects for the NFL, BMW Guggenheim Lab in NYC, and as freelance product designer. He has attended, presented at, and helped organize a variety of international design, technology, and education conferences and has been a long-time SIGGRAPH volunteer.'
    },
    {
      name: 'Anna Divinsky',
      titles: ['Faculty'],
      email: 'axd289@psu.edu',
      imageUrl: '/assets/img/annadivinsky-bio.jpg',
      facultyType: 'program coordinator',
      displayLevel: 1,
      displayOrder: 0.5,
      role: ['Instructor', 'Online Programs Coordinator'],
      college: 'College of Arts and Architecture',
      education: ['M.F.A., Printmaking, Penn State', 'B.A., Art History, University of Pennsylvania', 'B.A., Studio Arts, University of Pennsylvania'],
      published: true,
      coursesTeught: ['ART 010'],
      content: 'Anna Divinsky is an instructor of art and the lead faculty of the Digital Arts Certificate Program offered by the School of Visual Arts and Penn State World Campus. In addition to teaching online, she oversees online training of new instructors and graduate assistants teaching in the program. Her goal is to foster close communication between the students and faculty. Being an artist inspires and informs her approach to how she authors and teaches online, integrating studio techniques and hands-on art making. She works primarily with fiber, creating paintings on silk, sculptural forms, and site-specific installations. Her love for pattern, design, intricate detail, and repetition is reflected in her course\'s requirements.'
    },
    {
      name: 'Will Yurman',
      titles: ['Faculty'],
      email: 'why1@psu.edu',
      imageUrl: '/assets/img/will_yurman_mug.jpg',
      facultyType: 'lead',
      displayLevel: 1,
      displayOrder: 1,
      role: ['Lead Faculty', 'Instructor'],
      college: 'College of Communications',
      education: ['B.A., Biology, University at Albany, SUNY'],
      published: true,
      coursesTeught: ['COMM 215'],
      content: 'Will Yurman is a senior lecturer in the College of Communications at Penn State where he teaches multimedia storytelling and photojournalism. He lives in State College, Pennsylvania with his wife Hilary Appelman their two children, two cats and a dog. Before coming to Penn State he worked in journalism for more than 20 years as a still photographer and multimedia producer. Will was a staff photographer at the (Rochester N.Y.) Democrat and Chronicle. He also spent three years based in Jerusalem covering the Palestinian-Israeli conflict. His still photography and multimedia work have been recognized in the Best of Photography, and Picture of the Year International contests and exhibited at The George Eastman House International Museum of Photography and Film. His obsessive-compulsive nature has allowed him to extend his photo a day project to more than twelve years. Not to jinx it, but he has taken a photo every day since December 31, 2003.'
    },
    {
      name: 'Greg O\'Toole',
      titles: ['Faculty'],
      email: 'gto1@psu.edu',
      imageUrl: '/assets/img/greg_brain.jpg',
      facultyType: 'lead',
      displayLevel: 1,
      displayOrder: 3,
      role: ['Lead Faculty', 'Instructor'],
      college: 'College of Information Sciences and Technology',
      education: [],
      published: true,
      coursesTeught: ['ART 200', 'DMD 100', 'DART 202', 'DART 204'],
      content: 'Dr. Greg O\'Toole, Ph.D. is a Senior Lecturer in the College of Information Sciences and Technology at Penn State University where he focuses on effective creative expression using open source technologies and critical approaches to media studies. Greg has been working on the web since 1994, effectively building sustainable web ecosystems for a globally diverse range of users and clients. Dr. O\'Toole studied at Bradley University (B.S.); The School of the Art Institute of Chicago (Post-Bacc.); University of Denver (M.A.); and the European Graduate School in Saas-fee, Switzerland for his doctoral research, and defended his doctoral dissertation on extracting meaning from mediated messages with Professor Dr. Hubertus von Amelunxen, Ph.D. in Berlin, Germany which was published the same year. The web projects he\'s helped build over the years are currently in use by 10 million+ web users globally each month.'
    },
    {
      name: 'Ben Andrew',
      titles: ['Faculty'],
      email: 'bea9@psu.edu',
      imageUrl: '/assets/img/bandrew-bio.jpg',
      facultyType: 'instructor',
      displayLevel: 3,
      displayOrder: 4,
      role: ['Instructor'],
      college: 'College of Arts and Architecture',
      education: ['M.F.A., Interdisciplinary Art, Maryland Institute College of Arts', 'B.F.A., Painting, Pratt Institute'],
      published: true,
      coursesTeught: ['DMD 100', 'ART 211y', 'DART 202', 'DART 206'],
      content: 'Benjamin Andrew is an interdisciplinary artist exploring the frontiers of storytelling and technology. He has taught university classes and workshops at the Maryland Institute College of Art, Johns Hopkins University, and Penn State. At Penn State, he is involved with several interdisciplinary teaching initiatives, such as the new Digital Multimedia Design online degree program and a collaborative course on scientific illustration and history in the Department of Biology in the Eberly College of Science.'
    },
    {
      name: 'Eduardo Navas',
      titles: ['Faculty'],
      email: 'ean13@psu.edu',
      imageUrl: '/assets/img/enavas-bio.jpg',
      facultyType: 'instructor',
      displayLevel: 3,
      displayOrder: 5,
      role: ['Instructor'],
      college: 'School of Visual Arts, College of Arts and Architecture',
      education: ['Ph.D., University of California', 'M.F.A., California Institute of the Arts', 'B.F.A., Otis College of Art and Design'],
      published: true,
      coursesTeught: ['ART 211y'],
      content: 'Eduardo Navas is the author of Remix Theory: The Aesthetics of Sampling (Springer, 2012), Spate: A Navigational Theory of Networks (INC, 2016), as well as Art Media Design and Postproduction: Open Guidelines on Appropriation and Remix (forthcoming: Focal/Routledge, 2018). He is co-editor of The Routledge Companion to Remix Studies (Routledge, 2015), and Keywords in Remix Studies (Routledge 2017). He implements methodologies of cultural analytics and digital humanities to research the crossover of art and media in culture. Navas currently researches and teaches principles of cultural analytics and digital humanities in The School of Visual Arts at The Pennsylvania State University, PA.'
    },
    {
      name: 'K. Ian Brill',
      titles: ['Faculty'],
      email: 'kib5194@psu.edu',
      imageUrl: '/assets/img/ibrill-bio.jpg',
      facultyType: 'instructor',
      displayLevel: 3,
      displayOrder: 6,
      role: ['Instructor'],
      college: 'School of Visual Arts, College of Arts and Architecture',
      education: ['M.F.A., New Media Art, Penn State University'],
      published: true,
      coursesTeught: ['DMD 100', 'DART 202', 'DART 203', 'DART 206'],
      content: 'Ian Brill instructs digital media arts at Penn State. In addition to teaching, his professional experiences lie in the fields of design, sound design, interactive design, digital fabrication, programming, performance, film scoring, illustration, and sculpture. His works have existed in museums, galleries, public art settings, music festivals, performance spaces, online, and film. In both his teaching and his studio practice, he purposely applies design principles and philosophy, across different mediums and technologies, to foster, reinforce, and express a greater fluidity of comprehension.'
    },
    {
      name: 'Leanna Rosas',
      titles: ['Faculty'],
      email: 'lmr22@psu.edu',
      imageUrl: '/assets/img/lrosas-bio.jpg',
      facultyType: 'instructor',
      displayLevel: 3,
      displayOrder: 7,
      role: ['Instructor'],
      college: 'School of Visual Arts, College of Arts and Architecture',
      education: ['M.F.A., Print and Media Art, Cranbrook Academy of Art', 'B.F.A., Studio Art, University of Wisconsin-Superior'],
      published: true,
      coursesTeught: ['ART 211y', 'DART 202', 'DART 206'],
      content: 'Leanna Rosas\' teaching and new media studio work is concerned with issues of identity, inequality, irony and manipulation, and the various relationships within visual culture. Her most recent work is in music composition, collaborating with the visual work of partner Carlos Rosas, Penn State School of Visual Art, and the audio remixing of Robert Dansby, California Institute of the Arts. Much of the work resulting from their collaborations seeks to explore means in which one identifies with the continually evolving conditions within a technology-driven culture.'
    },
    {
      name: 'Jamie DiSarno',
      titles: ['Faculty'],
      email: 'jld477@psu.edu',
      imageUrl: '/assets/img/jdisarno-bio.jpg',
      facultyType: 'instructor',
      displayLevel: 3,
      displayOrder: 8,
      role: ['Instructor'],
      college: 'School of Visual Arts, College of Arts and Architecture',
      education: ['B.F.A., State University of New York at Fredonia', 'M.F.A., Penn State University'],
      published: true,
      coursesTeught: ['ART 211y'],
      content: 'Jamie DiSarno is a Doctoral Candidate at the University of Buffalo in Visual Studies. She received a Bachelors of Fine Arts in painting and sculpture from the State University of New York at Fredonia and a Masters of Fine Arts in New Media from the Pennsylvania State University. She has published articles in Wanderlust: A History of Walking, edited by Rachel Adams, by the MIT Press, in 2018 and in Ill at Ease, edited by Conor Moynihan, University at Buffalo, in 2017. Her research pertains to art in Latin America, and contemporary artistic practice including performance and feminist art, art and activism.'
    }
  ]

  const getPublishedFaculty = () => {
    return facultyMembers
      .filter(member => member.published)
      .sort((a, b) => a.displayOrder - b.displayOrder)
  }

  const getFacultyByLevel = (level: number) => {
    return getPublishedFaculty().filter(member => member.displayLevel === level)
  }

  return {
    facultyMembers,
    getPublishedFaculty,
    getFacultyByLevel
  }
}
