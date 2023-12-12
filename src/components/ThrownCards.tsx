import linusVillage from '@/assets/popdevs/linus/village.png';
import danOss from '@/assets/popdevs/dan/oss.png';
import adamDrake from '@/assets/popdevs/tailwind/drake.png';

const goToPopDevs = () =>
  document
    .getElementById('popular-devs')
    ?.scrollIntoView({ behavior: 'smooth' });

export const ThrownCards = () => (
  <div className="absolute right-0 max-lg:-right-40 bottom-0 w-60 h-60 max-[700px]:hidden">
    <img
      src={danOss.src}
      alt=""
      className="rounded-md absolute bottom-0 right-72 md:scale-100 xl:scale-125 -rotate-[30deg] cursor-pointer"
      onClick={goToPopDevs}
    />
    <img
      src={linusVillage.src}
      alt=""
      className="rounded-md absolute bottom-0 right-36 md:scale-90 xl:scale-110 -rotate-[15deg] cursor-pointer"
      onClick={goToPopDevs}
    />
    <img
      src={adamDrake.src}
      alt=""
      className="rounded-md absolute bottom-0 right-0 md:scale-90 xl:scale-100 -rotate-6 max-lg:hidden cursor-pointer"
      onClick={goToPopDevs}
    />
  </div>
);
