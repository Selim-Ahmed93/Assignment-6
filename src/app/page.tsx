import React from 'react';
import Banner from '@/components/homepage/banner';
// import LibraryPage from '@/components/homepage/library';
// import LibraryPage from '@/components/homepage/library';
import LibraryPage from '@/components/homepage/library';

const page = () => {
  return (

  <main>
      <Banner />
      <div id="library">
        <LibraryPage />
      </div>
    </main>
  );
};

export default page;