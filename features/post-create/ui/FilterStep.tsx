import { useCreatePostStore } from '@/features/post-create/model/storeCreatePost';

export const FilterStep = () => {
  // const images = useCreatePostStore((s) => s.images);
  const setStep = useCreatePostStore((s) => s.setStep);

  // const applyFilter = (filterName: string) => {
  //   // console.log('apply filter:', filterName);
  // };

  return (
    <div>
      <h3>Filters</h3>

      <div>
        {/*<button onClick={() => applyFilter('clarendon')}>Clarendon</button>*/}
        {/*<button onClick={() => applyFilter('mono')}>Mono</button>*/}
        {/*<button onClick={() => applyFilter('vivid')}>Vivid</button>*/}
      </div>

      <button onClick={() => setStep('publish')}>Next</button>
    </div>
  );
};
