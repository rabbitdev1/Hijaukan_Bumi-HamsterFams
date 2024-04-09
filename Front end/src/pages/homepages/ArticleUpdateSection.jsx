import React from 'react';
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import { LazyLoadImage } from "react-lazy-load-image-component";
import ConditionalRender from '../../components/ui/ConditionalRender';
import LoadingLink from '../../components/common/LoadingLink';
import { ReactComponent as FAktaIcon } from "../../assets/icon/ic_fakta.svg";
import { ReactComponent as HoaxIcon } from "../../assets/icon/ic_hoax.svg";

function ArticleUpdateSection({ articleUpdate, articleUpdateLoading, type }) {
    return (
        <div className={`flex flex-col p-3 gap-3   ${articleUpdate?.length !== 0 && "h-[480px]"}`}>

            {type === "1" ?
                <div className="flex flex-col text-center gap-2">
                    <span className="md:text-3xl text-2xl text-center">Berita Update
                    </span>
                    <span className="text-sm opacity-70">Kami menyajikan beberapa berita yang ter update</span>
                </div> :
                <div className="flex flex-col gap-2">
                    <span className="text-xl font-bold">Berita Update
                    </span>
                </div>}
            <div className="flex flex-col h-full w-full relative">
                <ConditionalRender
                    productsData={articleUpdate}
                    isLoading={articleUpdateLoading}
                    model={"emptyData"}
                >
                    <div className=" absolute top-0 left-0 right-0 bottom-0">
                        <Swiper
                            className="w-full h-full py-2"
                            spaceBetween={10}
                            loop={true}
                            breakpoints={{
                                0: {
                                    slidesPerView: 1,
                                },
                                640: {
                                    slidesPerView: 2,
                                },
                                768: {
                                    slidesPerView: 2,
                                },
                                1024: {
                                    slidesPerView: 3,
                                },
                                1280: {
                                    slidesPerView: 4,
                                },
                            }}
                            modules={[Autoplay]}
                        >
                            {articleUpdate?.slice(0, 6).map((item, index) => {
                                const updatedDate = new Date(item.updated_at);
                                const month = updatedDate.toLocaleString('id-ID', { month: 'short' });
                                const day = String(updatedDate.getDate())?.padStart(2, '0');

                                return (
                                    <SwiperSlide
                                        key={index}
                                        className="flex flex-col group  rounded-md overflow-hidden bg-lightColor shadow-inner "
                                    >
                                        <div className="flex flex-col flex-1 h-full w-full ">
                                            <LoadingLink
                                                to={"/detail/" + item.slug}
                                                className='flex flex-col gap-2'>
                                                <LazyLoadImage
                                                    src={item.image_url}
                                                    alt={item.title}
                                                    height={"100%"}
                                                    className="w-full h-full object-cover aspect-[2/1] max-h-40"
                                                    effect="blur"
                                                />

                                            </LoadingLink>
                                            <div className="flex flex-col flex-1 p-2.5 gap-2 ">
                                                <div className="flex flex-row gap-2 ">
                                                    <div className="flex flex-col relative w-14 ">
                                                        <div className="absolute bottom-0 left-0 right-0 bg-[#363848] p-2 rounded-full">
                                                            <div className="flex flex-col px-2 pt-2 items-center justify-center w-full aspect-square rounded-full">
                                                                <span className="font-bold text-lg text-darkColor">{day}</span>
                                                                <span className=" text-xs text-darkColor/50">{month?.toUpperCase()}</span>

                                                            </div>
                                                            <div className={`${item.status_article === "Fakta" ? 'bg-[#2BC155]' : 'bg-[#ff3420]'} flex flex-col w-full aspect-square rounded-full mt-2 p-1`}>
                                                                {item.status_article === "Fakta" ? (
                                                                    <FAktaIcon className="w-full h-full" fill={"#2BC155"} />
                                                                ) : (
                                                                    <HoaxIcon className="w-full h-full" fill={"#ff3420"} />
                                                                )}
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="flex flex-1 flex-col">
                                                        <span className={`text-sm ${item.status_article === "Fakta" ? 'text-[#2BC155]' : 'text-[#24a186]'} line-clamp-1`}>{item.status_article} </span>
                                                        <span className="text-lg font-bold line-clamp-2">{item.title}</span>
                                                    </div>
                                                </div>
                                                <span className="text-sm opacity-70 text-left line-clamp-3">{item.summary} </span>
                                            </div>
                                        </div>
                                    </SwiperSlide>
                                );
                            })}
                        </Swiper>
                    </div>
                </ConditionalRender>
            </div>
        </div>
    );
}

export default ArticleUpdateSection;
