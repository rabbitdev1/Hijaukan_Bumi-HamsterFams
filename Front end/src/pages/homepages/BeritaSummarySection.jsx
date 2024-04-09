import React from 'react';

function BeritaSummarySection({ count }) {
  return (
    <div className="flex flex-col p-3 gap-3 py-5">
        <div className=" overflow-clip rounded-xl"
          style={{
            backgroundImage: `url(${require('../../assets/image/ornament_3.png')})`,
            backgroundSize: 'cover'
          }}>
          <div className="grid md:grid-cols-4 grid-cols-2 flex-1 gap-2 p-5">
            {[{ title: 'Semua Berita', desc: count?.total_article },
            { title: 'Berita Hoax', desc: count?.total_hoax},
            { title: 'Berita Fakta', desc:  count?.total_fakta },
            { title: 'Belum Tersaring', desc: '++' }].map((item, index) => (
              <div className={`flex flex-col text-darkColor items-center p-3`} key={index}>
                <span className="text-4xl font-bold text-center">{item.desc||0}</span>
                <span className="text-sm opacity-70 text-left">{item.title}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
  );
}

export default BeritaSummarySection;
