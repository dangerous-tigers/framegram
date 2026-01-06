import { useCreatePostStore } from '@/features/post-create/model/storeCreatePost';
import s from '@/features/post-create/ui/publishStep/publishStep.module.scss';
import { Swiper } from '@/shared/ui/swiper';
import Image from 'next/image';
import { Textarea } from '@/shared/ui/textarea';
import { AddLocation } from '@/features/addLocation/ui/AddLocation';
import { ChangeEvent } from 'react';
import { useMe } from '@/entities/user/model/useMe';
import { useMediaQuery } from '@/shared/lib/hooks/useMediaQuery';

export const PublishStep = () => {
  const images = useCreatePostStore((s) => s.images);

  const description = useCreatePostStore((s) => s.description);

  const setDescription = (e: ChangeEvent<HTMLTextAreaElement>) =>
    useCreatePostStore.getState().setDescription(e.currentTarget.value);

  const activeIndex = useCreatePostStore((s) => s.activeImageIndex);
  const setActiveImageIndex = (e: number) => {
    useCreatePostStore.getState().setActiveImageIndex(e);
  };

  const { data: user } = useMe();

  const isMobile = useMediaQuery('(max-width: 999px)');
  const ifMoreOneSlide = images.length > 1;

  return (
    <div className={s.wrapper}>
      <Swiper
        className={s.swiper}
        options={{
          loop: true,
          breakpoints: {
            320: {
              slidesPerView: ifMoreOneSlide ? 1.05 : 1,
              spaceBetween: 12,
            },
            1000: {
              slidesPerView: 1,
              spaceBetween: 0,
            },
          },
        }}
        onIndexChange={setActiveImageIndex}
        initialIndex={activeIndex}
        slides={images.map((src) => (
          <Image
            key={src.file.name}
            src={src.preview}
            fill
            alt={src.file.name}
            style={{ filter: src.filter ?? 'none' }}
          />
        ))}
        withPagination={!isMobile}
        withNavigation={!isMobile}
      />
      <div className={s.content}>
        <div className={s.descBlock}>
          <div className={s.profile}>
            <div className={s.avatar}></div>
            <div className={s.userName}>{user?.userName}</div>
          </div>
          <Textarea
            maxLength={500}
            placeholder='Enter a description'
            label={'Add publication descriptions'}
            value={description}
            onChange={setDescription}
            classNameTarget={s.textArea}
          />
        </div>
        <hr className={s.hr} />
        <div className={s.location}>
          <AddLocation />
        </div>
      </div>
    </div>
  );
};
