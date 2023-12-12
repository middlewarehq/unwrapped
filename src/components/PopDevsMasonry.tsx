import Masonry, { ResponsiveMasonry } from 'react-responsive-masonry';
import { pregenFiles, devOrgMap } from '@/constants/all-pregen-cards';
import { useMediaQuery } from 'usehooks-ts';

const urls = await Promise.all(
  pregenFiles.map((url) =>
    import('../assets/' + url).then((m) => m.default.src)
  )
);

const devList = pregenFiles.map((line) => line.split('/')[1]);
const devOrgList = devList.map(
  (dev) => devOrgMap[dev as keyof typeof devOrgMap]
);

export const PopDevsMasonry = () => {
  const is500 = useMediaQuery('(min-width: 500px)');
  const is750 = useMediaQuery('(min-width: 750px)');
  const getMarginForIndex = (i: number) => {
    if (i === 0) return is750 ? '240px' : is500 ? '120px' : 0;
    if (i === 1) return is750 ? '120px' : 0;
    return 0;
  };
  return (
    <>
      <hr
        className="border-gray-500 border-opacity-60 my-10"
        id="popular-devs"
      />
      <div className="w-full min-h-full mr-auto max-w-[900px] mt-10 flex flex-col gap-10">
        <span className="text-3xl font-medium">
          Check out what popular dev leaders have been up to...
        </span>
        <ResponsiveMasonry columnsCountBreakPoints={{ 250: 1, 500: 2, 750: 3 }}>
          <Masonry gutter="16px">
            {urls.map((url, i) => (
              <div
                key={i}
                className="flex flex-col bg-slate-300 bg-opacity-10 rounded-md"
                style={{ marginTop: getMarginForIndex(i) }}
              >
                <div className="text-xs text-slate-100 font-medium text-center py-2">
                  {devOrgList[i]}
                </div>
                <img src={url} alt="" className={`rounded-md`} />
              </div>
            ))}
          </Masonry>
        </ResponsiveMasonry>
      </div>
    </>
  );
};
